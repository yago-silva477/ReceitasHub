import { AuthSubmit } from "@/components/auth-submit";

type Difficulty = "EASY" | "MEDIUM" | "HARD";
type RecipeStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

type RecipeFormData = {
  title: string;
  description: string;
  categoryName: string;
  prepTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  status: RecipeStatus;
  imageUrl?: string | null;
  videoUrl?: string | null;
  preparation: string;
  ingredientsText: string;
};

type RecipeFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  recipe?: RecipeFormData;
};

export function RecipeForm({ action, submitLabel, recipe }: RecipeFormProps) {
  return (
    <form action={action} className="grid gap-5">
      <label className="block">
        <span className="text-sm font-semibold">Titulo da receita</span>
        <input
          name="title"
          required
          defaultValue={recipe?.title}
          className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
          placeholder="Ex: Lasanha de domingo"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Descricao</span>
        <textarea
          name="description"
          required
          defaultValue={recipe?.description}
          rows={3}
          className="mt-2 w-full rounded-md border-charcoal/15"
          placeholder="Conte por que essa receita e especial."
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">Categoria</span>
          <input
            name="categoryName"
            required
            defaultValue={recipe?.categoryName}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
            placeholder="Ex: Massas"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Dificuldade</span>
          <select
            name="difficulty"
            required
            defaultValue={recipe?.difficulty ?? "EASY"}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
          >
            <option value="EASY">Facil</option>
            <option value="MEDIUM">Medio</option>
            <option value="HARD">Dificil</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold">Tempo em minutos</span>
          <input
            name="prepTimeMinutes"
            type="number"
            min={1}
            required
            defaultValue={recipe?.prepTimeMinutes}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
            placeholder="45"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Rendimento</span>
          <input
            name="servings"
            type="number"
            min={1}
            required
            defaultValue={recipe?.servings}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
            placeholder="4"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Status</span>
          <select
            name="status"
            defaultValue={recipe?.status ?? "PUBLISHED"}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
          >
            <option value="PUBLISHED">Publicada</option>
            <option value="DRAFT">Rascunho</option>
            <option value="PENDING">Pendente</option>
            <option value="REJECTED">Rejeitada</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">URL da imagem</span>
          <input
            name="imageUrl"
            type="url"
            defaultValue={recipe?.imageUrl ?? ""}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
            placeholder="https://..."
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Upload de imagem</span>
          <input
            name="imageFile"
            type="file"
            accept="image/*"
            className="mt-2 min-h-12 w-full rounded-md border border-charcoal/15 bg-white px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">URL do video</span>
          <input
            name="videoUrl"
            type="url"
            defaultValue={recipe?.videoUrl ?? ""}
            className="mt-2 min-h-12 w-full rounded-md border-charcoal/15"
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold">Ingredientes</span>
        <textarea
          name="ingredients"
          required
          defaultValue={recipe?.ingredientsText}
          rows={6}
          className="mt-2 w-full rounded-md border-charcoal/15"
          placeholder={"1 xicara | farinha de trigo | peneirada\n2 unidades | ovos"}
        />
        <span className="mt-2 block text-sm text-charcoal/55">
          Use uma linha por ingrediente no formato: quantidade | ingrediente | observacao opcional.
        </span>
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Modo de preparo</span>
        <textarea
          name="preparation"
          required
          defaultValue={recipe?.preparation}
          rows={8}
          className="mt-2 w-full rounded-md border-charcoal/15"
          placeholder="Escreva o passo a passo da receita."
        />
      </label>

      <AuthSubmit>{submitLabel}</AuthSubmit>
    </form>
  );
}
