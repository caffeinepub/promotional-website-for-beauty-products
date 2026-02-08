import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { navigateToHome } from '@/router/useHashRoute';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
          <CardDescription className="text-base">
            We couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={navigateToHome}
            className="gap-2"
            size="lg"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
