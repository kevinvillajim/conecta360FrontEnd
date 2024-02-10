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
  const [selectedRows, setSelectedRows] = useState([]);

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

  const getProductById = function (id, it) {
    const filteredProduct = all.productos.filter(
      (product) => product.id === id
    );
    if (filteredProduct.length > 0) {
      return filteredProduct[0][it];
    } else {
      return it + "no encontrado";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => getProductById(params.row.id_producto, "name"),
    },
    {
      field: "model",
      headerName: "Model",
      width: 90,
      renderCell: (params) => getProductById(params.row.id_producto, "model"),
    },
    {
      field: "descriptiom",
      headerName: "Description",
      width: 300,
      renderCell: (params) =>
        getProductById(params.row.id_producto, "description"),
    },
    {
      field: "img",
      headerName: "Image",
      width: 40,
      renderCell: (params) => (
        <Avatar
          alt="img"
          src={getProductById(params.row.id_producto, "img")}
        />
      ),
    },
    {
      field: "id_producto",
      headerName: "ID Producto",
      width: 150,
      type: "number",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 70,
    },
    {
      field: "min_stock",
      headerName: "Min Stock",
      width: 70,
      renderCell: (params) =>
        getProductById(params.row.id_producto, "minStock"),
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

  const rows = all.inventarios;

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
                title="id_producto"
                titleId={{ active: true, it: "name", table: "productos" }}
                model="id_producto"
                modelId={{ active: true, it: "model", table: "productos" }}
                provider="id_proveedor"
                img="id_producto"
                imgId={{ active: true, it: "img", table: "productos" }}
                description="description"
                object={all.inventarios}
                price="stock"
                pill={false}
                money={false}
                table="Productos"
              />
            </div>
          </div>
        }
        title="Inventario"
      />
    </>
  );
}

export default Proveedores;
