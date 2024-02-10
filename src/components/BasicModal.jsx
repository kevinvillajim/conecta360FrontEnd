import PropTypes from "prop-types";

function BasicModal({setShowBasicModal, content}) {
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
					<div
						className="cursor-pointer text-black absolute top-3 right-5"
						onClick={() => setShowBasicModal(false)}
					>
						<span className="material-symbols-outlined">close</span>
					</div>
					<div className="flex justify-center p-[1rem]">{content}</div>
				</div>
			</div>
		</>
	);
}

BasicModal.propTypes = {
	setShowBasicModal: PropTypes.func.isRequired,
	content: PropTypes.node.isRequired,
};

export default BasicModal;
