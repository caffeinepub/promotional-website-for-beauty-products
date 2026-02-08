import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllProducts } from '@/hooks/useQueries';
import { navigateToProduct } from '@/router/useHashRoute';
import { mapBackendProduct, generateSlug } from '@/data/products';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedProductsSection() {
  const { data: backendProducts = [], isLoading } = useGetAllProducts();
  const products = backendProducts.map(mapBackendProduct);

  return (
    <section id="products" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Featured Collection
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted formulas that bring out your natural beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border-2 h-full">
                  <Skeleton className="aspect-square w-full" />
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No products available at the moment.</p>
            </div>
          ) : (
            products.map((product) => {
              const slug = product.slug || generateSlug(product.name);
              return (
                <a
                  key={product.id.toString()}
                  href={`#/product/${slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToProduct(slug);
                  }}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                >
                  <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
