import Template from "../../components/Template";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import all from "../../components/all";
import {useState} from "react";
import BasicModal from "../../components/BasicModal";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";

function Citas() {
	const [showBasicModal, setShowBasicModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const getUserById = function (id, it, table) {
		const filteredUser = all[table].filter((user) => user.id === id);
		if (filteredUser.length > 0) {
			return filteredUser[0][it];
		} else {
			return it + "no encontrado";
		}
	};

	const handleEventClick = (info) => {
		setSelectedEvent(info.event);
		setShowBasicModal(true);
		console.log(info.event);
	};

	return (
		<>
			<Template
				content={
					<div>
						<FullCalendar
							plugins={[dayGridPlugin]}
							initialView="dayGridMonth"
							events={all.citas.map((cita, key) => ({
								title: cita.description,
								date: cita.date_cita,
								id: cita.id,
								taken: cita.date_taken,
								cita: cita.date_cita,
								cliente: cita.id_cliente,
								user_assigned: cita.id_user_assigned,
								supervisor_assigned: cita.id_supervisor_assigned,
								key: key,
							}))}
							eventClick={handleEventClick}
						/>
						{showBasicModal && (
							<BasicModal
								setShowBasicModal={setShowBasicModal}
								content={
									<div>
										<div className="flex justify-between">
											<div className="border-[3px] border-[green] rounded-full px-[0.5rem] py-[2px] flex">
												{selectedEvent.extendedProps.taken}
											</div>
											<div className="border-[3px] border-[red] rounded-full px-[0.5rem] py-[2px] flex">
												{selectedEvent.extendedProps.cita}
											</div>
										</div>
										<h2 className="text-[18px] my-[1rem]">
											<b>{selectedEvent.title}</b>
										</h2>
										<p>
											<b>Cliente:</b>{" "}
											{getUserById(
												selectedEvent.extendedProps.cliente,
												"name",
												"clientes"
											)}
										</p>
										<div className="flex justify-between items-center">
											<p>
												<b>Email:</b>{" "}
												{getUserById(
													selectedEvent.extendedProps.cliente,
													"email",
													"clientes"
												)}
											</p>
											<IconButton
												aria-label="fingerprint"
												color="secondary"
												href={`mailto:${getUserById(
													selectedEvent.extendedProps.cliente,
													"email",
													"clientes"
												)}`}
												target="_blank"
												rel="noreferrer"
											>
												<EmailIcon />
											</IconButton>
										</div>
										<div className="flex justify-between items-center">
											<p>
												<b>Phone:</b>{" "}
												{getUserById(
													selectedEvent.extendedProps.cliente,
													"phone",
													"clientes"
												)}
											</p>
											<IconButton
												aria-label="fingerprint"
												color="primary"
												href={`https://api.whatsapp.com/send?phone=${getUserById(
													selectedEvent.extendedProps.cliente,
													"phone",
													"clientes"
												)}&text=Hola%20${getUserById(
													selectedEvent.extendedProps.cliente,
													"name",
													"clientes"
												)}.`}
												target="_blank"
												rel="noreferrer"
											>
												<WhatsAppIcon />
											</IconButton>
										</div>
										<p>
											<b>Dirección:</b>{" "}
											{getUserById(
												selectedEvent.extendedProps.cliente,
												"address",
												"clientes"
											)}
										</p>
										<p>
											<b>Cumpleaños:</b>{" "}
											{getUserById(
												selectedEvent.extendedProps.cliente,
												"birth",
												"clientes"
											)}
										</p>
										<p>
											<b>Usuario Responsable:</b>{" "}
											{getUserById(
												selectedEvent.extendedProps.user_assigned,
												"name",
												"users"
											)}
										</p>
										<p>
											<b>Supervisor Responsable:</b>{" "}
											{getUserById(
												selectedEvent.extendedProps.supervisor_assigned,
												"name",
												"users"
											)}
										</p>
									</div>
								}
							/>
						)}
					</div>
				}
				title="Citas"
			/>
		</>
	);
}

export default Citas;
