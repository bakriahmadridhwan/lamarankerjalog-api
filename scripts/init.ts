import { prisma } from "../src/application/database";

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "bakwan",
      password: "rahasia",
      name: "Bakri Ahmad",
    },
  });
  console.log("Created user:", user);

  const allUsers = await prisma.user.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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
