import { useState } from 'react';
import styled from 'styled-components';

import { AuthContainer, AuthTitle, FinderRouteAligner } from '../../assets/styles';
import { AuthProps } from '../../types';
import { AuthModeBtn } from './element';
import { IdFinding } from '.';

const FindId: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [foundId, setFoundId] = useState('');
	return (
		<AuthContainer>
			<AuthTitle>아이디 찾기</AuthTitle>
			{!isAuthenticated ? <IdFinding setState={setIsAuthenticated} setFoundId={setFoundId} /> : <FoundIdText>아이디 : {foundId}</FoundIdText>}

			<FinderRouteAligner>
				<AuthModeBtn authStep={'tofindPw'} setAuthStep={setAuthStep}>
					비밀번호 찾기
				</AuthModeBtn>
				<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
					로그인으로
				</AuthModeBtn>
			</FinderRouteAligner>
		</AuthContainer>
	);
};

export default FindId;

const FoundIdText = styled.div`
	font-size: 1.1rem;
	font-weight: 600;
	margin: 1rem 0;
`;
