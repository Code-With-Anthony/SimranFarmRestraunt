-- Make user_id nullable in orders table to support anonymous orders
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies for orders to allow anonymous access
DROP POLICY IF EXISTS "Anyone can view orders by order number" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can update orders" ON public.orders;

CREATE POLICY "Anyone can view orders by order number" ON public.orders
FOR SELECT USING (true);

CREATE POLICY "Anyone can create orders" ON public.orders
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update orders" ON public.orders
FOR UPDATE USING (true);

-- Update RLS policies for order_items
DROP POLICY IF EXISTS "Anyone can view order items" ON public.order_items;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;

CREATE POLICY "Anyone can view order items" ON public.order_items
FOR SELECT USING (true);

CREATE POLICY "Anyone can create order items" ON public.order_items
FOR INSERT WITH CHECK (true);