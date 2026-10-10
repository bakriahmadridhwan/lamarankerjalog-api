import { z, ZodType } from "zod";

const applicationStatus = z.enum([
  "applied",
  "screening",
  "interview",
  "offer",
  "accepted",
  "rejected",
  "withdrawn",
]);

const emptyToNull = (value: string | null | undefined) =>
  value === "" ? null : value;

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
    status: applicationStatus.optional(),
    notes: z
      .string()
      .max(1000)
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  });

  static readonly UPDATE: ZodType = z
    .object({
      id: z.number().positive(),
      company: z.string().min(1).max(100).optional(),
      job_title: z.string().min(1).max(100).optional(),
      location: z
        .string()
        .max(100)
        .nullable()
        .optional()
        .transform(emptyToNull),
      link: z
        .url({ protocol: /^https?$/ })
        .max(500)
        .nullable()
        .optional(),
      application_date: z.iso.date().optional(),
      status: applicationStatus.optional(),
      notes: z.string().max(1000).nullable().optional().transform(emptyToNull),
    })
    .refine(
      (data) =>
        Object.entries(data).some(
          ([key, value]) => key !== "id" && value !== undefined,
        ),
      {
        message: "At least one field must be provided",
      },
    );
}
