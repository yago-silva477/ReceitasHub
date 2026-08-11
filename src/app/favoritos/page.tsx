import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/data/recipes";
import { getCurrentUser } from "@/lib/auth";

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  const favoritePreview = recipes.slice(0, 3);

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Favoritos
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Receitas salvas</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Area privada de {user?.name}. Enquanto o sistema de favoritos real nao chega na Fase 7,
            esta tela mostra uma previa visual do fluxo.
          </p>
          <Link href="/perfil" className="mt-5 inline-block font-semibold text-tomato-700 hover:underline">
            Ver perfil
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favoritePreview.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
