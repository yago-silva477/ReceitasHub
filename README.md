# ReceitasHub

ReceitasHub e uma plataforma de receitas gastronomicas planejada para busca por nome,
ingrediente, categoria, tempo e dificuldade, com favoritos, publicacao de receitas e interacao entre
usuarios.

## Fase atual

Fase 2 concluida em estrutura de projeto:

- Next.js configurado
- Tailwind CSS configurado
- Prisma configurado para PostgreSQL
- ESLint e Prettier configurados
- Estrutura de pastas criada
- Schema inicial do banco modelado

## Primeiros comandos

Instale o Node.js antes de rodar o projeto. Depois:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

Consulte [docs/phase-2-setup.md](docs/phase-2-setup.md) para detalhes.
