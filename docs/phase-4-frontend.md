# Documentacao da Fase 4 - Desenvolvimento do Front-end

## 1. Objetivo da fase

A Fase 4 teve como objetivo montar a interface responsiva do ReceitasHub com navegacao entre as
principais telas previstas no plano: Home, lista de receitas, pesquisa, categorias, receita
completa, perfil, favoritos, login, cadastro e pagina 404.

## 2. Entregaveis

- Interface responsiva
- Navegacao completa entre as paginas principais
- Catalogo visual de receitas
- Tela de pesquisa com filtro por texto e categoria
- Tela de receita completa
- Tela de categorias
- Area de favoritos preparada
- Perfil integrado ao layout geral
- Login e cadastro alinhados a identidade visual
- Pagina 404 personalizada

## 3. Paginas implementadas

| Rota | Arquivo | Descricao |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home com busca, categorias e destaques |
| `/receitas` | `src/app/receitas/page.tsx` | Listagem responsiva de receitas |
| `/pesquisa` | `src/app/pesquisa/page.tsx` | Busca por texto, ingrediente, tag e categoria |
| `/categorias` | `src/app/categorias/page.tsx` | Cards de categorias com total de receitas |
| `/receitas/[slug]` | `src/app/receitas/[slug]/page.tsx` | Pagina completa da receita |
| `/perfil` | `src/app/perfil/page.tsx` | Perfil privado do usuario |
| `/favoritos` | `src/app/favoritos/page.tsx` | Area privada com previa de receitas favoritas |
| `/login` | `src/app/login/page.tsx` | Login integrado ao layout visual |
| `/cadastro` | `src/app/cadastro/page.tsx` | Cadastro integrado ao layout visual |
| `404` | `src/app/not-found.tsx` | Pagina de erro personalizada |

## 4. Componentes criados

| Componente | Arquivo | Uso |
| --- | --- | --- |
| `AppHeader` | `src/components/app-header.tsx` | Cabecalho com navegacao principal |
| `AppFooter` | `src/components/app-footer.tsx` | Rodape da aplicacao |
| `PageShell` | `src/components/page-shell.tsx` | Estrutura padrao com header e footer |
| `RecipeCard` | `src/components/recipe-card.tsx` | Card reutilizavel de receita |
| `SearchPanel` | `src/components/search-panel.tsx` | Formulario de busca e filtro |

## 5. Dados mockados

Foi criado o arquivo `src/data/recipes.ts` para centralizar receitas de exemplo enquanto o CRUD e a
integracao real com banco ainda nao chegam.

As receitas incluem:

- Bolo de cenoura classico
- Macarrao ao molho de tomate
- Salada colorida de graos
- Pizza caseira
- Omelete de ervas
- Torta doce de frutas

Cada receita possui titulo, slug, descricao, categoria, dificuldade, tempo, rendimento, imagem,
autor, ingredientes, modo de preparo, tags e avaliacao.

## 6. Responsividade

As paginas usam classes responsivas do Tailwind:

- Grids adaptaveis para mobile, tablet e desktop
- Cards em uma coluna no celular
- Navegacao com quebra de linha em telas menores
- Imagens com proporcao fixa para evitar saltos de layout
- Formularios com campos empilhados no mobile

## 7. Navegacao

O menu principal foi atualizado em `src/config/site.ts` com:

- Receitas
- Pesquisa
- Categorias
- Favoritos
- Perfil
- Entrar

## 8. Observacao tecnica

A Fase 4 usa dados locais mockados para permitir a construcao visual antes do CRUD completo da Fase
5. Quando o sistema de receitas for implementado, as paginas podem trocar `src/data/recipes.ts` por
consultas reais ao Prisma.

## 9. Limitacao do ambiente

Nao foi possivel executar `npm install`, `npm run lint`, `npm run build` ou `npm run dev` porque
`node` e `npm` nao estao disponiveis no PATH da maquina.

Quando o ambiente Node estiver configurado, rode:

```bash
npm install
npm run lint
npm run dev
```

## 10. Proxima fase

A Fase 5 deve implementar o sistema de receitas:

- Criar receita
- Editar receita
- Excluir receita
- Upload de imagens
- Categorias reais
- Ingredientes
- Modo de preparo
- Tempo de preparo
- Dificuldade
- Rendimento
