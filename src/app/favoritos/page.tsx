import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-charcoal">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
          Favoritos
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">Receitas salvas</h1>
        <p className="mt-4 leading-7 text-charcoal/70">
          Esta e uma area privada. Em breve, suas receitas favoritas aparecerao aqui.
        </p>
        {user ? <p className="mt-4 font-semibold">Usuario: {user.name}</p> : null}
        <Link href="/perfil" className="mt-6 inline-block font-semibold text-tomato-700">
          Ver perfil
        </Link>
      </div>
    </main>
  );
}
