# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/711b50f7-1cc8-49b4-aa31-fc371e4d753c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/711b50f7-1cc8-49b4-aa31-fc371e4d753c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Integração com Contentful

Esta aplicação já está preparada para consumir os dados do Contentful. Enquanto as credenciais não forem configuradas o projeto utilizará os dados mockados que já existiam anteriormente, garantindo que a UI continue funcionando em desenvolvimento.

### Variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`.
2. Preencha os valores fornecidos pelo Contentful:

```
VITE_CONTENTFUL_SPACE_ID=<ID do espaço>
VITE_CONTENTFUL_ENVIRONMENT=master # ou outro ambiente, se aplicável
VITE_CONTENTFUL_DELIVERY_TOKEN=<Content Delivery API - access token>
```

> Todas as variáveis são lidas via `import.meta.env`, portanto não é necessário reiniciar o servidor do Vite após alterações, bastando parar e subir novamente o comando `npm run dev`.

### Modelos de conteúdo sugeridos

Crie os seguintes *Content Types* no Contentful (a estrutura também está documentada em `src/types/contentful.ts` na constante `contentModels`):

#### `storeSettings`

| Campo | Tipo | Obrigatório | Observações |
| --- | --- | --- | --- |
| `storeName` | Symbol | ✅ | Nome exibido no cabeçalho |
| `whatsappNumber` | Symbol | ✅ | Utilizado nos botões de contato (`5511999999999`) |
| `instagramUrl` | Symbol | ✅ | URL completa do perfil |
| `phoneNumber` | Symbol | ✅ | Telefone formatado |
| `email` | Symbol | ✅ | E-mail de contato |
| `logo` | Asset | opcional | Logo exibida no cabeçalho |
| `heroTitle` | Symbol | opcional | Texto principal do hero |
| `heroSubtitle` | Symbol | opcional | Texto secundário do hero |
| `heroDescription` | Text | opcional | Descrição do hero |
| `heroBackground` | Asset | opcional | Imagem de fundo do hero |
| `heroHighlight` | Symbol | opcional | Palavra em destaque após o título |

> Recomenda-se manter apenas uma entrada publicada para este content type.

#### `category`

| Campo | Tipo | Obrigatório | Observações |
| --- | --- | --- | --- |
| `name` | Symbol | ✅ | Nome exibido nos filtros |
| `slug` | Symbol | ✅ | Identificador único (ex.: `iphone-15`) |
| `description` | Text | opcional | Texto adicional |
| `productCount` | Integer | opcional | Usado para sobrescrever a contagem automática de produtos |

#### `product`

| Campo | Tipo | Obrigatório | Observações |
| --- | --- | --- | --- |
| `name` | Symbol | ✅ | Nome do produto |
| `shortDescription` | Symbol | ✅ | Texto curto exibido no card |
| `description` | Text | ✅ | Descrição completa |
| `price` | Number | ✅ | Valor atual |
| `originalPrice` | Number | opcional | Valor antes do desconto |
| `image` | Asset | ✅ | Imagem principal |
| `isNew` | Boolean | ✅ | Marca o selo "Novo" |
| `category` | Reference (Entry) | ✅ | Referencia `category` |
| `featured` | Boolean | ✅ | Identifica destaques |
| `stock` | Integer | ✅ | Estoque disponível |

### Como os dados são consumidos

- `Header`, `Hero` e `Footer` utilizam os dados do content type `storeSettings`.
- `ProductGrid` e `CategoryFilter` consomem `product` e `category` para montar o catálogo e os filtros.
- Enquanto não houver dados publicados, componentes exibem estados vazios ou desabilitam ações como contato via WhatsApp.

### Cache de requisições

- A aplicação utiliza o React Query com `staleTime` de 5 minutos e `gcTime` de 30 minutos, evitando chamadas desnecessárias à Content Delivery API.
- Além disso existe um cache em memória (`src/lib/contentful/index.ts`) que guarda as respostas de cada endpoint pelo mesmo período.
- Sempre que as variáveis de ambiente não estiverem definidas, o código retorna os mocks (`src/lib/contentful/mock-data.ts`), garantindo que o plano gratuito da Contentful não seja consumido em ambientes de desenvolvimento.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/711b50f7-1cc8-49b4-aa31-fc371e4d753c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
