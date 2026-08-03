"use client";

import { FormEvent, useState } from "react";
import Script from "next/script";
import { portfolioConfig } from "@/lib/config/portfolio.config";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(() =>
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? null : "reCAPTCHA key is not configured."
  );
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  async function loadRecaptchaToken(): Promise<string> {
    if (!siteKey) {
      throw new Error("Missing reCAPTCHA site key");
    }

  
    if (typeof window === "undefined" || !window.grecaptcha) {
      throw new Error("reCAPTCHA is not ready");
    }

    return new Promise((resolve, reject) => {
      const grecaptcha = window.grecaptcha;
      grecaptcha?.ready(() => {
        grecaptcha
          .execute(siteKey, { action: "contact_form" })
          .then((token: string) => resolve(token))
          .catch((error: unknown) => reject(error));
      });
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setRecaptchaError(null);

    try {
      const token = await loadRecaptchaToken();
      const formData = new FormData(e.currentTarget);
      formData.append("recaptchaToken", token);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setRecaptchaError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setRecaptchaError("reCAPTCHA validation failed. Please refresh the page.");
    }
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="lazyOnload"
        onLoad={() => setRecaptchaReady(true)}
      />
      <SectionWrapper id="contact" className="bg-card/30 py-24" aria-label="Contact">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I&apos;m currently available for freelance work and new opportunities.
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-background border-border">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
                
                {status === "success" && (
                  <p className="text-sm text-green-500 text-center mt-4">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-destructive text-center mt-4">
                    {recaptchaError ?? "Something went wrong. Please try again."}
                  </p>
                )}
                {!recaptchaReady && !recaptchaError && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Loading reCAPTCHA... please wait.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Links */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
              <a 
                href={`mailto:${portfolioConfig.personal.socials.email}`}
                className="text-muted-foreground hover:text-primary transition-colors text-lg"
              >
                {portfolioConfig.personal.socials.email}
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground text-lg">
                {portfolioConfig.personal.location}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Social Profiles</h3>
              <div className="flex gap-4">
                <Button variant="outline"  className="border-border hover:bg-card">
                  <a href={portfolioConfig.personal.socials.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
                <Button variant="outline"  className="border-border hover:bg-card">
                  <a href={portfolioConfig.personal.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
    </>
  );
}
