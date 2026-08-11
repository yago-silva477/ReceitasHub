import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { SearchPanel } from "@/components/search-panel";
import { recipes } from "@/data/recipes";

type SearchPageProps = {
  searchParams: {
    q?: string;
    categoria?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim().toLowerCase() ?? "";
  const category = searchParams.categoria?.trim() ?? "";

  const results = recipes.filter((recipe) => {
    const matchesQuery =
      !query ||
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory = !category || recipe.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Pesquisa
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Buscar receitas</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Filtre por nome, ingrediente, tag ou categoria.
          </p>
        </div>

        <SearchPanel defaultQuery={searchParams.q ?? ""} />

        <div className="mt-8">
          <p className="mb-5 font-semibold text-charcoal/70">
            {results.length} resultado{results.length === 1 ? "" : "s"} encontrado
            {results.length === 1 ? "" : "s"}
          </p>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-charcoal/10 bg-white p-8 text-charcoal/70">
              Nenhuma receita encontrada. Tente buscar por bolo, tomate, massa ou salada.
            </div>
          )}
        </div>
      </main>
    </PageShell>
  );
}
