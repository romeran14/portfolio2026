import { z } from "zod";

/**
 * Schema for personal/biographical information.
 * Validated at build-time to ensure all required fields are present.
 */
export const socialLinksSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
  twitter: z.string().url().optional(),
  email: z.string().email(),
});

export const personalSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(5),
  bio: z.string().min(20),
  shortBio: z.string().max(160, "Short bio must be ≤160 chars for SEO meta description"),
  location: z.string(),
  phone: z.string().optional(),
  siteUrl: z.string().url().optional(),
  socials: socialLinksSchema,
  resumeUrl: z.string().url().optional(),
});

export type PersonalInfo = z.infer<typeof personalSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
