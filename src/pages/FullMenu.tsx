import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import all food images
import dalMakhani from "@/assets/dal-makhani.jpg";
import dalFry from "@/assets/dal-fry.jpg";
import butterChicken from "@/assets/butter-chicken.jpg";
import garlicNaan from "@/assets/garlic-naan.jpg";
import plainNaan from "@/assets/plain-naan.jpg";
import cheeseNaan from "@/assets/cheese-naan.jpg";
import alooParatha from "@/assets/aloo-paratha.jpg";
import lachhaParatha from "@/assets/lachha-paratha.jpg";
import tandooriRoti from "@/assets/tandoori-roti.jpg";
import paneerTikka from "@/assets/paneer-tikka.jpg";
import paneerButterMasala from "@/assets/paneer-butter-masala.jpg";
import biryani from "@/assets/biryani.jpg";
import jeeraRice from "@/assets/jeera-rice.jpg";
import chickenTikka from "@/assets/chicken-tikka.jpg";
import mangoLassi from "@/assets/mango-lassi.jpg";
import vegCurry from "@/assets/veg-curry.jpg";
import { useNavigate } from "react-router-dom";

// Image mapping for menu items
const imageMap: Record<string, string> = {
  '/src/assets/dal-makhani.jpg': dalMakhani,
  '/src/assets/dal-fry.jpg': dalFry,
  '/src/assets/butter-chicken.jpg': butterChicken,
  '/src/assets/garlic-naan.jpg': garlicNaan,
  '/src/assets/plain-naan.jpg': plainNaan,
  '/src/assets/cheese-naan.jpg': cheeseNaan,
  '/src/assets/aloo-paratha.jpg': alooParatha,
  '/src/assets/lachha-paratha.jpg': lachhaParatha,
  '/src/assets/tandoori-roti.jpg': tandooriRoti,
  '/src/assets/paneer-tikka.jpg': paneerTikka,
  '/src/assets/paneer-butter-masala.jpg': paneerButterMasala,
  '/src/assets/biryani.jpg': biryani,
  '/src/assets/jeera-rice.jpg': jeeraRice,
  '/src/assets/chicken-tikka.jpg': chickenTikka,
  '/src/assets/mango-lassi.jpg': mangoLassi,
  '/src/assets/veg-curry.jpg': vegCurry,
};

interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  portion: string;
  description: string | null;
  image_url: string | null;
  is_veg: boolean;
  ingredients: string | null;
  calories: number | null;
}

const FullMenu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart, removeFromCart, updateQuantity, totalItems, totalAmount } = useCart();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('category')
      .order('price', { ascending: false });

    if (error) {
      toast.error("Failed to load menu");
      console.error(error);
    } else {
      setMenuItems(data || []);
    }
    setLoading(false);
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const getItemQuantity = (id: string, portion: string) => {
    const item = cart.find(i => i.id === id && i.portion === portion);
    return item?.quantity || 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      portion: item.portion,
      category: item.category
    });
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Complete Menu
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto shadow-elegant"></div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="animate-fade-in">
                <h2 className="font-playfair text-3xl font-bold text-primary mb-6 pb-2 border-b-2 border-border">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => {
                    const quantity = getItemQuantity(item.id, item.portion);
                    return (
                      <Card key={`${item.id}-${item.portion}`} className="overflow-hidden shadow-soft hover:shadow-elegant transition-smooth border-border">
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <img
                            src={item.image_url ? (imageMap[item.image_url] || item.image_url) : plainNaan}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute top-3 right-3 w-8 h-8 rounded border-2 flex items-center justify-center ${item.is_veg ? 'bg-white border-green-600' : 'bg-white border-red-600'}`}>
                            <div className={`w-3 h-3 rounded-full ${item.is_veg ? 'bg-green-600' : 'bg-red-600'}`} />
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-foreground mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">{item.portion}</p>
                            </div>
                            <span className="font-bold text-primary text-xl">
                              ₹{item.price}
                            </span>
                          </div>

                          {item.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          <div className="space-y-2 mb-4">
                            {item.ingredients && (
                              <div>
                                <p className="text-xs font-semibold text-foreground mb-1">Ingredients:</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{item.ingredients}</p>
                              </div>
                            )}

                            {item.calories && (
                              <p className="text-xs text-muted-foreground">
                                <span className="font-semibold">Calories:</span> {item.calories} kcal
                              </p>
                            )}
                          </div>

                          {quantity > 0 ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-muted rounded-lg p-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    const cartItem = cart.find(i => i.id === item.id && i.portion === item.portion);
                                    if (cartItem && cartItem.quantity > 1) {
                                      updateQuantity(item.id, item.portion, cartItem.quantity - 1);
                                    } else {
                                      removeFromCart(item.id, item.portion);
                                    }
                                  }}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-semibold min-w-[2rem] text-center">
                                  {quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <span className="text-sm font-semibold text-primary">
                                ₹{item.price * quantity}
                              </span>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleAddToCart(item)}
                              className="w-full"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
          <Card className="shadow-elegant border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                  <p className="text-2xl font-bold text-primary">₹{totalAmount}</p>
                </div>
                <Button size="lg" onClick={() => navigate('/cart')}>
                  View Cart
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.portion}`} className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.name} ({item.portion}) x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FullMenu;
