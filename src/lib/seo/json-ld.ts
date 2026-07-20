import { portfolioConfig } from "@/lib/config/portfolio.config";
import type { Person, CreativeWork, WithContext, WebSite } from "schema-dts";
import type { Project } from "@/lib/schemas/project.schema";

/**
 * Generate JSON-LD schema for the main portfolio owner (Person)
 */
export function generatePersonJsonLd(): WithContext<Person> {
  const { personal } = portfolioConfig;
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.shortBio,
    url: personal.siteUrl || "https://example.com",
    sameAs: [
      personal.socials.github,
      personal.socials.linkedin,
      ...(personal.socials.twitter ? [personal.socials.twitter] : []),
    ],
  };
}

/**
 * Generate JSON-LD schema for a specific project (CreativeWork)
 */
export function generateProjectJsonLd(project: Project): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.summary,
    description: project.description,
    author: {
      "@type": "Person",
      name: portfolioConfig.personal.name,
    },
    url: `${portfolioConfig.personal.siteUrl || "https://example.com"}/projects/${project.slug}`,
    image: project.images.thumbnail,
  };
}

/**
 * Generate JSON-LD schema for the website as a whole
 */
export function generateWebsiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${portfolioConfig.personal.name} Portfolio`,
    url: portfolioConfig.personal.siteUrl || "https://example.com",
    author: {
      "@type": "Person",
      name: portfolioConfig.personal.name,
    },
  };
}
