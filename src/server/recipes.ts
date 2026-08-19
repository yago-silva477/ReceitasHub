import "server-only";

import type { RecipeCardData } from "@/components/recipe-card";
import { prisma } from "@/lib/prisma";

export async function getRecipeWithDetails(slug: string) {
  return prisma.recipe.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true
        }
      },
      category: true,
      ingredients: {
        include: {
          ingredient: true
        },
        orderBy: {
          order: "asc"
        }
      },
      ratings: true
    }
  });
}

export async function listPublishedRecipes() {
  return prisma.recipe.findMany({
    where: {
      status: "PUBLISHED"
    },
    include: {
      author: {
        select: {
          id: true,
          name: true
        }
      },
      category: true,
      ingredients: {
        include: {
          ingredient: true
        },
        orderBy: {
          order: "asc"
        }
      },
      ratings: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function listPublishedRecipeCards(): Promise<RecipeCardData[]> {
  const recipes = await listPublishedRecipes();

  return recipes.map((recipe) => ({
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description,
    difficulty: recipe.difficulty,
    prepTimeMinutes: recipe.prepTimeMinutes,
    servings: `${recipe.servings} porcoes`,
    imageUrl: recipe.imageUrl,
    category: recipe.category.name,
    ingredients: recipe.ingredients.map((item) => item.ingredient.name),
    tags: [recipe.category.name]
  }));
}

export async function listUserRecipes(userId: string) {
  return prisma.recipe.findMany({
    where: {
      authorId: userId
    },
    include: {
      category: true,
      ingredients: {
        include: {
          ingredient: true
        },
        orderBy: {
          order: "asc"
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
}
