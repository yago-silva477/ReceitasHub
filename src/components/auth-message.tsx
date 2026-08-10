type AuthMessageProps = {
  error?: string;
  success?: string;
};

export function AuthMessage({ error, success }: AuthMessageProps) {
  if (!error && !success) {
    return null;
  }

  return (
    <p
      className={`rounded-md px-4 py-3 text-sm font-medium ${
        error ? "bg-tomato-50 text-tomato-700" : "bg-basil-50 text-basil-700"
      }`}
    >
      {error ?? success}
    </p>
  );
}
