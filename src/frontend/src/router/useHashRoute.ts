import { useEffect, useState } from 'react';

export type RouteType = 
  | { type: 'home' }
  | { type: 'product'; slug: string }
  | { type: 'not-found' };

function parseHash(hash: string): RouteType {
  // Remove leading #
  const path = hash.replace(/^#/, '');
  
  if (!path || path === '/') {
    return { type: 'home' };
  }
  
  // Match /product/:slug pattern
  const productMatch = path.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    return { type: 'product', slug: productMatch[1] };
  }
  
  return { type: 'not-found' };
}

export function useHashRoute(): RouteType {
  const [route, setRoute] = useState<RouteType>(() => parseHash(window.location.hash));
  
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return route;
}

export function navigateToHome() {
  window.location.hash = '/';
}

export function navigateToProduct(slug: string) {
  window.location.hash = `/product/${slug}`;
}
