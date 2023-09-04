import { styled } from 'styled-components';

import { closeModal } from '../../store/redux/modalSlice';
import { useAppDispatch } from '../../hooks';

import { color } from '../../assets/styles';

const CancelReservation = () => {
	const dispatch = useAppDispatch();
	const onCloseModal = () => {
		dispatch(closeModal());
	};

	const cancelYes = () => {
		// TODO : 삭제하기 기능구현 추후에 작업
		alert('삭제되었습니다.');
		dispatch(closeModal());
	};

	return (
		<CancelGrid>
			<div className="CancelQues">예약을 취소하시겠습니까?</div>
			<CancelYesButton>
				<button onClick={cancelYes}>예</button>
			</CancelYesButton>
			<CancelNoButton>
				<button onClick={onCloseModal}>아니오</button>
			</CancelNoButton>
		</CancelGrid>
	);
};

export default CancelReservation;

const CancelGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);

	.CancelQues {
		grid-column-start: 1;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
		justify-self: center;
		align-self: center;
	}
`;

const CancelYesButton = styled.div`
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

const CancelNoButton = styled.div`
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
