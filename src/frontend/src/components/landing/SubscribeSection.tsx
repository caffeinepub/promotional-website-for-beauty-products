import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useSubscribeToNewsletter } from '@/hooks/useQueries';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const subscribeMutation = useSubscribeToNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      try {
        await subscribeMutation.mutateAsync(email);
        setEmail('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        console.error('Newsletter subscription error:', error);
      }
    }
  };

  const isSubmitting = subscribeMutation.isPending;
  const hasError = subscribeMutation.isError;

  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Stay in the Glow
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive offers, beauty tips, and early access to new products
          </p>

          {showSuccess ? (
            <div className="flex items-center justify-center gap-3 text-primary py-4">
              <CheckCircle2 className="w-6 h-6" />
              <p className="text-lg font-medium">Thank you for subscribing!</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 h-12 text-base"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 px-8 rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              {hasError && (
                <div className="flex items-center justify-center gap-2 text-destructive mt-4">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">Failed to subscribe. Please try again.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
