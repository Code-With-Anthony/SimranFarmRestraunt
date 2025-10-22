import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const Checkout = () => {
  const { cart, clearCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [tempOrderData, setTempOrderData] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    alternateMobile: "",
    address: "",
    pincode: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const { data, error } = await supabase.rpc("validate_coupon", {
        coupon_code_param: couponCode.toUpperCase(),
        order_amount: totalAmount,
      });

      if (error) throw error;

      if (data && data[0]?.is_valid) {
        setAppliedCoupon(couponCode.toUpperCase());
        setDiscount(data[0].discount_amount);
        toast.success(data[0].message);
      } else {
        toast.error(data?.[0]?.message || "Invalid coupon");
      }
    } catch (error: any) {
      toast.error("Failed to apply coupon");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobileNumber || !formData.email || !formData.address || !formData.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);

    try {
      // Store form data temporarily
      setTempOrderData({
        formData,
        finalAmount: totalAmount - discount,
      });

      // Send OTP
      const { data, error } = await supabase.functions.invoke("send-otp", {
        body: {
          email: formData.email,
          mobile: formData.mobileNumber,
          customerName: formData.fullName,
        },
      });

      if (error) throw error;

      toast.success("OTP sent to your email");
      setShowOTPDialog(true);
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpLoading(true);

    try {
      // Verify OTP
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-otp", {
        body: {
          email: formData.email,
          mobile: formData.mobileNumber,
          otpCode: otp,
        },
      });

      if (verifyError) throw verifyError;

      if (!verifyData?.success) {
        toast.error(verifyData?.message || "Invalid OTP");
        return;
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          customer_name: formData.fullName,
          customer_email: formData.email,
          delivery_mobile: formData.mobileNumber,
          delivery_alternative_mobile: formData.alternateMobile || null,
          delivery_address: formData.address,
          delivery_pincode: formData.pincode,
          subtotal: totalAmount,
          discount_amount: discount,
          total_amount: tempOrderData.finalAmount,
          coupon_code: appliedCoupon || null,
        }] as any)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        menu_item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        quantity: item.quantity,
        price_at_time: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Increment coupon usage if coupon was applied
      if (appliedCoupon) {
        await supabase.rpc("increment_coupon_usage", {
          coupon_code_param: appliedCoupon,
        });
      }

      // Send order confirmation email
      await supabase.functions.invoke("send-order-confirmation", {
        body: {
          customerName: formData.fullName,
          customerEmail: formData.email,
          orderNumber: order.order_number,
          items: orderItems,
          subtotal: totalAmount,
          discountAmount: discount,
          totalAmount: tempOrderData.finalAmount,
          couponCode: appliedCoupon,
          deliveryAddress: formData.address,
          deliveryMobile: formData.mobileNumber,
          deliveryPincode: formData.pincode,
        },
      });

      toast.success("Order placed successfully! Check your email for confirmation.");
      clearCart();
      navigate("/");
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const finalAmount = totalAmount - discount;

  if (showOTPDialog) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-subtle">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="font-playfair text-3xl">Verify OTP</CardTitle>
              <p className="text-muted-foreground mt-2">
                Enter the 6-digit code sent to {formData.email}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full"
                  disabled={otpLoading || otp.length !== 6}
                >
                  {otpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify & Place Order
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setShowOTPDialog(false);
                    setOtp("");
                  }}
                >
                  Back to Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      <div className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="font-playfair text-4xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="font-playfair">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="10-digit number"
                    maxLength={10}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateMobile">Alternate Mobile</Label>
                  <Input
                    id="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={(e) => setFormData({ ...formData, alternateMobile: e.target.value })}
                    placeholder="Optional"
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Proceed to Verify
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="font-playfair">Apply Coupon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={handleApplyCoupon}>Apply</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <span className="font-medium text-success">{appliedCoupon} applied!</span>
                    <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                      Remove
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="font-playfair">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.portion}`} className="flex justify-between text-sm">
                      <span>
                        {item.name} ({item.portion}) x{item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
