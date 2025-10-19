import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    text: "An absolutely royal experience! The ambiance is breathtaking and the food is beyond delicious. Every visit feels like a special occasion.",
    rating: 5
  },
  {
    name: "Rajesh Patel",
    text: "The butter chicken here is the best I've ever had. The attention to detail in both food and service is remarkable. Highly recommended!",
    rating: 5
  },
  {
    name: "Anita Singh",
    text: "Perfect blend of traditional flavors and modern elegance. The outdoor farm dining is magical. A must-visit for food lovers!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Guests Say
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto shadow-elegant mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories from our valued patrons
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="shadow-soft hover:shadow-elegant transition-smooth transform hover:-translate-y-2 animate-fade-in-up border-border"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-playfair text-lg font-semibold text-foreground">
                  — {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
