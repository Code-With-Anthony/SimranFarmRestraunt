import interior from "@/assets/interior-elegant.jpg";
import outdoor from "@/assets/farm-outdoor.jpg";

const Gallery = () => {
  return (
    <section className="py-20 px-6 bg-gradient-elegant">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Ambiance
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto shadow-elegant mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step into a world of elegance and comfort
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-elegant transition-smooth animate-fade-in-up">
            <img 
              src={interior} 
              alt="Elegant Restaurant Interior"
              className="w-full h-[400px] object-cover transition-smooth group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end">
              <div className="p-6 text-white">
                <h3 className="font-playfair text-2xl font-bold mb-2">Royal Interior</h3>
                <p className="text-white/90">Experience luxury dining in our elegantly designed space</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-elegant transition-smooth animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src={outdoor} 
              alt="Farm Outdoor Dining"
              className="w-full h-[400px] object-cover transition-smooth group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end">
              <div className="p-6 text-white">
                <h3 className="font-playfair text-2xl font-bold mb-2">Farm Dining</h3>
                <p className="text-white/90">Dine under the stars surrounded by nature's beauty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
