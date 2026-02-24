import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  company: z.string().trim().min(1, "Company name is required").max(200),
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

// ---------------------------------------------------------------------------
// Shared security utilities for email output
// ---------------------------------------------------------------------------

/** Escape HTML entities to prevent XSS in email templates */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF from strings used in email headers to prevent header injection */
export function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

export type ContactFormData = z.infer<typeof contactSchema>;
