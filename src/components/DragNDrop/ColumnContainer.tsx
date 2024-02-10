import React from 'react';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "./icons/TrashIcon";
import { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import PlusIcon from "./icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, name: string) => void;
  createTask: (id_user_leader: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    // Puedes eliminar la propiedad "disabled" si no necesitas deshabilitar el arrastre en algún caso.
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      //Drag Sombra
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-[gray]
      opacity-40
      border-4
      border-[#13a19b]
      w-[300px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  const headerBg = "#Bcbcbc";
  const headerBd = "gray";
  const bodyBg = "#Efefef";
  const pillBg = "#93c120"; 
  return (
 //Fondo Container   
    <div
      ref={setNodeRef}
      style={style}
      className={`
  bg-[${bodyBg}]
  m-[1rem]
  shadow-md
  shadow-[black]
  w-[300px]
  h-[480px]
  max-h-[480px]
  rounded-md
  flex
  flex-col
  `}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className={`
      bg-[${headerBg}]
      text-md
      text-white
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-[${headerBd}]
      border-4
      flex
      items-center
      justify-between
      `}
      >
        <div className="flex gap-2">
       {/* pill */}
          <div
            className={`
        flex
        justify-center
        items-center
        bg-[${pillBg}]
        px-2
        py-1
        text-sm
        text-white
        rounded-full`}
        
          >
            {tasks.length}
          </div>
          {column.name}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-[red]
        rounded-full
        color-[red]
        p-[8px]
        "
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      {/* <button
        className="flex justify-center gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon /> Add
      </button> */}
    </div>
  );
}

export default ColumnContainer;