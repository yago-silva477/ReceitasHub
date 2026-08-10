# Documentacao da Fase 2 - Configuracao do Projeto

## 1. Objetivo da fase

A Fase 2 teve como objetivo transformar o planejamento feito na Fase 1 em uma base tecnica pronta
para desenvolvimento. Nesta etapa, o ReceitasHub deixou de ser apenas documentacao e passou a ter
uma estrutura inicial de aplicacao web, configurada com as principais ferramentas definidas no
plano de implementacao.

## 2. Escopo realizado

Foram configurados os principais fundamentos do projeto:

- Projeto base com Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL como banco planejado
- ESLint
- Prettier
- Estrutura inicial de pastas
- Rotas iniciais da aplicacao
- Schema inicial do banco de dados
- Arquivo de exemplo para variaveis de ambiente
- Documentacao de setup

## 3. Tecnologias configuradas

| Tecnologia | Finalidade |
| --- | --- |
| Next.js | Framework principal da aplicacao web |
| React | Construcao da interface |
| TypeScript | Tipagem estatica e maior seguranca no codigo |
| Tailwind CSS | Estilizacao da interface |
| Prisma | ORM para comunicacao com o banco de dados |
| PostgreSQL | Banco de dados relacional definido para o projeto |
| ESLint | Analise de qualidade do codigo |
| Prettier | Formatacao padronizada dos arquivos |

## 4. Arquivos de configuracao criados

| Arquivo | Descricao |
| --- | --- |
| `package.json` | Define dependencias, scripts e metadados do projeto |
| `next.config.mjs` | Configuracao do Next.js |
| `tsconfig.json` | Configuracao do TypeScript |
| `tailwind.config.ts` | Configuracao da identidade visual no Tailwind |
| `postcss.config.mjs` | Configuracao necessaria para o Tailwind |
| `.eslintrc.json` | Configuracao do ESLint para Next.js |
| `.prettierrc` | Regras de formatacao do Prettier |
| `.gitignore` | Arquivos e pastas ignorados pelo Git |
| `.env.example` | Modelo das variaveis de ambiente |
| `next-env.d.ts` | Tipos auxiliares do Next.js |

## 5. Estrutura de pastas

```text
ReceitasHub/
  docs/
    implementation-plan.md
    PRD.md
    phase-2-setup.md

  prisma/
    schema.prisma

  public/

  src/
    app/
      page.tsx
      layout.tsx
      globals.css
      receitas/
      categorias/
      favoritos/
      login/

    components/
    config/
      site.ts
    features/
    lib/
      prisma.ts
    server/
    types/
```

## 6. Rotas iniciais criadas

| Rota | Arquivo | Objetivo |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Pagina inicial com busca, categorias e receitas em destaque |
| `/receitas` | `src/app/receitas/page.tsx` | Base para listagem de receitas |
| `/categorias` | `src/app/categorias/page.tsx` | Base para navegacao por categorias |
| `/favoritos` | `src/app/favoritos/page.tsx` | Base para receitas favoritas |
| `/login` | `src/app/login/page.tsx` | Base para autenticacao da Fase 3 |

## 7. Identidade visual aplicada

A interface inicial usa uma identidade visual alinhada ao tema gastronomico do ReceitasHub:

- Cores quentes para destaque, como tons de tomate
- Verde como apoio visual para categorias e elementos secundarios
- Fundo claro em tom creme
- Tipografia com foco em legibilidade
- Layout responsivo preparado para desktop e mobile

Essa identidade foi aplicada principalmente na Home e configurada no `tailwind.config.ts`.

## 8. Banco de dados

O arquivo `prisma/schema.prisma` foi criado com a modelagem inicial do banco. As entidades
principais sao:

- `User`: usuarios da plataforma
- `OAuthAccount`: contas externas, como login com Google
- `Category`: categorias de receitas
- `Recipe`: receitas publicadas pelos usuarios
- `Ingredient`: ingredientes cadastrados
- `RecipeIngredient`: relacao entre receitas e ingredientes
- `Favorite`: receitas favoritas dos usuarios
- `Comment`: comentarios e respostas
- `Rating`: avaliacoes das receitas

Tambem foram definidos enums para:

- Papel do usuario: `USER` e `ADMIN`
- Status da receita: `DRAFT`, `PENDING`, `PUBLISHED` e `REJECTED`
- Dificuldade: `EASY`, `MEDIUM` e `HARD`

## 9. Scripts disponiveis

Os scripts foram adicionados ao `package.json`:

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera o Prisma Client e cria a versao de producao da aplicacao.

```bash
npm run start
```

Inicia a aplicacao em modo producao apos o build.

```bash
npm run lint
```

Executa a verificacao de qualidade com ESLint.

```bash
npm run format
```

Formata os arquivos com Prettier.

```bash
npm run prisma:generate
```

Gera o Prisma Client.

```bash
npm run prisma:migrate
```

Cria e aplica migrations no banco de dados.

```bash
npm run prisma:studio
```

Abre o Prisma Studio para visualizar e editar dados.

## 10. Variaveis de ambiente

Foi criado o arquivo `.env.example` com as variaveis esperadas:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/receitashub?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Para rodar o projeto, deve ser criado um arquivo `.env` baseado nesse exemplo.

## 11. Como executar o projeto

Depois de instalar o Node.js, execute:

```bash
npm install
```

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Ajuste a conexao do PostgreSQL no `DATABASE_URL`.

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Crie a primeira migration:

```bash
npm run prisma:migrate -- --name init
```

Inicie o projeto:

```bash
npm run dev
```

## 12. Validacao realizada

Durante a Fase 2, foi possivel validar:

- Arquivos JSON de configuracao
- Estrutura de pastas criada
- Presenca dos arquivos principais
- Scripts definidos no `package.json`
- Schema Prisma criado

## 13. Limitacao encontrada

Nao foi possivel instalar dependencias, rodar migrations, executar lint ou iniciar o servidor local
porque os comandos `node` e `npm` nao foram encontrados no PATH da maquina.

Assim que o Node.js estiver instalado corretamente, sera possivel concluir a validacao pratica da
Fase 2 com os comandos listados acima.

## 14. Entregaveis da fase

- Projeto base estruturado
- Configuracoes de Next.js, Tailwind, Prisma, ESLint e Prettier
- Banco modelado com Prisma
- Estrutura inicial de rotas
- Home inicial alinhada ao produto
- Documentacao de configuracao
- Arquivo `.env.example`

## 15. Proxima fase

A proxima etapa e a Fase 3, focada no sistema de autenticacao:

- Cadastro
- Login
- Logout
- Recuperacao de senha
- Login com Google
- Perfil do usuario
- Middleware de autenticacao
