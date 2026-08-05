# PRD - Sistema de Receitas Gastronômicas

## 1. Visão Geral

### Nome do Projeto
Receitas Gastronômicas

### Objetivo
Desenvolver uma plataforma moderna onde usuários possam encontrar, pesquisar, salvar e compartilhar receitas culinárias de forma rápida e intuitiva.

---

# 2. Problema

Muitas pessoas possuem dificuldade em encontrar receitas organizadas, confiáveis e fáceis de seguir.

O sistema busca reunir milhares de receitas em uma plataforma simples, rápida e responsiva.

---

# 3. Público-Alvo

- Iniciantes na cozinha
- Cozinheiros amadores
- Chefs
- Pessoas que desejam aprender novas receitas
- Famílias
- Estudantes

---

# 4. Objetivos do Produto

- Facilitar a busca por receitas.
- Organizar receitas por categorias.
- Permitir favoritos.
- Compartilhamento de receitas.
- Interface moderna.
- Funcionar em celular e computador.

---

# 5. Funcionalidades

## 5.1 Página Inicial

- Banner principal
- Receitas em destaque
- Categorias
- Campo de pesquisa
- Últimas receitas adicionadas

---

## 5.2 Pesquisa

Pesquisar por:

- Nome
- Ingrediente
- Categoria
- Tempo de preparo
- Dificuldade

Filtros:

- Doce
- Salgado
- Vegano
- Vegetariano
- Fitness
- Sem glúten
- Sem lactose

---

## 5.3 Categorias

- Café da manhã
- Almoço
- Jantar
- Sobremesas
- Massas
- Carnes
- Saladas
- Lanches
- Bebidas
- Bolos
- Tortas
- Doces

---

## 5.4 Página da Receita

Cada receita possui:

- Foto
- Nome
- Autor
- Tempo de preparo
- Rendimento
- Dificuldade
- Ingredientes
- Modo de preparo
- Informações nutricionais (opcional)
- Vídeo (opcional)
- Avaliações
- Comentários

---

## 5.5 Favoritos

Usuário pode:

- Salvar receitas
- Remover favoritas
- Visualizar lista

---

## 5.6 Cadastro

Cadastro com:

- Nome
- Email
- Senha

Login:

- Email
- Google

---

## 5.7 Perfil

- Foto
- Nome
- Bio
- Receitas publicadas
- Favoritos

---

## 5.8 Publicação de Receitas

Usuário poderá publicar:

- Nome
- Foto
- Ingredientes
- Passo a passo
- Tempo
- Categoria
- Dificuldade

---

## 5.9 Comentários

- Adicionar comentário
- Curtir comentário
- Responder comentário

---

## 5.10 Avaliações

Sistema de:

★★★★★

Nota média da receita.

---

## 5.11 Compartilhamento

Compartilhar para:

- WhatsApp
- Facebook
- Instagram
- Copiar Link

---

## 5.12 Modo Escuro

Alternância entre:

- Claro
- Escuro

---

## 5.13 Responsividade

Compatível com:

- Celular
- Tablet
- Notebook
- Desktop

---

# 6. Painel Administrativo

Administrador poderá:

- Gerenciar usuários
- Aprovar receitas
- Excluir receitas
- Editar categorias
- Gerenciar comentários
- Visualizar estatísticas

---

# 7. Requisitos Funcionais

RF01 - Cadastro de usuários.

RF02 - Login.

RF03 - Logout.

RF04 - Recuperação de senha.

RF05 - Pesquisar receitas.

RF06 - Filtrar receitas.

RF07 - Favoritar receitas.

RF08 - Publicar receitas.

RF09 - Editar receitas.

RF10 - Excluir receitas.

RF11 - Comentar.

RF12 - Avaliar.

RF13 - Compartilhar.

RF14 - Painel administrativo.

RF15 - Aprovação de receitas.

RF16 - Sistema de notificações.

---

# 8. Requisitos Não Funcionais

- Interface responsiva
- Tempo de resposta inferior a 2 segundos
- HTTPS obrigatório
- Banco de dados seguro
- Compatível com Chrome, Edge, Firefox e Safari
- LGPD
- SEO otimizado
- Acessibilidade (WCAG)

---

# 9. Banco de Dados

## Usuários

- id
- nome
- email
- senha
- foto
- bio

## Receitas

- id
- título
- descrição
- ingredientes
- modo_preparo
- tempo
- rendimento
- categoria
- dificuldade
- imagem
- autor

## Comentários

- id
- usuário
- receita
- comentário
- data

## Avaliações

- id
- usuário
- receita
- nota

## Favoritos

- usuário
- receita

---

# 10. Tecnologias Sugeridas

Frontend:

- HTML5
- CSS3
- JavaScript
- React
- Next.js
- Tailwind CSS

Backend:

- Node.js
- Express

Banco de Dados:

- PostgreSQL
- Prisma ORM

Autenticação:

- JWT
- OAuth Google

Armazenamento:

- Cloudinary

Deploy:

- Vercel (Frontend)
- Render ou Railway (Backend)

---

# 11. Fluxo do Usuário

1. Acessa o site.
2. Pesquisa uma receita.
3. Visualiza os detalhes.
4. Faz login.
5. Salva nos favoritos.
6. Comenta e avalia.
7. Compartilha a receita.
8. Publica sua própria receita.

---

# 12. Diferenciais

- Pesquisa inteligente por ingredientes.
- Receitas em vídeo.
- Informações nutricionais.
- Lista de compras automática.
- Favoritos sincronizados.
- Sistema de avaliações.
- Interface moderna.
- Modo escuro.
- Compartilhamento rápido.
- SEO otimizado.

---

# 13. Métricas de Sucesso

- Número de usuários cadastrados
- Receitas publicadas
- Avaliações realizadas
- Receitas favoritas
- Tempo médio de permanência
- Taxa de retorno dos usuários

---

# 14. Roadmap

### MVP
- Cadastro e login
- Pesquisa
- Categorias
- Visualização de receitas
- Favoritos
- Publicação de receitas

### Versão 2.0
- Vídeos
- Lista de compras
- Notificações
- Receitas personalizadas por IA
- Planejamento semanal de refeições
- Integração com assistentes de voz