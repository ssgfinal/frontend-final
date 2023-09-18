import styled from 'styled-components';
import { color } from '../../assets/styles';

const EditPhoneNumber = () => {
	return (
		<EditPhoneNumberWrapper>
			<div>...님의 전화번호 인증</div>
			<hr />
			<div>현재 전화번호 readonly</div>
			<div>
				<select>
					<option>대한민국 +82</option>
				</select>
			</div>
			<div>
				전화번호 입력 input<EditPhoneNumberButton>인증</EditPhoneNumberButton>
			</div>
			<div>인증번호 입력 input</div>
			<EditPhoneNumberButton>변경</EditPhoneNumberButton>
		</EditPhoneNumberWrapper>
	);
};

export default EditPhoneNumber;

const EditPhoneNumberWrapper = styled.div`
	margin: 3vw 3vw 3vw 3vw;
	display: grid;
	//display: flex;
	//flex-direction: column;
	//width: 100%;
`;

const EditPhoneNumberButton = styled.button`
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
