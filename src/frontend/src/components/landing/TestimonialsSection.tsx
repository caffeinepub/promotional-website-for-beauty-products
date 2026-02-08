import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetAllTestimonials } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useGetAllTestimonials();

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real people who trust our products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-12 w-12 rounded-full mr-4" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No testimonials available yet.</p>
            </div>
          ) : (
            testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(testimonial.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.author}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
