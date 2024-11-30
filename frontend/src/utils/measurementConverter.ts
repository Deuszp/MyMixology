import i18next from 'i18next';

interface ConversionRule {
  regex: RegExp;
  convert: (value: number) => { value: number; unit: string };
}

const conversionRules: ConversionRule[] = [
  // Об'єм
  {
    regex: /(\d*\.?\d+)\s*oz/i,
    convert: (oz) => ({ value: Math.round(oz * 30), unit: 'ml' })
  },
  {
    regex: /(\d*\.?\d+)\s*cup/i,
    convert: (cup) => ({ value: Math.round(cup * 240), unit: 'ml' })
  },
  {
    regex: /(\d*\.?\d+)\s*tsp/i,
    convert: (tsp) => ({ value: Math.round(tsp * 5), unit: 'ml' })
  },
  {
    regex: /(\d*\.?\d+)\s*tbsp/i,
    convert: (tbsp) => ({ value: Math.round(tbsp * 15), unit: 'ml' })
  },
  {
    regex: /(\d*\.?\d+)\s*ml/i,
    convert: (ml) => ({ value: Math.round(ml), unit: 'ml' })
  },
  {
    regex: /(\d*\.?\d+)\s*cl/i,
    convert: (cl) => ({ value: Math.round(cl * 10), unit: 'ml' })
  },
  {
    regex: /(\d*\.?\d+)\s*shot/i,
    convert: (shot) => ({ value: Math.round(shot * 45), unit: 'ml' })
  },
  // Частини
  {
    regex: /(\d*\.?\d+)\s*part/i,
    convert: (part) => ({ value: part, unit: 'part' })
  },
  // Спеціальні випадки
  {
    regex: /(\d*\.?\d+)\s*dash/i,
    convert: (_) => ({ value: 1, unit: 'dash' })
  },
  {
    regex: /(\d*\.?\d+)\s*splash/i,
    convert: (_) => ({ value: 1, unit: 'splash' })
  },
  {
    regex: /(\d*\.?\d+)\s*drop/i,
    convert: (drops) => ({ value: drops, unit: 'drop' })
  },
  // Кількість
  {
    regex: /(\d*\.?\d+)\s*piece/i,
    convert: (pieces) => ({ value: pieces, unit: 'piece' })
  },
  {
    regex: /(\d*\.?\d+)\s*leaf/i,
    convert: (leaves) => ({ value: leaves, unit: 'leaf' })
  },
  {
    regex: /(\d*\.?\d+)\s*sprig/i,
    convert: (sprigs) => ({ value: sprigs, unit: 'sprig' })
  },
  {
    regex: /(\d*\.?\d+)\s*slice/i,
    convert: (slices) => ({ value: slices, unit: 'slice' })
  },
  {
    regex: /(\d*\.?\d+)\s*wedge/i,
    convert: (wedges) => ({ value: wedges, unit: 'wedge' })
  },
  // Вага
  {
    regex: /(\d*\.?\d+)\s*lb/i,
    convert: (lb) => ({ value: Math.round(lb * 454), unit: 'g' })
  },
  {
    regex: /(\d*\.?\d+)\s*oz\s*\(weight\)/i,
    convert: (oz) => ({ value: Math.round(oz * 28.35), unit: 'g' })
  },
];

const fractionToDecimal = (fraction: string): number => {
  if (!fraction.includes('/')) return parseFloat(fraction);
  const [numerator, denominator] = fraction.split('/').map(Number);
  return numerator / denominator;
};

export const convertToMetric = (measure: string): string => {
  if (!measure) return '';
  
  // Обробка спеціальних випадків
  if (measure.toLowerCase().includes('to taste')) {
    return i18next.t('ingredients.measures.to_taste');
  }
  if (measure.toLowerCase().includes('garnish')) {
    return i18next.t('ingredients.measures.garnish');
  }
  if (measure.toLowerCase().includes('rim')) {
    return i18next.t('ingredients.measures.rim');
  }
  if (measure.toLowerCase().includes('top up') || measure.toLowerCase().includes('fill up')) {
    return i18next.t('ingredients.measures.top_up');
  }
  if (measure.toLowerCase().includes('pinch')) {
    return i18next.t('ingredients.measures.pinch');
  }
  
  // Обробка дробів (наприклад, "1 1/2 oz" або "1/2 oz")
  measure = measure.replace(/(\d+)\s+(\d+\/\d+)/g, (_, whole, fraction) => {
    return (parseInt(whole) + fractionToDecimal(fraction)).toString();
  });
  
  // Перевірка кожного правила конвертації
  for (const rule of conversionRules) {
    const match = measure.match(rule.regex);
    if (match) {
      const value = fractionToDecimal(match[1]);
      const { value: converted, unit } = rule.convert(value);
      
      // Округлення до одного десяткового знаку, якщо потрібно
      const roundedValue = Number.isInteger(converted) ? 
        converted : 
        Math.round(converted * 10) / 10;
        
      // Отримання локалізованої одиниці виміру
      const localizedUnit = i18next.t(`ingredients.measures.${unit}`);
      
      return `${roundedValue} ${localizedUnit}`;
    }
  }

  // Якщо не знайдено правило конвертації, повертаємо оригінальне значення
  return measure.trim();
};
