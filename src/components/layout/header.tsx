import Link from "next/link";
import { portfolioConfig } from "@/lib/config/portfolio.config";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-primary font-bold text-xl tracking-tight">
          {portfolioConfig.personal.name.split(" ")[0]}
          <span className="text-foreground">.dev</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {portfolioConfig.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
