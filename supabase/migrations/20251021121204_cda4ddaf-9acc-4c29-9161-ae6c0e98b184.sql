-- Update Dal items with images, descriptions, and calories
UPDATE menu_items SET 
  image_url = '/src/assets/dal-makhani.jpg',
  description = 'Creamy black lentils and kidney beans slow-cooked with butter, cream, and aromatic spices',
  ingredients = 'Black lentils, kidney beans, butter, cream, tomatoes, ginger, garlic, spices',
  calories = 285
WHERE name = 'Dal Makhani';

UPDATE menu_items SET 
  image_url = '/src/assets/dal-fry.jpg',
  description = 'Yellow lentils tempered with cumin, garlic, and aromatic spices',
  ingredients = 'Yellow lentils, cumin, garlic, onions, tomatoes, turmeric, ghee',
  calories = 210
WHERE name = 'Dal Fry';

UPDATE menu_items SET 
  image_url = '/src/assets/dal-fry.jpg',
  description = 'Buttery yellow lentils cooked to perfection with aromatic tempering',
  ingredients = 'Yellow lentils, butter, cumin, garlic, onions, tomatoes, spices',
  calories = 245
WHERE name = 'Dal Fry Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/dal-fry.jpg',
  description = 'Yellow lentils with traditional tadka of cumin, mustard seeds, and curry leaves',
  ingredients = 'Yellow lentils, cumin seeds, mustard seeds, curry leaves, ghee, spices',
  calories = 220
WHERE name = 'Dal Fry Tadka';

-- Update Indian Bread items
UPDATE menu_items SET 
  image_url = '/src/assets/aloo-paratha.jpg',
  description = 'Whole wheat flatbread stuffed with spiced mashed potatoes',
  ingredients = 'Whole wheat flour, potatoes, onions, green chilies, coriander, spices',
  calories = 320
WHERE name = 'Aloo Paratha';

UPDATE menu_items SET 
  image_url = '/src/assets/cheese-naan.jpg',
  description = 'Soft naan bread topped with cheese, garlic, green chilies, and butter',
  ingredients = 'All-purpose flour, cheese, garlic, green chilies, butter, yogurt',
  calories = 385
WHERE name = 'Cheese Chilly Garlic Naan';

UPDATE menu_items SET 
  image_url = '/src/assets/cheese-naan.jpg',
  description = 'Fluffy naan bread topped with cheese, garlic, and butter',
  ingredients = 'All-purpose flour, cheese, garlic, butter, yogurt, milk',
  calories = 350
WHERE name = 'Cheese Garlic Naan';

UPDATE menu_items SET 
  image_url = '/src/assets/cheese-naan.jpg',
  description = 'Soft naan bread stuffed with melted cheese',
  ingredients = 'All-purpose flour, cheese, butter, yogurt, milk',
  calories = 330
WHERE name = 'Cheese Naan';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Minced chicken spiced and stuffed in whole wheat flatbread',
  ingredients = 'Whole wheat flour, minced chicken, onions, ginger, garlic, spices',
  calories = 380,
  is_veg = false
WHERE name = 'Chicken Kheema Paratha';

UPDATE menu_items SET 
  image_url = '/src/assets/garlic-naan.jpg',
  description = 'Soft naan bread topped with fresh garlic and butter',
  ingredients = 'All-purpose flour, garlic, butter, yogurt, milk',
  calories = 290
WHERE name = 'Garlic Naan';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Soft leavened Indian bread brushed with butter',
  ingredients = 'All-purpose flour, butter, yogurt, milk, sugar',
  calories = 270
WHERE name = 'Kulcha Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Soft leavened Indian bread from the tandoor',
  ingredients = 'All-purpose flour, yogurt, milk, sugar, baking powder',
  calories = 250
WHERE name = 'Kulcha Plain';

UPDATE menu_items SET 
  image_url = '/src/assets/lachha-paratha.jpg',
  description = 'Multi-layered whole wheat flatbread brushed with butter',
  ingredients = 'Whole wheat flour, butter, ghee, milk',
  calories = 310
WHERE name = 'Lachha Paratha Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/lachha-paratha.jpg',
  description = 'Crispy layered whole wheat flatbread',
  ingredients = 'Whole wheat flour, ghee, milk',
  calories = 280
WHERE name = 'Lachha Paratha Plain';

UPDATE menu_items SET 
  image_url = '/src/assets/lachha-paratha.jpg',
  description = 'South Indian style layered flatbread with flaky texture',
  ingredients = 'All-purpose flour, egg, ghee, oil, milk',
  calories = 295
WHERE name = 'Malabar Paratha';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Minced mutton spiced and stuffed in whole wheat flatbread',
  ingredients = 'Whole wheat flour, minced mutton, onions, ginger, garlic, spices',
  calories = 420,
  is_veg = false
WHERE name = 'Mutton Kheema Paratha';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Traditional tandoor-baked bread brushed with butter',
  ingredients = 'All-purpose flour, butter, yogurt, milk, sugar',
  calories = 280
WHERE name = 'Naan Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Classic tandoor-baked leavened Indian bread',
  ingredients = 'All-purpose flour, yogurt, milk, sugar, yeast',
  calories = 260
WHERE name = 'Naan Plain';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Paper-thin handkerchief bread brushed with butter',
  ingredients = 'All-purpose flour, butter, milk',
  calories = 230
WHERE name = 'Roomali Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/plain-naan.jpg',
  description = 'Ultra-thin paper-like Indian flatbread',
  ingredients = 'All-purpose flour, milk, salt',
  calories = 200
WHERE name = 'Roomali Plain';

UPDATE menu_items SET 
  image_url = '/src/assets/tandoori-roti.jpg',
  description = 'Whole wheat tandoor-baked bread with butter',
  ingredients = 'Whole wheat flour, butter, milk',
  calories = 240
WHERE name = 'Tandoori Roti Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/tandoori-roti.jpg',
  description = 'Traditional whole wheat flatbread from the tandoor',
  ingredients = 'Whole wheat flour, milk, salt',
  calories = 210
WHERE name = 'Tandoori Roti Plain';

UPDATE menu_items SET 
  image_url = '/src/assets/tandoori-roti.jpg',
  description = 'Whole wheat flatbread cooked on griddle with butter',
  ingredients = 'Whole wheat flour, butter, water',
  calories = 220
WHERE name = 'Tawa Roti Butter';

UPDATE menu_items SET 
  image_url = '/src/assets/tandoori-roti.jpg',
  description = 'Simple whole wheat flatbread cooked on griddle',
  ingredients = 'Whole wheat flour, water, salt',
  calories = 190
WHERE name = 'Tawa Roti Plain';

-- Update Butter Chicken items
UPDATE menu_items SET 
  image_url = '/src/assets/butter-chicken.jpg',
  description = 'Tender chicken pieces in rich, creamy tomato-butter gravy with aromatic spices',
  ingredients = 'Chicken, butter, cream, tomatoes, cashews, ginger, garlic, spices',
  is_veg = false
WHERE name = 'Butter Chicken' AND calories IS NULL;

UPDATE menu_items SET 
  is_veg = false
WHERE name = 'Butter Chicken';

-- Update other non-veg items
UPDATE menu_items SET 
  image_url = '/src/assets/chicken-tikka.jpg',
  description = 'Spicy and flavorful chicken curry with bold spices',
  ingredients = 'Chicken, onions, tomatoes, ginger, garlic, red chili, spices',
  calories = 320,
  is_veg = false
WHERE name LIKE '%Chicken Garma%';

UPDATE menu_items SET 
  image_url = '/src/assets/butter-chicken.jpg',
  description = 'Chicken cooked in rich cashew and cream gravy',
  ingredients = 'Chicken, cashews, cream, onions, tomatoes, spices',
  calories = 380,
  is_veg = false
WHERE name LIKE '%Chicken Korma%';

UPDATE menu_items SET 
  image_url = '/src/assets/chicken-tikka.jpg',
  description = 'Yogurt-marinated grilled chicken with aromatic spices',
  ingredients = 'Chicken, yogurt, ginger, garlic, spices, lemon juice',
  calories = 280,
  is_veg = false
WHERE name LIKE '%Chicken Tikka%' AND name NOT LIKE '%Masala%';

UPDATE menu_items SET 
  image_url = '/src/assets/butter-chicken.jpg',
  description = 'Grilled chicken tikka in creamy tomato gravy',
  ingredients = 'Chicken tikka, cream, tomatoes, butter, cashews, spices',
  calories = 340,
  is_veg = false
WHERE name LIKE '%Chicken Tikka Masala%';

-- Update Paneer items
UPDATE menu_items SET 
  image_url = '/src/assets/paneer-butter-masala.jpg',
  description = 'Cottage cheese cubes in rich, creamy tomato-butter gravy',
  ingredients = 'Paneer, butter, cream, tomatoes, cashews, spices',
  calories = 320
WHERE name LIKE '%Paneer Butter Masala%';

UPDATE menu_items SET 
  image_url = '/src/assets/paneer-tikka.jpg',
  description = 'Grilled cottage cheese marinated with yogurt and spices',
  ingredients = 'Paneer, yogurt, bell peppers, onions, ginger, garlic, spices',
  calories = 260
WHERE name LIKE '%Paneer Tikka%' AND name NOT LIKE '%Masala%';

UPDATE menu_items SET 
  image_url = '/src/assets/paneer-butter-masala.jpg',
  description = 'Cottage cheese cubes in spinach gravy with aromatic spices',
  ingredients = 'Paneer, spinach, cream, onions, tomatoes, ginger, garlic, spices',
  calories = 280
WHERE name LIKE '%Palak Paneer%';

-- Update Rice items
UPDATE menu_items SET 
  image_url = '/src/assets/jeera-rice.jpg',
  description = 'Fragrant basmati rice tempered with cumin seeds',
  ingredients = 'Basmati rice, cumin seeds, ghee, salt',
  calories = 210
WHERE name LIKE '%Jeera Rice%';

UPDATE menu_items SET 
  image_url = '/src/assets/biryani.jpg',
  description = 'Aromatic basmati rice layered with spiced chicken and herbs',
  ingredients = 'Basmati rice, chicken, yogurt, onions, spices, saffron, mint',
  calories = 420,
  is_veg = false
WHERE name LIKE '%Chicken Biryani%';

UPDATE menu_items SET 
  image_url = '/src/assets/biryani.jpg',
  description = 'Fragrant basmati rice layered with mixed vegetables and spices',
  ingredients = 'Basmati rice, mixed vegetables, yogurt, onions, spices, saffron',
  calories = 340
WHERE name LIKE '%Veg Biryani%' OR name LIKE '%Vegetable Biryani%';

-- Update remaining items with generic descriptions and calories where missing
UPDATE menu_items 
SET description = 'Delicious ' || name || ' prepared with authentic Indian spices and ingredients'
WHERE description IS NULL;

UPDATE menu_items 
SET ingredients = 'Fresh ingredients and traditional Indian spices'
WHERE ingredients IS NULL;

UPDATE menu_items 
SET calories = CASE 
  WHEN category = 'Dal' THEN 230
  WHEN category = 'Indian Bread' THEN 250
  WHEN category LIKE '%Main Course%' THEN 300
  WHEN category LIKE '%Rice%' THEN 280
  WHEN category LIKE '%Beverage%' THEN 150
  ELSE 250
END
WHERE calories IS NULL;