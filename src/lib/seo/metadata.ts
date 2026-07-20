import { portfolioConfig } from "@/lib/config/portfolio.config";
import type { Metadata } from "next";

/**
 * Global site metadata
 */
export const siteMetadata: Metadata = {
  title: {
    default: `${portfolioConfig.personal.name} | ${portfolioConfig.personal.title}`,
    template: `%s | ${portfolioConfig.personal.name}`,
  },
  description: portfolioConfig.personal.shortBio,
  applicationName: "Portfolio",
  authors: [{ name: portfolioConfig.personal.name, url: portfolioConfig.personal.siteUrl }],
  creator: portfolioConfig.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolioConfig.personal.siteUrl || "https://example.com",
    title: `${portfolioConfig.personal.name} | ${portfolioConfig.personal.title}`,
    description: portfolioConfig.personal.shortBio,
    siteName: portfolioConfig.personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioConfig.personal.name} | ${portfolioConfig.personal.title}`,
    description: portfolioConfig.personal.shortBio,
    creator: "@yourhandle", // Update this if provided in socials
  },
};

/**
 * Generate metadata for individual project pages
 */
export function generateProjectMetadata(slug: string): Metadata {
  const project = portfolioConfig.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `${portfolioConfig.personal.siteUrl}/projects/${project.slug}`,
      images: [
        {
          url: project.images.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [project.images.thumbnail],
    },
  };
}
