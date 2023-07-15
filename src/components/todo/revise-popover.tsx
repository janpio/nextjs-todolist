"use client";
import { Popover } from "@headlessui/react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { priorityLevel } from "@/lib/todolist-utils";
import { FormEvent, useState } from "react";

export default function RevisePopOver({
  todo,
  updateItem,
}: {
  todo: Todo;
  updateItem: any;
}) {
  const [title, setTitle] = useState(todo.title || "");
  // const [description, setDescription] = useState();
  const [priority, setPriority] = useState(todo.option?.priority || 0);

  const handleUpdate = () => {
    const newTodo = {
      ...todo,
      title: title,
      option: {
        ...todo.option,
        priority: priority,
      },
    };
    console.log(newTodo);
    updateItem(newTodo);
  };

  const restore = () => {
    setTitle(todo.title);
    setPriority(todo.option?.priority || 0);
  };
  return (
    <Popover className={`relative rounded-xl`}>
      <Popover.Button>
        <HiOutlineInformationCircle />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-white rounded-xl border border-black">
        {({ close }) => (
          <div className="flex flex-col justify-center  items-center p-2">
            <input
              className="text-center underline"
              type="text"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              className="text-center underline"
              type="text"
              placeholder="description"
            />
            <select
              className="text-center underline"
              defaultValue={todo.option ? todo.option!.priority : 0}
              onChange={(e) => {
                setPriority(Number(e.target.value));
              }}
            >
              {Object.keys(priorityLevel).map((key) => {
                const value =
                  priorityLevel[Number(key) as keyof typeof priorityLevel];
                return (
                  <option key={key} value={key}>
                    {value.text}
                  </option>
                );
              })}
            </select>
            <div className="flex justify-center border-t border-gray-300 gap-2 mt-2">
              <button
                className="rounded-md bg-gray-300 hover:bg-gray-500 text-center border p-1 mt-1"
                onClick={() => {
                  restore();
                  close();
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-500 hover:bg-blue-700 text-center text-white border p-1 mt-1"
                onClick={() => {
                  handleUpdate();
                  close();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}
