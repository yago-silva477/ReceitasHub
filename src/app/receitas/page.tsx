import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { SearchPanel } from "@/components/search-panel";
import { recipes } from "@/data/recipes";
import { listPublishedRecipeCards } from "@/server/recipes";

export default async function RecipesPage() {
  const dbRecipes = await listPublishedRecipeCards().catch(() => []);
  const recipeCards = dbRecipes.length > 0 ? dbRecipes : recipes;

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
              Receitas
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold">Catalogo de receitas</h1>
            <p className="mt-4 leading-7 text-charcoal/70">
              Uma listagem responsiva para navegar, abrir detalhes e criar novas receitas.
            </p>
          </div>
          <Link
            href="/receitas/nova"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-tomato-600 px-6 font-semibold text-white transition hover:bg-tomato-700"
          >
            Criar receita
          </Link>
        </div>

        <SearchPanel />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipeCards.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
