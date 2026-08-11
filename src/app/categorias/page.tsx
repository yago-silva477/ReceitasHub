import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { categories, recipes } from "@/data/recipes";

export default function CategoriesPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Categorias
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Organizacao por tipo de receita</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Encontre ideias por momento do dia, prato principal, lanche ou sobremesa.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const total = recipes.filter((recipe) => recipe.category === category).length;

            return (
              <Link
                key={category}
                href={`/pesquisa?categoria=${encodeURIComponent(category)}`}
                className="rounded-lg border border-charcoal/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-tomato-700">
                  {total} receita{total > 1 ? "s" : ""}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold">{category}</h2>
                <p className="mt-3 text-charcoal/70">Ver receitas desta categoria.</p>
              </Link>
            );
          })}
        </div>
      </main>
    </PageShell>
  );
}
