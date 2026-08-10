type AuthSubmitProps = {
  children: React.ReactNode;
};

export function AuthSubmit({ children }: AuthSubmitProps) {
  return (
    <button
      type="submit"
      className="min-h-12 w-full rounded-md bg-tomato-600 px-5 font-semibold text-white transition hover:bg-tomato-700"
    >
      {children}
    </button>
  );
}
