import { prisma } from "../src/application/database";

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to clean database in production");
  }

  // const result = await prisma.user.deleteMany();
  const result = await prisma.user.deleteMany({
    where: {
      username: "bakwan",
    },
  });
  console.log(`Deleted ${result.count} user(s)`);
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
