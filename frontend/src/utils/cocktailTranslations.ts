interface CocktailTranslations {
  [key: string]: {
    en: string;
    uk: string;
  };
}

export const cocktailInstructionsTranslations: CocktailTranslations = {
  // Common cocktail instructions translations
  "Pour all ingredients into a cocktail shaker, shake well with ice, strain into a chilled cocktail glass, and serve.": {
    en: "Pour all ingredients into a cocktail shaker, shake well with ice, strain into a chilled cocktail glass, and serve.",
    uk: "Налийте всі інгредієнти в шейкер, добре струсіть з льодом, процідіть у охолоджений коктейльний келих і подавайте."
  },
  "Build all ingredients in a highball glass filled with ice. Garnish with lime wedge.": {
    en: "Build all ingredients in a highball glass filled with ice. Garnish with lime wedge.",
    uk: "Налийте всі інгредієнти у високий келих, наповнений льодом. Прикрасьте скибочкою лайма."
  },
  "Shake with ice, strain into a cocktail glass, and serve.": {
    en: "Shake with ice, strain into a cocktail glass, and serve.",
    uk: "Струсіть з льодом, процідіть у коктейльний келих і подавайте."
  },
  "Mix all ingredients with ice and strain into a cocktail glass.": {
    en: "Mix all ingredients with ice and strain into a cocktail glass.",
    uk: "Змішайте всі інгредієнти з льодом і процідіть у коктейльний келих."
  },
  "Stir ingredients with ice, strain into a cocktail glass, and serve.": {
    en: "Stir ingredients with ice, strain into a cocktail glass, and serve.",
    uk: "Перемішайте інгредієнти з льодом, процідіть у коктейльний келих і подавайте."
  },
  "Combine all ingredients in a blender and blend until smooth.": {
    en: "Combine all ingredients in a blender and blend until smooth.",
    uk: "З'єднайте всі інгредієнти в блендері і збивайте до однорідності."
  },
  "Add all ingredients directly in the glass filled with ice.": {
    en: "Add all ingredients directly in the glass filled with ice.",
    uk: "Додайте всі інгредієнти безпосередньо в келих, наповнений льодом."
  },
  "Muddle mint leaves with sugar and lime juice. Add rum and fill with soda water. Garnish with mint sprig.": {
    en: "Muddle mint leaves with sugar and lime juice. Add rum and fill with soda water. Garnish with mint sprig.",
    uk: "Розімніть листя м'яти з цукром та соком лайма. Додайте ром і долийте содовою. Прикрасьте гілочкою м'яти."
  },
  "Layer ingredients in a shot glass.": {
    en: "Layer ingredients in a shot glass.",
    uk: "Налийте інгредієнти шарами в стопку."
  },
  "Shake all ingredients with ice, strain into a cocktail glass, and serve.": {
    en: "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
    uk: "Струсіть всі інгредієнти з льодом, процідіть у коктейльний келих і подавайте."
  },
  "Rim the glass with salt, add all ingredients with ice, and shake well.": {
    en: "Rim the glass with salt, add all ingredients with ice, and shake well.",
    uk: "Зробіть соляну облямівку на келиху, додайте всі інгредієнти з льодом і добре струсіть."
  },
  "Build in a rocks glass with ice, garnish with orange slice and cherry.": {
    en: "Build in a rocks glass with ice, garnish with orange slice and cherry.",
    uk: "Приготуйте в склянці для віскі з льодом, прикрасьте скибочкою апельсина та вишнею."
  },
  "Mix in shaker with ice and strain into glass. Top with soda if desired.": {
    en: "Mix in shaker with ice and strain into glass. Top with soda if desired.",
    uk: "Змішайте в шейкері з льодом і процідіть у келих. За бажанням додайте содову."
  },
  "Pour ingredients over ice in a highball glass. Garnish with lemon slice.": {
    en: "Pour ingredients over ice in a highball glass. Garnish with lemon slice.",
    uk: "Налийте інгредієнти на лід у високий келих. Прикрасьте скибочкою лимона."
  },
  "Stir with ice and strain into chilled glass.": {
    en: "Stir with ice and strain into chilled glass.",
    uk: "Перемішайте з льодом і процідіть в охолоджений келих."
  }
};

export const translateCocktailInstructions = (instructions: string, language: string): string => {
  if (language === 'en') return instructions;
  
  // Split into sentences
  const sentences = instructions.split(/(?<=[.!?])\s+/);
  
  // Translate each sentence
  const translatedSentences = sentences.map(sentence => {
    // First try exact match
    const exactMatch = cocktailInstructionsTranslations[sentence];
    if (exactMatch) {
      return exactMatch[language as keyof typeof exactMatch];
    }

    // If no exact match, translate common phrases
    let translatedSentence = sentence;
    const commonPhrases = {
      "shake with ice": { en: "shake with ice", uk: "струсіть з льодом" },
      "strain into": { en: "strain into", uk: "процідіть у" },
      "garnish with": { en: "garnish with", uk: "прикрасьте" },
      "fill with": { en: "fill with", uk: "наповніть" },
      "top with": { en: "top with", uk: "зверху додайте" },
      "add ice": { en: "add ice", uk: "додайте лід" },
      "serve over ice": { en: "serve over ice", uk: "подавайте на льоду" },
      "mix well": { en: "mix well", uk: "добре перемішайте" },
      "stir gently": { en: "stir gently", uk: "обережно перемішайте" },
      "pour into": { en: "pour into", uk: "налийте у" },
      "build in": { en: "build in", uk: "приготуйте в" },
      "muddle": { en: "muddle", uk: "розімніть" },
      "shake": { en: "shake", uk: "струсіть" },
      "stir": { en: "stir", uk: "перемішайте" },
      "strain": { en: "strain", uk: "процідіть" },
      "garnish": { en: "garnish", uk: "прикрасьте" },
      "serve": { en: "serve", uk: "подавайте" },
      "add": { en: "add", uk: "додайте" },
      "pour": { en: "pour", uk: "налийте" },
      "mix": { en: "mix", uk: "змішайте" },
      "blend": { en: "blend", uk: "збийте" },
      "fill": { en: "fill", uk: "наповніть" },
      "top": { en: "top", uk: "зверху додайте" },
      
      // Ingredients and tools
      "ice": { en: "ice", uk: "лід" },
      "glass": { en: "glass", uk: "келих" },
      "ingredients": { en: "ingredients", uk: "інгредієнти" },
      "cocktail glass": { en: "cocktail glass", uk: "коктейльний келих" },
      "highball glass": { en: "highball glass", uk: "високий келих" },
      "shot glass": { en: "shot glass", uk: "стопка" },
      "rocks glass": { en: "rocks glass", uk: "склянка для віскі" },
      "shaker": { en: "shaker", uk: "шейкер" },
      "blender": { en: "blender", uk: "блендер" },
      "mint leaves": { en: "mint leaves", uk: "листя м'яти" },
      "lime wedge": { en: "lime wedge", uk: "долька лайма" },
      "lemon slice": { en: "lemon slice", uk: "скибочка лимона" },
      "orange slice": { en: "orange slice", uk: "скибочка апельсина" },
      "mint sprig": { en: "mint sprig", uk: "гілочка м'яти" },
      "cherry": { en: "cherry", uk: "вишня" },
      "sugar": { en: "sugar", uk: "цукор" },
      "salt": { en: "salt", uk: "сіль" },
      "soda water": { en: "soda water", uk: "содова" },
      "rum": { en: "rum", uk: "ром" },
      
      // Common adjectives
      "chilled": { en: "chilled", uk: "охолоджений" },
      "fresh": { en: "fresh", uk: "свіжий" },
      "cold": { en: "cold", uk: "холодний" },
      "hot": { en: "hot", uk: "гарячий" },
      "sweet": { en: "sweet", uk: "солодкий" },
      "sour": { en: "sour", uk: "кислий" },
      
      // Common prepositions and conjunctions
      "with": { en: "with", uk: "з" },
      "and": { en: "and", uk: "і" },
      "into": { en: "into", uk: "в" },
      "until": { en: "until", uk: "поки" },
      "well": { en: "well", uk: "добре" },
      "all": { en: "all", uk: "всі" },
      "the": { en: "the", uk: "" },
      "a": { en: "a", uk: "" },
      "an": { en: "an", uk: "" },
      "if": { en: "if", uk: "якщо" },
      "or": { en: "or", uk: "або" },
      "then": { en: "then", uk: "тоді" },
      "over": { en: "over", uk: "на" },
      "in": { en: "in", uk: "в" },
      "on": { en: "on", uk: "на" },
      "for": { en: "for", uk: "для" },
      "to": { en: "to", uk: "до" },
      "desired": { en: "desired", uk: "бажання" }
    };

    // First try to match longer phrases
    Object.entries(commonPhrases).sort((a, b) => b[0].length - a[0].length).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      translatedSentence = translatedSentence.replace(regex, value.uk);
    });

    return translatedSentence;
  });

  // Join sentences back together
  return translatedSentences.join(' ');
};
