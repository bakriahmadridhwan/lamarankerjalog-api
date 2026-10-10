import type {
  Application,
  ApplicationStatus,
} from "../generated/prisma/client";

export type ApplicationResponse = {
  id: number;
  company: string;
  job_title: string;
  location?: string | null;
  link?: string | null;
  application_date: string;
  status: ApplicationStatus;
  notes?: string | null;
};

export type CreateApplicationRequest = {
  company: string;
  job_title: string;
  location?: string;
  link?: string;
  application_date: string;
  status?: ApplicationStatus;
  notes?: string;
};

export type UpdateApplicationRequest = {
  id: number;
  company?: string;
  job_title?: string;
  location?: string | null;
  link?: string | null;
  application_date?: string;
  status?: ApplicationStatus;
  notes?: string | null;
};

export function toApplicationResponse(
  application: Application,
): ApplicationResponse {
  return {
    id: application.id,
    company: application.company,
    job_title: application.job_title,
    location: application.location,
    link: application.link,
    application_date: application.application_date.toISOString().slice(0, 10),
    status: application.status,
    notes: application.notes,
  };
}
