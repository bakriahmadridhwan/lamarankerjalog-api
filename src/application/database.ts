import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { logger } from "./logging";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT ?? 5),
});

const prisma = new PrismaClient({
  adapter,
  log: [
    ...(process.env.NODE_ENV !== "production"
      ? [{ emit: "event" as const, level: "query" as const }]
      : []),
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

if (process.env.NODE_ENV !== "production") {
  prisma.$on("query", (e) => {
    logger.debug("query", e);
  });
}

prisma.$on("error", (e) => {
  logger.error("error", e.message, { target: e.target });
});

prisma.$on("info", (e) => {
  logger.info("info", e);
});

prisma.$on("warn", (e) => {
  logger.warn("warn", e);
});

export { prisma };
