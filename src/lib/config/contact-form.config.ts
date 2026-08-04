import { z } from "zod";

const contactEnvSchema = z.object({
  EMAIL_KEY: z.string().min(1).optional().default(""),
  EMAIL_SERVICE: z.string().url().optional().default(""),
  LIVE_URL: z.string().url().optional().default(""),
  RECAPTCHA_SECRET_KEY: z.string().min(1).optional().default(""),
  RECAPTCHA_SITE_KEY: z.string().min(1).optional().default(""),
  NEXT_PUBLIC_EMAIL_KEY: z.string().min(1).optional().default(""),
  NEXT_PUBLIC_EMAIL_SERVICE: z.string().url().optional().default(""),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1).optional().default(""),
});

const contactEnv = contactEnvSchema.safeParse({
  EMAIL_KEY: process.env.EMAIL_KEY,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  LIVE_URL: process.env.LIVE_URL,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  NEXT_PUBLIC_EMAIL_KEY: process.env.NEXT_PUBLIC_EMAIL_KEY,
  NEXT_PUBLIC_EMAIL_SERVICE: process.env.NEXT_PUBLIC_EMAIL_SERVICE,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
});

export const contactConfig = {
  emailKey: contactEnv.success
    ? contactEnv.data.NEXT_PUBLIC_EMAIL_KEY || contactEnv.data.EMAIL_KEY
    : "",
  emailServiceUrl: contactEnv.success
    ? contactEnv.data.NEXT_PUBLIC_EMAIL_SERVICE || contactEnv.data.EMAIL_SERVICE
    : "",
  liveUrl: contactEnv.success ? contactEnv.data.LIVE_URL : "",
  recaptchaSecretKey: contactEnv.success ? contactEnv.data.RECAPTCHA_SECRET_KEY : "",
  recaptchaSiteKey: contactEnv.success
    ? contactEnv.data.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || contactEnv.data.RECAPTCHA_SITE_KEY
    : "",
};