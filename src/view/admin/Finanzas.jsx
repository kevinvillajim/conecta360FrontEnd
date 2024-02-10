import Template from "../../components/Template";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import all from "../../components/all.js";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "../../components/DataTable";
import ModalImg from "../../components/ModalImg";

function Proveedores() {
  const [view, setView] = useState("Total");
  const list = ["Ingresos", "Gastos", "Total"];
  const [selectedRows, setSelectedRows] = useState([]);
  const color = "#93c120";
  const [showMore, setShowMore] = useState(false);
  const [showDetailUpdated, setshowDetailUpdated] = useState({});
  const [showDetailSupervisor, setshowDetailSupervisor] = useState({});
  const [selectedImg, setSelectedImg] = useState();
  const [showModalImg, setShowModalImg] = useState(false);

  const totalIncome = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Income" && movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const totalExpense = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Expense" && movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const incomeBank = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Income" &&
        movimientos.status === "Completed" &&
        movimientos.count === "Bank" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const incomeCash = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Income" &&
        movimientos.status === "Completed" &&
        movimientos.count === "Cash" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const pendingIncomeBank = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Income" &&
        movimientos.status === "Pending" &&
        movimientos.count === "Bank" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const pendingIncomeCash = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Income" &&
        movimientos.status === "Pending" &&
        movimientos.count === "Cash" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const pendingExpenseBank = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Expense" &&
        movimientos.status === "Pending" &&
        movimientos.count === "Bank" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const pendingExpenseCash = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Expense" &&
        movimientos.status === "Pending" &&
        movimientos.count === "Cash" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const expenseBank = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Expense" &&
        movimientos.status === "Completed" &&
        movimientos.count === "Bank" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const expenseCash = all.finanzas
    .filter(
      (movimientos) =>
        movimientos.type === "Expense" &&
        movimientos.status === "Completed" &&
        movimientos.count === "Cash" &&
        movimientos.status !== "Canceled"
    )
    .map((income) => +income.amount)
    .reduce((acumulador, numero) => acumulador + numero, 0);

  const incomeTotal = incomeBank + incomeCash;
  const pendingIncomeTotal = pendingIncomeBank + pendingIncomeCash;
  const pendingExpenseTotal = pendingExpenseBank + pendingExpenseCash;
  const expenseTotal = expenseBank + expenseCash;

  const total =
    incomeTotal + pendingIncomeTotal - (expenseTotal + pendingExpenseTotal);

  //   const handleDeleteSelected = () => {
  //     console.log("Eliminar filas seleccionadas:", selectedRows);
  //     // Lógica para borrar las filas seleccionadas
  //   };

  const handleSelectionChange = (newSelection) => {
    console.log("Nueva selección en Users:", newSelection);
    setSelectedRows(newSelection); // Asegúrate de que estás actualizando el estado correctamente
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleShowEdit = (id) => () => {
    // Lógica para editar con el ID
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = (id) => () => {
    // Lógica para eliminar con el ID
    console.log("Delete clicked for ID:", id);
  };

  const handleDetailUpdatedClick = (rowId) => {
    setshowDetailUpdated((prevStates) => ({
      ...prevStates,
      [rowId]: !prevStates[rowId],
    }));
  };

  const handleDetailSupervisorClick = (rowId) => {
    setshowDetailSupervisor((prevStates) => ({
      ...prevStates,
      [rowId]: !prevStates[rowId],
    }));
  };

  const hideAll = () => {
    setshowDetailUpdated({});
    setshowDetailSupervisor({});
  };

  const getProductById = function (id, it, table) {
    const filteredProduct = all[table].filter((product) => product.id === id);
    if (filteredProduct.length > 0) {
      return filteredProduct[0][it];
    } else {
      return it + "no encontrado";
    }
  };

  const income = [
    { name: "Bank", value: incomeBank },
    { name: "Cash", value: incomeCash },
    { name: "Total", value: incomeTotal },
  ];

  const pendingIncome = [
    { name: "Bank", value: pendingIncomeBank },
    { name: "Cash", value: pendingIncomeCash },
    { name: "Total", value: pendingIncomeTotal },
  ];

  const pendingExpense = [
    { name: "Bank", value: pendingExpenseBank },
    { name: "Cash", value: pendingExpenseCash },
    { name: "Total", value: pendingExpenseTotal },
  ];

  const expense = [
    { name: "Bank", value: expenseBank },
    { name: "Cash", value: expenseCash },
    { name: "Total", value: expenseTotal },
  ];

  const columnsIncome = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "concept",
      headerName: "Concept",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 90,
      renderCell: (params) => <div>${params.value}</div>,
    },
    {
      field: "count",
      headerName: "Count",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <div>
          <div
            className={
              params.value === "Completed"
                ? "flex border-2 border-[green] text-[green] rounded-full px-[7px] text-sm font-bold"
                : "hidden"
            }
          >
            Completed
          </div>
          <div
            className={
              params.value === "Pending"
                ? "flex border-2 border-[#FFC300] text-[#FFC300] rounded-full px-[7px] text-sm font-bold"
                : "hidden"
            }
          >
            Pending
          </div>
          <div
            className={
              params.value === "Canceled"
                ? "flex border-2 border-[red] text-[red] rounded-full px-[7px] text-sm font-bold"
                : "hidden"
            }
          >
            Canceled
          </div>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
    },
    {
      field: "img",
      headerName: "Comprobant",
      width: 90,
      renderCell: (params) => (
        <Avatar
          alt="img"
          src={params.value}
        />
      ),
    },
    {
      field: "id_user_assigned",
      headerName: "Responsable",
      width: 150,
      type: "number",
      renderCell: (params) => (
        <>
          <div className="relative">
            <span
              className={`text-[${color}] cursor-pointer`}
              onClick={() => {
                handleDetailUpdatedClick(params.row.id);
              }}
              onMouseLeave={hideAll}
            >
              <u>{params.value}</u>
            </span>
            <div
              className={showDetailUpdated[params.row.id] ? "fixed" : "hidden"}
            >
              <div className="bg-[#000] bg-opacity-50 rounded-md shadow-md p-2">
                <p className="text-[#fff]">
                  {getProductById(params.value, "name", "users")}
                </p>
                <p className="text-[#fff]">{params.row.date}</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      field: "id_supervisor_assigned",
      headerName: "Supervisor",
      type: "number",
      width: 70,
      renderCell: (params) => (
        <>
          <div className="relative">
            <span
              className={`text-[${color}] cursor-pointer`}
              onClick={() => {
                handleDetailSupervisorClick(params.row.id);
              }}
              onMouseLeave={hideAll}
            >
              <u>{params.value}</u>
            </span>
            <div
              className={
                showDetailSupervisor[params.row.id] ? "fixed" : "hidden"
              }
            >
              <div className="bg-[#000] bg-opacity-50 rounded-md shadow-md p-2">
                <p className="text-[#fff]">
                  {getProductById(params.value, "name", "users")}
                </p>
                <p className="text-[#fff]">{params.row.date}</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      width: 220,
      renderCell: (params) => (
        <>
          <div className={showMore === true ? "hidden" : "inline"}>
            <IconButton
              color="black"
              onClick={handleShowMore}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className={showMore === true ? "inline" : "hidden"}>
            <IconButton
              aria-label="fingerprint"
              color="black"
              onClick={handleShowEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="fingerprint"
              color="error"
              onClick={handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
            {params.row.img && (
              <IconButton
                aria-label="fingerprint"
                color="secondary"
                onClick={() => {
                  setSelectedImg(params.row.img);
                  setShowModalImg(!showModalImg);
                }}
              >
                <ImageIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="fingerprint"
              color="black"
              onClick={handleShowMore}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </>
      ),
    },
  ];

  const rowsIncome = all.finanzas.filter(
    (movimientos) => movimientos.type === "Income"
  );

  const rowsExpense = all.finanzas.filter(
    (movimientos) => movimientos.type === "Expense"
  );

  return (
    <>
      <div className={showModalImg === true ? "inline" : "hidden"}>
        <ModalImg
          photo={selectedImg}
          setShowModalImg={setShowModalImg}
        />
      </div>
      <Template
        content={
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
            <section
              className={view === "Ingresos" ? "inline" : "hidden"}
              style={{ height: "400px" }}
            >
              <DataTable
                rows={rowsIncome}
                columns={columnsIncome}
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
              />
              <div className="flex justify-end mt-[1rem]">
                <h1 className="text-[20px]">
                  Total Income:
                  <span className="font-bold text-[green]">
                    {" "}
                    ${totalIncome}
                  </span>
                </h1>
              </div>
            </section>
            <section className={view === "Gastos" ? "inline" : "hidden"}>
              <DataTable
                rows={rowsExpense}
                columns={columnsIncome}
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
              />
              <div className="flex justify-end mt-[1rem]">
                <h1 className="text-[20px]">
                  Total Expense:
                  <span className="font-bold text-[red]"> ${totalExpense}</span>
                </h1>
              </div>
            </section>
            <section className={view === "Total" ? "inline" : "hidden"}>
              <div className="flex justify-evenly my-[2rem]">
                {income.map((element, key) => (
                  <div
                    className="w-[10rem] min-h-[5rem] p-[0.8rem] rounded-md shadow-sm shadow-black bg-[white] flex justify-center flex-col gap-2"
                    key={key}
                  >
                    <h2 className="text-[25px] text-[#93c120] font-bold text-center">
                      {element.name}
                    </h2>
                    <div className="flex justify-center">
                      <p className="text-[20px]">${element.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-evenly my-[2rem]">
                {pendingIncome.map((element, key) => (
                  <div
                    className="w-[10rem] min-h-[5rem] p-[0.8rem] rounded-md shadow-sm shadow-black bg-[white] flex justify-center flex-col gap-2"
                    key={key}
                  >
                    <h2 className="text-[25px] text-[#FFC300] font-bold text-center">
                      {element.name}
                    </h2>
                    <div className="flex justify-center">
                      <p className="text-[20px]">${element.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-evenly my-[2rem]">
                {pendingExpense.map((element, key) => (
                  <div
                    className="w-[10rem] min-h-[5rem] p-[0.8rem] rounded-md shadow-sm shadow-black bg-[white] flex justify-center flex-col gap-2"
                    key={key}
                  >
                    <h2 className="text-[25px] text-[#FF6C00] font-bold text-center">
                      {element.name}
                    </h2>
                    <div className="flex justify-center">
                      <p className="text-[20px]">${element.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-evenly my-[2rem]">
                {expense.map((element, key) => (
                  <div
                    className="w-[10rem] min-h-[5rem] p-[0.8rem] rounded-md shadow-sm shadow-black bg-[white] flex justify-center flex-col gap-2"
                    key={key}
                  >
                    <h2 className="text-[25px] text-[red] font-bold text-center">
                      {element.name}
                    </h2>
                    <div className="flex justify-center">
                      <p className="text-[20px]">${element.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-center my-[2rem]">
                <h1
                  className={`text-[30px] font-bold ${
                    total > 0
                      ? "text-[#s93c120]"
                      : total < 0
                      ? "text-[red]"
                      : "text-[gray]"
                  }`}
                >
                  ${total}
                </h1>
              </div>
            </section>
          </div>
        }
        title="Finzanzas"
      />
    </>
  );
}

export default Proveedores;
