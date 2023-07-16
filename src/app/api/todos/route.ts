import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const todos = await prisma.todo.findMany({
    include: { option: true },
  });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title, option } = await req.json();
  if (option === null) {
    const todo = await prisma.todo.create({
      data: { title },
    });
  } else {
    const todo = await prisma.todo.create({
      data: {
        title,
        option: {
          create: {
            priority: option.priority,
            settingTime: option.settingTime,
          },
        },
      },
    });
  }
  return NextResponse.json({ message: "POST" });
}

export async function PATCH(req: Request) {
  const { newTodo } = await req.json();
  const id = newTodo.id;
  const option = newTodo.option;
  if (option !== null) {
    await prisma.option.update({
      where: { optionId: option.optionId },
      data: {
        priority: option.priority,
      },
    });
  }
  await prisma.todo.update({
    where: { id: id },
    data: {
      completed: newTodo.completed,
      title: newTodo.title,
    },
  });

  return NextResponse.json({ message: "PATCH" });
}

export async function DELETE(req: Request) {
  // delete cascade
  const { id } = await req.json();
  const deleleteTag = prisma.option.deleteMany({
    where: {
      todoId: id,
    },
  });
  const deleteTodo = prisma.todo.delete({
    where: { id: id },
  });
  const transaction = await prisma.$transaction([deleleteTag, deleteTodo]);
  return NextResponse.json({ message: "Delete" });
}
