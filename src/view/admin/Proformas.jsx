import Template from "../../components/Template";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import PDF from "../../components/PDF";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";

function Proformas() {
	return (
		<>
			<Template
				content={
					<div>
						<PDFDownloadLink
							document={
								<PDF
									type="Cliente Final"
									number={10}
									client="Kevin Villacreses"
									date="24/10/2024"
									dateFinal="30/10/2024"
									status="Pendiente"
									header={[
										{content: "N°", width: 30},
										{content: "Descripción", width: 250},
										{content: "Precio", width: 30},
										{content: "Cantidad", width: 30},
										{content: "Total", width: 30},
									]}
									tableContent={[
										[
											"1",
											"Servicio Tratamiento de Cucaracha 100m2",
											"60.00",
											"2",
											"120.00",
										],
										[
											"2",
											"Servicio Tratamiento de Cucaracha 200m2",
											"80.00",
											"1",
											"80.00",
										],
										[
											"3",
											"Servicio Tratamiento de Cucaracha 50m2",
											"50.00",
											"1",
											"50.00",
										],
									]}
									terms="La proforma tiene una duración de 10 días a partir de su emisión"
									notes="Al finalizar el servicio se entregará un certificado de aval y certificaión sanitaria avalada por todos los organismos de control indispensable para el control sanitario."
									subTotal="190.00"
									iva="22.80"
									total="212.80"
								/>
							}
							fileName="Proforma.pdf"
						>
							{({
								loading,
								// , blob, url, error
							}) =>
								loading ? (
									<img src="/loading.gif" className="w-[20px] " />
								) : (
									<IconButton aria-label="fingerprint" color="primary">
										<DownloadIcon />
									</IconButton>
								)
							}
						</PDFDownloadLink>
						<PDFViewer style={{width: "100%", height: "700px"}}>
							<PDF
								type="Cliente Final"
								number={10}
								client="Kevin Villacreses"
								date="24/10/2024"
								dateFinal="30/10/2024"
								status="Pendiente"
								header={[
									{content: "N°", width: 30},
									{content: "Descripción", width: 250},
									{content: "Precio", width: 30},
									{content: "Cantidad", width: 30},
									{content: "Total", width: 30},
								]}
								tableContent={[
									[
										"1",
										"Servicio Tratamiento de Cucaracha 100m2",
										"60.00",
										"2",
										"120.00",
									],
									[
										"2",
										"Servicio Tratamiento de Cucaracha 200m2",
										"80.00",
										"1",
										"80.00",
									],
									[
										"3",
										"Servicio Tratamiento de Cucaracha 50m2",
										"50.00",
										"1",
										"50.00",
									],
								]}
								terms="La proforma tiene una duración de 10 días a partir de su emisión"
								notes="Al finalizar el servicio se entregará un certificado de aval y certificaión sanitaria avalada por todos los organismos de control indispensable para el control sanitario."
								subTotal="190.00"
								iva="22.80"
								total="212.80"
							/>
						</PDFViewer>
					</div>
				}
				title="Proformas"
			/>
		</>
	);
}

export default Proformas;
