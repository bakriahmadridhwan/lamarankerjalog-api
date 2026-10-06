import { logger } from "../src/application/logging";
import { prisma } from "../src/application/database";

async function main() {
  logger.debug("test debug");
  logger.info("test info");
  logger.warn("test warn");
  logger.error("test error");

  await prisma.user.findMany();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
