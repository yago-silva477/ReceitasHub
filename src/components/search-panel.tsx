import { categories } from "@/data/recipes";

export function SearchPanel({ defaultQuery = "" }: { defaultQuery?: string }) {
  return (
    <form action="/pesquisa" className="grid gap-3 rounded-lg bg-white p-4 shadow-soft md:grid-cols-[1fr_180px_150px]">
      <label className="sr-only" htmlFor="q">
        Buscar receita
      </label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultQuery}
        placeholder="Busque por nome, ingrediente ou tag"
        className="min-h-12 rounded-md border-charcoal/15 px-4"
      />
      <select name="categoria" className="min-h-12 rounded-md border-charcoal/15 px-4">
        <option value="">Todas categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="min-h-12 rounded-md bg-tomato-600 px-5 font-semibold text-white transition hover:bg-tomato-700"
      >
        Pesquisar
      </button>
    </form>
  );
}
