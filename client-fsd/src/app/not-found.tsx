import { Button, Container } from '@/shared/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center py-20 md:py-36">
        <h1 className="mb-10 text-center text-4xl font-medium tracking-wide md:text-8xl">
          404 Not Found
        </h1>
        <p className="mb-20 text-center text-base">
          Your visited page not found. You may go home page.
        </p>
        <Button asChild>
          <Link href="/">Back to home page</Link>
        </Button>
      </div>
    </Container>
  );
}
