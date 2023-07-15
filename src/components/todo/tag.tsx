import { priorityLevel } from "@/lib/todolist-utils";

export default function TodoListTag({
  priority,
  time,
}: {
  priority?: number;
  time?: string;
}) {
  let component = null;

  const priorityParams = priorityLevel;
  if (priority !== undefined) {
    const { color, text } = priorityParams[priority as 1 | 2 | 3];
    component = (
      <button
        className="text-center border rounded-lg p-1"
        style={{ background: color }}
      >
        <div className="text-sm font-light">{text}</div>
      </button>
    );
  } else {
    component = (
      <button className="text-center border rounded-lg p-1">{time}</button>
    );
  }
  return <div className="flex justify-between items-center ">{component}</div>;
}
