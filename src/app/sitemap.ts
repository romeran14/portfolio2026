import type { MetadataRoute } from "next";
import { portfolioConfig } from "@/lib/config/portfolio.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioConfig.personal.siteUrl || "https://example.com";

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  // Project routes
  const projectRoutes: MetadataRoute.Sitemap = portfolioConfig.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
