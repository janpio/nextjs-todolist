import TodoListContainer from "@/components/todo/todo-list-container";
import { extractTimeFromString } from "@/lib/todolist-utils";
import { revalidatePath } from "next/cache";
export default async function Home() {
  const base = process.env.NEXT_PUBLIC_HOST_URL
    ? process.env.NEXT_PUBLIC_HOST_URL
    : `http://${process.env.VERCEL_URL}`;
  const fetchUrl = base + "/api/todos";
  const res = await fetch(fetchUrl, {
    next: { revalidate: 0 },
  });
  const todos = await res.json();

  async function updateItem(todo: Todo) {
    "use server";
    const res = await fetch(fetchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newTodo: todo,
      }),
    });

    revalidatePath("/todo");
  }

  async function addTodo(title: string) {
    "use server";
    if (title === "") return;
    let option = null;
    const time = extractTimeFromString(title);
    if (time !== null) option = { settingTime: time, priority: 0 };
    const res = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        option: option,
      }),
    });
    revalidatePath("/todo");
  }

  async function deleteItem(id: number) {
    "use server";
    const res = await fetch(fetchUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    revalidatePath("/todo");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 min-w-full">
      <TodoListContainer
        todos={todos}
        updateItem={updateItem}
        deleteItem={deleteItem}
        addTodo={addTodo}
      />
    </main>
  );
}
