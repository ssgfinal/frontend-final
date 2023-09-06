import { styled } from 'styled-components';

import { closeModal, modalComponent } from '../../store/redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { color } from '../../assets/styles';
import { useEffect, useState } from 'react';

const CommonInstruction = () => {
	const modalComp = useAppSelector(modalComponent);

	const [instructionText, setInstructionText] = useState<string>('');

	useEffect(() => {
		if (modalComp === 'cancel') {
			setInstructionText('예약을 취소하시겠습니까?');
		} else {
			setInstructionText('정보를 수정하시겠습니까?');
		}
	}, [modalComp]);

	const dispatch = useAppDispatch();
	const onCloseModal = () => {
		dispatch(closeModal());
	};

	const instructionYes = () => {
		if (modalComp === 'cancel') {
			// TODO: 삭제하기 기능 구현
			alert('삭제되었습니다.');
		} else {
			// TODO: 수정하기 기능 구현
			alert('수정되었습니다.');
		}
		dispatch(closeModal());
	};

	return (
		<InstructionGrid>
			<div className="instruction">
				<div>{instructionText}</div>
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

	.instruction {
		grid-column-start: 1;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: center;
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
