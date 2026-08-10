import Link from "next/link";

export default function PasswordResetSentPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 py-12 text-charcoal">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
          Email enviado
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">Confira sua solicitacao</h1>
        <p className="mt-4 leading-7 text-charcoal/70">
          Se o email existir, um token de recuperacao foi gerado. No ambiente atual, ele aparece no
          console do servidor para teste.
        </p>
        <Link href="/recuperar-senha/nova" className="mt-6 inline-block font-semibold text-tomato-700">
          Informar token
        </Link>
      </div>
    </main>
  );
}
