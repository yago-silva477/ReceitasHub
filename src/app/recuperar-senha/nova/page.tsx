import { resetPasswordAction } from "@/app/auth/actions";
import { AuthMessage } from "@/components/auth-message";
import { AuthSubmit } from "@/components/auth-submit";

type NewPasswordPageProps = {
  searchParams: {
    erro?: string;
  };
};

export default function NewPasswordPage({ searchParams }: NewPasswordPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 py-12 text-charcoal">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-basil-700">
          Nova senha
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">Definir nova senha</h1>

        <div className="mt-5">
          <AuthMessage error={searchParams.erro} />
        </div>

        <form action={resetPasswordAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold">Token</span>
            <input
              name="token"
              required
              className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
              placeholder="Cole o token de recuperacao"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Nova senha</span>
            <input
              name="password"
              type="password"
              minLength={8}
              required
              className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
              placeholder="Minimo de 8 caracteres"
            />
          </label>

          <AuthSubmit>Atualizar senha</AuthSubmit>
        </form>
      </div>
    </main>
  );
}
