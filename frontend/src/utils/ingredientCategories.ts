export interface IngredientCategory {
  name: string;
  color: string;
  ingredients: string[];
}

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    name: 'spirits',
    color: '#FF6B6B',
    ingredients: [
      'vodka',
      'gin',
      'rum',
      'tequila',
      'whiskey',
      'bourbon',
      'cognac',
      'brandy'
    ]
  },
  {
    name: 'liqueurs',
    color: '#4ECDC4',
    ingredients: [
      'kahlua',
      'baileys',
      'cointreau',
      'amaretto',
      'campari',
      'aperol',
      'chambord',
      'limoncello'
    ]
  },
  {
    name: 'mixers',
    color: '#45B7D1',
    ingredients: [
      'cola',
      'tonic',
      'soda',
      'ginger_beer',
      'ginger_ale',
      'sprite',
      'cranberry_juice',
      'orange_juice'
    ]
  },
  {
    name: 'fruits',
    color: '#96CEB4',
    ingredients: [
      'lemon',
      'lime',
      'orange',
      'grapefruit',
      'pineapple',
      'strawberry',
      'raspberry',
      'cherry'
    ]
  },
  {
    name: 'herbs',
    color: '#88D8B0',
    ingredients: [
      'mint',
      'basil',
      'rosemary',
      'thyme',
      'sage',
      'lavender'
    ]
  },
  {
    name: 'others',
    color: '#6C5B7B',
    ingredients: [
      'sugar',
      'honey',
      'bitters',
      'egg_white',
      'cream',
      'coffee',
      'chocolate',
      'cinnamon'
    ]
  }
];

export const getIngredientCategory = (ingredient: string): IngredientCategory | undefined => {
  const lowerIngredient = ingredient.toLowerCase();
  
  return INGREDIENT_CATEGORIES.find(category => category.ingredients.includes(lowerIngredient));
};

export type IngredientCategoryType = IngredientCategory;
