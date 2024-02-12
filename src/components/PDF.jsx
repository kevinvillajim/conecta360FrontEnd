import PropTypes from "prop-types";
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	table: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	tableRow: {
		flexDirection: "row",
		borderBottom: "1px solid #363a46",
	},
	headerCell: (width) => ({
		flexGrow: 1,
		margin: "auto",
		fontSize: 10,
		padding: 5,
		flexWrap: "wrap",
		width: width,
		backgroundColor: "#363a46",
	}),
	bodyCellEven: (width) => ({
		flexGrow: 1,
		margin: "auto",
		fontSize: 10,
		padding: 5,
		flexWrap: "wrap",
		width: width,
		backgroundColor: "#fff",
	}),
	bodyCellOdd: (width) => ({
		flexGrow: 1,
		margin: "auto",
		fontSize: 10,
		padding: 5,
		flexWrap: "wrap",
		width: width,
		backgroundColor: "#f2f3f3",
	}),
	page: {
		flexDirection: "row",
		backgroundColor: "#fff",
		display: "flex",
		justifyContent: "center",
		padding: 20,
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	header: {
		fontSize: 12,
		textAlign: "start",
		color: "#363a46",
	},
	headerClient: {
		fontSize: 15,
		textAlign: "start",
		color: "#363a46",
	},
	headerContainer: {
		display: "flex",
		gap: 220,
		flexDirection: "row",
		marginVertical: 30,
		textAlign: "center",
		marginHorizontal: "auto",
	},
	totalContainer: {
		display: "flex",
		gap: 20,
		flexDirection: "row",
		marginVertical: 30,
		textAlign: "center",
		marginHorizontal: "auto",
	},
	textWhite: {
		color: "#FFFFFF",
		fontWeight: "900",
		fontSize: 12,
	},
	textBlack: {
		color: "#363a46",
		fontWeight: "900",
		fontSize: 12,
		flexDirection: "row",
	},
	textBlackBold: {
		color: "#363a46",
		textDecoration: "underline",
		fontSize: 12,
		flexDirection: "row",
	},
	textBlackFooter: {
		color: "#363a46",
		fontSize: 10,
		flexDirection: "row",
	},
	textTotal: {
		color: "#363a46",
		fontWeight: "900",
		fontSize: 14,
		flexDirection: "row",
	},
	logo: {
		width: 100,
	},
	greenBox: {
		backgroundColor: "#8fc740",
		width: 300,
		height: 25,
	},
	skyBlueBox1: {
		backgroundColor: "#00aff0",
		width: 50,
		height: 25,
	},
	greenBox2: {
		backgroundColor: "#8fc740",
		width: 300,
		height: 3,
	},
	skyBlueBox2: {
		backgroundColor: "#00aff0",
		width: 50,
		height: 3,
	},
	containerSkyBlue: {
		backgroundColor: "#00aff0",
		paddingVertical: 5,
		paddingLeft: 10,
		paddingRight: 100,
	},
	proformaContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	proformaContainer2: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		display: "flex",
		gap: 20,
	},
	titleContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer2: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		gap: 3,
	},
	title: {
		fontSize: 25,
		fontWeight: 900,
		color: "#363a46",
	},
	headerBox: {
		display: "flex",
		gap: 6,
	},
	contentBox: {
		width: 350,
		flexDirection: "row",
		textAlign: "left",
	},
	totalBoxCont: {
		display: "flex",
		gap: 6,
	},
	footer: {
		position: "absolute",
		bottom: 30,
	},
});

function PDF({
	type,
	number,
	client,
	date,
	dateFinal,
	status,
	header,
	tableContent,
	terms,
	notes,
	subTotal,
	iva,
	total,
}) {
	console.log(tableContent);
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Image style={styles.logo} src="/logo.png" />
					<View style={styles.proformaContainer}>
						<View style={styles.greenBox}></View>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>PROFORMA</Text>
						</View>
						<View style={styles.skyBlueBox1}></View>
					</View>
					<View style={styles.headerContainer}>
						<View style={styles.headerBox}>
							<Text style={styles.headerClient}>Cliente: {client}</Text>
							<Text style={styles.header}>Proforma Numero: #{number}</Text>
							<Text style={styles.header}>Fecha: {date}</Text>
						</View>
						<View style={styles.headerBox}>
							<Text style={styles.header}>Valido Hasta: {dateFinal}</Text>
							<Text style={styles.header}>Tipo: {type}</Text>
							<Text style={styles.header}>Estado: {status}</Text>
						</View>
					</View>
					<View style={styles.tableRow}>
						{header &&
							header.map((headerText, index) => (
								<View key={index} style={styles.headerCell(headerText.width)}>
									<Text style={styles.textWhite}>{headerText.content}</Text>
								</View>
							))}
					</View>
					{tableContent &&
						tableContent.map((bodyText, index) => (
							<View style={styles.tableRow} key={index}>
								{bodyText.map((cell, cellIndex) => (
									<View
										style={
											index % 2 === 0
												? styles.bodyCellEven(header[cellIndex].width)
												: styles.bodyCellOdd(header[cellIndex].width)
										}
										key={cellIndex}
									>
										<Text style={styles.textBlack}>{cell}</Text>
									</View>
								))}
							</View>
						))}
					<View style={styles.totalContainer}>
						<View style={styles.totalBoxCont}>
							<Text style={styles.textBlack}>Agradecemos tu confianza</Text>

							<Text style={styles.textBlackBold}>Terminos y Condiciones:</Text>
							<View style={styles.contentBox}>
								<Text style={styles.textBlack}>{terms} </Text>
							</View>

							<Text style={styles.textBlackBold}>Notas Adicionales:</Text>
							<View style={styles.contentBox}>
								<Text style={styles.textBlack}>{notes} </Text>
							</View>
						</View>
						<View style={styles.totalBoxCont}>
							<Text style={styles.textBlack}>Sub Total: ${subTotal}</Text>
							<Text style={styles.textBlack}>IVA: ${iva}</Text>
							<View style={styles.containerSkyBlue}>
								<Text style={styles.textTotal}>TOTAL: ${total}</Text>
							</View>
						</View>
					</View>
					<View style={styles.footer}>
						<View style={styles.proformaContainer2}>
							<View style={styles.greenBox2}></View>
							<View style={styles.titleContainer2}>
								<Text style={styles.textBlack}>___________________</Text>
								<Text style={styles.textBlack}>Firma Autorizada</Text>
							</View>
							<View style={styles.skyBlueBox2}></View>
						</View>
						<Text style={styles.textBlackFooter}>
							+593 99 503 1066 | Diego García y Av. Alpahuasi
						</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}

PDF.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	number: PropTypes.number,
	client: PropTypes.string,
	date: PropTypes.string,
	dateFinal: PropTypes.string,
	status: PropTypes.string,
	header: PropTypes.array,
	tableContent: PropTypes.array,
	terms: PropTypes.string,
	notes: PropTypes.string,
	subTotal: PropTypes.number,
	iva: PropTypes.number,
	total: PropTypes.number,
};

export default PDF;
