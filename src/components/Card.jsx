import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import EmailIcon from "@mui/icons-material/Email";
import all from "./all.js";

import { useState } from "react";

function Card({
  title,
  titleId,
  model,
  modelId,
  provider,
  img,
  imgId,
  description,
  object,
  price,
  categoria,
  costo,
  costoMayor,
  pill,
  money,
  table,
}) {
  const [showMoreProd, setShowMoreProd] = useState(false);

  const handleShowEdit = (id) => () => {
    // Lógica para editar con el ID
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = (id) => () => {
    // Lógica para eliminar con el ID
    console.log("Delete clicked for ID:", id);
  };

  const getProductById = function (id, it, table) {
    const filteredProduct = all[table].filter((product) => product.id === id);
    if (filteredProduct.length > 0) {
      return filteredProduct[0][it];
    } else {
      return it + "no encontrado";
    }
  };

  return (
    <>
      {object.map((item, index) => (
        <div
          key={index}
          className="w-[100%] bg-[white] p-[1rem] rounded-lg shadow-md shadow-[#727272] grid gap-[5px]"
        >
          <div className="flex justify-between">
            <h1 className="text-left text-2xl">
              {titleId && titleId.active === true
                ? getProductById(item[title], titleId.it, titleId.table)
                : item[title]}
            </h1>
            <div id="containerCheck">
              <input
                type="checkbox"
                className="transform scale-150 checkProd"
                value={item.id}
              />
            </div>
          </div>
          <h2 className="text-left text-xl">
            {modelId && modelId.active === true
              ? getProductById(item[model], modelId.it, modelId.table)
              : item[model]}
          </h2>
          <h3 className="text-left text-lg">{item[provider]}</h3>
          <div className="w-[100%] h-[250px]">
            <img
              src={
                imgId && imgId.active === true
                  ? getProductById(item[img], imgId.it, imgId.table)
                  : item[img]
              }
              alt={`${table} - ${index}`}
              className="w-[100%] h-[100%] object-contain"
            />
          </div>
          <p className="">{item[description]}</p>
          <b>
            <span className="text-lg">
              {money === true ? "$" + item[price] : item[price]}
            </span>
          </b>
          <div className="flex justify-between">
            <div>
              <IconButton
                aria-label="fingerprint"
                color="black"
                onClick={handleShowEdit(item.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="fingerprint"
                color="error"
                onClick={handleDelete(item.id)}
              >
                <DeleteIcon />
              </IconButton>
              {item.phone && (
                <IconButton
                  aria-label="fingerprint"
                  color="primary"
                  href={`https://api.whatsapp.com/send?phone=${item.phone}&text=Hola%20${item.name}.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon />
                </IconButton>
              )}
              {item.web && (
                <IconButton
                  aria-label="fingerprint"
                  color="secondary"
                  href={item.web}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon />
                </IconButton>
              )}
              {item.email && (
                <IconButton
                  aria-label="fingerprint"
                  color="secondary"
                  href={`mailto:${item.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <EmailIcon />
                </IconButton>
              )}
            </div>
            <div>
              <IconButton
                aria-label="fingerprint"
                color="black"
                onClick={() => setShowMoreProd(!showMoreProd)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
          <div
            className={
              showMoreProd === false ? "hidden" : "inline flex gap-3 flex-col"
            }
          >
            <div>
              <h2 className="text-sm mb-[0.5rem]">{categoria}</h2>
              <div className="flex ">
                {pill === false ? (
                  <b>{item[categoria]}</b>
                ) : (
                  <div className="rounded-full px-[1rem] py-[0.2rem] border-2 border-black">
                    <b>{item[categoria]}</b>
                  </div>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm">{costo}</span>
              <br />
              <span className="text-lg">
                {money === true ? "$" + item[costo] : item[costo]}
              </span>
            </div>

            <div>
              <span className="text-sm">{costoMayor}</span>
              <br />
              <span className="text-lg">
                {money === true ? "$" + item[costoMayor] : item[costoMayor]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.object,
  model: PropTypes.string.isRequired,
  modelId: PropTypes.object,
  provider: PropTypes.string.isRequired,
  img: PropTypes.string,
  imgId: PropTypes.object,
  description: PropTypes.string,
  object: PropTypes.array.isRequired,
  price: PropTypes.string,
  categoria: PropTypes.string,
  costo: PropTypes.string,
  costoMayor: PropTypes.string,
  buttons: PropTypes.node,
  pill: PropTypes.bool,
  money: PropTypes.bool,
  table: PropTypes.string,
};

export default Card;
