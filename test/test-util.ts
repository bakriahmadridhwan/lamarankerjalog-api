import bcrypt from "bcrypt";
import { prisma } from "../src/application/database";
import type { Application, User } from "../src/generated/prisma/client";

export class UserTest {
  static async delete() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}

export class ApplicationTest {
  static async deleteAll() {
    await prisma.application.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prisma.application.create({
      data: {
        company: "perusahaan",
        job_title: "dev",
        location: "lokasi",
        link: "https://example.com",
        application_date: new Date("2026-10-10"),
        status: "applied",
        notes: "init",
        username: "test",
      },
    });
  }

  static async get(): Promise<Application> {
    const application = await prisma.application.findFirst({
      where: {
        username: "test",
      },
    });

    if (!application) {
      throw new Error("Application is not found");
    }

    return application;
  }
}
