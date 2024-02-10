import PropTypes from "prop-types";

function ModalImg({ photo, setShowModalImg }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        id="modal-img-container"
      >
        <div
          className="bg-white px-[3rem] py-2 rounded-lg relative"
          id="whiteboard-container"
        >
          <div className="flex justify-center p-[1rem]">
            <img
              src={photo}
              alt="Imagen Modal"
              className="h-[550px]"
              id="img-modal"
            />
          </div>

          <div
            className="cursor-pointer text-black absolute top-10 right-5"
            onClick={() => setShowModalImg(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
      </div>
    </>
  );
}

ModalImg.propTypes = {
  photo: PropTypes.array,
  setShowModalImg: PropTypes.func.isRequired,
};

export default ModalImg;
