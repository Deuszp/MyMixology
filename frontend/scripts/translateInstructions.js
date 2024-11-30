const fs = require('fs');
const path = require('path');
const translations = require('./translations');

// Читаємо файл з коктейлями
const cocktailsPath = path.join(__dirname, '../src/data/customCocktails.ts');
let content = fs.readFileSync(cocktailsPath, 'utf-8');

// Знаходимо масив коктейлів
const cocktailsMatch = content.match(/export const customCocktails: Cocktail\[\] = (\[[\s\S]*?\]);/);
if (!cocktailsMatch) {
    console.error('Could not find cocktails array in the file');
    process.exit(1);
}

// Парсимо масив коктейлів
let cocktails = JSON.parse(cocktailsMatch[1]);

// Перекладаємо інструкції
cocktails = cocktails.map(cocktail => {
    if (translations[cocktail.instructions]) {
        return {
            ...cocktail,
            instructions: translations[cocktail.instructions]
        };
    }
    return cocktail;
});

// Форматуємо оновлений масив коктейлів
const updatedContent = `import { Cocktail } from '../types';

export const customCocktails: Cocktail[] = ${JSON.stringify(cocktails, null, 2)};`;

// Записуємо назад у файл
fs.writeFileSync(cocktailsPath, updatedContent, 'utf-8');
console.log('Instructions have been translated!');
