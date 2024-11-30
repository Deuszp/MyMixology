const fs = require('fs');
const path = require('path');

// Читаємо файли
const cocktailsPath = path.join(__dirname, '../src/data/customCocktails.ts');
const translations = require('./translations');

let cocktailsContent = fs.readFileSync(cocktailsPath, 'utf-8');

// Знаходимо масив коктейлів
const cocktailsMatch = cocktailsContent.match(/export const customCocktails: Cocktail\[\] = (\[[\s\S]*?\]);/);
if (!cocktailsMatch) {
    console.error('Could not find cocktails array');
    process.exit(1);
}

// Парсимо масив коктейлів
let cocktails = JSON.parse(cocktailsMatch[1]);

// Оновлюємо інструкції
cocktails = cocktails.map(cocktail => {
    const translation = translations[cocktail.instructions];
    if (translation) {
        return {
            ...cocktail,
            instructions: translation
        };
    }
    return cocktail;
});

// Форматуємо оновлений масив коктейлів
const updatedContent = `import { Cocktail } from '../types';

export const customCocktails: Cocktail[] = ${JSON.stringify(cocktails, null, 2)};`;

// Записуємо назад у файл
fs.writeFileSync(cocktailsPath, updatedContent, 'utf-8');
console.log('Translations have been applied successfully!');
