import { color } from '../../../../assets/styles';
import styled from 'styled-components';

interface CheckBoxProps {
	element: {
		value: string;
		text: string;
	};
	index: number;
	isChecked: boolean;
	setCheckedList: (index: number, value: number) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ element, index, isChecked, setCheckedList }) => {
	const onCheckFunc = () => {
		const newIsChecked = isChecked ? 0 : 1;
		setCheckedList(index, newIsChecked);
	};

	return (
		<CheckBoxAligner>
			<div>{element.text}</div>
			<input type="checkbox" checked={isChecked} onChange={onCheckFunc} />
		</CheckBoxAligner>
	);
};

export default CheckBox;

const CheckBoxAligner = styled.div`
	display: flex;
	align-items: center;

	input {
		cursor: pointer;
		accent-color: ${color.color2};
	}
`;
