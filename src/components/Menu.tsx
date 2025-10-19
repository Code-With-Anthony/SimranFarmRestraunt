import { Card, CardContent } from "@/components/ui/card";
import butterChicken from "@/assets/dish-butter-chicken.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import tandoori from "@/assets/dish-tandoori.jpg";

const dishes = [
  {
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato-based curry with aromatic spices",
    image: butterChicken,
    price: "₹450"
  },
  {
    name: "Royal Biryani",
    description: "Fragrant basmati rice layered with succulent meat and saffron",
    image: biryani,
    price: "₹380"
  },
  {
    name: "Tandoori Platter",
    description: "Assorted grilled delicacies from our traditional clay oven",
    image: tandoori,
    price: "₹520"
  }
];

const Menu = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Signature Dishes
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto shadow-elegant mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indulge in our carefully curated selection of authentic Indian delicacies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <Card 
              key={dish.name} 
              className="overflow-hidden shadow-soft hover:shadow-elegant transition-smooth transform hover:-translate-y-2 animate-fade-in-up border-border"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover transition-smooth hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-elegant">
                  {dish.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-3 text-foreground">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dish.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
