import { styled } from 'styled-components';

import { closeModal, modalComponent, modalFunc, modalText } from '../../store/redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { color } from '../../assets/styles';
import { useState } from 'react';

const CommonInstruction = () => {
	const modalComp = useAppSelector(modalComponent);

	const text = useAppSelector(modalText);
	console.log(text);
	const instrunctionFunc = useAppSelector(modalFunc);
	const [couponNumber, setCouponNumber] = useState<string>('');

	const dispatch = useAppDispatch();
	const onCloseModal = () => {
		dispatch(closeModal());
	};

	const instructionYes = () => {
		alert(instrunctionFunc);
		dispatch(closeModal());
	};

	const handleCouponNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCouponNumber(event.target.value);
	};

	return (
		<InstructionGrid>
			<div className="instruction">
				<div>{text}</div>
				<div>{modalComp === 'couponRegistration' && <CouponNumberBox type="text" value={couponNumber} onChange={handleCouponNumberChange} />}</div>
			</div>
			<InstructionYesButton>
				<button onClick={instructionYes}>예</button>
			</InstructionYesButton>
			<InstructionNoButton>
				<button onClick={onCloseModal}>아니오</button>
			</InstructionNoButton>
		</InstructionGrid>
	);
};

export default CommonInstruction;

const InstructionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	justify-items: center;

	.instruction {
		grid-column-start: 1;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-content: center;
		align-self: center;
	}
`;

const InstructionYesButton = styled.div`
	button {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: center;
		align-self: center;
		border: 1px solid ${color.color1};
		border-radius: 1rem;
		background-color: ${color.color1};
		color: ${color.backColor};
		width: 80px;
		height: 30px;
		margin: 1rem;
	}

	button:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;

const InstructionNoButton = styled.div`
	button {
		border: 1px solid ${color.color1};
		border-radius: 1rem;
		background-color: ${color.color1};
		color: ${color.backColor};
		width: 80px;
		height: 30px;
		margin: 1rem;
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: center;
		align-self: center;
	}

	button:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;

const CouponNumberBox = styled.input`
	font-weight: bold;
	outline: none;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	width: 100%;
	padding: 0.1rem;
`;
