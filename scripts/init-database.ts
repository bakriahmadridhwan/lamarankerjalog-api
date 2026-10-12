import { prisma } from "../src/application/database";

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "bakwan",
      password: "rahasia",
      name: "Bakri Ahmad",
      applications: {
        create: [
          {
            company: "Apple",
            job_title: "Developer",
            location: "Tangerang",
            link: "https://developeracademy.apps.binus.ac.id/",
            application_date: new Date("2026-10-01"),
            status: "interview",
            notes: "Dihubungi HRD lewat WhatsApp",
          },
          {
            company: "Telkom",
            job_title: "Developer",
            location: "Remote",
            application_date: new Date("2026-10-02"),
            // status default "applied"; link dan notes opsional, tersimpan null
          },
        ],
      },
    },
    include: {
      applications: true,
    },
  });
  console.log("Created user:", JSON.stringify(user, null, 2));

  const allUsers = await prisma.user.findMany({
    include: {
      applications: true,
    },
  });
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
