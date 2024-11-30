import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

interface APICocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | null;
}

interface Cocktail {
  id: string;
  name: string;
  type: string;
  ingredients: string[];
  measures: string[];
  instructions: string;
  image?: string;
}

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

async function getCocktailsByFirstLetter(letter: string): Promise<APICocktail[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?f=${letter}`);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error(`Error fetching cocktails for letter ${letter}:`, error);
    return [];
  }
}

function transformCocktailData(drink: APICocktail): Cocktail {
  const ingredients: string[] = [];
  const measures: string[] = [];

  // Extract ingredients and measures
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    
    if (ingredient) {
      ingredients.push(ingredient);
      measures.push(measure || '');
    }
  }

  return {
    id: drink.idDrink,
    name: drink.strDrink,
    type: drink.strCategory?.toLowerCase() || 'other',
    ingredients,
    measures,
    instructions: drink.strInstructions || '',
    image: drink.strDrinkThumb || undefined
  };
}

async function fetchAllCocktails() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const allCocktails: Cocktail[] = [];

  for (const letter of letters) {
    console.log(`Fetching cocktails for letter ${letter}...`);
    const cocktails = await getCocktailsByFirstLetter(letter);
    const transformed = cocktails.map(transformCocktailData);
    allCocktails.push(...transformed);
  }

  // Read existing custom cocktails
  const customCocktailsPath = path.join(__dirname, '../src/data/customCocktails.ts');
  const customCocktailsContent = await fs.promises.readFile(customCocktailsPath, 'utf-8');
  const customCocktailsMatch = customCocktailsContent.match(/export const customCocktails: Cocktail\[\] = ([\s\S]*?);/);
  let customCocktails: Cocktail[] = [];
  
  if (customCocktailsMatch) {
    try {
      // Parse the existing custom cocktails
      customCocktails = eval(`(${customCocktailsMatch[1]})`);
    } catch (error) {
      console.error('Error parsing existing custom cocktails:', error);
    }
  }

  // Combine API cocktails with custom cocktails
  const combinedCocktails = [...customCocktails, ...allCocktails];

  // Generate new file content
  const fileContent = `import { Cocktail } from '../types';

export const customCocktails: Cocktail[] = ${JSON.stringify(combinedCocktails, null, 2)};`;

  // Write to file
  await fs.promises.writeFile(customCocktailsPath, fileContent, 'utf-8');
  console.log(`Successfully saved ${combinedCocktails.length} cocktails to customCocktails.ts`);
}

fetchAllCocktails().catch(console.error);
