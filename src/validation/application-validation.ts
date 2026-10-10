import { z, ZodType } from "zod";

export class ApplicationValidation {
  static readonly CREATE: ZodType = z.object({
    company: z.string().min(1).max(100),
    job_title: z.string().min(1).max(100),
    location: z
      .string()
      .max(100)
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    link: z
      .url({ protocol: /^https?$/ })
      .max(500)
      .optional(),
    application_date: z.iso.date(),
    status: z
      .enum([
        "applied",
        "screening",
        "interview",
        "offer",
        "accepted",
        "rejected",
        "withdrawn",
      ])
      .optional(),
    notes: z
      .string()
      .max(1000)
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  });
}
