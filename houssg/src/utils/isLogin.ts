export const isLoginFunc = () => {
	const tokenCheck = sessionStorage.getItem('authorization');
	return tokenCheck ? true : false;
};
