import styled from 'styled-components';

import { Login, SignUp } from '.';
import { useState } from 'react';

const AuthWrap: React.FC = () => {
	const [isLoginComp, setIsLoginComp] = useState(true);

	return <AuthWrapper>{isLoginComp ? <Login setIsLoginComp={setIsLoginComp} /> : <SignUp setIsLoginComp={setIsLoginComp} />}</AuthWrapper>;
};

export default AuthWrap;

const AuthWrapper = styled.div`
	min-height: 400px;
	width: 100%;
	display: flex;
	justify-content: center;
`;
