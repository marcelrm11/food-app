interface Ingredient {
  id: number;
  image: string;
  localizedName: string;
  name: string;
}
interface Step {
  equipment: [];
  ingredients: Ingredient[];
  number: number;
  step: string;
}
interface Instruction {
  name: string;
  steps: Step[];
}
interface Recipe {
  id: number;
  image: string;
  imageType: string;
  title: string;
}

interface RecipeInfo {
  aggregateLikes: number;
  analyzedInstructions: Instruction[];
}

export type { Recipe, RecipeInfo };
