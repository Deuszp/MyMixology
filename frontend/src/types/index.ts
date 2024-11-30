export interface Cocktail {
  id: string;
  name: string;
  type: string;
  ingredients: string[];
  measures?: string[];
  instructions: string;
  image?: string;
}

export interface IngredientCategory {
  name: string;
  color: string;
  ingredients: string[];
}

export interface CocktailTranslations {
  [id: string]: {
    instructions: string;
  };
}

export interface RootState {
  cocktails: {
    allCocktails: Cocktail[];
    filteredCocktails: Cocktail[];
    selectedIngredients: string[];
    searchQuery: string;
    loading: boolean;
    error: string | null;
  };
}
