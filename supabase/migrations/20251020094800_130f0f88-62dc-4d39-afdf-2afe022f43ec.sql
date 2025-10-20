-- Add new columns to menu_items table
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS is_veg boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS ingredients text,
ADD COLUMN IF NOT EXISTS calories integer;

-- Update existing menu items with complete information
UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Aromatic basmati rice, mixed vegetables, Indian spices, saffron',
  calories = 350
WHERE name = 'Veg Biryani' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Aromatic basmati rice, mixed vegetables, Indian spices, saffron',
  calories = 200
WHERE name = 'Veg Biryani' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Basmati rice, chicken pieces, onions, yogurt, spices, saffron',
  calories = 450
WHERE name = 'Chicken Biryani' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Basmati rice, chicken pieces, onions, yogurt, spices, saffron',
  calories = 250
WHERE name = 'Chicken Biryani' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Basmati rice, mutton pieces, onions, yogurt, spices, saffron',
  calories = 500
WHERE name = 'Mutton Biryani' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Basmati rice, mutton pieces, onions, yogurt, spices, saffron',
  calories = 280
WHERE name = 'Mutton Biryani' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Chickpeas, onions, tomatoes, ginger, garlic, Indian spices',
  calories = 320
WHERE name = 'Chole' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Chickpeas, onions, tomatoes, ginger, garlic, Indian spices',
  calories = 180
WHERE name = 'Chole' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Black lentils, kidney beans, butter, cream, tomatoes, spices',
  calories = 380
WHERE name = 'Dal Makhani' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Black lentils, kidney beans, butter, cream, tomatoes, spices',
  calories = 210
WHERE name = 'Dal Makhani' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Cottage cheese, bell peppers, onions, tomatoes, spices',
  calories = 340
WHERE name = 'Paneer Tikka' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Cottage cheese, bell peppers, onions, tomatoes, spices',
  calories = 190
WHERE name = 'Paneer Tikka' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Chicken pieces, yogurt, cream, butter, tomatoes, cashews, spices',
  calories = 420
WHERE name = 'Butter Chicken' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Chicken pieces, yogurt, cream, butter, tomatoes, cashews, spices',
  calories = 240
WHERE name = 'Butter Chicken' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Chicken pieces, yogurt, tandoori spices, lemon juice',
  calories = 280
WHERE name = 'Tandoori Chicken' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Chicken pieces, yogurt, tandoori spices, lemon juice',
  calories = 160
WHERE name = 'Tandoori Chicken' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Mutton pieces, onions, tomatoes, yogurt, spices',
  calories = 480
WHERE name = 'Mutton Curry' AND portion = 'Full';

UPDATE public.menu_items SET
  is_veg = false,
  ingredients = 'Mutton pieces, onions, tomatoes, yogurt, spices',
  calories = 270
WHERE name = 'Mutton Curry' AND portion = 'Half';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Wheat flour, water, ghee',
  calories = 120
WHERE name = 'Roti' AND portion = 'Piece';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Wheat flour, yogurt, milk, ghee, baking powder',
  calories = 200
WHERE name = 'Naan' AND portion = 'Piece';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Wheat flour, butter, ghee',
  calories = 180
WHERE name = 'Paratha' AND portion = 'Piece';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Basmati rice',
  calories = 150
WHERE name = 'Plain Rice' AND portion = 'Bowl';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Basmati rice, cumin seeds, ghee',
  calories = 180
WHERE name = 'Jeera Rice' AND portion = 'Bowl';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Yogurt, cucumber, onions, tomatoes, spices',
  calories = 80
WHERE name = 'Raita' AND portion = 'Bowl';

UPDATE public.menu_items SET
  is_veg = true,
  ingredients = 'Onions, green chilies, lemon, spices',
  calories = 30
WHERE name = 'Salad' AND portion = 'Plate';