# Documentacao da Fase 5 - Sistema de Receitas

## 1. Objetivo da fase

A Fase 5 implementa a base funcional do sistema de receitas do ReceitasHub. Nesta etapa, o usuario
autenticado passa a poder criar, editar, excluir e visualizar receitas com ingredientes, modo de
preparo, tempo, rendimento, categoria, dificuldade, imagem e video.

## 2. Funcionalidades implementadas

- Criar receita
- Editar receita
- Excluir receita
- Visualizar receita completa
- Listar receitas publicadas vindas do banco
- Listar receitas do usuario no perfil
- Criar categorias automaticamente
- Criar ingredientes automaticamente
- Relacionar ingredientes com quantidade e observacao
- Definir tempo de preparo
- Definir dificuldade
- Definir rendimento
- Informar URL de imagem
- Informar URL de video
- Definir status da receita
- Upload local de imagem para `public/uploads`

## 3. Rotas criadas ou atualizadas

| Rota | Descricao |
| --- | --- |
| `/receitas` | Lista receitas publicadas e oferece botao para criar receita |
| `/receitas/nova` | Formulario para criar receita |
| `/receitas/[slug]` | Pagina completa da receita, lendo banco ou mock |
| `/receitas/[slug]/editar` | Formulario para editar receita existente |
| `/perfil` | Lista as receitas criadas pelo usuario com acoes de ver, editar e excluir |

## 4. Arquivos principais

| Arquivo | Funcao |
| --- | --- |
| `src/app/receitas/actions.ts` | Server Actions de criar, editar e excluir receitas |
| `src/components/recipe-form.tsx` | Formulario reutilizavel de receita |
| `src/server/recipes.ts` | Consultas server-side de receitas |
| `src/lib/slug.ts` | Geracao de slugs para receitas e categorias |
| `src/app/receitas/nova/page.tsx` | Tela de criacao |
| `src/app/receitas/[slug]/editar/page.tsx` | Tela de edicao |
| `src/app/receitas/[slug]/page.tsx` | Tela de receita completa |
| `src/app/perfil/page.tsx` | Gerenciamento das receitas do usuario |
| `middleware.ts` | Protecao das rotas de criar e editar receitas |

## 5. Campos do formulario

O formulario de receita contem:

- Titulo
- Descricao
- Categoria
- Dificuldade
- Tempo em minutos
- Rendimento
- Status
- URL da imagem
- URL do video
- Ingredientes
- Modo de preparo

## 6. Formato dos ingredientes

Os ingredientes sao informados em linhas separadas:

```text
1 xicara | farinha de trigo | peneirada
2 unidades | ovos
1 colher | fermento em po
```

Cada linha e convertida em:

- Quantidade
- Nome do ingrediente
- Observacao opcional
- Ordem de exibicao

## 7. Regras de acesso

As rotas `/receitas/nova` e `/receitas/[slug]/editar` exigem usuario autenticado.

Na edicao e exclusao, o sistema verifica se:

- O usuario e o autor da receita; ou
- O usuario tem perfil `ADMIN`

Caso contrario, ele e redirecionado para o perfil.

## 8. Banco de dados

A Fase 5 utiliza os models ja definidos no Prisma:

- `Recipe`
- `Category`
- `Ingredient`
- `RecipeIngredient`
- `User`

As categorias sao criadas com `connectOrCreate`, evitando duplicidade por slug. Os ingredientes sao
criados ou reaproveitados por nome.

## 9. Upload de imagens

Nesta fase, a imagem pode ser cadastrada de duas formas:

- URL externa
- Upload de arquivo local

Quando um arquivo e enviado, ele e salvo em `public/uploads` e a receita recebe a URL publica
`/uploads/nome-do-arquivo`.

Para producao, a evolucao recomendada e integrar Cloudinary, S3 ou outro storage para upload real
de arquivos.

## 10. Integracao com a Fase 4

A listagem e a pagina de busca tentam ler receitas publicadas do banco. Se o banco ainda nao estiver
disponivel, continuam usando as receitas mockadas criadas na Fase 4 para manter a interface
visualizavel.

## 11. Limitacao do ambiente

Nao foi possivel executar `npm install`, migrations, lint, build ou servidor local porque `node` e
`npm` nao estao disponiveis no PATH da maquina.

Quando o ambiente estiver pronto, rode:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name recipes-crud
npm run lint
npm run dev
```

## 12. Entregaveis da fase

- CRUD completo de receitas em estrutura Next.js
- Formularios de criacao e edicao
- Exclusao pelo perfil
- Categorias e ingredientes vinculados ao banco
- Visualizacao completa da receita
- Protecao de rotas privadas
- Documentacao da Fase 5
