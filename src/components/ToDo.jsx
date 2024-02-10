import { useState } from "react";
import all from "./all.js";
import ToDoCard from "./ToDoCard.jsx";

const ToDo = () => {
  const [view, setView] = useState("All");

  const list = ["All", "Active", "Completed", "Calendar"];

  return (
    <>
      <div className="w-[100%] h-[100%]">
        <header>
          <ul className="flex flex-row gap-10 justify-center font-semibold text-[20px]">
            {list.map((item) => (
              <li
                className={`cursor-pointer relative text-black group`}
                onClick={() => setView(item)}
                key={item}
              >
                {item}
                {(view === item || (view === "" && item === "All")) && (
                  <div className="absolute w-full h-[2.5px] bg-black bottom-0 left-0"></div>
                )}
                {view !== item && (
                  <div className="absolute w-full h-[2.5px] bg-[#93c120] bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <hr className=" mb-[20px] w-[60%]" />
          </div>
        </header>
        <section className={view === "All" ? "inline" : "hidden"}>
          <p>{view}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            {all.tareas.map((item, index) => (
              <ToDoCard
                item={item}
                key={index}
                all={all}
              />
            ))}
          </div>
        </section>
        <section className={view === "Active" ? "inline" : "hidden"}>
          <p>{view}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            {all.tareas
              .filter((tarea) => tarea.done === 0)
              .map((item, index) => (
                <ToDoCard
                  item={item}
                  key={index}
                  all={all}
                />
              ))}
          </div>
        </section>
        <section className={view === "Completed" ? "inline" : "hidden"}>
          <p>{view}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            {all.tareas
              .filter((tarea) => tarea.done === 1)
              .map((item, index) => (
                <ToDoCard
                  item={item}
                  key={index}
                  all={all}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ToDo;
