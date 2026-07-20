import { z } from "zod";

/**
 * Schema for portfolio project entries.
 * Enforces SEO-friendly constraints (e.g., summary ≤160 chars for meta description).
 */
export const projectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(3),
  summary: z
    .string()
    .max(160, "Summary must be ≤160 chars for SEO meta description"),
  description: z.string().min(20),
  role: z.string(),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  impact: z.string().min(10),
  architecture: z
    .object({
      description: z.string(),
      decisions: z.array(z.string()).min(1),
    })
    .optional(),
  technologies: z.array(z.string()).min(1),
  links: z.object({
    live: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  images: z.object({
    thumbnail: z.string(),
    gallery: z.array(z.string()).optional(),
  }),
  featured: z.boolean().default(false),
  order: z.number().int().min(0),
});

export const projectListSchema = z
  .array(projectSchema)
  .min(1, "At least one project is required");

export type Project = z.infer<typeof projectSchema>;
