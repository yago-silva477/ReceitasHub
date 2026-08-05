# Fase 2 - Configuracao do Projeto

## Status

Base do projeto configurada para evoluir o ReceitasHub como aplicacao Next.js com Tailwind CSS,
Prisma, PostgreSQL, ESLint e Prettier.

## Stack definida

- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- ESLint
- Prettier

## Estrutura de pastas

```text
ReceitasHub/
  docs/                 Documentacao do produto e planejamento
  prisma/               Schema e futuras migrations do banco
  public/               Assets publicos
  src/
    app/                Rotas e layouts do Next.js
    components/         Componentes reutilizaveis de interface
    config/             Configuracoes da aplicacao
    features/           Modulos por dominio
    lib/                Clientes e utilitarios compartilhados
    server/             Codigo server-side compartilhado
    types/              Tipos TypeScript globais
```

## Banco de dados

O schema Prisma modela os principais requisitos do PRD:

- Usuarios e contas OAuth
- Categorias
- Receitas
- Ingredientes
- Ingredientes por receita
- Favoritos
- Comentarios e respostas
- Avaliacoes

## Como rodar quando o Node.js estiver instalado

1. Instalar dependencias:

```bash
npm install
```

2. Criar o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

3. Ajustar `DATABASE_URL` para o PostgreSQL local.

4. Gerar o Prisma Client:

```bash
npm run prisma:generate
```

5. Criar a primeira migration:

```bash
npm run prisma:migrate -- --name init
```

6. Rodar o ambiente de desenvolvimento:

```bash
npm run dev
```

## Observacao do ambiente atual

Nesta maquina, `node` e `npm` nao foram encontrados no PATH durante a configuracao. Por isso, a
instalacao de dependencias, migrations e validacao por build/lint devem ser executadas depois que o
Node.js estiver disponivel.
