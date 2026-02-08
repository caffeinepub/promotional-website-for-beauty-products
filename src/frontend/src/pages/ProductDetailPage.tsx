import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductBySlug, mapBackendProduct } from '@/data/products';
import { navigateToHome } from '@/router/useHashRoute';
import { useGetAllProducts } from '@/hooks/useQueries';

interface ProductDetailPageProps {
  slug: string;
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { data: backendProducts = [], isLoading } = useGetAllProducts();
  const products = backendProducts.map(mapBackendProduct);
  const product = getProductBySlug(products, slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="ghost"
              onClick={navigateToHome}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={navigateToHome}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Product detail content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product image */}
          <div className="w-full">
            <Card className="overflow-hidden border-2">
              <div className="aspect-square bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Product information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">About This Product</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            <Card className="bg-muted/50 border-2">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Natural, high-quality ingredients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Dermatologically tested and approved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Cruelty-free and environmentally conscious</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Suitable for all skin types</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="pt-4">
              <Button
                size="lg"
                onClick={navigateToHome}
                className="w-full sm:w-auto"
              >
                Explore More Products
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
