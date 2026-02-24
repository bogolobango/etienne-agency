import { describe, it, expect } from "vitest";
import { contactSchema, escapeHtml, sanitizeHeader } from "./contact.schema.js";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "(555) 123-4567",
  company: "Acme Dental",
  industry: "dental" as const,
  locations: "3-5" as const,
  challenge: "High no-show rate",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts payload without optional challenge field", () => {
    const { challenge, ...withoutChallenge } = validPayload;
    const result = contactSchema.safeParse(withoutChallenge);
    expect(result.success).toBe(true);
  });

  it("rejects missing name", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing phone", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid industry", () => {
    const result = contactSchema.safeParse({ ...validPayload, industry: "plumbing" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid locations value", () => {
    const result = contactSchema.safeParse({ ...validPayload, locations: "50+" });
    expect(result.success).toBe(false);
  });

  it("rejects challenge exceeding 2000 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, challenge: "x".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding 200 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "x".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("accepts all valid industry values", () => {
    const industries = ["medspa", "dental", "law", "property", "accounting", "cleaning", "sports", "other"];
    for (const industry of industries) {
      const result = contactSchema.safeParse({ ...validPayload, industry });
      expect(result.success).toBe(true);
    }
  });

  it("accepts all valid location values", () => {
    const locations = ["1-2", "3-5", "6-10", "11-25", "25+"];
    for (const loc of locations) {
      const result = contactSchema.safeParse({ ...validPayload, locations: loc });
      expect(result.success).toBe(true);
    }
  });

  it("rejects whitespace-only name after trim", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only phone after trim", () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only company after trim", () => {
    const result = contactSchema.safeParse({ ...validPayload, company: "   " });
    expect(result.success).toBe(false);
  });
});

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  it("escapes ampersands", () => {
    expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  it("passes through safe strings unchanged", () => {
    expect(escapeHtml("Hello World")).toBe("Hello World");
  });
});

describe("sanitizeHeader", () => {
  it("strips newlines to prevent header injection", () => {
    expect(sanitizeHeader("Name\r\nBcc: attacker@evil.com")).toBe(
      "Name  Bcc: attacker@evil.com"
    );
  });

  it("strips tabs", () => {
    expect(sanitizeHeader("Name\tCompany")).toBe("Name Company");
  });

  it("trims whitespace", () => {
    expect(sanitizeHeader("  Hello  ")).toBe("Hello");
  });
});
