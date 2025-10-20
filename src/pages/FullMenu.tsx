import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  portion: string;
  description: string | null;
}

const FullMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

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
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-foreground">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">{item.portion}</p>
                            </div>
                            <span className="font-bold text-primary text-xl">
                              ₹{item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.description}
                            </p>
                          )}
                          {quantity > 0 ? (
                            <div className="flex items-center gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleAddToCart(item)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <span className="font-semibold min-w-[2rem] text-center">
                                {quantity}
                              </span>
                              <span className="text-sm text-muted-foreground">in cart</span>
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

      <Footer />
    </div>
  );
};

export default FullMenu;
