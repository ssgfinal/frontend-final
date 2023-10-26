import styled from 'styled-components';
import { useRef } from 'react';

import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { regSignUp } from '../../assets/constant';
import { setUpdateNickName } from '../../helper';

const EditNickName = () => {
	const dispatch = useAppDispatch();

	const userNickName = sessionStorage.getItem('nickname');
	const isNewNickName = useRef<HTMLInputElement | null>(null);

	const editNickName = () => {
		const newNickName = isNewNickName.current?.value;

		if (newNickName === userNickName) {
			alert('현재 사용 중인 닉네임입니다.');
			return;
		}
		if (isNewNickName.current) {
			if (newNickName) {
				setUpdateNickName(newNickName);
				if (isNewNickName.current) {
					isNewNickName.current.value = '';
				}
				dispatch(closeModal());
			}
		}
	};

	return (
		<EditNickNameWrapper>
			<NewNickNameBox type="text" ref={isNewNickName} maxLength={8} placeholder="새로운 닉네임 입력" />
			<NickNameInstruction>{regSignUp.regNick.tooltip}</NickNameInstruction>
			<EditButton onClick={editNickName}>수정완료</EditButton>
		</EditNickNameWrapper>
	);
};

export default EditNickName;

const EditNickNameWrapper = styled.div`
	display: grid;
	grid-template-rows: 1.2fr 0.5fr 2fr;

	@media (max-width: 500px) {
		margin-top: 8vw;
	}
`;

const NewNickNameBox = styled.input`
	width: 100%;
	outline: none;
	color: ${color.color1};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	padding: 0.5rem;
	font-size: 1.1rem;
	text-align: center;
`;

const NickNameInstruction = styled.div`
	color: ${color.darkGrayColor};
	font-size: 0.8rem;
`;

const EditButton = styled.button`
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	width: 80px;
	height: 30px;
	margin: 1rem;
	justify-self: center;
	align-self: center;

	&:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;
