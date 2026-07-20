import type { MetadataRoute } from "next";
import { portfolioConfig } from "@/lib/config/portfolio.config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = portfolioConfig.personal.siteUrl || "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
