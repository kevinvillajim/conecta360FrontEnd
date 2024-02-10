import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";

const ToDoCard = ({ item, id, all }) => {
  const getUserById = function (idU) {
    const filteredUsers = all.users.filter((user) => user.id === idU);
    if (filteredUsers.length > 0) {
      return filteredUsers[0].name;
    } else {
      return "Usuario no encontrado";
    }
  };

  return (
    <>
      <div
        key={id}
        className="w-[15rem] min-h-[15rem] p-[0.8rem] rounded-md shadow-sm shadow-black bg-[white] flex justify-between flex-col"
      >
        <div>
          <div className="flex justify-between items-center text-xs">
            <p className="font-semibold">{item.date_create}</p>
            <Checkbox defaultChecked={item.done === 1} />
          </div>
          <div className="flex flex-col ">
            <h2
              className={`text-[20px] text-[#93c120] font-bold text-center mb-[1.5rem] ${
                item.done === 1 ? "line-through" : ""
              }`}
            >
              {item.title}
            </h2>
            <p>{item.description}</p>
          </div>
        </div>
        <div className="flex justify-center my-[7%] gap-2">
          <div>
            <h3 className="text-[10px] text-[#13a19b]">Asignado</h3>
            <p className=" border-2 border-[#13a19b] text-[#13a19b] text-[10px] font-semibold px-[3px] py-[2px] rounded-full">
              {getUserById(item.id_user_assigned)}
            </p>
          </div>
          <div>
            <h3 className="text-[10px] text-[#93c120]">Creador</h3>
            <p className="border-2 border-[#93c120] text-[#93c120] text-[10px] font-semibold px-[3px] py-[2px] rounded-full">
              {getUserById(item.id_user_created)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

ToDoCard.propTypes = {
  item: PropTypes.object,
  id: PropTypes.number,
  all: PropTypes.object,
};

export default ToDoCard;
