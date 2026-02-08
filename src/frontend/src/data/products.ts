import type { Product as BackendProduct } from '@/backend';

export interface Product {
  id: bigint;
  name: string;
  description: string;
  image: string;
  price: bigint;
  slug?: string;
  longDescription?: string;
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find(p => p.slug === slug || p.name.toLowerCase().replace(/\s+/g, '-') === slug);
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function mapBackendProduct(backendProduct: BackendProduct): Product {
  return {
    ...backendProduct,
    slug: generateSlug(backendProduct.name),
  };
}
