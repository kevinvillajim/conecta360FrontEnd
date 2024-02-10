import {useState} from "react";
import Template from "../../components/Template";
import ProgressBar from "../../components/ProgressBar";
import all from "../../components/all";

function Teams() {
	const [showUsers, setShowUsers] = useState(null);

	const teamsContent = all.teams.map((team) => {
		const usersInTeam = all.users.filter((user) => team.id === user.id_team);
		const supervisor = all.users.find(
			(user) => user.id === team.id_user_leader
		);
		const value = all.metas.filter(
			(meta) => meta.id_supervisor_assigned === team.id
		);

		const totalValueTeam = usersInTeam.reduce((acc, user) => {
			const financesFiltered = all.finanzas.filter(
				(finance) =>
					finance.id_user_assigned === user.id &&
					finance.type === "Income" &&
					finance.status === "Completed"
			);
			const totalValueUser = financesFiltered.reduce(
				(acc2, finance) => acc2 + finance.amount,
				0
			);
			return acc + totalValueUser;
		}, 0);

		return (
			<div
				key={team.id}
				className="border border-gray p-[1rem] rounded-lg mb-[1rem] cursor-pointer"
				onClick={() => setShowUsers(showUsers === team.id ? null : team.id)}
			>
				<ProgressBar
					totalValue={Math.floor(
						(totalValueTeam * 100) / (value[0] ? value[0].value : 0)
					)}
					nameTeam={supervisor.name}
				/>
				<p>Users in Team: {usersInTeam.length}</p>
				{showUsers === team.id && (
					<div className="grid grid-cols-4 gap-5 mt-[1rem]">
						{usersInTeam.map((user) => {
							const financesFiltered = all.finanzas.filter(
								(finance) =>
									finance.id_user_assigned === user.id &&
									finance.type === "Income" &&
									finance.status === "Completed"
							);
							const totalValueUser = financesFiltered.reduce(
								(acc, finance) => acc + finance.amount,
								0
							);
							console.log("Value User:", totalValueUser);
							console.log("Value Team:", totalValueTeam);
							console.log(
								"Value Team/Users:",
								totalValueTeam / usersInTeam.length
							);
							console.log("Value User/Team:", totalValueUser / totalValueTeam);

							return (
								<div
									key={user.id}
									className="border border-gray p-[1rem] rounded-lg"
								>
									<ProgressBar
										totalValue={Math.floor(
											((totalValueUser * 100) / value[0].value) *
												usersInTeam.length
										)}
										nameTeam={user.name}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	});

	return (
		<>
			<Template content={teamsContent} title="Metas" />
		</>
	);
}

export default Teams;
