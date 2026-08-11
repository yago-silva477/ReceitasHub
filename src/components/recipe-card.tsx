import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/data/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-sm">
      <Link href={`/receitas/${recipe.slug}`} className="block">
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          width={720}
          height={520}
          className="aspect-[4/3] w-full object-cover"
        />
      </Link>
      <div className="p-5">
        <p className="text-sm font-semibold text-basil-700">
          {recipe.prepTimeMinutes} min | {recipe.difficulty} | {recipe.servings}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold">{recipe.title}</h3>
        <p className="mt-3 leading-7 text-charcoal/70">{recipe.description}</p>
        <Link
          href={`/receitas/${recipe.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-tomato-700 hover:underline"
        >
          Ver receita
        </Link>
      </div>
    </article>
  );
}
