const Checkbox: React.FC<{ label: string }> = ({ label }) => {
	return (
		<div>
			<input type="checkbox" />
			{label}
		</div>
	);
};

const CheckboxGroup: React.FC<{ list: string[] }> = ({ list }) => {
	return (
		<div>
			{list.map((item, index) => (
				<Checkbox key={index} label={item} />
			))}
		</div>
	);
};

export default CheckboxGroup;
