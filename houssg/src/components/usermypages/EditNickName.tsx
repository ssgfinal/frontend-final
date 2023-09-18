import styled from 'styled-components';
import { useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';

const EditNickName = () => {
	const dispatch = useAppDispatch();

	const newNickName = useRef<HTMLInputElement | null>(null);

	const editNickName = () => {
		// TODO : 서버로 보내기 추후 수정
		if (newNickName.current) {
			console.log(newNickName.current.value);
		}
		// TODO : api 요청이 성공했을 떄
		// newNickName.current.value = '';
		dispatch(closeModal());
	};

	return (
		<EditNickNameWrapper>
			<NewNickNameBox type="text" ref={newNickName} placeholder="새로운 닉네임 입력" />

			<EditButton onClick={editNickName}>수정완료</EditButton>
		</EditNickNameWrapper>
	);
};

export default EditNickName;

const EditNickNameWrapper = styled.div`
	display: grid;
	grid-template-rows: 1.5fr 2fr;
`;

const NewNickNameBox = styled.input`
	outline: none;
	color: ${color.color1};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	padding: 0.5rem;
	font-size: 1rem;
	text-align: center;
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
