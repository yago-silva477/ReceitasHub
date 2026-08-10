import Link from "next/link";
import { AuthMessage } from "@/components/auth-message";
import { AuthSubmit } from "@/components/auth-submit";
import { loginAction } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams: {
    erro?: string;
    sucesso?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 py-12 text-charcoal">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
          Acesso
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">Entrar no ReceitasHub</h1>
        <p className="mt-4 leading-7 text-charcoal/70">Acesse sua conta para salvar receitas.</p>

        <div className="mt-5">
          <AuthMessage error={searchParams.erro} success={searchParams.sucesso} />
        </div>

        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
              placeholder="voce@email.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Senha</span>
            <input
              name="password"
              type="password"
              required
              className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
              placeholder="Sua senha"
            />
          </label>

          <AuthSubmit>Entrar</AuthSubmit>
        </form>

        <a
          href="/api/auth/google"
          className="mt-3 flex min-h-12 items-center justify-center rounded-md border border-charcoal/15 bg-white px-5 font-semibold transition hover:bg-basil-50"
        >
          Entrar com Google
        </a>

        <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm font-semibold text-tomato-700">
          <Link href="/cadastro">Criar conta</Link>
          <Link href="/recuperar-senha">Esqueci minha senha</Link>
        </div>
      </div>
    </main>
  );
}
