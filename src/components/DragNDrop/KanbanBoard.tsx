
import PlusIcon from "./icons/PlusIcon"
import React, { useMemo, useState } from "react"
import ColumnContainer from "./ColumnContainer"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import TaskCard from "./TaskCard"


function KanbanBoard({defaultCols, defaultTasks}) {
  const [columns, setColumns] = useState(defaultCols)
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const [tasks, setTasks] = useState(defaultTasks)

  const [activeColumn, setActiveColumn] = useState(null)

  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  return (
    <div
      className="
        m-auto
        flex
        h-[full]
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[2rem]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-1rem flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map(col => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(task => task.id_user_leader === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn()
            }}
            className="
      h-[60px]
      w-[300px]
      min-w-[300px]
      cursor-pointer
      rounded-lg
      bg-[#93c120]
      text-white
      border-2
      p-4
      my-[1rem]
      ring-[#13a19b]
      hover:ring-2
      flex
      justify-center
      gap-2
      "
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(task => task.id_user_leader === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  function createTask(id_user_leader) {
    const newTask = {
      id: generateId(),
      id_user_leader,
      content: `Task ${tasks.length + 1}`
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  function updateTask(id, content) {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task
      return { ...task, content }
    })

    setTasks(newTasks)
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      name:`Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter(t => t.id_user_leader !== id)
    setTasks(newTasks)
  }

  function updateColumn(id, name) {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col
      return { ...col, name }
    })

    setColumns(newColumns)
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === "Column"
    if (!isActiveAColumn) return

    console.log("DRAG END")

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeId)

      const overColumnIndex = columns.findIndex(col => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)
        const overIndex = tasks.findIndex(t => t.id === overId)

        if (tasks[activeIndex].id_user_leader != tasks[overIndex].id_user_leader) {
          // Fix introduced after video recording
          tasks[activeIndex].id_user_leader = tasks[overIndex].id_user_leader
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === "Column"

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)

        tasks[activeIndex].id_user_leader = overId
        console.log("DROPPING TASK OVER COLUMN", { activeIndex })
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001)
}

export default KanbanBoard
