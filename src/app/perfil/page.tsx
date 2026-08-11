import { redirect } from "next/navigation";
import { logoutAction } from "@/app/auth/actions";
import { PageShell } from "@/components/page-shell";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para acessar seu perfil.");
  }

  return (
    <PageShell>
      <main className="px-6 py-12">
        <section className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Area privada
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold">Perfil do usuario</h1>
              <p className="mt-3 text-charcoal/70">
                Bem-vindo, <strong>{user.name}</strong>. Sua conta esta autenticada.
              </p>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="min-h-11 rounded-md border border-charcoal/15 px-5 font-semibold transition hover:bg-tomato-50 hover:text-tomato-700"
              >
                Sair
              </button>
            </form>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-charcoal/10 p-4">
              <dt className="text-sm font-semibold text-charcoal/55">Nome</dt>
              <dd className="mt-1 text-lg font-semibold">{user.name}</dd>
            </div>
            <div className="rounded-lg border border-charcoal/10 p-4">
              <dt className="text-sm font-semibold text-charcoal/55">Email</dt>
              <dd className="mt-1 text-lg font-semibold">{user.email}</dd>
            </div>
            <div className="rounded-lg border border-charcoal/10 p-4">
              <dt className="text-sm font-semibold text-charcoal/55">Perfil</dt>
              <dd className="mt-1 text-lg font-semibold">{user.role}</dd>
            </div>
            <div className="rounded-lg border border-charcoal/10 p-4">
              <dt className="text-sm font-semibold text-charcoal/55">Criado em</dt>
              <dd className="mt-1 text-lg font-semibold">
                {new Intl.DateTimeFormat("pt-BR").format(user.createdAt)}
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </PageShell>
  );
}
