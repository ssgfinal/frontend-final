export const isLoginFunc = () => {
	const tokenCheck = sessionStorage.getItem('nickname');
	return tokenCheck ? true : false;
};
