import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>ReceitasHub - receitas simples para cozinhar melhor.</p>
        <Link href="/receitas" className="font-semibold text-tomato-100 hover:text-white">
          Explorar receitas
        </Link>
      </div>
    </footer>
  );
}
