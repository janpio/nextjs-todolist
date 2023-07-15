"use client";
import { startTransition, useState, useTransition } from "react";
import clsx from "clsx";
import TodoListTag from "./tag";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import RevisePopOver from "./revise-popover";

export default function TodoListItem({
  todo,
  updateItem,
  deleteItem,
}: {
  todo: Todo;
  updateItem: any;
  deleteItem: any;
}) {
  const [completed, setCompleted] = useState(todo.completed);
  const [isPending, setIsPending] = useTransition();
  const handleClick = async () => {
    const newTodo = { ...todo, completed: !completed };
    startTransition(() => {
      updateItem(newTodo);
    });
  };
  return (
    <div className="flex justify-between items-center w-full p-4 mb-4 border border-gray-400 rounded-lg bg-white">
      <div className="flex gap-4 items-center">
        <button
          className={clsx("font-bold rounded w-8 h-8 border border-blue-500", {
            "bg-blue-500 text-white hover:bg-blue-700": completed,
            "bg-white text-blue-700 hover:bg-blue-100": !completed,
          })}
          onClick={handleClick}
        ></button>
        <div className="bold">{todo.title}</div>
        {/* Option tag */}
        <div className="hidden gap-4 md:flex">
          {todo.option && todo.option.priority !== 0 && (
            <TodoListTag priority={todo.option.priority} />
          )}
          {todo.option && <TodoListTag time={todo.option?.settingTime} />}
        </div>
      </div>
      <div className="flex gap-2">
        <RevisePopOver todo={todo} updateItem={updateItem} />
        <div className="border-l border-gray-400 h-6"></div>
        <button
          onClick={() => {
            deleteItem(todo.id);
          }}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
}
