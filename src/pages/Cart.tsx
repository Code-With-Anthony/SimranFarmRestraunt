import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-8">Add some delicious items to get started!</p>
          <Link to="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-8">
            Shopping Cart ({totalItems} items)
          </h1>

          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.portion}`} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.portion} • {item.category}
                      </p>
                      <p className="text-primary font-bold mt-1">₹{item.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.portion, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.portion, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id, item.portion)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="font-bold text-lg text-foreground">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-elegant border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
              <Button onClick={handleCheckout} size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
