"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { portfolioConfig } from "@/lib/config/portfolio.config";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="hero"  className="bg-background" aria-label="Hero Section">
      <div ref={containerRef} className="flex flex-col justify-center h-full max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6"
        >
          {portfolioConfig.personal.name}.<br />
          <span className="text-primary">{portfolioConfig.personal.title}</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
        >
          {portfolioConfig.personal.bio}
        </p>
        
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <Button size="lg"  className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#projects">View Projects</a>
          </Button>
          <Button size="lg" variant="outline"  className="border-border hover:bg-card">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
