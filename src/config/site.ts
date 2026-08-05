export const siteConfig = {
  name: "ReceitasHub",
  description:
    "Receitas organizadas, faceis de seguir e pensadas para quem cozinha no dia a dia.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  nav: [
    { label: "Receitas", href: "/receitas" },
    { label: "Categorias", href: "/categorias" },
    { label: "Favoritos", href: "/favoritos" },
    { label: "Entrar", href: "/login" }
  ]
};
