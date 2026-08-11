import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { getRecipeBySlug, recipes } from "@/data/recipes";

type RecipePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export function generateMetadata({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    return {};
  }

  return {
    title: recipe.title,
    description: recipe.description
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  const related = recipes
    .filter((item) => item.category === recipe.category && item.slug !== recipe.slug)
    .slice(0, 3);

  return (
    <PageShell>
      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={900}
            height={675}
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft"
            priority
          />

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
              {recipe.category}
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-tight">{recipe.title}</h1>
            <p className="mt-5 text-lg leading-8 text-charcoal/70">{recipe.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <Info label="Tempo" value={`${recipe.prepTimeMinutes} min`} />
              <Info label="Rendimento" value={recipe.servings} />
              <Info label="Dificuldade" value={recipe.difficulty} />
              <Info label="Nota" value={`${recipe.rating}/5`} />
            </div>
          </div>
        </section>

        <section className="border-y border-charcoal/10 bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-12 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="rounded-lg border border-charcoal/10 p-6">
              <h2 className="font-display text-3xl font-bold">Ingredientes</h2>
              <ul className="mt-5 space-y-3 text-charcoal/75">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>- {ingredient}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-charcoal/10 p-6">
              <h2 className="font-display text-3xl font-bold">Modo de preparo</h2>
              <ol className="mt-5 space-y-4 text-charcoal/75">
                {recipe.preparation.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-tomato-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
                Continue cozinhando
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Receitas relacionadas</h2>
            </div>
            <Link href="/receitas" className="font-semibold text-tomato-700 hover:underline">
              Voltar ao catalogo
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(related.length > 0 ? related : recipes.filter((item) => item.slug !== recipe.slug).slice(0, 3)).map(
              (item) => (
                <RecipeCard key={item.slug} recipe={item} />
              )
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-charcoal/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">{label}</p>
      <p className="mt-1 font-bold text-charcoal">{value}</p>
    </div>
  );
}
