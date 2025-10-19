import { Sparkles, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-6 bg-gradient-elegant">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Story
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto shadow-elegant"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-up">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nestled in the heart of nature, <span className="font-semibold text-foreground">Simran Farm & Restaurant</span> brings 
              you an extraordinary culinary journey that celebrates the richness of Indian cuisine with a royal touch.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our story began with a simple vision: to create a dining experience that combines traditional flavors 
              with contemporary elegance, all while maintaining the warmth of home-cooked meals.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every dish is prepared with the finest ingredients, sourced fresh from our farm, ensuring that each bite 
              is a testament to quality, authenticity, and love.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 animate-scale-in">
            <div className="bg-card p-6 rounded-lg shadow-soft transition-smooth hover:shadow-elegant transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Authentic Flavors</h3>
                  <p className="text-muted-foreground">
                    Traditional recipes passed down through generations, prepared with passion
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-soft transition-smooth hover:shadow-elegant transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Farm Fresh</h3>
                  <p className="text-muted-foreground">
                    Ingredients sourced directly from our organic farm to your plate
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-soft transition-smooth hover:shadow-elegant transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-accent/30 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Royal Experience</h3>
                  <p className="text-muted-foreground">
                    Elegant ambiance and warm hospitality that makes every visit special
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
