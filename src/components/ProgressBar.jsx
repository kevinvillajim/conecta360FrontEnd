import PropTypes from "prop-types";
function ProgressBar({totalValue, nameTeam}) {
	let value = totalValue;

	const getColor = (value) => {
		if (value <= 33) return "bg-red-500";
		if (value <= 66) return "bg-yellow-500";
		if (value <= 99) return "bg-green-500";
		return "bg-blue-500";
	};

	if (value > 100) {
		value = 100;
	}

	const color = getColor(value);

	return (
		<>
			<div>
				<div className="mb-[1.2rem]">
					<b>{nameTeam}</b>
				</div>
				<div className="w-full rounded-full h-2.5 bg-gray-200">
					<div
						className={`${color} h-2.5 rounded-full`}
						style={{width: `${value}%`}}
					></div>
				</div>
				<div className="flex justify-end text-sm">{totalValue}%</div>
			</div>
		</>
	);
}
ProgressBar.propTypes = {
	totalValue: PropTypes.number,
	nameTeam: PropTypes.string,
};

export default ProgressBar;
