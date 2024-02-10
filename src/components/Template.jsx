import { useState } from "react";
import SideBar from "./SideBar";
import "../App.css";
import ModalUser from "./ModalUser";
import Header from "./Header";
import { ModalNew } from "./ModalNew";
import PropTypes from "prop-types";
import { sideBarOptions } from "./sideBarOptions";

function Template({ title, propButton, content }) {
  const [showMenu, setShowMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);

  const logo = "logo.png";
  const nombreCompleto = "Kevin Villacreses";
  const rol = "admin";
  const avatar = "avatar.png";

  return (
    <>
      <div
        className={
          showMenu ? "grid grid-cols-1 md:grid-cols-6 relative" : "flex"
        }
      >
        <div
          className={
            showMenu
              ? "col-span-1 md:col-span-1 h-screen sticky top-0"
              : "hidden"
          }
        >
          <SideBar
            logo={logo}
            options={sideBarOptions}
            name={nombreCompleto}
            rol={rol}
          />
        </div>
        <div className={showMenu ? "col-span-1 md:col-span-5" : "w-screen"}>
          <div>
            <Header
              name={nombreCompleto}
              avatar={avatar}
              setShowMenu={setShowMenu}
              setShowModal={setShowModal}
            />
          </div>
          <div
            className={`${
              showModal
                ? "opacity-100 scale-100 duration-300"
                : "opacity-0 scale-y-90 duration-200 invisible"
            } transition-all`}
          >
            <ModalUser isOpen={showMenu} />
          </div>
          <div className="p-[2rem] bg-[#e3e3e3] min-h-[calc(100vh-4rem)]">
            <div className="flex justify-between mb-[1rem]">
              <h1 className="text-[30px] font-bold text-gray-800">{title}</h1>
              <button
                href={propButton}
                onClick={() => {
                  setShowModalNew(true);
                }}
                className="bg-[#93c120] text-white rounded-full w-[50px] h-[50px] flex items-center justify-center"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="h-[100%] w-[100%] bg-[#f8f8f8] rounded-lg p-[1rem]">
              {content}
            </div>
          </div>
        </div>
      </div>
      {showModalNew && (
        <ModalNew
          setShowModalNew={setShowModalNew}
          formObject={[
            { name: "rol", label: "Rol", style: "" },
            {
              name: "usuario_creacion",
              label: "",
              style: "hidden",
              value: localStorage.getItem("id"),
            },
            {
              name: "usuario_modificacion",
              label: "",
              style: "hidden",
              value: localStorage.getItem("id"),
            },
            {
              name: "estado",
              label: "Habilitado",
              style: "",
              value: "1",
            },
          ]}
          api="http://127.0.0.1:8000/api/roles"
        />
      )}
    </>
  );
}

Template.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
  propButton: PropTypes.string,
};

export default Template;
