import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { SearchPanel } from "@/components/search-panel";
import { recipes } from "@/data/recipes";

export default function RecipesPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Receitas
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Catalogo de receitas</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Uma primeira listagem responsiva para navegar pelas receitas do MVP.
          </p>
        </div>

        <SearchPanel />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
