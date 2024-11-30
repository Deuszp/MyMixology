import i18n from '../i18n';
import { convertToMetric } from './measurementConverter';

export const translateIngredient = (ingredient: string): string => {
  const translationKey = `ingredients.names.${ingredient.toLowerCase().replace(/ /g, '_')}`;
  const translation = i18n.t(translationKey);
  
  // Якщо переклад не знайдено (повертається ключ), повертаємо оригінальну назву
  return translation === translationKey ? ingredient : translation;
};

export const replaceIngredientsInInstructions = (instructions: string, ingredients: string[]): string => {
  if (!instructions) return '';
  
  // Якщо інструкції вже українською (містять кирилицю), повертаємо їх без змін
  if (/[а-яА-ЯіІїЇєЄ]/.test(instructions)) {
    return instructions;
  }
  
  let translatedInstructions = instructions;
  
  // Конвертуємо всі міри в метричну систему
  // Шукаємо всі числа з одиницями виміру (наприклад, "1 oz", "1.5 cl", "2 1/2 cups")
  const measurementRegex = /(\d+(?:\s+\d+\/\d+)?|\d+\/\d+)\s*(oz|ml|cl|cup|cups|tsp|tbsp|dash|dashes|splash|splashes|part|parts|piece|pieces|leaf|leaves|sprig|sprigs|slice|slices|wedge|wedges)\b/gi;
  translatedInstructions = translatedInstructions.replace(measurementRegex, (match) => {
    return convertToMetric(match);
  });
  
  // Сортуємо інгредієнти за довжиною (довші спочатку),
  // щоб уникнути часткової заміни (наприклад, "Lime" в "Lime juice")
  const sortedIngredients = [...ingredients].sort((a, b) => b.length - a.length);
  
  for (const ingredient of sortedIngredients) {
    const translation = translateIngredient(ingredient);
    
    // Створюємо регулярний вираз, який шукає інгредієнт з урахуванням регістру
    const regex = new RegExp(ingredient, 'gi');
    translatedInstructions = translatedInstructions.replace(regex, translation);
  }
  
  return translatedInstructions;
};
