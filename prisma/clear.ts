import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.responseValue.deleteMany({});
  await prisma.exerciseFieldOption.deleteMany({});
  await prisma.exerciseField.deleteMany({});
  await prisma.organization.deleteMany({});
  await prisma.response.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.identity.deleteMany({});
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
