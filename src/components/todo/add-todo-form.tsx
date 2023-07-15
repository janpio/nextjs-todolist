"use client";

import { startTransition, useState, useTransition } from "react";

export default function AddForm({ addTodo }: { addTodo: any }) {
  const [todoContent, setTodoContent] = useState("");
  const [isPending, setIsPending] = useTransition();

  return (
    <div className="w-3/5 flex justify-between items-center">
      <input
        className="w-full h-16 rounded-lg border-2 focus:border-blue-500 border-black  text-center"
        type="text"
        placeholder="add new todo"
        value={todoContent}
        onChange={(e) => {
          setTodoContent(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const title = todoContent;
          startTransition(() => {
            setTodoContent("");
            addTodo(title);
          });
        }}
        className="rounded-lg bg-blue-500 hover:bg-blue-700 text-center text-white w-20 h-12 ml-4"
      >
        add
      </button>
    </div>
  );
}
