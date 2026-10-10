import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ApplicationTest, UserTest } from "./test-util";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/applications", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ApplicationTest.deleteAll();
    await UserTest.delete();
  });

  it("should create new application", async () => {
    const response = await supertest(web)
      .post("/api/applications")
      .set("X-API-TOKEN", "test")
      .send({
        company: "perusahaan",
        job_title: "dev",
        location: "lokasi",
        link: "https://example.com",
        application_date: "2026-10-10",
        status: "applied",
        notes: "init",
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.company).toBe("perusahaan");
    expect(response.body.data.job_title).toBe("dev");
    expect(response.body.data.location).toBe("lokasi");
    expect(response.body.data.link).toBe("https://example.com");
    expect(response.body.data.application_date).toBe("2026-10-10");
    expect(response.body.data.status).toBe("applied");
    expect(response.body.data.notes).toBe("init");
  });

  it("should reject create new application if data is invalid", async () => {
    const response = await supertest(web)
      .post("/api/applications")
      .set("X-API-TOKEN", "test")
      .send({
        company: "",
        job_title: "",
        location: "lokasi",
        link: "example",
        application_date: "bukan-tanggal",
        status: "",
        notes: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create new application if token is invalid", async () => {
    const response = await supertest(web)
      .post("/api/applications")
      .set("X-API-TOKEN", "test2")
      .send({
        company: "perusahan",
        job_title: "dev",
        location: "lokasi",
        link: "https://example.com",
        application_date: "2026-10-10",
        status: "applied",
        notes: "init",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should create application with only required fields", async () => {
    const response = await supertest(web)
      .post("/api/applications")
      .set("X-API-TOKEN", "test")
      .send({
        company: "perusahaan",
        job_title: "dev",
        application_date: "2026-10-10",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.status).toBe("applied");
    expect(response.body.data.location).toBeNull();
    expect(response.body.data.link).toBeNull();
    expect(response.body.data.notes).toBeNull();
  });

  it("should treat empty optional strings as null", async () => {
    const response = await supertest(web)
      .post("/api/applications")
      .set("X-API-TOKEN", "test")
      .send({
        company: "perusahaan",
        job_title: "dev",
        application_date: "2026-10-10",
        location: "",
        notes: "",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.location).toBeNull();
    expect(response.body.data.notes).toBeNull();
  });
});
