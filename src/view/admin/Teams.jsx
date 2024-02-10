import Template from "../../components/Template";
import KanbanBoard from "../../components/DragNDrop/KanbanBoard.tsx";
import all from "../../components/all.js";

function Teams() {
	const supervisores = all.teams;

	const getUserById = function (id, it, table) {
		const filteredUser = all[table].filter((user) => user.id === id);
		if (filteredUser.length > 0) {
			return filteredUser[0][it];
		} else {
			return it + "no encontrado";
		}
	};

	const defaultCols = [];
	supervisores.map((supervisor) => {
		const col = {
			id: supervisor.id,
			name: getUserById(supervisor.id, "name", "users"), //cambiar
		};

		defaultCols.push(col);
	});

	const asesores = all.users.filter((user) => user.id_rol === 3);

	const defaultTasks = [];
	asesores.map((asesor) => {
		const task = {
			id: "asesor" + asesor.id,
			id_user_leader: asesor.id_team,
			content: asesor.name,
		};

		defaultTasks.push(task);
	});

	return (
		<>
			<Template
				content={
					<div>
						<KanbanBoard
							defaultCols={defaultCols}
							defaultTasks={defaultTasks}
						/>
					</div>
				}
				title="Teams"
			/>
		</>
	);
}

export default Teams;
