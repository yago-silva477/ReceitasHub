import { redirect } from "next/navigation";
import { createRecipeAction } from "@/app/receitas/actions";
import { AuthMessage } from "@/components/auth-message";
import { PageShell } from "@/components/page-shell";
import { RecipeForm } from "@/components/recipe-form";
import { getCurrentUser } from "@/lib/auth";

type NewRecipePageProps = {
  searchParams: {
    erro?: string;
  };
};

export default async function NewRecipePage({ searchParams }: NewRecipePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para criar receitas.");
  }

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Publicacao
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Criar receita</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Preencha os dados principais para publicar uma receita no ReceitasHub.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-soft">
          <AuthMessage error={searchParams.erro} />
          <div className="mt-5">
            <RecipeForm action={createRecipeAction} submitLabel="Publicar receita" />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
