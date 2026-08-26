// ---------------------------------------------------------------------------
// Business & menu data for Hearth & Home Catering.
//
// Each day of the week has its own unique menu of 10 items:
//   5 protein · 3 vegetarian · 2 sides
// Images are fixed, directly-embedded URLs from Unsplash (free to use).
// ---------------------------------------------------------------------------

export const BUSINESS = {
  name: 'Hearth & Home Catering',
  tagline: 'Homemade food, prepared fresh for pickup',
  phone: '(555) 012-3456',
  phoneHref: 'tel:+15550123456',
  email: 'hello@hearthandhome.example',
  address: '128 Willow Lane, Springfield',
  hours: 'Pickup hours: 11:00 AM – 6:00 PM, daily',
  social: {
    instagram: 'https://instagram.com/hearthandhome',
    facebook: 'https://facebook.com/hearthandhome',
    twitter: 'https://twitter.com/hearthandhome',
  },
}

// Fixed free image URLs (Unsplash). Keys are reused across the 70 items.
const RAW_IMG = {
  salad: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  saladBowl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  pancakes: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
  dessert: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  platter: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  veggies: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  soup: 'https://images.unsplash.com/photo-1547592180-85f173990554',
  soup2: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
  bowl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
  chicken: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
  meat: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
  grilledChicken: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
  ribs: 'https://images.unsplash.com/photo-1544025162-d76694265947',
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
  steak: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
  steak2: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55',
  steak3: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
  rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
  shrimpPasta: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
  cake: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
  noodles: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
  curry: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
  tacos: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
  bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
  corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076',
  mac: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686',
  egg: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
}

const img = (key, w = 800) =>
  `${RAW_IMG[key]}?w=${w}&q=80&auto=format&fit=crop`

export const CATEGORIES = {
  protein: { label: 'Protein', description: 'Hearty mains built around meat, poultry & seafood' },
  vegetarian: { label: 'Vegetarian', description: 'Wholesome, satisfying plant-forward dishes' },
  sides: { label: 'Sides', description: 'The perfect companions to round out your table' },
}

// Nutrition per portion (1 portion ≈ serves one guest).
const n = (calories, fat, satFat, cholesterol, sodium, carbs, fiber, sugar, protein) => ({
  servingSize: '1 portion',
  calories,
  fat,
  satFat,
  cholesterol,
  sodium,
  carbs,
  fiber,
  sugar,
  protein,
})

// item(id, name, category, price, imageKey, description, ingredients, nutrition)
const item = (id, name, category, price, imageKey, description, ingredients, nutrition) => ({
  id,
  name,
  category,
  price,
  image: img(imageKey),
  description,
  ingredients,
  nutrition,
})

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

// MENUS keyed by JS weekday (0 = Sunday … 6 = Saturday).
export const MENUS = {
  0: {
    title: 'Sunday Roast Classics',
    blurb: 'A comforting, slow-cooked spread worthy of a proper Sunday table.',
    items: [
      item('sun-roast-beef', 'Herb-Crusted Roast Beef', 'protein', 16, 'steak3',
        'Slow-roasted top round crusted with rosemary, thyme and cracked pepper, sliced thin and finished with pan jus.',
        ['Top round beef', 'Fresh rosemary & thyme', 'Black pepper', 'Garlic', 'Olive oil', 'Beef stock jus'],
        n(420, 18, 7, 110, 640, 3, 0, 1, 54)),
      item('sun-roast-chicken', 'Butter-Basted Roast Chicken', 'protein', 14, 'grilledChicken',
        'Whole chicken roasted with lemon and herb butter until the skin is crisp and the meat is tender.',
        ['Whole chicken', 'Butter', 'Lemon', 'Garlic', 'Thyme', 'Sea salt'],
        n(390, 21, 8, 135, 520, 1, 0, 0, 47)),
      item('sun-pork-loin', 'Cider-Glazed Pork Loin', 'protein', 15, 'meat',
        'Pork loin roasted with apple cider glaze and whole-grain mustard for a sweet-savory finish.',
        ['Pork loin', 'Apple cider', 'Whole-grain mustard', 'Honey', 'Onion', 'Sage'],
        n(380, 16, 5, 105, 560, 12, 0, 10, 42)),
      item('sun-salmon', 'Dill & Lemon Salmon', 'protein', 18, 'salmon',
        'Oven-baked salmon fillet brushed with lemon, fresh dill and a touch of butter.',
        ['Atlantic salmon', 'Lemon', 'Fresh dill', 'Butter', 'Garlic', 'Salt & pepper'],
        n(360, 20, 5, 90, 340, 1, 0, 0, 40)),
      item('sun-meatloaf', 'Family-Style Meatloaf', 'protein', 12, 'steak2',
        'Classic homestyle meatloaf with a tangy tomato glaze, made from scratch and baked in a pan.',
        ['Ground beef & pork', 'Breadcrumbs', 'Egg', 'Onion', 'Tomato glaze', 'Worcestershire'],
        n(440, 24, 9, 120, 780, 14, 1, 7, 36)),
      item('sun-veg-gratin', 'Root Vegetable Gratin', 'vegetarian', 10, 'saladBowl',
        'Layered potato, sweet potato and parsnip baked in cream with gruyère and thyme.',
        ['Potato', 'Sweet potato', 'Parsnip', 'Heavy cream', 'Gruyère', 'Thyme'],
        n(310, 17, 10, 55, 420, 30, 4, 6, 9)),
      item('sun-veg-stuffed', 'Stuffed Butternut Squash', 'vegetarian', 11, 'veggies',
        'Roasted butternut squash halves filled with wild rice, cranberries and toasted pecans.',
        ['Butternut squash', 'Wild rice', 'Cranberries', 'Pecans', 'Maple syrup', 'Sage'],
        n(290, 9, 1.5, 0, 380, 49, 6, 14, 6)),
      item('sun-veg-greens', 'Garlic Sautéed Greens', 'vegetarian', 8, 'salad',
        'Hearty kale and Swiss chard wilted with garlic, chili flakes and a squeeze of lemon.',
        ['Kale', 'Swiss chard', 'Garlic', 'Lemon', 'Olive oil', 'Chili flakes'],
        n(120, 7, 1, 0, 260, 12, 4, 2, 4)),
      item('sun-side-potato', 'Garlic Mashed Potatoes', 'sides', 6, 'bowl',
        'Buttery mashed Yukon gold potatoes whipped with roasted garlic and cream.',
        ['Yukon gold potato', 'Butter', 'Cream', 'Roasted garlic', 'Chives', 'Salt'],
        n(240, 10, 6, 30, 460, 33, 3, 2, 4)),
      item('sun-side-yorkshire', 'Yorkshire Puddings', 'sides', 5, 'bread',
        'Golden, airy popovers made the traditional way with beef drippings.',
        ['Flour', 'Eggs', 'Milk', 'Beef drippings', 'Salt'],
        n(180, 8, 2, 70, 220, 22, 1, 2, 6)),
    ],
  },
  1: {
    title: 'Monday Comfort',
    blurb: 'Warm, familiar dishes to ease you into the week.',
    items: [
      item('mon-chicken-pot', 'Chicken Pot Pie Filling', 'protein', 13, 'chicken',
        'Tender chicken and vegetables in a velvety herb cream, ready to spoon over biscuits or pastry.',
        ['Chicken thigh', 'Carrot', 'Peas', 'Celery', 'Herb cream sauce', 'Puff pastry crumble'],
        n(430, 22, 9, 95, 720, 28, 3, 4, 30)),
      item('mon-beef-stew', 'Slow-Braised Beef Stew', 'protein', 14, 'steak2',
        'Chunks of beef braised low and slow with root vegetables in a rich red-wine broth.',
        ['Beef chuck', 'Carrot', 'Potato', 'Onion', 'Red wine', 'Beef stock'],
        n(410, 17, 6, 90, 810, 26, 4, 6, 38)),
      item('mon-turkey', 'Herb Turkey Meatballs', 'protein', 13, 'meat',
        'Juicy turkey meatballs simmered in marinara with fresh basil and parmesan.',
        ['Ground turkey', 'Breadcrumbs', 'Parmesan', 'Marinara', 'Basil', 'Garlic'],
        n(330, 14, 5, 85, 690, 14, 2, 6, 34)),
      item('mon-tilapia', 'Lemon Butter Tilapia', 'protein', 15, 'salmon',
        'Flaky tilapia fillets pan-seared in brown butter with capers and lemon.',
        ['Tilapia', 'Butter', 'Lemon', 'Capers', 'Parsley', 'Garlic'],
        n(280, 13, 6, 90, 480, 2, 0, 0, 36)),
      item('mon-sausage', 'Bangers & Onion Gravy', 'protein', 12, 'ribs',
        'Savory pork sausages smothered in slow-cooked caramelized onion gravy.',
        ['Pork sausage', 'Onion', 'Beef stock', 'Flour', 'Butter', 'Thyme'],
        n(460, 30, 12, 100, 950, 18, 2, 5, 24)),
      item('mon-veg-mac', 'Three-Cheese Mac & Cheese', 'vegetarian', 9, 'mac',
        'Cavatappi folded into a silky sauce of sharp cheddar, gruyère and fontina.',
        ['Cavatappi', 'Cheddar', 'Gruyère', 'Fontina', 'Milk', 'Butter'],
        n(420, 20, 12, 55, 640, 42, 2, 5, 17)),
      item('mon-veg-lentil', 'Hearty Lentil Shepherd’s Pie', 'vegetarian', 10, 'bowl',
        'Savory lentils and mushrooms under a golden cloud of mashed potato.',
        ['Lentils', 'Mushroom', 'Carrot', 'Potato', 'Vegetable stock', 'Butter'],
        n(320, 10, 5, 25, 620, 46, 10, 6, 13)),
      item('mon-veg-cauliflower', 'Roasted Cauliflower Steaks', 'vegetarian', 8, 'saladBowl',
        'Thick cauliflower slices roasted with smoked paprika and finished with romesco.',
        ['Cauliflower', 'Smoked paprika', 'Romesco', 'Olive oil', 'Almond', 'Lemon'],
        n(150, 9, 1.5, 0, 340, 14, 5, 5, 5)),
      item('mon-side-green-beans', 'Sautéed Green Beans', 'sides', 5, 'veggies',
        'Crisp green beans tossed with shallots, toasted almonds and brown butter.',
        ['Green beans', 'Shallot', 'Almond', 'Butter', 'Lemon zest'],
        n(120, 8, 3, 10, 210, 10, 4, 3, 3)),
      item('mon-side-cornbread', 'Honey Cornbread', 'sides', 5, 'bread',
        'Golden skillet cornbread sweetened with local honey, baked until just crumbly.',
        ['Cornmeal', 'Flour', 'Buttermilk', 'Honey', 'Egg', 'Butter'],
        n(230, 9, 5, 45, 330, 34, 1, 12, 5)),
    ],
  },
  2: {
    title: 'Taco Tuesday',
    blurb: 'A festive build-your-own taco bar, made from scratch.',
    items: [
      item('tue-carne-asada', 'Carne Asada', 'protein', 15, 'steak',
        'Marinated grilled flank steak sliced thin, with a bright citrus-garlic marinade.',
        ['Flank steak', 'Lime', 'Orange', 'Garlic', 'Cilantro', 'Chili'],
        n(340, 18, 6, 90, 560, 3, 0, 1, 40)),
      item('tue-pollo', 'Citrus Grilled Chicken', 'protein', 13, 'grilledChicken',
        'Chicken thighs marinated in citrus and achiote, grilled until charred and juicy.',
        ['Chicken thigh', 'Orange juice', 'Achiote', 'Garlic', 'Cumin', 'Lime'],
        n(310, 15, 4, 130, 540, 4, 0, 2, 38)),
      item('tue-carnitas', 'Slow-Cooked Carnitas', 'protein', 14, 'meat',
        'Pork shoulder braised for hours then crisped, served with its own cooking jus.',
        ['Pork shoulder', 'Orange', 'Bay leaf', 'Cumin', 'Oregano', 'Garlic'],
        n(400, 26, 9, 100, 620, 2, 0, 1, 36)),
      item('tue-shrimp', 'Chipotle Garlic Shrimp', 'protein', 17, 'shrimpPasta',
        'Plump shrimp seared with chipotle, garlic and butter with a squeeze of lime.',
        ['Shrimp', 'Chipotle', 'Garlic', 'Butter', 'Lime', 'Cilantro'],
        n(240, 11, 6, 180, 780, 5, 0, 1, 30)),
      item('tue-birria', 'Beef Birria', 'protein', 16, 'curry',
        'Tender shredded beef in a rich, smoky consommé of dried chiles and warm spices.',
        ['Beef chuck', 'Guajillo chile', 'Ancho chile', 'Cinnamon', 'Tomato', 'Onion'],
        n(380, 20, 8, 95, 700, 10, 2, 4, 38)),
      item('tue-veg-blackbean', 'Black Bean & Sweet Potato', 'vegetarian', 9, 'bowl',
        'Roasted sweet potato and spiced black beans — a hearty, colorful filling.',
        ['Sweet potato', 'Black beans', 'Cumin', 'Lime', 'Cilantro', 'Onion'],
        n(240, 6, 1, 0, 420, 42, 12, 8, 9)),
      item('tue-veg-rajas', 'Rajas con Crema', 'vegetarian', 8, 'veggies',
        'Roasted poblano strips folded into crema with sweet corn and onion.',
        ['Poblano pepper', 'Corn', 'Crema', 'Onion', 'Garlic', 'Queso fresco'],
        n(190, 12, 6, 30, 350, 16, 3, 5, 6)),
      item('tue-veg-elote', 'Elote-Style Roasted Corn', 'vegetarian', 7, 'corn',
        'Charred corn with crema, cotija, lime and a dusting of chili powder.',
        ['Corn', 'Crema', 'Cotija', 'Lime', 'Chili powder', 'Cilantro'],
        n(220, 11, 5, 25, 360, 28, 4, 7, 8)),
      item('tue-side-rice', 'Cilantro Lime Rice', 'sides', 5, 'rice',
        'Fluffy long-grain rice tossed with fresh cilantro and lime zest.',
        ['Rice', 'Cilantro', 'Lime', 'Garlic', 'Vegetable stock'],
        n(210, 3, 0.5, 0, 300, 43, 1, 0, 4)),
      item('tue-side-pico', 'Fresh Pico de Gallo', 'sides', 5, 'salad',
        'Bright chopped tomato, onion, jalapeño and cilantro with lime and salt.',
        ['Tomato', 'Onion', 'Jalapeño', 'Cilantro', 'Lime', 'Sea salt'],
        n(30, 0, 0, 0, 180, 7, 2, 4, 1)),
    ],
  },
  3: {
    title: 'Midweek Medley',
    blurb: 'Balanced, nourishing plates to carry you through the middle of the week.',
    items: [
      item('wed-lemon-chicken', 'Lemon Herb Chicken', 'protein', 14, 'grilledChicken',
        'Pan-roasted chicken breast in a bright lemon, garlic and oregano sauce.',
        ['Chicken breast', 'Lemon', 'Garlic', 'Oregano', 'Olive oil', 'White wine'],
        n(300, 12, 3, 100, 520, 3, 0, 1, 42)),
      item('wed-beef-stirfry', 'Ginger Beef Stir-Fry', 'protein', 15, 'steak3',
        'Sliced beef wok-tossed with ginger, broccoli and a savory soy glaze.',
        ['Beef sirloin', 'Broccoli', 'Ginger', 'Soy sauce', 'Sesame oil', 'Scallion'],
        n(350, 16, 5, 80, 860, 14, 4, 7, 34)),
      item('wed-pork-chop', 'Apple-Braised Pork Chops', 'protein', 15, 'meat',
        'Thick-cut pork chops braised with apples, onion and warm spices.',
        ['Pork chop', 'Apple', 'Onion', 'Cider', 'Thyme', 'Cinnamon'],
        n(390, 19, 7, 110, 610, 15, 2, 11, 38)),
      item('wed-whitefish', 'Herb-Crusted Whitefish', 'protein', 16, 'salmon',
        'Flaky whitefish topped with a crunchy herb-panko crust, baked to perfection.',
        ['Whitefish', 'Panko', 'Parsley', 'Lemon', 'Butter', 'Dijon mustard'],
        n(290, 13, 5, 85, 480, 10, 1, 1, 32)),
      item('wed-turkey-chili', 'White Bean Turkey Chili', 'protein', 12, 'curry',
        'Lean ground turkey simmered with white beans, green chiles and cumin.',
        ['Ground turkey', 'White beans', 'Green chile', 'Onion', 'Cumin', 'Chicken stock'],
        n(320, 9, 2.5, 60, 740, 28, 8, 4, 33)),
      item('wed-veg-risotto', 'Mushroom Risotto', 'vegetarian', 11, 'bowl',
        'Creamy arborio rice slowly stirred with wild mushrooms and parmesan.',
        ['Arborio rice', 'Wild mushrooms', 'Parmesan', 'Vegetable stock', 'Shallot', 'Butter'],
        n(380, 14, 7, 30, 620, 52, 2, 3, 11)),
      item('wed-veg-eggplant', 'Eggplant Parmesan', 'vegetarian', 10, 'saladBowl',
        'Crispy baked eggplant layered with marinara and bubbling mozzarella.',
        ['Eggplant', 'Marinara', 'Mozzarella', 'Parmesan', 'Breadcrumbs', 'Basil'],
        n(340, 18, 8, 40, 760, 32, 6, 10, 16)),
      item('wed-veg-farro', 'Farro & Roasted Veg Bowl', 'vegetarian', 9, 'veggies',
        'Chewy farro tossed with roasted peppers, zucchini and a lemon-tahini dressing.',
        ['Farro', 'Bell pepper', 'Zucchini', 'Tahini', 'Lemon', 'Parsley'],
        n(280, 11, 1.5, 0, 380, 40, 7, 6, 9)),
      item('wed-side-asparagus', 'Lemon Roasted Asparagus', 'sides', 6, 'salad',
        'Tender asparagus spears roasted with lemon, garlic and a shower of parmesan.',
        ['Asparagus', 'Lemon', 'Garlic', 'Parmesan', 'Olive oil'],
        n(90, 6, 1.5, 5, 200, 7, 3, 3, 4)),
      item('wed-side-couscous', 'Herbed Couscous', 'sides', 5, 'rice',
        'Fluffy pearl couscous with parsley, mint, lemon and toasted pine nuts.',
        ['Pearl couscous', 'Parsley', 'Mint', 'Lemon', 'Pine nuts', 'Olive oil'],
        n(220, 7, 1, 0, 300, 35, 3, 1, 7)),
    ],
  },
  4: {
    title: 'Throwback Thursday',
    blurb: 'Childhood favorites, elevated and made from scratch.',
    items: [
      item('thu-fried-chicken', 'Buttermilk Fried Chicken', 'protein', 14, 'chicken',
        'Crispy, golden buttermilk-brined fried chicken with a peppery crust.',
        ['Chicken', 'Buttermilk', 'Flour', 'Paprika', 'Black pepper', 'Peanut oil'],
        n(520, 30, 7, 140, 680, 18, 1, 2, 40)),
      item('thu-meatloaf', 'Brown Sugar Meatloaf', 'protein', 12, 'steak2',
        'Tender meatloaf glazed with brown sugar and ketchup, just like grandma made.',
        ['Ground beef', 'Breadcrumbs', 'Onion', 'Brown sugar', 'Ketchup', 'Egg'],
        n(430, 22, 9, 120, 820, 20, 1, 14, 32)),
      item('thu-chicken-noodle', 'Chicken Noodle Casserole', 'protein', 13, 'pasta',
        'Egg noodles, shredded chicken and peas baked in a creamy herb sauce.',
        ['Chicken', 'Egg noodles', 'Peas', 'Carrot', 'Cream sauce', 'Cheddar'],
        n(420, 18, 8, 90, 760, 40, 3, 4, 28)),
      item('thu-fish-sticks', 'Homemade Fish & Chips', 'protein', 15, 'fries',
        'Beer-battered whitefish with crispy hand-cut potatoes and tartar sauce.',
        ['Whitefish', 'Beer batter', 'Potato', 'Flour', 'Lemon', 'Tartar sauce'],
        n(560, 28, 4, 70, 640, 55, 4, 3, 30)),
      item('thu-pulled-pork', 'BBQ Pulled Pork', 'protein', 14, 'ribs',
        'Pork shoulder smoked low and slow, tossed in tangy house barbecue sauce.',
        ['Pork shoulder', 'BBQ sauce', 'Apple cider vinegar', 'Brown sugar', 'Smoked paprika'],
        n(440, 24, 8, 105, 780, 22, 1, 18, 36)),
      item('thu-veg-tater', 'Cheesy Tater Tot Bake', 'vegetarian', 8, 'mac',
        'Crispy tots over a cheesy, creamy base — pure comfort in a pan.',
        ['Tater tots', 'Cheddar', 'Cream of mushroom', 'Onion', 'Sour cream'],
        n(380, 22, 10, 35, 720, 36, 3, 3, 10)),
      item('thu-veg-grilled-cheese', 'Tomato Soup & Grilled Cheese', 'vegetarian', 9, 'soup2',
        'Roasted tomato basil soup with three-cheese grilled cheese fingers.',
        ['Tomato', 'Basil', 'Cream', 'Bread', 'Cheddar', 'Mozzarella'],
        n(410, 20, 11, 50, 880, 44, 4, 12, 15)),
      item('thu-veg-broccoli', 'Broccoli Cheese Rice', 'vegetarian', 8, 'bowl',
        'Creamy rice with tender broccoli and a sharp cheddar sauce.',
        ['Rice', 'Broccoli', 'Cheddar', 'Milk', 'Butter', 'Flour'],
        n(330, 14, 8, 40, 620, 42, 3, 4, 11)),
      item('thu-side-mac-salad', 'Classic Macaroni Salad', 'sides', 5, 'pasta',
        'Elbow macaroni with a creamy, tangy dressing, celery and red onion.',
        ['Macaroni', 'Mayonnaise', 'Celery', 'Red onion', 'Vinegar', 'Sugar'],
        n(280, 15, 2.5, 10, 420, 32, 2, 6, 5)),
      item('thu-side-coleslaw', 'Creamy Coleslaw', 'sides', 4, 'salad',
        'Shredded cabbage and carrot in a light, tangy buttermilk dressing.',
        ['Cabbage', 'Carrot', 'Buttermilk', 'Mayonnaise', 'Apple cider vinegar'],
        n(130, 9, 1.5, 8, 260, 11, 3, 7, 2)),
    ],
  },
  5: {
    title: 'Friday Family Favorites',
    blurb: 'Crowd-pleasing classics to kick off the weekend.',
    items: [
      item('fri-burger-sliders', 'Smash Burger Sliders', 'protein', 13, 'burger',
        'Griddle-smashed beef patties with melty cheese, pickles and house sauce.',
        ['Ground beef', 'Brioche buns', 'American cheese', 'Pickle', 'Onion', 'House sauce'],
        n(480, 26, 11, 95, 720, 32, 1, 7, 28)),
      item('fri-fried-chicken', 'Honey Garlic Chicken', 'protein', 14, 'chicken',
        'Crispy chicken tossed in a sticky honey-garlic glaze with sesame and scallion.',
        ['Chicken', 'Honey', 'Garlic', 'Soy sauce', 'Sesame', 'Scallion'],
        n(460, 22, 5, 130, 800, 30, 1, 20, 38)),
      item('fri-bbq-ribs', 'Sticky BBQ Ribs', 'protein', 17, 'ribs',
        'Fall-off-the-bone ribs lacquered with smoky-sweet barbecue sauce.',
        ['Pork ribs', 'BBQ sauce', 'Brown sugar', 'Smoked paprika', 'Garlic powder'],
        n(560, 34, 12, 140, 880, 24, 1, 20, 38)),
      item('fri-shrimp-scampi', 'Garlic Shrimp Scampi', 'protein', 18, 'shrimpPasta',
        'Shrimp in a garlicky white-wine butter sauce with lemon and parsley.',
        ['Shrimp', 'Garlic', 'Butter', 'White wine', 'Lemon', 'Parsley'],
        n(340, 19, 10, 210, 640, 4, 0, 1, 32)),
      item('fri-chicken-parm', 'Chicken Parmesan', 'protein', 15, 'pizza',
        'Breaded chicken cutlets topped with marinara and bubbling mozzarella.',
        ['Chicken breast', 'Breadcrumbs', 'Marinara', 'Mozzarella', 'Parmesan', 'Basil'],
        n(470, 21, 8, 120, 820, 34, 3, 8, 40)),
      item('fri-veg-pizza', 'Margherita Pizza', 'vegetarian', 9, 'pizza',
        'Hand-stretched dough with crushed tomato, fresh mozzarella and basil.',
        ['Pizza dough', 'Tomato', 'Fresh mozzarella', 'Basil', 'Olive oil'],
        n(380, 14, 6, 30, 620, 48, 3, 5, 16)),
      item('fri-veg-caesar', 'Grilled Veggie Platter', 'vegetarian', 10, 'veggies',
        'Charred zucchini, peppers and eggplant with a bright lemon-herb vinaigrette.',
        ['Zucchini', 'Bell pepper', 'Eggplant', 'Lemon', 'Herbs', 'Olive oil'],
        n(140, 9, 1.5, 0, 280, 14, 5, 7, 3)),
      item('fri-veg-falafel', 'Falafel with Tahini', 'vegetarian', 9, 'saladBowl',
        'Crispy chickpea fritters with creamy tahini sauce and pickled vegetables.',
        ['Chickpeas', 'Parsley', 'Garlic', 'Cumin', 'Tahini', 'Lemon'],
        n(320, 14, 2, 0, 540, 38, 8, 4, 11)),
      item('fri-side-wedges', 'Loaded Potato Wedges', 'sides', 6, 'fries',
        'Crispy seasoned wedges topped with cheddar, bacon bits and sour cream.',
        ['Potato', 'Cheddar', 'Bacon', 'Sour cream', 'Scallion', 'Paprika'],
        n(340, 17, 7, 25, 620, 40, 4, 3, 10)),
      item('fri-side-garden', 'Garden Salad', 'sides', 5, 'salad',
        'Crisp greens, cherry tomatoes, cucumber and red onion with house vinaigrette.',
        ['Mixed greens', 'Cherry tomato', 'Cucumber', 'Red onion', 'Vinaigrette'],
        n(110, 8, 1, 0, 200, 9, 3, 4, 2)),
    ],
  },
  6: {
    title: 'Saturday Grill',
    blurb: 'Backyard barbecue flavors, ready to pick up and serve.',
    items: [
      item('sat-grilled-steak', 'Grilled Ribeye Steak', 'protein', 20, 'steak',
        'Char-grilled ribeye finished with compound herb butter and flaky salt.',
        ['Ribeye', 'Compound butter', 'Rosemary', 'Garlic', 'Sea salt', 'Black pepper'],
        n(540, 36, 16, 140, 480, 1, 0, 0, 48)),
      item('sat-grilled-chicken', 'BBQ Grilled Chicken', 'protein', 13, 'grilledChicken',
        'Chicken pieces basted in smoky barbecue sauce and grilled over open flame.',
        ['Chicken', 'BBQ sauce', 'Smoked paprika', 'Garlic', 'Brown sugar'],
        n(360, 16, 4, 150, 680, 14, 0, 12, 40)),
      item('sat-kebabs', 'Marinated Beef Kebabs', 'protein', 16, 'meat',
        'Tender beef cubes skewered with peppers and onion in a garlic-herb marinade.',
        ['Beef sirloin', 'Bell pepper', 'Red onion', 'Garlic', 'Oregano', 'Olive oil'],
        n(370, 20, 7, 95, 560, 10, 2, 6, 36)),
      item('sat-grilled-salmon', 'Cedar-Plank Salmon', 'protein', 19, 'salmon',
        'Salmon grilled on cedar with a maple-mustard glaze.',
        ['Salmon', 'Cedar plank', 'Maple syrup', 'Dijon mustard', 'Lemon'],
        n(400, 22, 5, 90, 380, 8, 0, 6, 38)),
      item('sat-brats', 'Grilled Bratwurst', 'protein', 12, 'ribs',
        'Juicy bratwurst grilled until snappy, served with caramelized onions.',
        ['Bratwurst', 'Onion', 'Butter', 'Beer', 'Mustard'],
        n(450, 32, 12, 85, 980, 12, 1, 5, 24)),
      item('sat-veg-burger', 'Grilled Portobello Burgers', 'vegetarian', 10, 'burger',
        'Marinated portobello caps grilled and stacked with arugula and garlic aioli.',
        ['Portobello', 'Brioche bun', 'Arugula', 'Garlic aioli', 'Balsamic'],
        n(320, 16, 3, 10, 560, 38, 4, 8, 9)),
      item('sat-veg-corn-salad', 'Charred Corn & Avocado Salad', 'vegetarian', 8, 'corn',
        'Grilled corn, creamy avocado and cotija tossed in a lime-chili dressing.',
        ['Corn', 'Avocado', 'Cotija', 'Lime', 'Chili', 'Cilantro'],
        n(260, 16, 5, 15, 320, 27, 7, 8, 7)),
      item('sat-veg-caprese', 'Caprese Skewers', 'vegetarian', 7, 'saladBowl',
        'Fresh mozzarella, tomato and basil drizzled with balsamic glaze.',
        ['Fresh mozzarella', 'Tomato', 'Basil', 'Balsamic glaze', 'Olive oil'],
        n(180, 13, 6, 30, 240, 7, 1, 4, 9)),
      item('sat-side-potato-salad', 'Smoky Potato Salad', 'sides', 6, 'bowl',
        'Creamy potato salad with smoked paprika, celery and fresh dill.',
        ['Potato', 'Mayonnaise', 'Celery', 'Smoked paprika', 'Dill', 'Mustard'],
        n(270, 16, 3, 20, 480, 30, 3, 4, 4)),
      item('sat-side-grilled-corn', 'Grilled Corn on the Cob', 'sides', 5, 'corn',
        'Sweet corn grilled in the husk and finished with herb butter.',
        ['Corn', 'Butter', 'Herbs', 'Salt', 'Lime'],
        n(160, 7, 4, 15, 180, 21, 2, 6, 4)),
    ],
  },
}

export const MENU_ITEM_MAP = Object.values(MENUS).reduce((map, menu) => {
  menu.items.forEach((it) => {
    map[it.id] = it
  })
  return map
}, {})

// ---------------------------------------------------------------------------
// Ordering rules
// ---------------------------------------------------------------------------
export const ORDER_RULES = {
  minPortions: 6,
  maxPortions: 30,
  minLeadDays: 2, // earliest pickup = 2 days from today
  maxLeadDays: 14, // latest pickup = 14 days from today
  paymentMethods: [
    { id: 'card', label: 'Credit / Debit Card' },
    { id: 'cash', label: 'Cash on Pickup' },
    { id: 'venmo', label: 'Venmo' },
    { id: 'zelle', label: 'Zelle' },
  ],
  pickupTimes: [
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '5:30 PM',
  ],
}

// Date helpers -----------------------------------------------------------------
export function toLocalISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date, days) {
  const out = new Date(date)
  out.setDate(out.getDate() + days)
  return out
}

export function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Returns true if the given Date is a valid pickup date per the ordering rules.
export function isPickupDateValid(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)
  const diffDays = Math.round((target - today) / 86400000)
  return (
    diffDays >= ORDER_RULES.minLeadDays && diffDays <= ORDER_RULES.maxLeadDays
  )
}

export function getMenuForDate(date) {
  return MENUS[date.getDay()]
}

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`
}
