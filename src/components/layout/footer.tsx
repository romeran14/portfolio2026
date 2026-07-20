import { portfolioConfig } from "@/lib/config/portfolio.config";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card py-8 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {portfolioConfig.personal.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={portfolioConfig.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href={portfolioConfig.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
