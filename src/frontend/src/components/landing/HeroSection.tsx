import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/beauty-hero.dim_1920x900.png"
          alt="Beauty products hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Radiance Redefined
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Discover the art of natural beauty with our luxurious, science-backed skincare collection
        </p>
        <Button
          size="lg"
          onClick={scrollToProducts}
          className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore Collection
        </Button>
      </div>
    </section>
  );
}
