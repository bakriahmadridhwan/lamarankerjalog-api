import winston from "winston";

export const logger = winston.createLogger({
  // level: process.env.LOG_LEVEL ?? "info",
  // silent: process.env.NODE_ENV === "test",
  level: "debug",
  // format: winston.format.combine(
  //   winston.format.timestamp(),
  //   winston.format.json(),
  // ),
  format: winston.format.json(),
  transports: [new winston.transports.Console({})],
});
