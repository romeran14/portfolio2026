import { z } from "zod";

const contactEnvSchema = z.object({
  EMAIL_KEY: z.string().min(1),
  EMAIL_SERVICE: z.string().url(),
  LIVE_URL: z.string().url(),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
});

const contactEnv = contactEnvSchema.parse({
  EMAIL_KEY: process.env.EMAIL_KEY,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  LIVE_URL: process.env.LIVE_URL,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
});

export const contactConfig = {
  emailKey: contactEnv.EMAIL_KEY,
  emailServiceUrl: contactEnv.EMAIL_SERVICE,
  liveUrl: contactEnv.LIVE_URL,
  recaptchaSecretKey: contactEnv.RECAPTCHA_SECRET_KEY,
};
