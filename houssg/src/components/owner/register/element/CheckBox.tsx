import { useState } from 'react';
import { color } from '../../../../assets/styles';
import styled from 'styled-components';

interface CheckBoxProps {
	element: {
		value: string;
		text: string;
	};
	index: number;
	checkedList: number[];
}

const CheckBox: React.FC<CheckBoxProps> = ({ element, index, checkedList }) => {
	const [isChecked, setIsChecked] = useState(!!checkedList[index]);
	const onCheckFunc = () => {
		!isChecked ? (checkedList[index] = 1) : (checkedList[index] = 0);
		setIsChecked(!isChecked);
	};

	return (
		<CheckBoxAligner>
			<div>{element.text}</div>
			<input type="checkbox" style={{ accentColor: color.color2 }} checked={isChecked} onChange={onCheckFunc} />
		</CheckBoxAligner>
	);
};

export default CheckBox;

const CheckBoxAligner = styled.div`
	display: flex;
	flex-direction: row;
`;
