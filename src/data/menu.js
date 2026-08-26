// Central menu data for the catering service.
//
// Each day of the week has a unique menu of 10 items:
//   5 protein, 3 vegetarian, 2 sides.
//
// Images are fixed, directly embedded URLs from Unsplash (free to use).
// No image assets are generated or stored in this repository.

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

export const CATEGORIES = {
  protein: { label: "Protein", order: 1 },
  vegetarian: { label: "Vegetarian", order: 2 },
  side: { label: "Sides", order: 3 },
};

// Number of portions allowed per order.
export const MIN_PORTIONS = 6;
export const MAX_PORTIONS = 30;

export const BUSINESS = {
  name: "Home Kitchen Catering",
  tagline: "Homemade, small-batch catering — cooked fresh, ready for pickup.",
  phone: "(555) 014-2288",
  phoneHref: "tel:+15550142288",
  email: "hello@homekitchencatering.example",
  address: "142 Meadow Lane, Springfield",
  hours: "Mon–Sat, 8:00 AM – 6:00 PM",
  social: [
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  ],
};

export const ITEMS = [
  // ---------- PROTEIN (16) ----------
  {
    id: "protein-grilled-herb-chicken",
    name: "Grilled Herb Chicken",
    category: "protein",
    price: 12.5,
    portion: "per portion",
    image: { src: img("1603133872878-684f208fb84b"), alt: "Grilled herb chicken" },
    description:
      "Tender chicken breast marinated overnight in fresh rosemary, thyme, garlic and lemon, then grilled until juicy with lightly charred edges.",
    ingredients: ["Chicken breast", "Olive oil", "Fresh rosemary", "Thyme", "Garlic", "Lemon", "Sea salt", "Black pepper"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 420, totalFat: 18, saturatedFat: 4, transFat: 0, cholesterol: 120, sodium: 480, totalCarbohydrate: 3, dietaryFiber: 0, totalSugars: 1, protein: 58 },
  },
  {
    id: "protein-lemon-garlic-salmon",
    name: "Lemon Garlic Salmon",
    category: "protein",
    price: 16.0,
    portion: "per portion",
    image: { src: img("1467003909585-2f8a72700288"), alt: "Lemon garlic salmon" },
    description:
      "Wild-caught salmon fillet baked with a bright lemon-garlic butter sauce and a sprinkle of fresh parsley. Flaky, buttery and never dry.",
    ingredients: ["Salmon fillet", "Butter", "Garlic", "Lemon", "Parsley", "Sea salt", "Black pepper"],
    nutrition: { servingSize: "1 portion (170 g)", calories: 480, totalFat: 30, saturatedFat: 9, transFat: 0, cholesterol: 105, sodium: 340, totalCarbohydrate: 4, dietaryFiber: 0, totalSugars: 1, protein: 45 },
  },
  {
    id: "protein-bbq-pulled-pork",
    name: "BBQ Pulled Pork",
    category: "protein",
    price: 13.5,
    portion: "per portion",
    image: { src: img("1544025162-d76694265947"), alt: "BBQ pulled pork" },
    description:
      "Pork shoulder slow-roasted for eight hours, hand-pulled and tossed in our smoky, tangy house barbecue sauce.",
    ingredients: ["Pork shoulder", "House BBQ sauce", "Brown sugar", "Apple cider vinegar", "Smoked paprika", "Onion", "Garlic"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 510, totalFat: 28, saturatedFat: 10, transFat: 0, cholesterol: 130, sodium: 720, totalCarbohydrate: 16, dietaryFiber: 1, totalSugars: 13, protein: 46 },
  },
  {
    id: "protein-teriyaki-chicken-skewers",
    name: "Teriyaki Chicken Skewers",
    category: "protein",
    price: 11.0,
    portion: "per skewer",
    image: { src: img("1555939594-58d7cb561ad1"), alt: "Teriyaki chicken skewers" },
    description:
      "Grilled chicken thigh skewers glazed with a glossy, house-made teriyaki sauce and finished with toasted sesame seeds.",
    ingredients: ["Chicken thigh", "Soy sauce", "Honey", "Ginger", "Garlic", "Sesame seeds", "Scallion"],
    nutrition: { servingSize: "1 skewer (120 g)", calories: 360, totalFat: 14, saturatedFat: 3.5, transFat: 0, cholesterol: 110, sodium: 640, totalCarbohydrate: 18, dietaryFiber: 0, totalSugars: 15, protein: 38 },
  },
  {
    id: "protein-smash-burger-sliders",
    name: "Smash Burger Sliders",
    category: "protein",
    price: 10.5,
    portion: "per slider",
    image: { src: img("1550547660-d9450f859349"), alt: "Smash burger sliders" },
    description:
      "Crispy-edged smashed beef patties on soft slider buns with melty cheddar, pickles and our secret sauce.",
    ingredients: ["Ground beef", "Cheddar", "Slider buns", "Pickles", "Secret sauce", "Onion", "Lettuce"],
    nutrition: { servingSize: "1 slider (140 g)", calories: 520, totalFat: 29, saturatedFat: 11, transFat: 0.5, cholesterol: 85, sodium: 690, totalCarbohydrate: 30, dietaryFiber: 2, totalSugars: 6, protein: 32 },
  },
  {
    id: "protein-herb-crusted-beef-brisket",
    name: "Herb-Crusted Beef Brisket",
    category: "protein",
    price: 15.0,
    portion: "per portion",
    image: { src: img("1504674900247-0877df9cc836"), alt: "Herb-crusted beef brisket" },
    description:
      "Beef brisket rubbed with a coarse herb and peppercorn crust, braised low and slow until it falls apart under a fork.",
    ingredients: ["Beef brisket", "Rosemary", "Thyme", "Black peppercorn", "Garlic", "Beef stock", "Sea salt"],
    nutrition: { servingSize: "1 portion (160 g)", calories: 540, totalFat: 34, saturatedFat: 13, transFat: 0, cholesterol: 140, sodium: 560, totalCarbohydrate: 2, dietaryFiber: 0, totalSugars: 0, protein: 52 },
  },
  {
    id: "protein-honey-glazed-ham",
    name: "Honey Glazed Ham",
    category: "protein",
    price: 13.0,
    portion: "per portion",
    image: { src: img("1585032226651-759b368d7246"), alt: "Honey glazed ham" },
    description:
      "Spiral-cut ham roasted with a sticky honey, mustard and clove glaze, carved thick for a classic crowd-pleaser.",
    ingredients: ["Ham", "Honey", "Dijon mustard", "Clove", "Brown sugar", "Orange zest"],
    nutrition: { servingSize: "1 portion (140 g)", calories: 460, totalFat: 22, saturatedFat: 8, transFat: 0, cholesterol: 125, sodium: 980, totalCarbohydrate: 18, dietaryFiber: 0, totalSugars: 17, protein: 44 },
  },
  {
    id: "protein-garlic-butter-shrimp",
    name: "Garlic Butter Shrimp",
    category: "protein",
    price: 15.5,
    portion: "per portion",
    image: { src: img("1455619452474-d2be8b1e70cd"), alt: "Garlic butter shrimp" },
    description:
      "Plump shrimp sautéed in garlic butter with a splash of white wine and fresh parsley. Bright, rich and ready to share.",
    ingredients: ["Shrimp", "Butter", "Garlic", "White wine", "Parsley", "Lemon", "Red pepper flake"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 380, totalFat: 24, saturatedFat: 14, transFat: 0, cholesterol: 260, sodium: 620, totalCarbohydrate: 4, dietaryFiber: 0, totalSugars: 0, protein: 36 },
  },
  {
    id: "protein-braised-short-ribs",
    name: "Braised Short Ribs",
    category: "protein",
    price: 16.5,
    portion: "per portion",
    image: { src: img("1529193591184-b1d58069ecdd"), alt: "Braised short ribs" },
    description:
      "Beef short ribs braised in red wine with root vegetables until the meat is melt-in-your-mouth tender.",
    ingredients: ["Beef short ribs", "Red wine", "Carrot", "Celery", "Onion", "Beef stock", "Tomato paste", "Thyme"],
    nutrition: { servingSize: "1 portion (170 g)", calories: 580, totalFat: 38, saturatedFat: 16, transFat: 0, cholesterol: 145, sodium: 640, totalCarbohydrate: 6, dietaryFiber: 1, totalSugars: 3, protein: 48 },
  },
  {
    id: "protein-chicken-piccata",
    name: "Chicken Piccata",
    category: "protein",
    price: 12.0,
    portion: "per portion",
    image: { src: img("1574484284002-952d92456975"), alt: "Chicken piccata" },
    description:
      "Golden pan-seared chicken cutlets in a silky lemon-caper butter sauce, brightened with fresh parsley.",
    ingredients: ["Chicken breast", "Flour", "Butter", "Lemon", "Capers", "Parsley", "White wine"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 430, totalFat: 22, saturatedFat: 9, transFat: 0, cholesterol: 130, sodium: 520, totalCarbohydrate: 8, dietaryFiber: 1, totalSugars: 1, protein: 46 },
  },
  {
    id: "protein-roast-turkey-breast",
    name: "Roast Turkey Breast",
    category: "protein",
    price: 13.5,
    portion: "per portion",
    image: { src: img("1600891964599-f61ba0e24092"), alt: "Roast turkey breast" },
    description:
      "Herb-rubbed turkey breast roasted to juicy perfection and sliced thick, served with a light pan gravy.",
    ingredients: ["Turkey breast", "Sage", "Rosemary", "Butter", "Turkey stock", "Black pepper", "Sea salt"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 350, totalFat: 12, saturatedFat: 4, transFat: 0, cholesterol: 120, sodium: 420, totalCarbohydrate: 1, dietaryFiber: 0, totalSugars: 0, protein: 56 },
  },
  {
    id: "protein-cajun-blackened-catfish",
    name: "Cajun Blackened Catfish",
    category: "protein",
    price: 14.0,
    portion: "per portion",
    image: { src: img("1551183053-bf91a1d81141"), alt: "Cajun blackened catfish" },
    description:
      "Catfish fillets coated in a bold Cajun spice blend and seared in a hot skillet for a crisp, smoky crust.",
    ingredients: ["Catfish fillet", "Paprika", "Cayenne", "Garlic powder", "Onion powder", "Thyme", "Butter"],
    nutrition: { servingSize: "1 portion (160 g)", calories: 410, totalFat: 24, saturatedFat: 7, transFat: 0, cholesterol: 110, sodium: 610, totalCarbohydrate: 4, dietaryFiber: 1, totalSugars: 1, protein: 42 },
  },
  {
    id: "protein-moroccan-lamb-meatballs",
    name: "Moroccan Lamb Meatballs",
    category: "protein",
    price: 14.5,
    portion: "per portion",
    image: { src: img("1615937657715-bc7b4b7962c1"), alt: "Moroccan lamb meatballs" },
    description:
      "Fragrant lamb meatballs seasoned with cumin, coriander and cinnamon, simmered in a spiced tomato sauce.",
    ingredients: ["Ground lamb", "Cumin", "Coriander", "Cinnamon", "Tomato", "Onion", "Parsley", "Garlic"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 470, totalFat: 32, saturatedFat: 13, transFat: 0, cholesterol: 120, sodium: 590, totalCarbohydrate: 8, dietaryFiber: 2, totalSugars: 4, protein: 36 },
  },
  {
    id: "protein-thai-basil-chicken",
    name: "Thai Basil Chicken",
    category: "protein",
    price: 11.5,
    portion: "per portion",
    image: { src: img("1519708227418-c8fd9a32b7a2"), alt: "Thai basil chicken" },
    description:
      "Stir-fried ground chicken with holy basil, chilies and garlic in a savory-sweet sauce — bold, aromatic and lively.",
    ingredients: ["Ground chicken", "Thai basil", "Chili", "Garlic", "Fish sauce", "Oyster sauce", "Bell pepper"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 390, totalFat: 19, saturatedFat: 5, transFat: 0, cholesterol: 115, sodium: 830, totalCarbohydrate: 12, dietaryFiber: 2, totalSugars: 8, protein: 40 },
  },
  {
    id: "protein-stuffed-pork-loin",
    name: "Stuffed Pork Loin",
    category: "protein",
    price: 13.5,
    portion: "per portion",
    image: { src: img("1569058242253-92a9c755a0ec"), alt: "Stuffed pork loin" },
    description:
      "Rolled pork loin stuffed with spinach, garlic and fontina cheese, roasted and sliced into elegant rounds.",
    ingredients: ["Pork loin", "Spinach", "Fontina cheese", "Garlic", "Breadcrumbs", "Rosemary", "Olive oil"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 490, totalFat: 27, saturatedFat: 10, transFat: 0, cholesterol: 130, sodium: 550, totalCarbohydrate: 6, dietaryFiber: 1, totalSugars: 2, protein: 52 },
  },
  {
    id: "protein-grilled-steak-medallions",
    name: "Grilled Steak Medallions",
    category: "protein",
    price: 17.0,
    portion: "per portion",
    image: { src: img("1546833999-b9f581a1996d"), alt: "Grilled steak medallions" },
    description:
      "Center-cut beef medallions grilled to your preferred temperature and finished with herb compound butter.",
    ingredients: ["Beef tenderloin", "Butter", "Rosemary", "Garlic", "Black pepper", "Sea salt"],
    nutrition: { servingSize: "1 portion (160 g)", calories: 520, totalFat: 32, saturatedFat: 14, transFat: 0, cholesterol: 150, sodium: 460, totalCarbohydrate: 1, dietaryFiber: 0, totalSugars: 0, protein: 54 },
  },

  // ---------- VEGETARIAN (10) ----------
  {
    id: "veg-roasted-vegetable-lasagna",
    name: "Roasted Vegetable Lasagna",
    category: "vegetarian",
    price: 11.0,
    portion: "per portion",
    image: { src: img("1621996346565-e3dbc646d9a9"), alt: "Roasted vegetable lasagna" },
    description:
      "Layers of roasted zucchini, eggplant and peppers with ricotta, marinara and bubbling mozzarella.",
    ingredients: ["Lasagna sheets", "Zucchini", "Eggplant", "Bell pepper", "Ricotta", "Mozzarella", "Marinara"],
    nutrition: { servingSize: "1 portion (200 g)", calories: 460, totalFat: 21, saturatedFat: 11, transFat: 0, cholesterol: 55, sodium: 680, totalCarbohydrate: 44, dietaryFiber: 5, totalSugars: 9, protein: 22 },
  },
  {
    id: "veg-wild-mushroom-risotto",
    name: "Wild Mushroom Risotto",
    category: "vegetarian",
    price: 12.5,
    portion: "per portion",
    image: { src: img("1473093295043-cdd812d0e601"), alt: "Wild mushroom risotto" },
    description:
      "Creamy arborio rice folded with a medley of wild mushrooms, parmesan and a touch of white wine.",
    ingredients: ["Arborio rice", "Wild mushrooms", "Parmesan", "White wine", "Vegetable stock", "Butter", "Thyme"],
    nutrition: { servingSize: "1 portion (180 g)", calories: 440, totalFat: 16, saturatedFat: 8, transFat: 0, cholesterol: 30, sodium: 540, totalCarbohydrate: 58, dietaryFiber: 3, totalSugars: 3, protein: 13 },
  },
  {
    id: "veg-eggplant-parmesan",
    name: "Eggplant Parmesan",
    category: "vegetarian",
    price: 10.5,
    portion: "per portion",
    image: { src: img("1563379926898-05f4575a45d8"), alt: "Eggplant parmesan" },
    description:
      "Breaded eggplant baked with marinara, mozzarella and parmesan until golden and bubbling.",
    ingredients: ["Eggplant", "Breadcrumbs", "Marinara", "Mozzarella", "Parmesan", "Basil", "Olive oil"],
    nutrition: { servingSize: "1 portion (190 g)", calories: 420, totalFat: 23, saturatedFat: 10, transFat: 0, cholesterol: 45, sodium: 720, totalCarbohydrate: 34, dietaryFiber: 7, totalSugars: 11, protein: 18 },
  },
  {
    id: "veg-vegetable-coconut-curry",
    name: "Vegetable Coconut Curry",
    category: "vegetarian",
    price: 10.5,
    portion: "per portion",
    image: { src: img("1547592180-85f173990554"), alt: "Vegetable coconut curry" },
    description:
      "A fragrant coconut curry of seasonal vegetables simmered with ginger, garlic and warming spices.",
    ingredients: ["Coconut milk", "Sweet potato", "Cauliflower", "Chickpea", "Ginger", "Curry spices", "Lime"],
    nutrition: { servingSize: "1 portion (200 g)", calories: 400, totalFat: 20, saturatedFat: 16, transFat: 0, cholesterol: 0, sodium: 520, totalCarbohydrate: 46, dietaryFiber: 9, totalSugars: 9, protein: 11 },
  },
  {
    id: "veg-spinach-ricotta-stuffed-shells",
    name: "Spinach Ricotta Stuffed Shells",
    category: "vegetarian",
    price: 10.5,
    portion: "per portion",
    image: { src: img("1559847844-5315695dadae"), alt: "Spinach ricotta stuffed shells" },
    description:
      "Jumbo pasta shells stuffed with creamy ricotta and spinach, baked in marinara under a blanket of mozzarella.",
    ingredients: ["Jumbo shells", "Ricotta", "Spinach", "Mozzarella", "Marinara", "Parmesan", "Nutmeg"],
    nutrition: { servingSize: "1 portion (200 g)", calories: 450, totalFat: 19, saturatedFat: 10, transFat: 0, cholesterol: 55, sodium: 640, totalCarbohydrate: 46, dietaryFiber: 4, totalSugars: 8, protein: 22 },
  },
  {
    id: "veg-grilled-vegetable-platter",
    name: "Grilled Vegetable Platter",
    category: "vegetarian",
    price: 9.5,
    portion: "per portion",
    image: { src: img("1512621776951-a57141f2eefd"), alt: "Grilled vegetable platter" },
    description:
      "A colorful platter of marinated, flame-grilled seasonal vegetables drizzled with balsamic glaze.",
    ingredients: ["Zucchini", "Bell pepper", "Asparagus", "Eggplant", "Balsamic glaze", "Olive oil", "Basil"],
    nutrition: { servingSize: "1 portion (170 g)", calories: 220, totalFat: 13, saturatedFat: 2, transFat: 0, cholesterol: 0, sodium: 260, totalCarbohydrate: 22, dietaryFiber: 7, totalSugars: 12, protein: 5 },
  },
  {
    id: "veg-chickpea-cauliflower-tagine",
    name: "Chickpea & Cauliflower Tagine",
    category: "vegetarian",
    price: 10.0,
    portion: "per portion",
    image: { src: img("1490645935967-10de6ba17061"), alt: "Chickpea and cauliflower tagine" },
    description:
      "A warming Moroccan tagine of chickpeas and cauliflower simmered with apricots, olives and saffron.",
    ingredients: ["Chickpea", "Cauliflower", "Apricot", "Green olive", "Saffron", "Onion", "Cinnamon"],
    nutrition: { servingSize: "1 portion (200 g)", calories: 360, totalFat: 11, saturatedFat: 1.5, transFat: 0, cholesterol: 0, sodium: 560, totalCarbohydrate: 52, dietaryFiber: 13, totalSugars: 16, protein: 14 },
  },
  {
    id: "veg-caprese-stuffed-portobello",
    name: "Caprese Stuffed Portobello",
    category: "vegetarian",
    price: 10.0,
    portion: "per portion",
    image: { src: img("1540189549336-e6e99c3679fe"), alt: "Caprese stuffed portobello" },
    description:
      "Roasted portobello caps stuffed with tomato, fresh mozzarella and basil, finished with balsamic reduction.",
    ingredients: ["Portobello mushroom", "Tomato", "Fresh mozzarella", "Basil", "Balsamic reduction", "Garlic", "Olive oil"],
    nutrition: { servingSize: "1 portion (170 g)", calories: 280, totalFat: 19, saturatedFat: 8, transFat: 0, cholesterol: 35, sodium: 400, totalCarbohydrate: 14, dietaryFiber: 4, totalSugars: 8, protein: 14 },
  },
  {
    id: "veg-butternut-squash-ravioli",
    name: "Butternut Squash Ravioli",
    category: "vegetarian",
    price: 11.5,
    portion: "per portion",
    image: { src: img("1476124369491-e7addf5db371"), alt: "Butternut squash ravioli" },
    description:
      "House-made ravioli filled with sweet butternut squash and sage, tossed in browned butter and walnuts.",
    ingredients: ["Ravioli pasta", "Butternut squash", "Sage", "Butter", "Walnut", "Parmesan"],
    nutrition: { servingSize: "1 portion (180 g)", calories: 470, totalFat: 20, saturatedFat: 10, transFat: 0, cholesterol: 45, sodium: 480, totalCarbohydrate: 60, dietaryFiber: 5, totalSugars: 6, protein: 13 },
  },
  {
    id: "veg-tofu-veggie-stir-fry",
    name: "Tofu Veggie Stir-Fry",
    category: "vegetarian",
    price: 9.5,
    portion: "per portion",
    image: { src: img("1607532941433-304659e8198a"), alt: "Tofu veggie stir-fry" },
    description:
      "Crispy tofu and crisp-tender vegetables tossed in a ginger-garlic soy glaze over the wok's high heat.",
    ingredients: ["Tofu", "Broccoli", "Carrot", "Bell pepper", "Soy sauce", "Ginger", "Garlic"],
    nutrition: { servingSize: "1 portion (180 g)", calories: 300, totalFat: 15, saturatedFat: 2, transFat: 0, cholesterol: 0, sodium: 690, totalCarbohydrate: 26, dietaryFiber: 6, totalSugars: 9, protein: 16 },
  },

  // ---------- SIDES (9) ----------
  {
    id: "side-herb-roasted-vegetables",
    name: "Herb Roasted Vegetables",
    category: "side",
    price: 7.0,
    portion: "per portion",
    image: { src: img("1546069901-ba9599a7e63c"), alt: "Herb roasted vegetables" },
    description:
      "A rustic mix of root and seasonal vegetables tossed in olive oil, garlic and herbs, roasted until caramelized.",
    ingredients: ["Carrot", "Sweet potato", "Red onion", "Zucchini", "Olive oil", "Rosemary", "Garlic"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 200, totalFat: 11, saturatedFat: 1.5, transFat: 0, cholesterol: 0, sodium: 240, totalCarbohydrate: 24, dietaryFiber: 6, totalSugars: 10, protein: 3 },
  },
  {
    id: "side-buttery-garlic-rice",
    name: "Buttery Garlic Rice",
    category: "side",
    price: 6.0,
    portion: "per portion",
    image: { src: img("1543339308-43e59d6b73a6"), alt: "Buttery garlic rice" },
    description:
      "Fluffy long-grain rice simmered in a light stock with butter, garlic and a hint of parsley.",
    ingredients: ["Long-grain rice", "Butter", "Garlic", "Vegetable stock", "Parsley", "Sea salt"],
    nutrition: { servingSize: "1 portion (140 g)", calories: 280, totalFat: 8, saturatedFat: 5, transFat: 0, cholesterol: 20, sodium: 300, totalCarbohydrate: 46, dietaryFiber: 1, totalSugars: 0, protein: 4 },
  },
  {
    id: "side-caesar-salad",
    name: "Caesar Salad",
    category: "side",
    price: 7.5,
    portion: "per portion",
    image: { src: img("1534080564583-6be75777b70a"), alt: "Caesar salad" },
    description:
      "Crisp romaine tossed in a creamy Caesar dressing with shaved parmesan and crunchy garlic croutons.",
    ingredients: ["Romaine lettuce", "Caesar dressing", "Parmesan", "Croutons", "Lemon", "Black pepper"],
    nutrition: { servingSize: "1 portion (140 g)", calories: 260, totalFat: 19, saturatedFat: 5, transFat: 0, cholesterol: 20, sodium: 520, totalCarbohydrate: 14, dietaryFiber: 3, totalSugars: 2, protein: 9 },
  },
  {
    id: "side-wood-fired-flatbread",
    name: "Wood-Fired Flatbread",
    category: "side",
    price: 8.0,
    portion: "per portion",
    image: { src: img("1565299624946-b28f40a0ae38"), alt: "Wood-fired flatbread" },
    description:
      "Chewy wood-fired flatbread brushed with olive oil and herbs, served warm with a side of tomato relish.",
    ingredients: ["Flour", "Olive oil", "Yeast", "Rosemary", "Sea salt", "Tomato relish"],
    nutrition: { servingSize: "1 portion (120 g)", calories: 320, totalFat: 10, saturatedFat: 2, transFat: 0, cholesterol: 0, sodium: 480, totalCarbohydrate: 50, dietaryFiber: 3, totalSugars: 2, protein: 8 },
  },
  {
    id: "side-mixed-berry-parfait",
    name: "Mixed Berry Parfait",
    category: "side",
    price: 6.5,
    portion: "per portion",
    image: { src: img("1565958011703-44f9829ba187"), alt: "Mixed berry parfait" },
    description:
      "Layers of vanilla yogurt, granola and a bright medley of fresh berries in a light, refreshing cup.",
    ingredients: ["Vanilla yogurt", "Granola", "Strawberry", "Blueberry", "Raspberry", "Honey"],
    nutrition: { servingSize: "1 portion (150 g)", calories: 230, totalFat: 6, saturatedFat: 2, transFat: 0, cholesterol: 8, sodium: 90, totalCarbohydrate: 38, dietaryFiber: 4, totalSugars: 24, protein: 7 },
  },
  {
    id: "side-seasoned-rice-pilaf",
    name: "Seasoned Rice Pilaf",
    category: "side",
    price: 6.0,
    portion: "per portion",
    image: { src: img("1432139555190-58524dae6a55"), alt: "Seasoned rice pilaf" },
    description:
      "Toasted rice pilaf with fine herbs, almonds and golden raisins — a light, aromatic accompaniment.",
    ingredients: ["Basmati rice", "Onion", "Almond", "Golden raisin", "Vegetable stock", "Parsley"],
    nutrition: { servingSize: "1 portion (140 g)", calories: 290, totalFat: 7, saturatedFat: 1, transFat: 0, cholesterol: 0, sodium: 330, totalCarbohydrate: 52, dietaryFiber: 2, totalSugars: 6, protein: 5 },
  },
  {
    id: "side-honey-butter-cornbread",
    name: "Honey Butter Cornbread",
    category: "side",
    price: 6.5,
    portion: "per portion",
    image: { src: img("1512058564366-18510be2db19"), alt: "Honey butter cornbread" },
    description:
      "Golden, slightly sweet cornbread baked in a cast-iron skillet and served with whipped honey butter.",
    ingredients: ["Cornmeal", "Flour", "Buttermilk", "Honey", "Butter", "Egg", "Baking powder"],
    nutrition: { servingSize: "1 portion (110 g)", calories: 340, totalFat: 14, saturatedFat: 8, transFat: 0, cholesterol: 60, sodium: 360, totalCarbohydrate: 48, dietaryFiber: 2, totalSugars: 16, protein: 6 },
  },
  {
    id: "side-roasted-green-beans-almondine",
    name: "Roasted Green Beans Almondine",
    category: "side",
    price: 7.0,
    portion: "per portion",
    image: { src: img("1598515214211-89d3c73ae83b"), alt: "Roasted green beans almondine" },
    description:
      "Crisp green beans roasted with toasted almonds, lemon zest and brown butter.",
    ingredients: ["Green beans", "Almond", "Butter", "Lemon", "Garlic", "Sea salt"],
    nutrition: { servingSize: "1 portion (130 g)", calories: 190, totalFat: 14, saturatedFat: 6, transFat: 0, cholesterol: 22, sodium: 210, totalCarbohydrate: 13, dietaryFiber: 5, totalSugars: 4, protein: 5 },
  },
  {
    id: "side-buttermilk-pancakes",
    name: "Buttermilk Pancakes",
    category: "side",
    price: 6.0,
    portion: "per stack",
    image: { src: img("1567620905732-2d1ec7ab7445"), alt: "Buttermilk pancakes" },
    description:
      "Light, fluffy buttermilk pancakes griddled golden, served with maple syrup on the side.",
    ingredients: ["Flour", "Buttermilk", "Egg", "Baking powder", "Butter", "Maple syrup"],
    nutrition: { servingSize: "1 stack (160 g)", calories: 410, totalFat: 13, saturatedFat: 6, transFat: 0, cholesterol: 80, sodium: 540, totalCarbohydrate: 62, dietaryFiber: 2, totalSugars: 18, protein: 10 },
  },
];

export const ITEM_MAP = Object.fromEntries(ITEMS.map((item) => [item.id, item]));

// Each day of the week has a unique menu: 5 protein, 3 vegetarian, 2 sides.
export const WEEKLY_MENU = {
  monday: [
    "protein-grilled-herb-chicken",
    "protein-lemon-garlic-salmon",
    "protein-bbq-pulled-pork",
    "protein-teriyaki-chicken-skewers",
    "protein-smash-burger-sliders",
    "veg-roasted-vegetable-lasagna",
    "veg-wild-mushroom-risotto",
    "veg-eggplant-parmesan",
    "side-herb-roasted-vegetables",
    "side-buttery-garlic-rice",
  ],
  tuesday: [
    "protein-herb-crusted-beef-brisket",
    "protein-honey-glazed-ham",
    "protein-garlic-butter-shrimp",
    "protein-braised-short-ribs",
    "protein-chicken-piccata",
    "veg-vegetable-coconut-curry",
    "veg-spinach-ricotta-stuffed-shells",
    "veg-grilled-vegetable-platter",
    "side-caesar-salad",
    "side-wood-fired-flatbread",
  ],
  wednesday: [
    "protein-roast-turkey-breast",
    "protein-cajun-blackened-catfish",
    "protein-moroccan-lamb-meatballs",
    "protein-thai-basil-chicken",
    "protein-stuffed-pork-loin",
    "veg-chickpea-cauliflower-tagine",
    "veg-caprese-stuffed-portobello",
    "veg-butternut-squash-ravioli",
    "side-mixed-berry-parfait",
    "side-seasoned-rice-pilaf",
  ],
  thursday: [
    "protein-grilled-steak-medallions",
    "protein-grilled-herb-chicken",
    "protein-bbq-pulled-pork",
    "protein-herb-crusted-beef-brisket",
    "protein-garlic-butter-shrimp",
    "veg-tofu-veggie-stir-fry",
    "veg-roasted-vegetable-lasagna",
    "veg-vegetable-coconut-curry",
    "side-honey-butter-cornbread",
    "side-roasted-green-beans-almondine",
  ],
  friday: [
    "protein-lemon-garlic-salmon",
    "protein-teriyaki-chicken-skewers",
    "protein-honey-glazed-ham",
    "protein-braised-short-ribs",
    "protein-cajun-blackened-catfish",
    "veg-wild-mushroom-risotto",
    "veg-spinach-ricotta-stuffed-shells",
    "veg-chickpea-cauliflower-tagine",
    "side-buttermilk-pancakes",
    "side-herb-roasted-vegetables",
  ],
  saturday: [
    "protein-smash-burger-sliders",
    "protein-chicken-piccata",
    "protein-roast-turkey-breast",
    "protein-moroccan-lamb-meatballs",
    "protein-grilled-steak-medallions",
    "veg-eggplant-parmesan",
    "veg-grilled-vegetable-platter",
    "veg-caprese-stuffed-portobello",
    "side-buttery-garlic-rice",
    "side-caesar-salad",
  ],
  sunday: [
    "protein-grilled-herb-chicken",
    "protein-herb-crusted-beef-brisket",
    "protein-roast-turkey-breast",
    "protein-thai-basil-chicken",
    "protein-stuffed-pork-loin",
    "veg-roasted-vegetable-lasagna",
    "veg-spinach-ricotta-stuffed-shells",
    "veg-butternut-squash-ravioli",
    "side-wood-fired-flatbread",
    "side-mixed-berry-parfait",
  ],
};

export function getMenuForDay(dayKey) {
  return (WEEKLY_MENU[dayKey] || []).map((id) => ITEM_MAP[id]);
}
