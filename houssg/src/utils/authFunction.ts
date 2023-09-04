import { NavigateFunction } from 'react-router-dom';
import api from '../api/api';
import { url } from '../assets/constant';

export const authLoginFunc = (userId: string, userPw: string, isUser: boolean, navigate: NavigateFunction) => {
	if (userId.trim() === '') {
		alert('아이디를 입력해주세요');
		return;
	}
	if (userPw.trim() === '') {
		alert('비밀번호를 입력해주세요');
		return;
	}

	if (isUser) {
		api
			.post(url.login, { id: userId, password: userPw, auth: 0 })
			.then((resp) => {
				alert(resp);
			})
			.catch((err) => {
				alert(err);
			});
	} else {
		api
			.post(url.login, { id: userId, password: userPw, auth: 1 })
			.then((resp) => {
				alert(resp);
				!isUser && navigate('/owner');
			})
			.catch((err) => {
				alert(err);
			});
	}
};

export const authSignUpFunc = (
	userId: string,
	userNick: string,
	userPw: string,
	userPwCheck: string,
	userPhone: string,
	isUser: boolean,
	setIsLoginComp: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	if (userId.trim() === '') {
		alert('아이디를 입력해주세요');
		return;
	}
	if (userPw.trim() === '') {
		alert('비밀번호를 입력해주세요');
		return;
	}
	if (userNick.trim() === '') {
		alert('닉네임을 입력해주세요');
		return;
	}
	if (userPwCheck.trim() !== userPw.trim()) {
		alert('비밀번호와 일치하지 않습니다.');
		return;
	}

	if (userPhone.trim() === '') {
		alert('전화번호를 입력해 주세요.');
		return;
	}

	if (isUser) {
		api
			.post(url.addUser + `?id=${userId}&password=${userPw}&nickname=${userNick}&phone_number=${userPhone}&auth=0`)
			.then((resp) => {
				alert(resp);
				setIsLoginComp(true);
			})
			.catch((err) => {
				alert(err);
			});
	} else {
		api
			.post(url.addUser + `?id=${userId}&password=${userPw}&nickname=${userNick}&phone_number=${userPhone}&auth=1`)
			.then((resp) => {
				alert(resp);
				setIsLoginComp(true);
			})
			.catch((err) => {
				alert(err);
			});
	}
};

export const idCheckFunc = (id: string) => {
	api
		.post(url.idCheck, { id: id })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const nickCheckFunc = (nickName: string) => {
	api
		.post(url.nickCheck, { nickName: nickName })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const kakaoLoginFunc = (code: string) => {
	// TODO: url 수정
	api
		.post(url.kakaoLogin, code)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const kakaoSignUp = (nickName: string) => {
	api
		.post(url.kakaoAdd, { nickName: nickName })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const phoneCheck = (number: number) => {
	api
		.post(url.phoneCheck, { number })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
