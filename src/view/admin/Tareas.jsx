import Template from "../../components/Template";
import ToDo from "../../components/ToDo";

function Teams() {
	return (
		<>
			<Template
				content={
					<div>
						<ToDo />
					</div>
				}
				title="Tareas"
			/>
		</>
	);
}

export default Teams;
