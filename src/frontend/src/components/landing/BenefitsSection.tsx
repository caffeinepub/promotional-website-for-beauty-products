import { Sparkles, Droplet, Leaf } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Sourced from nature, our formulas harness the power of botanical extracts and organic compounds.'
  },
  {
    icon: Droplet,
    title: 'Deep Hydration',
    description: 'Advanced moisture-locking technology keeps your skin hydrated and supple throughout the day.'
  },
  {
    icon: Sparkles,
    title: 'Visible Results',
    description: 'Clinically proven formulas that deliver noticeable improvements in skin texture and radiance.'
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Why Choose Our Products
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of premium skincare backed by science
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Icon Set Display */}
        <div className="mt-20 flex justify-center">
          <div className="relative w-full max-w-md aspect-square opacity-20">
            <img
              src="/assets/generated/icons-beauty-set.dim_512x512.png"
              alt="Beauty icons"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
