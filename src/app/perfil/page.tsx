import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";
import { deleteRecipeAction } from "@/app/receitas/actions";
import { AuthMessage } from "@/components/auth-message";
import { PageShell } from "@/components/page-shell";
import { getCurrentUser } from "@/lib/auth";
import { listUserRecipes } from "@/server/recipes";

type ProfilePageProps = {
  searchParams: {
    sucesso?: string;
  };
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para acessar seu perfil.");
  }

  const userRecipes = await listUserRecipes(user.id);

  return (
    <PageShell>
      <main className="px-6 py-12">
        <section className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-soft">
          <AuthMessage success={searchParams.sucesso} />
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

        <section className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
                Minhas receitas
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Receitas publicadas</h2>
            </div>
            <Link
              href="/receitas/nova"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-tomato-600 px-5 font-semibold text-white transition hover:bg-tomato-700"
            >
              Nova receita
            </Link>
          </div>

          {userRecipes.length > 0 ? (
            <div className="mt-6 divide-y divide-charcoal/10">
              {userRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-basil-700">
                      {recipe.category.name} | {recipe.status}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold">{recipe.title}</h3>
                    <p className="mt-1 text-sm text-charcoal/60">
                      {recipe.prepTimeMinutes} min | {recipe.servings} porcoes | {recipe.difficulty}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/receitas/${recipe.slug}`}
                      className="inline-flex min-h-10 items-center rounded-md border border-charcoal/15 px-4 text-sm font-semibold hover:bg-basil-50"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/receitas/${recipe.slug}/editar`}
                      className="inline-flex min-h-10 items-center rounded-md border border-charcoal/15 px-4 text-sm font-semibold hover:bg-basil-50"
                    >
                      Editar
                    </Link>
                    <form action={deleteRecipeAction}>
                      <input type="hidden" name="recipeId" value={recipe.id} />
                      <button
                        type="submit"
                        className="min-h-10 rounded-md bg-tomato-600 px-4 text-sm font-semibold text-white hover:bg-tomato-700"
                      >
                        Excluir
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-charcoal/10 bg-cream p-5 text-charcoal/70">
              Voce ainda nao publicou receitas. Crie a primeira para testar o fluxo completo da
              Fase 5.
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}
