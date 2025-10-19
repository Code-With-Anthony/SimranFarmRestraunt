import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroDining from "@/assets/hero-dining.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroDining})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
          Simran Farm & Restaurant
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-elegant"></div>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
          Experience Royal Dining Where Tradition Meets Elegance
        </p>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Indulge in authentic cuisine crafted with love, served in an ambiance that echoes warmth and sophistication
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 shadow-elegant transition-smooth transform hover:scale-105"
          >
            Reserve Your Table
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-foreground font-semibold text-lg px-8 py-6 transition-smooth transform hover:scale-105"
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </div>

      {/* Decorative Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
