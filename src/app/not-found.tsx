import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="grid min-h-[70vh] place-items-center px-6 py-12">
        <section className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
            Pagina 404
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold">Receita nao encontrada</h1>
          <p className="mt-4 leading-7 text-charcoal/70">
            A pagina que voce tentou acessar nao existe ou saiu do cardapio.
          </p>
          <Link
            href="/receitas"
            className="mt-6 inline-flex min-h-12 items-center rounded-md bg-tomato-600 px-6 font-semibold text-white transition hover:bg-tomato-700"
          >
            Ver receitas
          </Link>
        </section>
      </main>
    </PageShell>
  );
}
