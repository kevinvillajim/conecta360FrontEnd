import { useState } from "react";
import Template from "../../components/Template";
import DataTable from "../../components/DataTable";
import IconButton from "@mui/material/IconButton";
import all from "../../components/all.js";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import Card from "../../components/Card";
import ListIcon from "@mui/icons-material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Proveedores() {
  const [showMore, setShowMore] = useState(false);
  const [typeSelected, setTypeSelected] = useState(false);
  const [showDetailCreated, setshowDetailCreated] = useState({});
  const [showDetailUpdated, setshowDetailUpdated] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const color = "#93c120";

  const handleDetailCreatedClick = (rowId) => {
    setshowDetailCreated((prevStates) => ({
      ...prevStates,
      [rowId]: !prevStates[rowId],
    }));
  };

  const handleDetailUpdatedClick = (rowId) => {
    setshowDetailUpdated((prevStates) => ({
      ...prevStates,
      [rowId]: !prevStates[rowId],
    }));
  };

  const hideAll = () => {
    setshowDetailCreated({});
    setshowDetailUpdated({});
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

  const handleDeleteSelected = () => {
    console.log("Eliminar filas seleccionadas:", selectedRows);
    // Lógica para borrar las filas seleccionadas
  };

  const handleSelectionChange = (newSelection) => {
    console.log("Nueva selección en Users:", newSelection);
    setSelectedRows(newSelection); // Asegúrate de que estás actualizando el estado correctamente
  };

  const handleTypeSelected = () => {
    setTypeSelected(!typeSelected);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "model", headerName: "Model", type: "number", width: 150 },
    {
      field: "id_categoria",
      headerName: "Category",
      type: "number",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "img",
      headerName: "Image",
      width: 40,
      renderCell: (params) => (
        <Avatar
          alt="img"
          src={params.value}
        />
      ),
    },
    {
      field: "costIva",
      headerName: "Cost",
      width: 90,
    },
    {
      field: "costMayor",
      headerName: "P/ Mayor",
      width: 90,
    },
    {
      field: "costPVP",
      headerName: "PVP",
      width: 90,
    },
    {
      field: "id_user_created",
      headerName: "Created",
      type: "number",
      width: 50,
      renderCell: (params) => (
        <>
          <div className="relative">
            <span
              className={`text-[${color}] cursor-pointer`}
              onClick={() => {
                handleDetailCreatedClick(params.row.id);
              }}
              onMouseLeave={hideAll}
            >
              <u>{params.value}</u>
            </span>
            <div
              className={showDetailCreated[params.row.id] ? "fixed" : "hidden"}
            >
              <div className="bg-[#000] bg-opacity-50 rounded-md shadow-md p-2">
                <p className="text-[#fff]">{all.users[params.value].name}</p>
                <p className="text-[#fff]">
                  {all.users[params.value].created_at}
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      field: "id_user_updated",
      headerName: "Updated",
      type: "number",
      width: 50,
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
                <p className="text-[#fff]">{all.users[params.value].name}</p>
                <p className="text-[#fff]">
                  {all.users[params.value].updated_at}
                </p>
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
            <IconButton
              aria-label="fingerprint"
              color="primary"
              href={`https://api.whatsapp.com/send?phone=${params.row.phone}&text=Hola%20${params.row.name}.`}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              href={params.row.web}
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon />
            </IconButton>
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

  const rows = all.productos;

  return (
    <>
      <Template
        content={
          <div>
            <div className="mb-4 flex justify-between">
              <IconButton
                aria-label="delete-selected"
                color="error"
                onClick={handleDeleteSelected}
              >
                <DeleteSweepIcon />
              </IconButton>
              <IconButton
                aria-label="delete-selected"
                color="black"
                onClick={handleTypeSelected}
              >
                {typeSelected === false ? <DashboardIcon /> : <ListIcon />}
              </IconButton>
            </div>
            <div className={typeSelected === true ? "hidden" : "inline"}>
              <DataTable
                rows={rows}
                columns={columns}
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
              />
            </div>
            <div
              className={
                typeSelected === true ? "grid grid-cols-4 gap-4" : "hidden"
              }
            >
              <Card
                title="name"
                model="model"
                provider="id_proveedor"
                img="img"
                description="description"
                object={all.productos}
                price="costPVP"
                categoria="id_categoria"
                costo="costIva"
                costoMayor="costMayor"
                pill={true}
                money={true}
                table="Productos"
              />
            </div>
          </div>
        }
        title="Productos"
      />
    </>
  );
}

export default Proveedores;
