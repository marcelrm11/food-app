interface Measure {
  amount: number;
  unitLong: string;
  unitShort: string;
}
interface Measures {
  metric: Measure;
  us: Measure;
}
interface Ingredient {
  id: number;
  image: string;
  localizedName: string;
  name: string;
}
interface ExtendedIngredient {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: Measures;
  meta: string[];
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  unit: string;
}
interface Wine {
  averageRating: number;
  description: string;
  id: number;
  imageUrl: string;
  link: string;
  price: string;
  ratingCount: number;
  score: number;
  title: string;
}
interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: Wine[];
}
interface Step {
  equipment: string[];
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
interface ExtendedRecipe {
  aggregateLikes: number;
  analyzedInstructions: Instruction[];
  cheap: boolean;
  cookingMinutes: number;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  instructions: string;
  lowFodmap: boolean;
  occasions: string[];
  originalId: number | null;
  preparationMinutes: number;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  sustainable: boolean;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
  winePairing: WinePairing;
}

export type { Recipe, ExtendedRecipe };
