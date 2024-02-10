import {Routes as ReactRoutes, Route} from "react-router-dom";
import Clientes from "./view/admin/Clientes";
import Users from "./view/admin/Users";
import Proveedores from "./view/admin/Proveedores";
import Productos from "./view/admin/Productos";
import Teams from "./view/admin/Teams";
import Tareas from "./view/admin/Tareas";
import Inventario from "./view/admin/Inventario";
import Finanzas from "./view/admin/Finanzas";
import Metas from "./view/admin/Metas";
import Citas from "./view/admin/Citas";

const Routes = () => {
	return (
		<ReactRoutes>
			<Route path="/clientes" element={<Clientes />} />
			<Route path="/teams" element={<Teams />} />
			<Route path="/finanzas" element={<Finanzas />} />
			<Route path="/citas" element={<Citas />} />
			<Route path="/metas" element={<Metas />} />
			<Route path="/usuarios" element={<Users />} />
			<Route path="/tareas" element={<Tareas />} />
			<Route path="/proveedores" element={<Proveedores />} />
			<Route path="/productos" element={<Productos />} />
			<Route path="/teams" element={<Teams />} />
			<Route path="/inventario" element={<Inventario />} />

			<Route path="/" element={<Users />} />
		</ReactRoutes>
	);
};

export default Routes;
