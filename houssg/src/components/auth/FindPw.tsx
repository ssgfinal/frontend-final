import { useState } from 'react';

import { AuthContainer, AuthTitle, FinderRouteAligner } from '../../assets/styles';
import { AuthProps } from '../../types';
import { PwChangeForm, PwPermitForm } from '.';
import { AuthModeBtn } from './element';

const FindPw: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const [isPermitted, setIsPermitted] = useState(false);
	const [permittedUserId, setPermittedUserId] = useState('');
	return (
		<AuthContainer>
			<AuthTitle>비밀번호 찾기</AuthTitle>
			{!isPermitted ? (
				<PwPermitForm setPermittedUserId={setPermittedUserId} setState={setIsPermitted} />
			) : (
				<PwChangeForm userId={permittedUserId} authStep={authStep} setAuthStep={setAuthStep} />
			)}
			<FinderRouteAligner>
				<AuthModeBtn authStep={'tofindId'} setAuthStep={setAuthStep}>
					아이디 찾기
				</AuthModeBtn>
				<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
					로그인으로
				</AuthModeBtn>
			</FinderRouteAligner>
		</AuthContainer>
	);
};

export default FindPw;
