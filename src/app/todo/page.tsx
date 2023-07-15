import TodoListContainer from "@/components/todo/todo-list-container";
import { extractTimeFromString } from "@/lib/todolist-utils";
import { revalidatePath } from "next/cache";
export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/todos", {
    next: { revalidate: 0 },
  });
  const todos = await res.json();

  async function updateItem(todo: Todo) {
    "use server";
    const res = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/todos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newTodo: todo,
      }),
    });
    console.log("res", 1);
    revalidatePath("/todo");
  }

  async function addTodo(title: string) {
    "use server";
    if (title === "") return;
    let option = null;
    const time = extractTimeFromString(title);
    if (time !== null) option = { settingTime: time, priority: 0 };
    const res = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/todos", {
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
    const res = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/todos", {
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
