import Link from "next/link";
import { requestPasswordResetAction } from "@/app/auth/actions";
import { AuthSubmit } from "@/components/auth-submit";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 py-12 text-charcoal">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
          Recuperacao
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">Recuperar senha</h1>
        <p className="mt-4 leading-7 text-charcoal/70">
          Informe seu email. Em desenvolvimento, o token e registrado no console do servidor.
        </p>

        <form action={requestPasswordResetAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
              placeholder="voce@email.com"
            />
          </label>

          <AuthSubmit>Enviar instrucao</AuthSubmit>
        </form>

        <Link href="/login" className="mt-5 inline-block text-sm font-semibold text-tomato-700">
          Voltar para login
        </Link>
      </div>
    </main>
  );
}
