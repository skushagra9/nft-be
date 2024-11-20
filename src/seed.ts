import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Generate multiple users with related NFTs
//   const usersData = Array.from({ length: 100 }, (_, index) => ({
//     email: `user${index + 1}@example.com`,
//     minted: false,
//   }));

  const userData = {
    email: "skushagra.sharma@gmail.com",
    minted: false,
  }

  // Insert users and related NFTs in bulk
//   const createdUsers = await prisma.user.createMany({
//     data: usersData,
//   });

  const createdUser = await prisma.user.create({
    data: userData,
  })

  console.log('Seeded users:', createdUser);

//   console.log(`${createdUsers.count} users created successfully!`);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
