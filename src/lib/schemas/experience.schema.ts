import { z } from "zod";

/**
 * Schema for work experience entries.
 * Each entry represents a position at a company.
 */
export const experienceSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(5),
  location: z.string(),
  period: z.object({
    start: z.string().regex(/^\d{4}-\d{2}$/, "Format: YYYY-MM"),
    end: z
      .string()
      .regex(/^(\d{4}-\d{2}|present)$/i, "Format: YYYY-MM or 'present'"),
  }),
  description: z.string().min(10),
  highlights: z
    .array(z.string())
    .min(1, "At least one highlight is required"),
  technologies: z.array(z.string()).min(1),
});

export const experienceListSchema = z
  .array(experienceSchema)
  .min(1, "At least one experience entry is required");

export type Experience = z.infer<typeof experienceSchema>;
