import { Cocktail } from '../types';
import { customCocktails } from '../data/customCocktails';

export const getAllCocktails = async (): Promise<Cocktail[]> => {
  return customCocktails;
};

export const getAllIngredients = (): string[] => {
  // Отримуємо всі унікальні інгредієнти з коктейлів
  const ingredients = new Set<string>();
  customCocktails.forEach(cocktail => {
    cocktail.ingredients.forEach(ingredient => {
      ingredients.add(ingredient);
    });
  });
  
  // Сортуємо за алфавітом
  return Array.from(ingredients).sort();
};

export const getRandomCocktails = async (count: number = 6): Promise<Cocktail[]> => {
  const shuffled = [...customCocktails].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const searchCocktailsByIngredient = (ingredients: string[]): Promise<Cocktail[]> => {
  const results = customCocktails.filter(cocktail =>
    ingredients.every(ingredient =>
      cocktail.ingredients.some(cocktailIngredient =>
        cocktailIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
  );
  return Promise.resolve(results);
};

export const searchCocktails = (query: string, ingredients: string[] = [], i18n: any): Cocktail[] => {
  let results = customCocktails;

  // Фільтруємо за вибраними інгредієнтами
  if (ingredients.length > 0) {
    results = results.filter(cocktail =>
      ingredients.every(selectedIngredient => {
        // Отримуємо англійську назву інгредієнта
        const englishIngredient = selectedIngredient.toLowerCase().replace(/ /g, '_');
        
        return cocktail.ingredients.some(cocktailIngredient => {
          // Порівнюємо з інгредієнтами коктейлю
          const normalizedCocktailIngredient = cocktailIngredient.toLowerCase().replace(/ /g, '_');
          return normalizedCocktailIngredient.includes(englishIngredient);
        });
      })
    );
  }

  // Фільтруємо за пошуковим запитом
  if (query) {
    const normalizedQuery = query.toLowerCase();
    results = results.filter(cocktail => {
      // Пошук за назвою коктейлю
      const matchName = cocktail.name.toLowerCase().includes(normalizedQuery);

      // Пошук за інгредієнтами
      const matchIngredients = cocktail.ingredients.some(ingredient => {
        const translatedIngredient = i18n.t(`ingredients.names.${ingredient.toLowerCase().replace(/ /g, '_')}`);
        return translatedIngredient.toLowerCase().includes(normalizedQuery);
      });

      // Пошук за типом коктейлю
      const translatedType = i18n.t(`cocktails.types.${cocktail.type}`);
      const matchType = translatedType.toLowerCase().includes(normalizedQuery);

      return matchName || matchIngredients || matchType;
    });
  }

  return results;
};
