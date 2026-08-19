import { redirect } from "next/navigation";
import { updateRecipeAction } from "@/app/receitas/actions";
import { AuthMessage } from "@/components/auth-message";
import { PageShell } from "@/components/page-shell";
import { RecipeForm } from "@/components/recipe-form";
import { getCurrentUser } from "@/lib/auth";
import { getRecipeWithDetails } from "@/server/recipes";

type EditRecipePageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    erro?: string;
  };
};

export default async function EditRecipePage({ params, searchParams }: EditRecipePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para editar receitas.");
  }

  const recipe = await getRecipeWithDetails(params.slug);

  if (!recipe || (recipe.authorId !== user.id && user.role !== "ADMIN")) {
    redirect("/perfil");
  }

  const updateRecipe = updateRecipeAction.bind(null, recipe.id);

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Edicao
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Editar receita</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            Atualize ingredientes, preparo, imagem, rendimento e dificuldade.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-soft">
          <AuthMessage error={searchParams.erro} />
          <div className="mt-5">
            <RecipeForm
              action={updateRecipe}
              submitLabel="Salvar alteracoes"
              recipe={{
                title: recipe.title,
                description: recipe.description,
                categoryName: recipe.category.name,
                prepTimeMinutes: recipe.prepTimeMinutes,
                servings: recipe.servings,
                difficulty: recipe.difficulty,
                status: recipe.status,
                imageUrl: recipe.imageUrl,
                videoUrl: recipe.videoUrl,
                preparation: recipe.preparation,
                ingredientsText: recipe.ingredients
                  .map((item) =>
                    [item.quantity, item.ingredient.name, item.notes].filter(Boolean).join(" | ")
                  )
                  .join("\n")
              }}
            />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
