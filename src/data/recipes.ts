export type Recipe = {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Facil" | "Medio" | "Dificil";
  prepTimeMinutes: number;
  servings: string;
  imageUrl: string;
  author: string;
  ingredients: string[];
  preparation: string[];
  tags: string[];
  rating: number;
};

export const recipes: Recipe[] = [
  {
    slug: "bolo-de-cenoura-classico",
    title: "Bolo de cenoura classico",
    description: "Massa fofinha com cobertura cremosa de chocolate para o cafe da tarde.",
    category: "Sobremesas",
    difficulty: "Facil",
    prepTimeMinutes: 55,
    servings: "10 fatias",
    imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=80",
    author: "ReceitasHub",
    ingredients: [
      "3 cenouras medias picadas",
      "3 ovos",
      "1 xicara de oleo",
      "2 xicaras de acucar",
      "2 e 1/2 xicaras de farinha de trigo",
      "1 colher de sopa de fermento em po"
    ],
    preparation: [
      "Bata cenoura, ovos e oleo no liquidificador.",
      "Misture com acucar e farinha em uma tigela.",
      "Adicione o fermento e mexa delicadamente.",
      "Asse em forma untada a 180 graus por cerca de 40 minutos."
    ],
    tags: ["Doce", "Bolo", "Cafe da tarde"],
    rating: 4.8
  },
  {
    slug: "macarrao-ao-molho-de-tomate",
    title: "Macarrao ao molho de tomate",
    description: "Prato rapido com molho encorpado, ervas frescas e muito sabor.",
    category: "Massas",
    difficulty: "Facil",
    prepTimeMinutes: 30,
    servings: "4 porcoes",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    author: "Ana Lima",
    ingredients: ["400 g de macarrao", "5 tomates maduros", "2 dentes de alho", "Azeite", "Manjericao", "Sal"],
    preparation: [
      "Cozinhe o macarrao ate ficar al dente.",
      "Refogue alho no azeite e acrescente os tomates picados.",
      "Cozinhe ate formar um molho espesso.",
      "Misture a massa ao molho e finalize com manjericao."
    ],
    tags: ["Salgado", "Rapido", "Jantar"],
    rating: 4.6
  },
  {
    slug: "salada-colorida-de-graos",
    title: "Salada colorida de graos",
    description: "Leve, crocante e ideal para uma refeicao pratica e nutritiva.",
    category: "Saladas",
    difficulty: "Facil",
    prepTimeMinutes: 20,
    servings: "2 porcoes",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    author: "Marcos Silva",
    ingredients: ["Grao-de-bico", "Tomate cereja", "Pepino", "Cenoura", "Azeite", "Limao"],
    preparation: [
      "Misture os graos cozidos com os vegetais picados.",
      "Tempere com azeite, limao e sal.",
      "Leve para gelar por 10 minutos antes de servir."
    ],
    tags: ["Fitness", "Vegetariano", "Almoco"],
    rating: 4.7
  },
  {
    slug: "pizza-caseira",
    title: "Pizza caseira",
    description: "Massa dourada com recheio personalizavel para compartilhar.",
    category: "Lanches",
    difficulty: "Medio",
    prepTimeMinutes: 90,
    servings: "8 fatias",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    author: "Clara Souza",
    ingredients: ["Farinha de trigo", "Fermento biologico", "Agua morna", "Molho de tomate", "Queijo", "Oregano"],
    preparation: [
      "Misture os ingredientes da massa e sove por 10 minutos.",
      "Deixe crescer ate dobrar de volume.",
      "Abra a massa, cubra com molho e recheio.",
      "Asse em forno alto ate dourar."
    ],
    tags: ["Salgado", "Fim de semana", "Forno"],
    rating: 4.9
  },
  {
    slug: "omelete-de-ervas",
    title: "Omelete de ervas",
    description: "Cafe da manha proteico, simples e pronto em poucos minutos.",
    category: "Cafe da manha",
    difficulty: "Facil",
    prepTimeMinutes: 12,
    servings: "1 porcao",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    author: "ReceitasHub",
    ingredients: ["2 ovos", "Salsinha", "Cebolinha", "Sal", "Pimenta", "Manteiga"],
    preparation: [
      "Bata os ovos com sal, pimenta e ervas.",
      "Aqueca uma frigideira com manteiga.",
      "Cozinhe em fogo baixo ate firmar."
    ],
    tags: ["Rapido", "Proteico", "Cafe da manha"],
    rating: 4.5
  },
  {
    slug: "torta-doce-de-frutas",
    title: "Torta doce de frutas",
    description: "Sobremesa cremosa com frutas frescas e visual de confeitaria.",
    category: "Sobremesas",
    difficulty: "Medio",
    prepTimeMinutes: 70,
    servings: "8 fatias",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
    author: "Julia Costa",
    ingredients: ["Massa de torta", "Creme de confeiteiro", "Morango", "Kiwi", "Uva", "Geleia"],
    preparation: [
      "Asse a massa ate dourar.",
      "Recheie com creme frio.",
      "Distribua as frutas por cima.",
      "Finalize com uma camada fina de geleia."
    ],
    tags: ["Doce", "Frutas", "Sobremesa"],
    rating: 4.8
  }
];

export const categories = Array.from(new Set(recipes.map((recipe) => recipe.category)));

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
