const fs = require('fs');
const path = require('path');

// Зчитуємо файли
const cocktailsPath = path.join(__dirname, '../src/data/customCocktails.ts');
const cocktailsContent = fs.readFileSync(cocktailsPath, 'utf-8');

// Словник перекладів для назв коктейлів
const cocktailNames = {
  "A1": "А1",
  "Adam": "Адам",
  "Algonquin": "Алгонкін",
  "Aviation": "Авіація",
  "Barracuda": "Барракуда",
  "Bellini": "Белліні",
  "Bumble Bee": "Джміль",
  "Caipirinha": "Кайпірінья",
  "Caipirissima": "Кайпіріссіма",
  "Cosmopolitan": "Космополітен",
  "Cream Soda": "Вершкова Содова",
  "Corpse Reviver": "Відроджувач Трупа",
  "Death in the Afternoon": "Смерть після полудня",
  "Diesel": "Дизель",
  "Dirty Martini": "Брудний Мартіні",
  "English Rose Cocktail": "Англійська Роза",
  "Espresso Martini": "Еспресо Мартіні",
  "French 75": "Французький 75",
  "French Connection": "Французький Зв'язок",
  "Fuzzy Asshole": "Пухнастий Засранець",
  "Gin and Tonic": "Джин-тонік",
  "Gin Squirt": "Джин Сквірт",
  "Gin Toddy": "Джин Тодді",
  "Gin and Soda": "Джин з Содовою",
  "Godchild": "Хрещеник",
  "Halloween Punch": "Хеллоуінський Пунш",
  "Hemingway Special": "Спеціальний Хемінгуея",
  "Irish Coffee": "Айріш Кофі",
  "Jam Donut": "Пончик з Джемом",
  "Japanese Fizz": "Японський Фіз",
  "Kamikaze": "Камікадзе",
  "Kool First Aid": "Прохолодна Перша Допомога",
  "Lassi - Mango": "Лассі Манго",
  "Lemon Drop": "Лимонна Крапля",
  "London Town": "Лондон Таун",
  "Long Island Iced Tea": "Лонг Айленд",
  "Lone Tree Cocktail": "Коктейль Самотнє Дерево",
  "Lone Tree Cooler": "Прохолодний Самотнє Дерево",
  "Manhattan": "Манхеттен",
  "Margarita": "Маргарита",
  "Mary Pickford": "Мері Пікфорд",
  "Masala Chai": "Масала Чай",
  "Mimosa": "Мімоза",
  "Mint Julep": "М'ятний Джулеп",
  "Mojito": "Мохіто",
  "Monkey Gland": "Мавпяча Залоза",
  "Moscow Mule": "Московський Мул",
  "National Aquarium": "Національний Акваріум",
  "Negroni": "Негроні",
  "Nuked Hot Chocolate": "Гарячий Шоколад в Мікрохвильовці",
  "Old Fashioned": "Олд Фешен",
  "Orange Whip": "Апельсиновий Віп",
  "Orange Rosemary Collins": "Апельсиново-Розмариновий Коллінз",
  "Owen's Grandmother's Revenge": "Помста Бабусі Оуена",
  "Pink Moon": "Рожевий Місяць",
  "Pink Panty Pulldowns": "Рожеві Трусики",
  "Pisco Sour": "Піско Сауер",
  "Planter's Punch": "Пунш Плантатора",
  "Popped cherry": "Лопнула Вишня",
  "Port And Starboard": "Правий і Лівий Борт",
  "Quick F**K": "Швидкий П**ць",
  "Queen Elizabeth": "Королева Єлизавета",
  "Radioactive Long Island Iced Tea": "Радіоактивний Лонг Айленд",
  "Raspberry Cooler": "Малинове Прохолодження",
  "Red Snapper": "Червоний Снепер",
  "Royal Fizz": "Королівський Фіз",
  "Royal Gin Fizz": "Королівський Джин Фіз",
  "Ruby Tuesday": "Рубіновий Вівторок",
  "Rum Sour": "Ром Сауер",
  "Sangria": "Сангрія",
  "Scotch Sour": "Скотч Сауер",
  "Sex on the Beach": "Секс на Пляжі",
  "Sherry Eggnog": "Херес Еґноґ",
  "Shot-gun": "Дробовик",
  "Sidecar": "Сайдкар",
  "Sol Y Sombra": "Сонце і Тінь",
  "Tequila Sour": "Текіла Сауер",
  "Texas Rattlesnake": "Техаський Гримучник",
  "Texas Sling": "Техаський Слінг",
  "The Galah": "Рожевий Какаду",
  "The Laverstoke": "Лаверсток",
  "Tomato Tang": "Томатний Тенг",
  "Valencia Cocktail": "Валенсійський Коктейль",
  "Vampiro": "Вампіро",
  "Vodka Lemon": "Горілка з Лимоном",
  "Vodka Martini": "Горілка Мартіні",
  "White Russian": "Білий Росіянин",
  "Whitecap Margarita": "Маргарита з Пінкою",
  "Wine Punch": "Винний Пунш",
  "Winter Paloma": "Зимова Палома",
  "Whiskey Sour": "Віскі Сауер",
  "Zambeer": "Замбір",
  "Ziemes Martini Apfelsaft": "Німецький Яблучний Мартіні",
  "Zimadori Zinger": "Зімадорі Зінгер",
  "Zoksel": "Зоксель",
  "Mai Tai": "Май Тай",
  "Daiquiri": "Дайкірі",
  "Martini": "Мартіні",
  "Bloody Mary": "Кривава Мері",
  "Piña Colada": "Піна Колада",
  "Manhattan": "Манхеттен",
  "Mai Tai": "Май Тай",
  "Caipirinha": "Кайпірінья",
  "Irish Coffee": "Айріш Кофі",
  "Espresso Martini": "Еспресо Мартіні",
  'ABC': 'Ей-Бі-Сі',
  'Ace': 'Туз',
  'ACID': 'Кислота',
  'AT&T': 'Ей-Ті-енд-Ті',
  'Pink Lady': 'Рожева Леді',
  'Pure Passion': 'Чиста Пристрасть',
  "Planter's Punch": 'Пунш Плантатора',
  'Queen Bee': 'Королева Бджіл',
  'Radler': 'Радлер',
  'Rusty Nail': 'Іржавий Цвях',
  'Ramos Gin Fizz': 'Джин Фіз Рамоса',
  'Russian Spring Punch': 'Російський Весняний Пунш',
  'Sazerac': 'Сазерак',
  'Stone Sour': 'Кам\'яний Кислий',
  'San Francisco': 'Сан-Франциско',
  'Tia-Maria': 'Тіа-Марія',
  'Talos Coffee': 'Кава Талос',
  'Almeria': 'Альмерія',
  'Abilene': 'Абілін',
  'Affair': 'Роман',
  'Avalon': 'Авалон',
  'Apello': 'Апелло',
  'B-52': 'Б-52',
  'B-53': 'Б-53',
  'Baby Guinness': 'Дитячий Гіннесс',
  'Bacardi Cocktail': 'Коктейль Бакарді',
  'Black Russian': 'Чорний Росіянин',
  'Blue Lagoon': 'Блакитна Лагуна',
  'Blue Margarita': 'Блакитна Маргарита',
  'Bluebird': 'Синій Птах',
  'Brain Hemorrhage': 'Крововилив у Мозок',
  'Bramble': 'Ожина',
  'Casino': 'Казино',
  'Casino Royale': 'Казино Рояль',
  'Cherry Electric Lemonade': 'Вишнева Електрична Лимонада',
  'Chicago Fizz': 'Чиказький Фіз',
  'Clover Club': 'Конюшиновий Клуб',
  'Cuba Libre': 'Куба Лібре',
  'Darkwood Sling': 'Темний Лісовий Слінг',
  'Derby': 'Дербі',
  'Dragonfly': 'Бабка',
  'Dry Rob Roy': 'Сухий Роб Рой',
  'Dubonnet Cocktail': 'Коктейль Дюбонне',
  'Flying Dutchman': 'Летючий Голландець',
  'Flying Scotchman': 'Летючий Шотландець',
  'Foxy Lady': 'Хитра Леді',
  'Gin Rickey': 'Джин Рікі',
  'Gin Smash': 'Джин Смеш',
  'Grasshopper': 'Коник',
  'Harvey Wallbanger': 'Харві Волбенгер',
  'Hot Toddy': 'Гарячий Тодді',
  'Imperial Cocktail': 'Імперський Коктейль',
  'Jack Rose': 'Джек Роуз',
  'Jelly Bean': 'Желейні Боби',
  'John Collins': 'Джон Коллінз',
  'Kir': 'Кір',
  'Kir Royale': 'Кір Рояль',
  'Lady Love Fizz': 'Фіз Дамської Любові',
  'Loch Lomond': 'Лох-Ломонд',
  'Martinez': 'Мартінез',
  'Martinez 2': 'Мартінез 2',
  'Monkey Wrench': 'Розвідний Ключ',
  'Munich Mule': 'Мюнхенський Мул',
  'New York Sour': 'Нью-Йорк Сауер',
  'Orgasm': 'Оргазм',
  'Paradise': 'Рай',
  'Pegu Club': 'Пегу Клуб',
  'Porto flip': 'Порто Фліп',
  'Rose': 'Роза',
  'Royal Cocktail': 'Королівський Коктейль',
  'Rum Cobbler': 'Ром Коблер',
  'Rum Cooler': 'Ром Кулер',
  'Screwdriver': 'Викрутка',
  'Stinger': 'Жало',
  'Tequila Sunrise': 'Текіла Санрайз',
  'Tom Collins': 'Том Коллінз',
  'Turf Cocktail': 'Коктейль Терф',
  'Vesper': 'Веспер',
  'Yellow Bird': 'Жовтий Птах',
  'Zombie': 'Зомбі',
  'Americano': 'Американо',
  'Boxcar': 'Вагон',
  'Bora Bora': 'Бора Бора',
  'Bob Marley': 'Боб Марлі',
  'Cafe Savoy': 'Кафе Савой',
  'Casa Blanca': 'Каса Бланка',
  'Coffee-Vodka': 'Кавова Горілка',
  'Cranberry Punch': 'Журавлиний Пунш',
  'Damned if you do': 'Будь що будь',
  'Frosé': 'Фрозе',
  'Fruit Cooler': 'Фруктовий Кулер',
  'Frozen Daiquiri': 'Заморожений Дайкірі',
  'Frozen Pineapple Daiquiri': 'Заморожений Ананасовий Дайкірі',
  'Godfather': 'Хрещений Батько',
  'Gin Sling': 'Джин Слінг',
  'Grass Skirt': 'Трав\'яна Спідниця',
  "Horse's Neck": 'Шия Коня',
  'Hot Creamy Bush': 'Гарячий Вершковий Кущ',
  'Ice Pick': 'Льодоруб',
  'Jamaica Kiss': 'Ямайський Поцілунок',
  "Jack's Vanilla Coke": 'Ванільна Кола Джека',
  'Kiwi Martini': 'Ківі Мартіні',
  'Kill the cold Smoothie': 'Смузі проти Застуди',
  'Lemouroudji': 'Лемуруджі',
  'Lemon Elderflower Spritzer': 'Лимонно-Бузиновий Спритцер',
  'Michelada': 'Мічелада',
  'Moranguito': 'Морангіто',
  'Mango Mojito': 'Манго Мохіто',
  'Old Cuban': 'Старий Кубинець',
  'Oatmeal Cookie': 'Вівсяне Печиво',
  'Pink Gin': 'Рожевий Джин',
  'Pink Penocha': 'Рожева Пеноча',
  'Pornstar Martini': 'Мартіні Порнозірка',
  'Quentin': 'Квентін',
  'Rum Runner': 'Ром Раннер',
  'Rail Splitter': 'Дроворуб',
  'Rum Old-fashioned': 'Ромовий Олд Фешен',
  'Zinger': 'Зінгер',
  'Zizi Coin-coin': 'Зізі Куан-куан'
};

// Словник перекладів для інгредієнтів
const ingredientNames = {
  "White rum": "Білий ром",
  "Lime": "Лайм",
  "Sugar": "Цукор",
  "Mint": "М'ята",
  "Soda water": "Содова",
  "Tequila": "Текіла",
  "Triple sec": "Трипл сек",
  "Lime juice": "Сік лайма",
  "Salt": "Сіль",
  "Vodka": "Горілка",
  "Cranberry juice": "Журавлиний сік",
  "Cointreau": "Куантро",
  "Gin": "Джин",
  "Tonic water": "Тонік",
  "Bourbon": "Бурбон",
  "Angostura bitters": "Ангостура бітер",
  "Sugar cube": "Кубик цукру",
  "Orange": "Апельсин",
  "Simple syrup": "Цукровий сироп",
  "Lemon juice": "Лимонний сік",
  "Cola": "Кола",
  "Coffee liqueur": "Кавовий лікер",
  "Irish cream": "Айріш крім",
  "Orange juice": "Апельсиновий сік",
  "Peach schnapps": "Персиковий шнапс",
  "Cream": "Вершки",
  "Sweet vermouth": "Солодкий вермут",
  "Dry vermouth": "Сухий вермут",
  "Tomato juice": "Томатний сік",
  "Worcestershire sauce": "Вустерширський соус",
  "Hot sauce": "Гострий соус",
  "Celery": "Селера",
  "Coconut cream": "Кокосові вершки",
  "Pineapple juice": "Ананасовий сік",
  "Light rum": "Світлий ром",
  "Dark rum": "Темний ром",
  "Grenadine": "Гренадин",
  "Ice": "Лід",
  "Water": "Вода",
  "Coffee": "Кава",
  "Whipped cream": "Збиті вершки",
  "Ginger beer": "Імбирне пиво",
  "Champagne": "Шампанське",
  "Red wine": "Червоне вино",
  "White wine": "Біле вино",
  'Amaretto': 'Амаретто',
  'Baileys irish cream': 'Бейліс',
  'Cognac': 'Коньяк',
  'Heavy cream': 'Жирні вершки',
  'Milk': 'Молоко',
  'Egg White': 'Яєчний білок',
  '151 proof rum': 'Ром 151 пруф',
  'Wild Turkey': 'Вайлд Туркі',
  'Absolut Vodka': 'Горілка Абсолют',
  'Applejack': 'Яблучний бренді',
  'Grapefruit juice': 'Грейпфрутовий сік',
  'Strawberry schnapps': 'Полуничний шнапс',
  'Cranberry juice': 'Журавлиний сік',
  'Club soda': 'Содова',
  'Pisang Ambon': 'Пісанг Амбон',
  'Apple juice': 'Яблучний сік',
  'Lemonade': 'Лимонад',
  'Peach nectar': 'Персиковий нектар',
  'Maraschino cherry': 'Коктейльна вишня',
  'Kahlua': 'Калуа',
  'Egg white': 'Яєчний білок',
  'Prosecco': 'Просекко',
  'Campari': 'Кампарі',
  'Sweet Vermouth': 'Солодкий вермут',
  'Dry Vermouth': 'Сухий вермут',
  'Olive brine': 'Оливковий розсіл',
  'Green Olive': 'Зелена оливка',
  'Cachaca': 'Кашаса',
  'Brown sugar': 'Коричневий цукор',
  'Cream of coconut': 'Кокосові вершки',
  'Benedictine': 'Бенедиктин',
  'Drambuie': 'Драмбуї',
  'Scotch': 'Скотч',
  'Irish whiskey': 'Ірландський віскі',
  'Peach brandy': 'Персиковий бренді',
  'Sloe gin': 'Терновий джин',
  'Apricot brandy': 'Абрикосовий бренді',
  'Creme de Cacao': 'Крем де Какао',
  'Creme de Menthe': 'Крем де Мент',
  'Galliano': 'Гальяно',
  'Dubonnet Rouge': 'Дюбонне Руж',
  'Corona': 'Корона',
  'Lemon peel': 'Цедра лимона',
  'Absolut Citron': 'Абсолют Цитрон',
  'Elderflower cordial': 'Бузиновий сироп',
  'Prosecco': 'Просекко',
  'Mexican beer': 'Мексиканське пиво',
  'Lime juice cordial': 'Лаймовий кордіал',
  'Worcestershire Sauce': 'Вустерширський соус',
  'Tabasco sauce': 'Соус Табаско',
  'Soy Sauce': 'Соєвий соус',
  'Strawberry liqueur': 'Полуничний лікер',
  'White Creme de Menthe': 'Білий крем де мент',
  'Mango': 'Манго',
  'Mint leaves': 'Листя м\'яти',
  'Passion fruit juice': 'Сік маракуї',
  'Vanilla vodka': 'Ванільна горілка',
  'Passion fruit syrup': 'Сироп маракуї',
  'Vanilla syrup': 'Ванільний сироп',
  'Butterscotch schnapps': 'Ірисковий шнапс',
  'Baileys irish cream': 'Бейліс',
  'Goldschlager': 'Гольдшлягер',
  'Angostura Bitters': 'Ангостура',
  'Dark Rum': 'Темний ром',
  'Light rum': 'Світлий ром',
  'Spiced rum': 'Пряний ром',
  'White rum': 'Білий ром',
  'Coconut rum': 'Кокосовий ром',
  'Blackberry brandy': 'Ожиновий бренді',
  'Orange curacao': 'Апельсиновий кюрасао',
  'Banana liqueur': 'Банановий лікер',
  'Fresh mint': 'Свіжа м\'ята',
  'Sprite': 'Спрайт',
  '7-Up': 'Севен-Ап',
  'Mint sprig': 'Гілочка м\'яти',
  'Orange spiral': 'Спіраль апельсина',
  'Maraschino liqueur': 'Лікер Мараскіно',
  'Creme de Violette': 'Крем де Віолет',
  'Aperol': 'Апероль',
  'Falernum': 'Фалернум',
  'Orgeat syrup': 'Сироп Оржат',
  'Orange bitters': 'Апельсинові бітери',
  'Peach bitters': 'Персикові бітери',
  'Chocolate bitters': 'Шоколадні бітери',
  'Peychaud\'s Bitters': 'Бітери Пейшо',
  'Orange peel': 'Апельсинова цедра',
  'Lemon peel': 'Лимонна цедра',
  'Lime peel': 'Цедра лайма',
  'Orange slice': 'Долька апельсина',
  'Lemon slice': 'Долька лимона',
  'Lime slice': 'Долька лайма',
  'Orange juice': 'Апельсиновий сік',
  'Lemon juice': 'Лимонний сік',
  'Lime juice': 'Сік лайма',
  'Maraschino cherry': 'Коктейльна вишня',
  'Maraschino liqueur': 'Лікер Мараскіно',
  'Kahlua': 'Калуа',
  'Campari': 'Кампарі',
  'Aperol': 'Апероль',
  'Fernet Branca': 'Фернет Бранка',
  'Cynar': 'Чинар',
  'Chambord': 'Шамбор',
  'Drambuie': 'Драмбуї',
  'Frangelico': 'Франжеліко',
  'Galliano': 'Гальяно',
  'Goldschlager': 'Гольдшлягер',
  'Grand Marnier': 'Гранд Марньє',
  'Irish cream': 'Айріш крім',
  'Jagermeister': 'Єгермейстер',
  'Midori': 'Мідорі',
  'Ouzo': 'Узо',
  'Pernod': 'Перно',
  'Pimm\'s': 'Піммс',
  'Sambuca': 'Самбука',
  'Southern Comfort': 'Сазерн Комфорт',
  'Tia Maria': 'Тіа Марія',
  'Triple sec': 'Трипл сек',
  'Benedictine': 'Бенедиктин',
  'Cognac': 'Коньяк',
  'Bourbon': 'Бурбон',
  'Scotch': 'Скотч',
  'Irish whiskey': 'Ірландський віскі',
  'Canadian whisky': 'Канадський віскі',
  'Rye whiskey': 'Житній віскі',
  'Absinthe': 'Абсент',
  'Cachaca': 'Кашаса',
  'Pisco': 'Піско',
  'Sake': 'Саке',
  'Tequila': 'Текіла',
  'Mezcal': 'Мескаль',
  'Brandy': 'Бренді',
  'Grappa': 'Граппа',
  'Sherry': 'Херес',
  'Madeira': 'Мадера',
  'Marsala': 'Марсала',
  "Apple brandy": "Яблучний бренді",
  "Bitter lemon": "Біттер лемон",
  "Blended whiskey": "Купажований віскі",
  "Carbonated water": "Газована вода",
  "Creme de Cassis": "Крем де Кассіс",
  "Grain alcohol": "Зерновий спирт",
  "Green Chartreuse": "Зелений Шартрез",
  "Kiwi liqueur": "Ківі лікер",
  "Mint syrup": "М'ятний сироп",
  "Powdered sugar": "Цукрова пудра",
  "Tennessee whiskey": "Теннессі віскі",
  "Vanilla extract": "Ванільний екстракт",
  "Yellow Chartreuse": "Жовтий Шартрез",
  "Passion fruit juice": "Сік маракуї",
  "Spiced rum": "Пряний ром",
  "Orange bitters": "Апельсинові бітери",
  "Port": "Портвейн",
  "Coca-Cola": "Кока-кола",
  "Passion fruit": "Маракуя",
  "Passion fruit syrup": "Сироп маракуї",
  "Prosecco": "Просекко",
  "Sweet Vermouth": "Солодкий вермут",
  "Dry Vermouth": "Сухий вермут",
  "White rum": "Білий ром",
  "Dark rum": "Темний ром",
  "Spiced rum": "Пряний ром",
  "Gold rum": "Золотий ром",
  "Light rum": "Світлий ром",
  "Coconut rum": "Кокосовий ром",
  "Blackberry brandy": "Ожиновий бренді",
  "Cherry brandy": "Вишневий бренді",
  "Apricot brandy": "Абрикосовий бренді",
  "Peach brandy": "Персиковий бренді",
  "Elderflower liqueur": "Бузиновий лікер",
  "Coffee liqueur": "Кавовий лікер",
  "Chocolate liqueur": "Шоколадний лікер",
  "Amaretto": "Амаретто",
  "Baileys irish cream": "Бейліс айріш крім",
  "Blue Curacao": "Блю Кюрасао",
  "Cranberry juice": "Журавлиний сік",
  "Grapefruit juice": "Грейпфрутовий сік",
  "Pineapple juice": "Ананасовий сік",
  "Tomato juice": "Томатний сік",
  "Apple juice": "Яблучний сік",
  "Peach juice": "Персиковий сік",
  "Club soda": "Содова",
  "Ginger beer": "Імбирне пиво",
  "Ginger ale": "Імбирний ель",
  "Tonic water": "Тонік",
  "Sweet and sour": "Кисло-солодкий мікс",
  "Simple syrup": "Цукровий сироп",
  "Agave syrup": "Агавовий сироп",
  "Maple syrup": "Кленовий сироп",
  "Raspberry syrup": "Малиновий сироп",
  "Orgeat syrup": "Мигдальний сироп",
  "Coconut cream": "Кокосові вершки",
  "Heavy cream": "Жирні вершки",
  "Half-and-half": "Напіввершки",
  "Whipped cream": "Збиті вершки",
  "Egg white": "Яєчний білок",
  "Egg yolk": "Яєчний жовток",
  "Whole egg": "Ціле яйце",
  "Nutmeg": "Мускатний горіх",
  "Cinnamon": "Кориця",
  "Mint leaves": "Листя м'яти",
  "Basil leaves": "Листя базиліку",
  "Rosemary": "Розмарин",
  "Thyme": "Чебрець",
};

// Словник для одиниць вимірювання та форм
const measurementUnits = {
  "tblsp": "ст.л.",
  "tbsp": "ст.л.",
  "tsp": "ч.л.",
  "ml": "мл",
  "cl": "сл",
  "dash": "деш",
  "dashes": "деші",
  "splash": "сплеш",
  "splashes": "сплеші",
  "cup": "склянка",
  "cups": "склянки",
  "piece": "шт.",
  "pieces": "шт.",
  "chunk": "шматок",
  "chunks": "шматки",
  "slice": "долька",
  "slices": "дольки",
  "wedge": "часточка",
  "wedges": "часточки",
  "sprig": "гілочка",
  "sprigs": "гілочки",
  "leaf": "листок",
  "leaves": "листків",
  "whole": "цілий",
  "pinch": "щіпка",
  "pinches": "щіпки",
  "part": "частина",
  "parts": "частини"
};

// Функції для конвертації одиниць виміру
function convertToMetric(amount, unit) {
  console.log('Converting:', { amount, unit });
  
  // Обробка спеціальних випадків
  if (amount === 'NaN' || amount === 'undefined' || amount === null) {
    if (unit.toLowerCase().includes('цедра') || 
        unit.toLowerCase().includes('zest') || 
        unit.toLowerCase().includes('peel')) {
      return { amount: '', unit: 'цедра' };
    }
    return { amount: '', unit: unit || '' };
  }

  // Видаляємо всі дужки та їх вміст
  amount = amount.toString().replace(/\(.*?\)/g, '').trim();
  
  // Конвертуємо дроби в десяткові числа
  if (amount.includes('/')) {
    const [num, denom] = amount.split('/').map(n => parseFloat(n.trim()));
    amount = num / denom;
  } else {
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) return { amount: '', unit: unit || '' };

  // Нормалізуємо одиницю виміру
  const normalizedUnit = unit.toLowerCase().trim();
  console.log('Normalized unit:', normalizedUnit);

  // Перевіряємо на унції через регулярний вираз
  const isOunce = /^(унц|унц\.|унці[йя]?|унция|oz\.?|ounces?)/.test(normalizedUnit);
  console.log('Is ounce:', isOunce);
  
  if (isOunce) {
    console.log('Converting to ml:', { amount, result: Math.round(amount * 30) });
    return { amount: Math.round(amount * 30), unit: 'мл' };
  }

  // Конвертація в метричну систему
  switch(normalizedUnit) {
    // Рідини
    case 'cup':
    case 'cups':
      return { amount: Math.round(amount * 240), unit: 'мл' };
    case 'tsp':
    case 'teaspoon':
    case 'teaspoons':
      return { amount: Math.round(amount * 5), unit: 'мл' };
    case 'tbsp':
    case 'tblsp':
    case 'tablespoon':
    case 'tablespoons':
      return { amount: Math.round(amount * 15), unit: 'мл' };
    case 'dash':
    case 'dashes':
    case 'деш':
    case 'деші':
      return { amount: amount, unit: 'деш' };
    case 'splash':
    case 'splashes':
      return { amount: Math.round(amount * 5), unit: 'мл' };
    // Спеціальні випадки
    case 'of':
    case 'для':
      if (unit.toLowerCase().includes('цедра') || 
          unit.toLowerCase().includes('zest') || 
          unit.toLowerCase().includes('peel')) {
        return { amount: '', unit: 'цедра' };
      }
      return { amount: '', unit: '' };
    // Тверді речовини та спеціальні випадки
    case 'piece':
    case 'pieces':
    case 'шт':
    case 'штук':
    case 'штуки':
      return { amount, unit: 'шт' };
    case 'whole':
    case 'цілий':
      return { amount, unit: 'шт' };
    case 'chunk':
    case 'chunks':
    case 'шматок':
    case 'шматки':
      return { amount, unit: 'шматки' };
    case 'slice':
    case 'slices':
    case 'долька':
    case 'дольки':
      return { amount, unit: 'дольки' };
    case 'wedge':
    case 'wedges':
    case 'часточка':
    case 'часточки':
      return { amount, unit: 'часточки' };
    case 'sprig':
    case 'sprigs':
    case 'гілочка':
    case 'гілочки':
      return { amount, unit: 'гілочки' };
    case 'leaf':
    case 'leaves':
    case 'листок':
    case 'листки':
      return { amount, unit: 'листки' };
    case 'pinch':
    case 'pinches':
    case 'щіпка':
    case 'щіпки':
      return { amount, unit: 'щіпки' };
    case '':  // Якщо одиниця виміру не вказана
      // Для дробових значень без одиниць виміру (як для цитрусових)
      if (amount <= 1) {
        return { amount, unit: 'шт' };
      }
      // Для рідин за замовчуванням використовуємо мл
      return { amount: Math.round(amount * 30), unit: 'мл' };
    default:
      // Якщо одиниця вже в мл, повертаємо як є
      if (unit.toLowerCase() === 'мл' || unit.toLowerCase() === 'ml') {
        return { amount, unit: 'мл' };
      }
      return { amount, unit };
  }
}

// Функція для перекладу мір з конвертацією
function translateMeasure(measure) {
  console.log('translateMeasure input:', measure);
  
  if (!measure || containsCyrillic(measure)) return measure;

  // Розбиваємо міру на частини, враховуючи дефіс
  const [measurePart, ...nameParts] = measure.split('-').map(part => part.trim());
  const namePart = nameParts.join('-').trim();  // З'єднуємо назву назад, якщо в ній був дефіс
  
  console.log('Measure parts:', { measurePart, namePart });

  // Розбиваємо міру на кількість та одиницю
  const parts = measurePart.trim().split(/\s+/);
  console.log('Split parts:', parts);
  
  // Обробка спеціальних випадків
  if (parts[0] === 'NaN' || parts[0] === 'undefined') {
    if (parts.includes('of')) {
      const unit = parts.slice(2).join(' ');
      return translateMeasure(`0 ${unit}`);
    }
    return '';
  }
  
  // Якщо маємо тільки число, обробляємо його як рідину або частину
  if (parts.length === 1) {
    const converted = convertToMetric(parts[0], '');
    return namePart ? `${converted.amount} ${converted.unit} - ${namePart}` : `${converted.amount} ${converted.unit}`.trim();
  }
  
  const amount = parts[0];
  const unit = parts.slice(1).join(' ');
  
  console.log('Before conversion:', { amount, unit });

  // Конвертуємо в метричну систему
  const converted = convertToMetric(amount, unit);
  console.log('After conversion:', converted);
  
  // Форматуємо результат з урахуванням назви інгредієнта
  return namePart ? `${converted.amount} ${converted.unit} - ${namePart}` : `${converted.amount} ${converted.unit}`.trim();
}

// Функція для перекладу інструкцій
function translateInstructions(instructions) {
  if (!instructions || containsCyrillic(instructions)) return instructions;

  let translatedText = instructions;

  // Перекладаємо одиниці вимірювання
  Object.entries(measurementUnits).forEach(([eng, ukr]) => {
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    translatedText = translatedText.replace(regex, ukr);
  });

  // Перекладаємо інгредієнти
  Object.entries(ingredientNames).forEach(([eng, ukr]) => {
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    translatedText = translatedText.replace(regex, ukr);
  });

  return translatedText;
}

// Функція для перевірки, чи текст містить кирилицю
function containsCyrillic(text) {
    return /[а-яА-ЯіІїЇєЄ]/.test(text);
}

// Знаходимо масив коктейлів
const cocktailsMatch = cocktailsContent.match(/export const customCocktails: Cocktail\[\] = (\[[\s\S]*?\]);/);
if (!cocktailsMatch) {
    console.error('Could not find cocktails array');
    process.exit(1);
}

// Парсимо масив коктейлів
const cocktailsArray = JSON.parse(cocktailsMatch[1]);

// Оновлюємо коктейлі
const updatedCocktails = cocktailsArray.map(cocktail => {
    // Копіюємо коктейль
    const updatedCocktail = { ...cocktail };

    // Перекладаємо назву
    if (!containsCyrillic(updatedCocktail.name)) {
        updatedCocktail.name = cocktailNames[updatedCocktail.name] || updatedCocktail.name;
    }

    // Перекладаємо інгредієнти
    updatedCocktail.ingredients = updatedCocktail.ingredients.map(ingredient => {
        if (!containsCyrillic(ingredient)) {
            return ingredientNames[ingredient] || ingredient;
        }
        return ingredient;
    });

    // Перекладаємо міри
    if (updatedCocktail.measures) {
        updatedCocktail.measures = updatedCocktail.measures.map(measure => 
            translateMeasure(measure)
        );
    }

    // Перекладаємо інструкції
    if (!containsCyrillic(updatedCocktail.instructions)) {
        updatedCocktail.instructions = translateInstructions(updatedCocktail.instructions);
    }

    return updatedCocktail;
});

// Оновлюємо файл
const updatedContent = cocktailsContent.replace(
    /export const customCocktails: Cocktail\[\] = \[[\s\S]*?\];/,
    `export const customCocktails: Cocktail[] = ${JSON.stringify(updatedCocktails, null, 2)};`
);

fs.writeFileSync(cocktailsPath, updatedContent, 'utf-8');
console.log('Translations have been applied successfully!');
