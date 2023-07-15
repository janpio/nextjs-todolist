"use client";
import { Popover } from "@headlessui/react";
import { GrSort } from "react-icons/gr";
export default function SortPopOver({
  className,
  handleSort,
}: {
  className: string;
  handleSort: (sortType: string) => void;
}) {
  const sortTypes = ["priority", "time"];
  return (
    <Popover className={`relative rounded-xl ${className}`}>
      <Popover.Button>
        <GrSort />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-white rounded-xl border border-black">
        <div className="flex flex-col  rounded-md">
          {sortTypes.map((value) => {
            return (
              <button
                key={value}
                onClick={() => {
                  console.log("value", value);

                  handleSort(value);
                }}
                className="border w-full text-sm hover:bg-slate-500"
              >
                {value}
              </button>
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
