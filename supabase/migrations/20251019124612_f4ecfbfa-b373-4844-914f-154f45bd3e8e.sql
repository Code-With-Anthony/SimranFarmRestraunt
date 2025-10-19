-- Fix validate_coupon function with proper search_path
CREATE OR REPLACE FUNCTION validate_coupon(
  coupon_code_param TEXT,
  order_amount DECIMAL
)
RETURNS TABLE (
  is_valid BOOLEAN,
  discount_amount DECIMAL,
  message TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  coupon_record RECORD;
  calculated_discount DECIMAL;
BEGIN
  -- Fetch coupon
  SELECT * INTO coupon_record
  FROM public.coupons
  WHERE code = coupon_code_param
  AND is_active = true
  AND (valid_until IS NULL OR valid_until > now())
  AND (usage_limit IS NULL OR times_used < usage_limit);

  -- Check if coupon exists and is valid
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 0::DECIMAL, 'Invalid or expired coupon code';
    RETURN;
  END IF;

  -- Check minimum order amount
  IF order_amount < coupon_record.min_order_amount THEN
    RETURN QUERY SELECT false, 0::DECIMAL, 
      'Minimum order amount of ₹' || coupon_record.min_order_amount || ' required';
    RETURN;
  END IF;

  -- Calculate discount
  IF coupon_record.discount_type = 'percentage' THEN
    calculated_discount := (order_amount * coupon_record.discount_value / 100);
    IF coupon_record.max_discount IS NOT NULL AND calculated_discount > coupon_record.max_discount THEN
      calculated_discount := coupon_record.max_discount;
    END IF;
  ELSE
    calculated_discount := coupon_record.discount_value;
  END IF;

  RETURN QUERY SELECT true, calculated_discount, 'Coupon applied successfully';
END;
$$;