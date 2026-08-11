import Link from "next/link";
import { registerAction } from "@/app/auth/actions";
import { AuthMessage } from "@/components/auth-message";
import { AuthSubmit } from "@/components/auth-submit";
import { PageShell } from "@/components/page-shell";

type RegisterPageProps = {
  searchParams: {
    erro?: string;
  };
};

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  return (
    <PageShell>
      <main className="grid place-items-center px-6 py-12">
        <section className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Cadastro
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">Criar conta</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Cadastre-se para publicar receitas, favoritar pratos e comentar.
          </p>

          <div className="mt-5">
            <AuthMessage error={searchParams.erro} />
          </div>

          <form action={registerAction} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold">Nome</span>
              <input
                name="name"
                required
                className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
                placeholder="Seu nome"
              />
            </label>

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
                minLength={8}
                required
                className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
                placeholder="Minimo de 8 caracteres"
              />
            </label>

            <AuthSubmit>Criar conta</AuthSubmit>
          </form>

          <p className="mt-5 text-sm text-charcoal/70">
            Ja tem conta?{" "}
            <Link href="/login" className="font-semibold text-tomato-700">
              Entrar
            </Link>
          </p>
        </section>
      </main>
    </PageShell>
  );
}
