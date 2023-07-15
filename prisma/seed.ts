import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.create({
    data: { title: "Buy milk" },
  });
  await prisma.todo.create({
    data: { title: "Buy eggs" },
  });
  await prisma.todo.create({
    data: { title: "Buy bread" },
  });
  await prisma.todo.create({
    data: { title: "Buy butter" },
  });
  await prisma.option.create({
    data: { priority: 1, settingTime: "12:34", todoId: 1 },
  });
  await prisma.option.create({
    data: { priority: 2, settingTime: "03:34", todoId: 2 },
  });
  await prisma.option.create({
    data: { priority: 3, settingTime: "18:34", todoId: 3 },
  });
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
