import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(30),
  company: z.string().min(1, "Company name is required").max(200),
  industry: z.enum([
    "medspa",
    "dental",
    "law",
    "property",
    "accounting",
    "cleaning",
    "sports",
    "other",
  ]),
  locations: z.enum(["1-2", "3-5", "6-10", "11-25", "25+"]),
  challenge: z.string().max(2000).optional().default(""),
});

export type ContactFormData = z.infer<typeof contactSchema>;
