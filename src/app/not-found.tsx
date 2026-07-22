import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center px-6">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button size="lg"  className="bg-primary text-primary-foreground">
          <Link href="/">Return to Home</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
