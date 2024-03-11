import Template from "../../components/Template";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDF from "../../components/PDF";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";

function Proformas() {
  const type = "Cliente Final";
  const client = "Kevin Villacreses";
  const number = 10;
  const date = "24/10/2024";
  const dateFinal = "30/10/2024";
  const status = "Pendiente";
  const tableContent = [
    ["1", "Servicio Tratamiento de Cucaracha 100m2", "60.00", "2", "120.00"],
    ["2", "Servicio Tratamiento de Cucaracha 200m2", "80.00", "1", "80.00"],
    ["3", "Servicio Tratamiento de Cucaracha 50m2", "50.00", "1", "50.00"],
  ];
  const terms =
    "La proforma tiene una duración de 10 días a partir de su emisión";
  const notes =
    "Al finalizar el servicio se entregará un certificado de aval y certificaión sanitaria avalada por todos los organismos de control indispensable para el control sanitario.";
  const subTotal = "190.00";
  const iva = "22.80";
  const total = "212.80";

  return (
    <>
      <Template
        content={
          <div>
            <div>
              <form className="">
                <div className="flex gap-3">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="flex gap-3">
                  <label htmlFor="date">Fecha</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                  />
                </div>
                <div className="flex gap-3">
                  <label htmlFor="tyc">Terminos y Condiciones</label>
                  <input
                    type="text"
                    name="tyc"
                    id="tyc"
                  />
                </div>
                <div className="flex gap-3">
                  <label htmlFor="adicionales">Notas Adicionales</label>
                  <input
                    type="text"
                    name="adicionales"
                    id="adicionales"
                  />
                </div>
                <div className="flex gap-3">
                  <label htmlFor="validez">Días de validez</label>
                  <input
                    type="text"
                    name="validez"
                    id="validez"
                  />
                </div>
                <select type="text">
                  <option>Pendiente</option>
                  <option>Aprobada</option>
                </select>
                <select type="text">
                  <option>Cliente Final</option>
                  <option>Distribuidor</option>
                </select>
                <button
                  type="submit"
                  className="bg-[black] text-[white] px-[1rem] py-[0.5rem]"
                >
                  Enviar
                </button>
              </form>
            </div>
            <PDFDownloadLink
              document={
                <PDF
                  type={type}
                  number={number}
                  client={client}
                  date={date}
                  dateFinal={dateFinal}
                  status={status}
                  header={[
                    { content: "N°", width: 30 },
                    { content: "Descripción", width: 250 },
                    { content: "Precio", width: 30 },
                    { content: "Cantidad", width: 30 },
                    { content: "Total", width: 30 },
                  ]}
                  tableContent={tableContent}
                  terms={terms}
                  notes={notes}
                  subTotal={subTotal}
                  iva={iva}
                  total={total}
                />
              }
              fileName="Proforma.pdf"
            >
              {({
                loading,
                // , blob, url, error
              }) =>
                loading ? (
                  <img
                    src="/loading.gif"
                    className="w-[20px] "
                  />
                ) : (
                  <IconButton
                    aria-label="fingerprint"
                    color="primary"
                  >
                    <DownloadIcon />
                  </IconButton>
                )
              }
            </PDFDownloadLink>
            <PDFViewer style={{ width: "100%", height: "700px" }}>
              <PDF
                type="Cliente Final"
                number={number}
                client={client}
                date="24/10/2024"
                dateFinal="30/10/2024"
                status="Pendiente"
                header={[
                  { content: "N°", width: 30 },
                  { content: "Descripción", width: 250 },
                  { content: "Precio", width: 30 },
                  { content: "Cantidad", width: 30 },
                  { content: "Total", width: 30 },
                ]}
                tableContent={tableContent}
                terms={terms}
                notes={notes}
                subTotal={subTotal}
                iva={iva}
                total={total}
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
