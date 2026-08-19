export const siteConfig = {
  name: "ReceitasHub",
  description:
    "Receitas organizadas, faceis de seguir e pensadas para quem cozinha no dia a dia.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  nav: [
    { label: "Receitas", href: "/receitas" },
    { label: "Pesquisa", href: "/pesquisa" },
    { label: "Categorias", href: "/categorias" },
    { label: "Criar receita", href: "/receitas/nova" },
    { label: "Favoritos", href: "/favoritos" },
    { label: "Perfil", href: "/perfil" },
    { label: "Entrar", href: "/login" }
  ]
};
