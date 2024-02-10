import {useState} from "react";
import Template from "../../components/Template";
import DataTable from "../../components/DataTable";
import IconButton from "@mui/material/IconButton";
import all from "../../components/all.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

function Clientes() {
	const [showMore, setShowMore] = useState(false);
	const [showDetailUser, setshowDetailUser] = useState({});
	const [showDetailSupervisor, setshowDetailSupervisor] = useState({});
	const [showDetailCreated, setshowDetailCreated] = useState({});
	const [showDetailUpdated, setshowDetailUpdated] = useState({});
	const [selectedRows, setSelectedRows] = useState([]);
	const color = "#93c120";

	const handleDetailUserClick = (rowId) => {
		setshowDetailUser((prevStates) => ({
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
		setshowDetailUser({});
		setshowDetailSupervisor({});
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

	const columns = [
		{field: "id", headerName: "ID", width: 10},
		{field: "name", headerName: "Name", width: 180},
		{field: "email", headerName: "Email", width: 200},
		{
			field: "phone",
			headerName: "Phone",
			type: "number",
			width: 180,
		},
		{
			field: "address",
			headerName: "Address",
			width: 400,
		},
		{
			field: "birth",
			headerName: "Birth",
			width: 100,
		},
		{
			field: "gender",
			headerName: "Gender",
			width: 90,
		},
		{
			field: "id_user_assigned",
			headerName: "User",
			type: "number",
			width: 80,
			renderCell: (params) => (
				<>
					<div className="relative">
						<span
							className={`text-[${color}] cursor-pointer`}
							onClick={() => {
								handleDetailUserClick(params.row.id);
							}}
							onMouseLeave={hideAll}
						>
							<u>{params.value}</u>
						</span>
						<div className={showDetailUser[params.row.id] ? "fixed" : "hidden"}>
							<div className="bg-[#000] bg-opacity-50 rounded-md shadow-md p-2">
								<p className="text-[#fff]">{all.users[params.value].name}</p>
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
			width: 80,
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
								<p className="text-[#fff]">{all.users[params.value].name}</p>
							</div>
						</div>
					</div>
				</>
			),
		},
		{
			field: "id_user_created",
			headerName: "Created",
			type: "number",
			width: 80,
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
			headerName: "Upadated",
			type: "number",
			width: 80,
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
						<IconButton color="black" onClick={handleShowMore}>
							<MoreVertIcon />
						</IconButton>
					</div>
					<div className={showMore === true ? "inline" : "hidden"}>
						<IconButton
							aria-label="fingerprint"
							color="secondary.light"
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
							href={`mailto:${params.row.email}`}
							target="_blank"
							rel="noreferrer"
						>
							<EmailIcon />
						</IconButton>
						<IconButton
							aria-label="fingerprint"
							color="black"
							onClick={() => {
								handleShowMore();
							}}
						>
							<CloseIcon />
						</IconButton>
					</div>
				</>
			),
		},
	];

	const rows = all.clientes;

	return (
		<>
			<Template
				content={
					<div>
						<div className="mb-4">
							<IconButton
								aria-label="delete-selected"
								color="error"
								onClick={handleDeleteSelected}
							>
								<DeleteSweepIcon />
							</IconButton>
						</div>
						<DataTable
							rows={rows}
							columns={columns}
							selectedRows={selectedRows}
							onSelectionChange={handleSelectionChange}
						/>
					</div>
				}
				title="Clientes"
			/>
		</>
	);
}

export default Clientes;
