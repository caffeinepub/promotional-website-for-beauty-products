import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useCreateInquiry } from '@/hooks/useQueries';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { mutate: createInquiry, isPending, isSuccess, isError, reset } = useCreateInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    createInquiry(
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      {
        onSuccess: () => {
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => reset(), 5000);
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isPending}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isPending}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-base">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us what's on your mind..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isPending}
                rows={6}
                className="text-base resize-none"
              />
            </div>

            {isSuccess && (
              <Alert className="border-primary/50 bg-primary/5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <AlertDescription className="text-base">
                  Thank you for your message! We'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="text-base">
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full h-12 text-base rounded-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
