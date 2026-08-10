# Documentacao da Fase 3 - Sistema de Autenticacao

## 1. Objetivo da fase

A Fase 3 implementa a base de autenticacao do ReceitasHub, permitindo cadastro, login, logout,
recuperacao de senha, login com Google, perfil do usuario e protecao de rotas privadas.

## 2. Funcionalidades implementadas

- Cadastro de usuario com nome, email e senha
- Login com email e senha
- Logout
- Sessao persistida em cookie HTTP-only
- Hash de senha com `crypto.scrypt`
- Recuperacao de senha com token temporario
- Tela para definir nova senha
- Login com Google via OAuth 2.0
- Protecao `state` no fluxo Google OAuth
- Perfil privado do usuario
- Middleware para proteger rotas privadas

## 3. Arquivos principais

| Arquivo | Funcao |
| --- | --- |
| `src/lib/auth.ts` | Hash de senha, token de sessao, cookies e usuario atual |
| `src/app/auth/actions.ts` | Actions de cadastro, login, logout e recuperacao de senha |
| `middleware.ts` | Protecao das rotas privadas |
| `src/app/login/page.tsx` | Tela de login |
| `src/app/cadastro/page.tsx` | Tela de cadastro |
| `src/app/perfil/page.tsx` | Area privada do usuario |
| `src/app/recuperar-senha/page.tsx` | Solicitacao de recuperacao |
| `src/app/recuperar-senha/nova/page.tsx` | Cadastro de nova senha |
| `src/app/api/auth/google/route.ts` | Inicio do login com Google |
| `src/app/api/auth/google/callback/route.ts` | Callback OAuth do Google |

## 4. Rotas criadas ou atualizadas

| Rota | Tipo | Descricao |
| --- | --- | --- |
| `/login` | Publica | Login com email/senha e botao Google |
| `/cadastro` | Publica | Cadastro de novo usuario |
| `/recuperar-senha` | Publica | Solicita recuperacao de senha |
| `/recuperar-senha/enviado` | Publica | Confirma solicitacao |
| `/recuperar-senha/nova` | Publica | Define nova senha usando token |
| `/perfil` | Privada | Exibe dados do usuario autenticado |
| `/favoritos` | Privada | Area privada preparada para favoritos |
| `/api/auth/google` | API | Redireciona para autorizacao Google |
| `/api/auth/google/callback` | API | Processa retorno do Google |

## 5. Banco de dados

O schema Prisma foi atualizado com a entidade `PasswordResetToken`, usada para armazenar tokens de
recuperacao de senha de forma segura.

```prisma
model PasswordResetToken {
  id        String   @id @default(cuid())
  tokenHash String   @unique
  userId    String
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

O model `User` tambem passou a ter relacao com os tokens de recuperacao.

## 6. Variaveis de ambiente

O arquivo `.env.example` foi atualizado:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/receitashub?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_SECRET="troque-por-uma-chave-grande-e-segura"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

## 7. Fluxo de cadastro

1. Usuario acessa `/cadastro`.
2. Informa nome, email e senha.
3. O sistema valida os dados.
4. A senha e salva com hash.
5. A conta e criada no banco.
6. Um cookie de sessao e criado.
7. O usuario e redirecionado para `/perfil`.

## 8. Fluxo de login

1. Usuario acessa `/login`.
2. Informa email e senha.
3. O sistema compara a senha com o hash salvo.
4. Em caso de sucesso, cria uma sessao em cookie HTTP-only.
5. O usuario e redirecionado para `/perfil`.

## 9. Fluxo de logout

1. Usuario clica em `Sair` no perfil.
2. O cookie de sessao e apagado.
3. O usuario volta para `/login`.

## 10. Recuperacao de senha

1. Usuario informa o email em `/recuperar-senha`.
2. Se o email existir, o sistema cria um token temporario.
3. O hash do token e salvo no banco.
4. No ambiente atual, o token e exibido no console do servidor.
5. O usuario informa o token e a nova senha em `/recuperar-senha/nova`.
6. O sistema valida o token e atualiza a senha.

Para producao, a proxima melhoria e integrar envio de email.

## 11. Login com Google

O fluxo OAuth foi preparado sem biblioteca externa:

1. `/api/auth/google` redireciona para a tela de autorizacao do Google.
2. O Google retorna para `/api/auth/google/callback`.
3. O sistema valida o `state` para reduzir risco de CSRF.
4. O sistema troca o `code` por um `access_token`.
5. O perfil Google e lido.
6. O email Google precisa estar verificado.
7. O usuario e criado ou atualizado.
8. A conta OAuth e vinculada ao usuario.
9. A sessao e criada e o usuario vai para `/perfil`.

Para funcionar, e necessario configurar `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` e
`GOOGLE_REDIRECT_URI`.

## 12. Middleware de autenticacao

O arquivo `middleware.ts` protege:

- `/perfil`
- `/favoritos`

Caso o usuario nao tenha cookie de sessao, ele e redirecionado para `/login`.

## 13. Limitacao do ambiente

Como `node` e `npm` nao estavam disponiveis no PATH da maquina, nao foi possivel instalar
dependencias, gerar o Prisma Client, rodar migrations, executar lint ou iniciar o servidor local.

Assim que o Node.js estiver configurado, execute:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name auth
npm run lint
npm run dev
```

## 14. Entregaveis da fase

- Usuarios autenticaveis por email e senha
- Criacao de sessao em cookie
- Logout funcional
- Recuperacao de senha estruturada
- Login com Google preparado
- Perfil privado
- Middleware de area privada
- Documentacao da Fase 3
