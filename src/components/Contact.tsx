import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-6 bg-gradient-elegant">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visit Us Today
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto shadow-elegant mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to serve you with warmth and excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">
                  123 Farm Road, Green Valley<br />
                  Your City, State - 123456
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-secondary/10 p-3 rounded-full h-fit">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">
                  +91 98765 43210<br />
                  +91 87654 32109
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">
                  info@simranfarm.com<br />
                  reservations@simranfarm.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-accent/50 p-3 rounded-full h-fit">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Sunday<br />
                  11:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-soft p-8 animate-scale-in">
            <h3 className="font-playfair text-2xl font-bold mb-6 text-foreground">
              Reserve Your Table
            </h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              />
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              />
              <input 
                type="time" 
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              />
              <input 
                type="number" 
                placeholder="Number of Guests" 
                min="1"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              />
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-elegant transition-smooth"
              >
                Confirm Reservation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
