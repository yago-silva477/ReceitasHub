import Link from "next/link";
import { siteConfig } from "@/config/site";

const categories = ["Cafe da manha", "Almoco", "Jantar", "Sobremesas", "Massas", "Fitness"];

const featuredRecipes = [
  {
    title: "Risoto de tomate assado",
    meta: "35 min · Medio · 4 porcoes",
    description: "Cremoso, colorido e com camadas de sabor para um jantar especial."
  },
  {
    title: "Bolo de cenoura classico",
    meta: "55 min · Facil · 10 fatias",
    description: "Massa macia, cobertura brilhante e preparo simples para o cafe da tarde."
  },
  {
    title: "Salada crocante de graos",
    meta: "20 min · Facil · 2 porcoes",
    description: "Uma opcao leve com textura, frescor e ingredientes faceis de adaptar."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3" aria-label="ReceitasHub">
          <span className="grid size-11 place-items-center rounded-full bg-tomato-600 text-lg font-bold text-white">
            RH
          </span>
          <span className="font-display text-2xl font-bold">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal/75 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-tomato-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-12 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
              Receitas organizadas para cozinhar melhor
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-charcoal sm:text-6xl">
              Encontre, salve e compartilhe receitas sem complicar a cozinha.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-charcoal/70">
              O ReceitasHub nasce como uma plataforma responsiva para buscar receitas por nome,
              ingrediente, categoria, tempo e dificuldade, com favoritos e publicacao de receitas no
              MVP.
            </p>
          </div>

          <form className="flex max-w-2xl flex-col gap-3 rounded-lg bg-white p-2 shadow-soft sm:flex-row">
            <label className="sr-only" htmlFor="search">
              Buscar receita
            </label>
            <input
              id="search"
              type="search"
              placeholder="Busque por receita ou ingrediente"
              className="min-h-12 flex-1 rounded-md border-0 px-4 text-base outline-none ring-1 ring-charcoal/10 placeholder:text-charcoal/45 focus:ring-2 focus:ring-tomato-500"
            />
            <button
              type="submit"
              className="min-h-12 rounded-md bg-tomato-600 px-6 font-semibold text-white transition hover:bg-tomato-700"
            >
              Buscar
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href="/categorias"
                className="rounded-full border border-basil-600/25 bg-white px-4 py-2 text-sm font-medium text-basil-700 transition hover:border-basil-600 hover:bg-basil-50"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-soft">
          <div className="aspect-[4/3] rounded-md bg-[linear-gradient(135deg,#ef5b3d_0%,#fff3ed_48%,#2f7d4f_100%)] p-6">
            <div className="flex h-full flex-col justify-end rounded-md bg-white/80 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-tomato-700">
                Receita em destaque
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold">Massa fresca ao pesto</h2>
              <p className="mt-3 max-w-sm text-charcoal/70">
                Uma vitrine inicial para validar layout, identidade visual e fluxo de descoberta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="mb-7 flex items-end justify-between gap-4">
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
            {featuredRecipes.map((recipe) => (
              <article key={recipe.title} className="rounded-lg border border-charcoal/10 p-5">
                <p className="text-sm font-medium text-basil-700">{recipe.meta}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{recipe.title}</h3>
                <p className="mt-3 leading-7 text-charcoal/70">{recipe.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
