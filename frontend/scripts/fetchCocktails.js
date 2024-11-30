const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => { resolve(JSON.parse(data)); });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function getCocktailsByFirstLetter(letter) {
    try {
        const data = await httpsGet(`${API_BASE_URL}/search.php?f=${letter}`);
        return data.drinks || [];
    } catch (error) {
        console.error(`Error fetching cocktails for letter ${letter}:`, error);
        return [];
    }
}

function transformCocktailData(drink) {
    const ingredients = [];
    const measures = [];

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
        type: (drink.strCategory || 'other').toLowerCase(),
        ingredients,
        measures,
        instructions: drink.strInstructions || '',
        image: drink.strDrinkThumb || undefined
    };
}

async function fetchAllCocktails() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const allCocktails = [];

    for (const letter of letters) {
        console.log(`Fetching cocktails for letter ${letter}...`);
        const cocktails = await getCocktailsByFirstLetter(letter);
        const transformed = cocktails.map(transformCocktailData);
        allCocktails.push(...transformed);
    }

    // Read existing custom cocktails
    const customCocktailsPath = path.join(__dirname, '../src/data/customCocktails.ts');
    const customCocktailsContent = fs.readFileSync(customCocktailsPath, 'utf-8');
    const customCocktailsMatch = customCocktailsContent.match(/export const customCocktails: Cocktail\[\] = ([\s\S]*?);/);
    let customCocktails = [];
    
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
    fs.writeFileSync(customCocktailsPath, fileContent, 'utf-8');
    console.log(`Successfully saved ${combinedCocktails.length} cocktails to customCocktails.ts`);
}

fetchAllCocktails().catch(console.error);
