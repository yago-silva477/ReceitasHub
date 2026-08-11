import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { SearchPanel } from "@/components/search-panel";
import { categories, recipes } from "@/data/recipes";

export default function Home() {
  const featured = recipes.slice(0, 3);
  const heroRecipe = recipes[0];

  return (
    <PageShell>
      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
                Receitas organizadas para cozinhar melhor
              </p>
              <h1 className="font-display text-5xl font-bold leading-tight text-charcoal sm:text-6xl">
                Encontre, salve e compartilhe receitas sem complicar a cozinha.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-charcoal/70">
                Pesquise por nome, ingrediente, categoria, tempo ou dificuldade. O ReceitasHub
                organiza ideias para o dia a dia, almocos especiais e sobremesas de familia.
              </p>
            </div>

            <SearchPanel />

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categorias?categoria=${encodeURIComponent(category)}`}
                  className="rounded-full border border-basil-600/25 bg-white px-4 py-2 text-sm font-medium text-basil-700 transition hover:border-basil-600 hover:bg-basil-50"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <article className="overflow-hidden rounded-lg bg-white shadow-soft">
            <Image
              src={heroRecipe.imageUrl}
              alt={heroRecipe.title}
              width={900}
              height={675}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-tomato-700">
                Receita em destaque
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold">{heroRecipe.title}</h2>
              <p className="mt-3 text-charcoal/70">{heroRecipe.description}</p>
              <Link
                href={`/receitas/${heroRecipe.slug}`}
                className="mt-5 inline-block font-semibold text-tomato-700 hover:underline"
              >
                Abrir receita completa
              </Link>
            </div>
          </article>
        </section>

        <section className="border-t border-charcoal/10 bg-white">
          <div className="mx-auto w-full max-w-7xl px-6 py-12">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
                  Base do MVP
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold">Receitas em destaque</h2>
              </div>
              <Link href="/receitas" className="text-sm font-semibold text-tomato-700 hover:underline">
                Ver todas
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {featured.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
