/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sync de Content Types no Contentful a partir de um array local (contentModels).
 *
 * Requisitos:
 *  - CONTENTFUL_MANAGEMENT_TOKEN (token de Management)
 *  - CONTENTFUL_SPACE_ID
 *  - CONTENTFUL_ENVIRONMENT (ex.: 'master' ou 'development')
 *
 * Uso:
 *  npm i -D typescript ts-node @types/node
 *  npm i contentful-management dotenv
 *  npx ts-node syncContentModels.ts
 */

import 'dotenv/config'; import contentful, {
    type ContentType,
    type Environment,
    type Space,
  } from 'contentful-management';

// Substitua pelo caminho real dos seus tipos
import { contentModels, type ContentModelDefinition } from '../src/types/contentful';



// ---------- TIPOS (compatíveis com o que você já tem) ----------

type BaseField = {
  id: string;
  name: string;
  type:
    | 'Symbol'
    | 'Text'
    | 'Integer'
    | 'Number'
    | 'Boolean'
    | 'Date'
    | 'Location'
    | 'Object'
    | 'Array'
    | 'Link';
  required?: boolean;
  localized?: boolean;
  omitted?: boolean;
  disabled?: boolean;
  validations?: any[];
  // para Array
  items?: {
    type: string;
    validations?: any[];
    linkType?: 'Entry' | 'Asset';
  };
  // para Link
  linkType?: 'Entry' | 'Asset';
};

// export type ContentModelDefinition = {
//   id: string;
//   name: string;
//   description?: string;
//   displayField?: string;
//   fields: BaseField[];
// };

// ---------- UTILS ----------
// ---------- VARIÁVEIS DE AMBIENTE ----------
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

console.log("Variaveis:", SPACE_ID, ENVIRONMENT_ID, TOKEN)
if (!SPACE_ID || !TOKEN) {
  console.error('❌ Faltam variáveis de ambiente: CONTENTFUL_SPACE_ID ou CONTENTFUL_MANAGEMENT_TOKEN.');
  process.exit(1);
}

const client = contentful.createClient({ accessToken: TOKEN });

// ---------- UTILS ----------
function shallowEqual(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** Retenta automaticamente no caso de 429/503 (rate limit/instabilidade) */
async function withRetries<T>(fn: () => Promise<T>, label: string, maxRetries = 5): Promise<T> {
  let attempt = 0;
   
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      const status = err?.status || err?.sys?.status || err?.statusCode;
      if ((status === 429 || status === 503) && attempt < maxRetries) {
        const wait = 500 * Math.pow(2, attempt);
        console.warn(`⚠️  ${label}: status ${status}. Retentando em ${wait}ms... (tentativa ${attempt + 1}/${maxRetries})`);
        await new Promise((r) => setTimeout(r, wait));
        attempt++;
        continue;
      }
      throw err;
    }
  }
}

async function getEnv(): Promise<Environment> {
  const space: Space = await withRetries(() => client.getSpace(SPACE_ID), 'getSpace');
  const environment: Environment = await withRetries(() => space.getEnvironment(ENVIRONMENT_ID), 'getEnvironment');
  return environment;
}

function logDiff(oldCT: ContentType, desired: ContentModelDefinition) {
  const diffs: string[] = [];

  if (oldCT.name !== desired.name) diffs.push(`name: "${oldCT.name}" → "${desired.name}"`);
  if ((oldCT.description || '') !== (desired.description || ''))
    diffs.push(`description: "${oldCT.description || ''}" → "${desired.description || ''}"`);
  if ((oldCT.displayField || '') !== (desired.displayField || ''))
    diffs.push(`displayField: "${oldCT.displayField || ''}" → "${desired.displayField || ''}"`);
  if (!shallowEqual(oldCT.fields, desired.fields)) diffs.push(`fields: (alterados)`);

  if (diffs.length) {
    console.log('  🔧 Diferenças detectadas:');
    for (const d of diffs) console.log('   •', d);
  } else {
    console.log('  ✅ Sem diferenças (já está em conformidade).');
  }
}

async function upsertContentType(environment: Environment, model: ContentModelDefinition) {
  let existing: ContentType | null = null;

  // Tenta buscar o content type
  try {
    existing = await withRetries<ContentType>(() => environment.getContentType(model.id), `getContentType:${model.id}`);
  } catch (err: any) {
    const notFound = err?.name === 'NotFound' || err?.status === 404 || err?.sys?.status === 404;
    if (!notFound) throw err;
  }

  // Cria
  if (!existing) {
    console.log(`\n🧩 Criando Content Type: ${model.name} (${model.id})`);
    const created = await withRetries<ContentType>(
      () =>
        environment.createContentTypeWithId(model.id, {
          name: model.name,
          description: model.description,
          displayField: model.displayField,
          // ⚠️ Cast apenas no payload da API para evitar conflito de tipos
          fields: model.fields as any,
        }),
      `createContentType:${model.id}`
    );

    const published = await withRetries<ContentType>(() => created.publish(), `publish:${model.id}`);
    console.log(`  ✅ Criado e publicado (v${published.sys.publishedVersion}).`);
    return;
  }

  // Atualiza (se necessário)
  console.log(`\n🔎 Verificando Content Type existente: ${model.name} (${model.id})`);
  logDiff(existing, model);

  const needsUpdate =
    existing.name !== model.name ||
    (existing.description || '') !== (model.description || '') ||
    (existing.displayField || '') !== (model.displayField || '') ||
    !shallowEqual(existing.fields, model.fields);

  if (!needsUpdate) {
    // Já está publicado na versão atual?
    const isPublished = existing.sys.publishedVersion === existing.sys.version - 1;
    if (isPublished) {
      console.log('  ✅ Já atualizado e publicado. Nada a fazer.');
      return;
    }
    // Se não estiver publicado, publica
    const republished = await withRetries<ContentType>(() => existing!.publish(), `publish-nochange:${model.id}`);
    console.log(`  📣 Publicado (v${republished.sys.publishedVersion}).`);
    return;
  }

  // Aplica alterações
  existing.name = model.name;
  existing.description = model.description || '';
  if (model.displayField) existing.displayField = model.displayField;
  // ⚠️ Cast apenas no payload da API
  (existing as any).fields = model.fields as any;

  const updated = await withRetries<ContentType>(() => existing!.update(), `update:${model.id}`);
  const published = await withRetries<ContentType>(() => updated.publish(), `publish:${model.id}`);
  console.log(`  ✅ Atualizado e publicado (v${published.sys.publishedVersion}).`);
}

async function run() {
  console.log(`🚀 Iniciando sync de Content Types para space=${SPACE_ID}, env=${ENVIRONMENT_ID}`);
  const environment = await getEnv();

  // Validação opcional de displayField
  for (const m of contentModels) {
    if (m.displayField && !m.fields.some((f) => f.id === m.displayField)) {
      console.warn(
        `⚠️  Model "${m.id}" informa displayField="${m.displayField}", mas não há field com esse id. O Contentful rejeitará essa criação/atualização.`
      );
    }
  }

  // Processa em sequência (ordem do array importa p/ referências)
  for (const model of contentModels) {
    try {
      await upsertContentType(environment, model);
    } catch (err: any) {
      console.error(`❌ Erro ao processar "${model.id}":`, err?.message || err);
      process.exitCode = 1;
    }
  }

  console.log('\n✨ Concluído.');
}

run().catch((e) => {
  console.error('❌ Falha geral:', e);
  process.exit(1);
});