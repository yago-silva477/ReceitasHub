export default function RecipesPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-charcoal">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
          Receitas
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">Catalogo de receitas</h1>
        <p className="mt-4 leading-7 text-charcoal/70">
          Esta rota esta preparada para receber a listagem, pesquisa, filtros e paginacao das
          proximas fases.
        </p>
      </div>
    </main>
  );
}
