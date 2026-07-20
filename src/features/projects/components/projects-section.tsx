"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { portfolioConfig } from "@/lib/config/portfolio.config";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);





  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Horizontal scroll animation
      gsap.to(scrollContainer, {
        x: () => -(totalWidth - viewportWidth + 100), // 100px extra padding
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="projects" className="bg-background overflow-hidden" aria-label="Projects Portfolio">
      <div ref={containerRef} className="w-full h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 mb-12 flex-shrink-0">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of projects that showcase my expertise in architecture, performance, and user experience.
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 px-6 pb-12 w-max"
        >
          {portfolioConfig.projects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/projects/${project.slug}`}
              className="group block w-[85vw] md:w-[600px] flex-shrink-0"
              style={{ viewTransitionName: `project-card-${project.slug}` }}
            >
              <Card className="h-full bg-card/50 border-border overflow-hidden hover:border-primary transition-colors duration-300">
                <div className="aspect-[16/9] w-full bg-muted relative overflow-hidden">
                  {/* Fallback pattern since we don't have real images yet */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-sm">
                    {project.slug}.webp
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-primary font-medium text-sm">{project.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-background">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
