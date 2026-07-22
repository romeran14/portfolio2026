import { notFound } from "next/navigation";
import Link from "next/link";
import { portfolioConfig } from "@/lib/config/portfolio.config";
import { generateProjectMetadata } from "@/lib/seo/metadata";
import { generateProjectJsonLd } from "@/lib/seo/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return portfolioConfig.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Fix for Next.js 15: await params if it's treated as a Promise in some contexts, but statically it's usually fine.
  // We'll await it to be safe in App Router
  const { slug } = await Promise.resolve(params);
  return generateProjectMetadata(slug);
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);
  const projectIndex = portfolioConfig.projects.findIndex((p) => p.slug === slug);
  const project = portfolioConfig.projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? portfolioConfig.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < portfolioConfig.projects.length - 1
      ? portfolioConfig.projects[projectIndex + 1]
      : null;

  const jsonLd = generateProjectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <article className="container mx-auto px-6 max-w-4xl">
          {/* Back Navigation */}
          <Link
            href="/#projects"
            //className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            ← Back to Projects
          </Link>

          {/* Hero Image / Thumbnail */}
          <div
            className="w-full aspect-[21/9] bg-muted mb-12 relative overflow-hidden rounded-lg border border-border"
            style={{ viewTransitionName: `project-card-${project.slug}` }}
          >
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono">
                {project.slug}.webp
             </div>
          </div>

          {/* Header Metadata */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{project.summary}</p>
            
            <div className="flex flex-wrap gap-x-12 gap-y-6 py-6 border-y border-border">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Role</h3>
                <p className="text-foreground">{project.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-card">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                {project.links.live && (
                  <Button>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      View Live
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button variant="outline"  className="border-border">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      View Source
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Content Sections */}
          <div className="space-y-16 text-lg leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">The Challenge</h2>
              <p>{project.challenge}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">The Solution</h2>
              <p>{project.solution}</p>
            </section>

            {project.architecture && (
              <section className="bg-card/50 p-8 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Architecture</h2>
                <p className="mb-6">{project.architecture.description}</p>
                <h3 className="text-lg font-bold text-foreground mb-4">Key Decisions:</h3>
                <ul className="list-disc list-outside ml-6 space-y-2">
                  {project.architecture.decisions.map((decision, i) => (
                    <li key={i}>{decision}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Impact & Results</h2>
              <p>{project.impact}</p>
            </section>
          </div>

          {/* Project Navigation */}
          <nav className="flex justify-between items-center py-12 mt-16 border-t border-border">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col items-start"
              >
                <span className="text-sm text-muted-foreground mb-1">← Previous</span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end"
              >
                <span className="text-sm text-muted-foreground mb-1">Next →</span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
