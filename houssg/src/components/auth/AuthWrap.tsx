import styled from 'styled-components';

import { Login, SignUp } from '.';
import { useState } from 'react';

const AuthWrap = () => {
	const [isLoginComp, setIsLoginComp] = useState(true);

	return <AuthContainer>{isLoginComp ? <Login setIsLoginComp={setIsLoginComp} /> : <SignUp setIsLoginComp={setIsLoginComp} />}</AuthContainer>;
};

export default AuthWrap;

const AuthContainer = styled.div`
	height: 500px;
`;
