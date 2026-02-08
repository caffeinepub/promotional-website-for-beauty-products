import { useHashRoute } from './router/useHashRoute';
import HeroSection from './components/landing/HeroSection';
import FeaturedProductsSection from './components/landing/FeaturedProductsSection';
import BenefitsSection from './components/landing/BenefitsSection';
import TestimonialsSection from './components/landing/TestimonialsSection';
import SubscribeSection from './components/landing/SubscribeSection';
import ContactSection from './components/landing/ContactSection';
import SiteFooter from './components/landing/SiteFooter';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <SubscribeSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}

export default function App() {
  const route = useHashRoute();

  return (
    <div className="min-h-screen bg-background">
      {route.type === 'home' && <LandingPage />}
      {route.type === 'product' && <ProductDetailPage slug={route.slug} />}
      {route.type === 'not-found' && <NotFoundPage />}
    </div>
  );
}
