"use client";
import AddForm from "./add-todo-form";
import TodoListItem from "./todo-list-item";

import SortPopOver from "./popover";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";

export default function TodoListContainer({
  todos,
  updateItem,
  addTodo,
  deleteItem,
}: {
  todos: Todo[];
  updateItem: any;
  addTodo: any;
  deleteItem: any;
}) {
  console.log("todos1", todos);

  const [unfinishTodo, setUnfinishTodo] = useState<Todo[]>(
    todos.filter((todo: Todo) => todo.completed === false)
  );
  const [finishedTodo, setFinishedTodo] = useState<Todo[]>(
    todos.filter((todo: Todo) => todo.completed === true)
  );

  useEffect(() => {
    const newUnfinshTodo = todos.filter(
      (todo: Todo) => todo.completed === false
    );
    const newFinishedTodo = todos.filter(
      (todo: Todo) => todo.completed === true
    );
    if (JSON.stringify(newFinishedTodo) !== JSON.stringify(finishedTodo)) {
      setFinishedTodo(newFinishedTodo);
    }
    if (JSON.stringify(newUnfinshTodo) !== JSON.stringify(unfinishTodo)) {
      setUnfinishTodo(newUnfinshTodo);
    }
  }, [todos]);

  const handleSort = (sortType: string) => {
    if (sortType === "priority") {
      console.log("sortType", sortType);

      setUnfinishTodo([
        ...unfinishTodo
          .filter((item) => item.option != undefined)
          .sort((a, b) => b.option!.priority - a.option!.priority),
        ...unfinishTodo.filter((item) => item.option == undefined),
      ]);
    } else if (sortType === "time") {
      setUnfinishTodo([
        ...unfinishTodo
          .filter((item) => item.option !== undefined && item.option !== null)
          .sort((a, b) =>
            a.option!.settingTime < b.option!.settingTime ? -1 : 1
          ),
        ...unfinishTodo.filter(
          (item) => item.option === undefined || item.option === null
        ),
      ]);
    }
  };
  return (
    <div className="flex flex-col items-center w-full ">
      <AddForm addTodo={addTodo} />
      <div className="font-bold text-2xl mt-6">
        <div>TODOS</div>
      </div>
      <div className="w-3/5 border-t-2 mb-4 border-black">
        <div className="flex justify-end">
          {/* <GrSort className="self-end  hover:cursor-pointer" /> */}
          <SortPopOver className="self-end" handleSort={handleSort} />
        </div>
      </div>
      <div className="w-3/5">
        <Reorder.Group
          axis="y"
          values={unfinishTodo}
          onReorder={setUnfinishTodo}
        >
          {unfinishTodo &&
            unfinishTodo.map((todo) => {
              return (
                <Reorder.Item key={todo.id} value={todo}>
                  <TodoListItem
                    todo={todo}
                    updateItem={updateItem}
                    deleteItem={deleteItem}
                  />
                </Reorder.Item>
              );
            })}
        </Reorder.Group>
      </div>
      <div className="font-bold text-2xl ">FINISHED</div>
      <div className="w-3/5 border-t-2 mb-4 border-black"></div>
      <div className="w-3/5">
        <Reorder.Group
          axis="y"
          values={finishedTodo}
          onReorder={setFinishedTodo}
        >
          {finishedTodo &&
            finishedTodo.map((todo: Todo) => {
              return (
                <Reorder.Item key={todo.id} value={todo}>
                  <div className="line-through" key={todo.id}>
                    <TodoListItem
                      todo={todo}
                      updateItem={updateItem}
                      deleteItem={deleteItem}
                    />
                  </div>
                </Reorder.Item>
              );
            })}
        </Reorder.Group>
      </div>
    </div>
  );
}
