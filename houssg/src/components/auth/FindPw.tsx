import { useState } from 'react';
import { AuthContainer, AuthTitle } from '../../assets/styles';
import { AuthProps } from '../../types';
import { PwChangeForm, PwPermitForm } from '.';

const FindPw: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const [isPermitted, setIsPermitted] = useState(false);

	return (
		<AuthContainer>
			<AuthTitle>비밀번호 찾기</AuthTitle>
			{!isPermitted ? (
				<PwPermitForm authStep={authStep} setAuthStep={setAuthStep} setState={setIsPermitted} />
			) : (
				<PwChangeForm authStep={authStep} setAuthStep={setAuthStep} />
			)}
		</AuthContainer>
	);
};

export default FindPw;
