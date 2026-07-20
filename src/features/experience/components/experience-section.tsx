"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { portfolioConfig } from "@/lib/config/portfolio.config";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateRange, calculateDuration } from "@/lib/utils/format";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Animate each item
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="experience" className="bg-card/50 py-24" aria-label="Work Experience">
      <div ref={containerRef} className="max-w-5xl mx-auto w-full">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg">My professional journey over the years.</p>
        </div>

        <div className="relative">
          {/* Timeline center line */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2 origin-top" 
          />
          <div 
            ref={lineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary transform md:-translate-x-1/2 origin-top" 
          />

          <div className="space-y-12">
            {portfolioConfig.experience.map((exp, index) => (
              <div 
                key={`${exp.company}-${index}`}
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-5px] md:left-1/2 top-6 w-3 h-3 rounded-full bg-primary transform md:-translate-x-1/2 z-10 border-2 border-background" />

                <div className="md:w-1/2" />
                <div className="md:w-1/2 pl-8 md:pl-0">
                  <Card className="bg-background border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                        <div>
                          <CardTitle className="text-xl text-foreground">{exp.role}</CardTitle>
                          <CardDescription className="text-primary font-medium mt-1">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-nowrap text-right">
                          <div>{formatDateRange(exp.period.start, exp.period.end)}</div>
                          <div className="text-xs">{calculateDuration(exp.period.start, exp.period.end)}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                      <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted-foreground mb-6">
                        {exp.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 5).map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-card text-foreground">
                            {tech}
                          </Badge>
                        ))}
                        {exp.technologies.length > 5 && (
                          <Badge variant="secondary" className="bg-card text-foreground">
                            +{exp.technologies.length - 5}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
