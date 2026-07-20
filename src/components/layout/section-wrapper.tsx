"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils/cn";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
  pin?: boolean;
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  pin = false,
  className,
  ...props
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pin || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // Pin for 1 screen height
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pin]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("min-h-screen w-full relative flex items-center pt-16", className)}
      {...props}
    >
      <div className="container mx-auto px-6 w-full h-full">
        {children}
      </div>
    </section>
  );
}
