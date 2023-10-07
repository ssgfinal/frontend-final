import styled from 'styled-components';
import { useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { regSignUp } from '../../assets/constant';
// import { UserMyPageType } from '../../types';

// interface MyPageMainProps {
// 	mypagemain: UserMyPageType;
// }

const EditNickName = () => {
	const dispatch = useAppDispatch();

	const newNickName = useRef<HTMLInputElement | null>(null);

	const editNickName = () => {
		const isNickName = newNickName.current?.value;
		// console.log('지금 닉네임' + mypagemain.userNickName);
		const testNickName = regSignUp.regNick.reg.test(`${isNickName}`);
		console.log('새로운 닉네임은 변경' + testNickName);
		// TODO: 서버로 보내기 추후 수정

		if (newNickName.current) {
			if (testNickName) {
				// console.log(newNickName.current.value);
				// TODO: api 요청이 성공했을 떄
				// newNickName.current!.value = '';
				dispatch(closeModal());
			} else {
				alert('올바른 닉네임이 아닙니다.');
			}
		}
	};

	return (
		<EditNickNameWrapper>
			<NewNickNameBox type="text" ref={newNickName} maxLength={8} placeholder="새로운 닉네임 입력" />
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
	font-size: 0.5rem;
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
