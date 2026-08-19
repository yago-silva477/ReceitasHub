"use server";

import crypto from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

type ParsedIngredient = {
  name: string;
  quantity: string;
  notes?: string;
  order: number;
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(formData: FormData, key: string) {
  const value = Number(readString(formData, key));
  return Number.isFinite(value) ? value : 0;
}

async function saveUploadedImage(formData: FormData) {
  const file = formData.get("imageFile");

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    return null;
  }

  const extension = path.extname(file.name).toLowerCase() || ".jpg";
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const uploadPath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadsDir, { recursive: true });
  await writeFile(uploadPath, buffer);

  return `/uploads/${filename}`;
}

function redirectWithError(path: string, message: string) {
  redirect(`${path}?erro=${encodeURIComponent(message)}`);
}

function parseIngredients(value: string): ParsedIngredient[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());
      const [quantity, name, notes] =
        parts.length === 1 ? ["A gosto", parts[0], undefined] : parts;

      return {
        quantity: quantity || "A gosto",
        name: name || quantity,
        notes: notes || undefined,
        order: index + 1
      };
    })
    .filter((ingredient) => ingredient.name.length > 0);
}

async function ensureUniqueSlug(title: string, ignoredRecipeId?: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const existingRecipe = await prisma.recipe.findUnique({ where: { slug } });

    if (!existingRecipe || existingRecipe.id === ignoredRecipeId) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

async function syncIngredients(recipeId: string, ingredients: ParsedIngredient[]) {
  await prisma.recipeIngredient.deleteMany({
    where: { recipeId }
  });

  for (const ingredient of ingredients) {
    const ingredientRecord = await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: { name: ingredient.name }
    });

    await prisma.recipeIngredient.create({
      data: {
        recipeId,
        ingredientId: ingredientRecord.id,
        quantity: ingredient.quantity,
        notes: ingredient.notes,
        order: ingredient.order
      }
    });
  }
}

function validateRecipeForm(formData: FormData, errorPath: string) {
  const title = readString(formData, "title");
  const description = readString(formData, "description");
  const categoryName = readString(formData, "categoryName");
  const preparation = readString(formData, "preparation");
  const prepTimeMinutes = readNumber(formData, "prepTimeMinutes");
  const servings = readNumber(formData, "servings");
  const difficulty = readString(formData, "difficulty");
  const status = readString(formData, "status");
  const imageUrl = readString(formData, "imageUrl");
  const videoUrl = readString(formData, "videoUrl");
  const ingredients = parseIngredients(readString(formData, "ingredients"));

  if (title.length < 3) {
    redirectWithError(errorPath, "Informe um titulo com pelo menos 3 caracteres.");
  }

  if (description.length < 10) {
    redirectWithError(errorPath, "Informe uma descricao mais completa.");
  }

  if (!categoryName) {
    redirectWithError(errorPath, "Informe uma categoria.");
  }

  if (prepTimeMinutes < 1) {
    redirectWithError(errorPath, "Informe o tempo de preparo.");
  }

  if (servings < 1) {
    redirectWithError(errorPath, "Informe o rendimento.");
  }

  if (!["EASY", "MEDIUM", "HARD"].includes(difficulty)) {
    redirectWithError(errorPath, "Informe uma dificuldade valida.");
  }

  if (!["DRAFT", "PENDING", "PUBLISHED", "REJECTED"].includes(status)) {
    redirectWithError(errorPath, "Informe um status valido.");
  }

  if (ingredients.length === 0) {
    redirectWithError(errorPath, "Informe pelo menos um ingrediente.");
  }

  if (preparation.length < 20) {
    redirectWithError(errorPath, "Informe um modo de preparo mais completo.");
  }

  return {
    title,
    description,
    categoryName,
    preparation,
    prepTimeMinutes,
    servings,
    difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
    status: status as "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED",
    imageUrl: imageUrl || null,
    videoUrl: videoUrl || null,
    ingredients
  };
}

export async function createRecipeAction(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para criar receitas.");
  }

  const data = validateRecipeForm(formData, "/receitas/nova");
  const uploadedImageUrl = await saveUploadedImage(formData);
  const categorySlug = slugify(data.categoryName);
  const slug = await ensureUniqueSlug(data.title);

  const recipe = await prisma.recipe.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      preparation: data.preparation,
      prepTimeMinutes: data.prepTimeMinutes,
      servings: data.servings,
      difficulty: data.difficulty,
      imageUrl: uploadedImageUrl ?? data.imageUrl,
      videoUrl: data.videoUrl,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      authorId: user.id,
      category: {
        connectOrCreate: {
          where: { slug: categorySlug },
          create: {
            name: data.categoryName,
            slug: categorySlug
          }
        }
      }
    }
  });

  await syncIngredients(recipe.id, data.ingredients);

  revalidatePath("/");
  revalidatePath("/receitas");
  revalidatePath("/perfil");
  redirect(`/receitas/${recipe.slug}`);
}

export async function updateRecipeAction(recipeId: string, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para editar receitas.");
  }

  const existingRecipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    select: { id: true, authorId: true, slug: true }
  });

  if (!existingRecipe || (existingRecipe.authorId !== user.id && user.role !== "ADMIN")) {
    redirect("/perfil");
  }

  const data = validateRecipeForm(formData, `/receitas/${existingRecipe.slug}/editar`);
  const uploadedImageUrl = await saveUploadedImage(formData);
  const categorySlug = slugify(data.categoryName);
  const slug = await ensureUniqueSlug(data.title, existingRecipe.id);

  const recipe = await prisma.recipe.update({
    where: { id: existingRecipe.id },
    data: {
      title: data.title,
      slug,
      description: data.description,
      preparation: data.preparation,
      prepTimeMinutes: data.prepTimeMinutes,
      servings: data.servings,
      difficulty: data.difficulty,
      imageUrl: uploadedImageUrl ?? data.imageUrl,
      videoUrl: data.videoUrl,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      category: {
        connectOrCreate: {
          where: { slug: categorySlug },
          create: {
            name: data.categoryName,
            slug: categorySlug
          }
        }
      }
    }
  });

  await syncIngredients(recipe.id, data.ingredients);

  revalidatePath("/");
  revalidatePath("/receitas");
  revalidatePath(`/receitas/${existingRecipe.slug}`);
  revalidatePath(`/receitas/${recipe.slug}`);
  revalidatePath("/perfil");
  redirect(`/receitas/${recipe.slug}`);
}

export async function deleteRecipeAction(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?erro=Entre para excluir receitas.");
  }

  const recipeId = readString(formData, "recipeId");
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    select: { id: true, authorId: true, slug: true }
  });

  if (!recipe || (recipe.authorId !== user.id && user.role !== "ADMIN")) {
    redirect("/perfil");
  }

  await prisma.recipe.delete({
    where: { id: recipe.id }
  });

  revalidatePath("/");
  revalidatePath("/receitas");
  revalidatePath("/perfil");
  redirect(`/perfil?sucesso=${encodeURIComponent("Receita excluida.")}`);
}
