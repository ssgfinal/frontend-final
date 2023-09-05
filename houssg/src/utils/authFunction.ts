import { NavigateFunction } from 'react-router-dom';
import api from '../api/api';
import { url } from '../assets/constant';

const authLoginFunc = (userId: string, userPw: string, isUser: boolean, navigate: NavigateFunction, closeModal: () => void) => {
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
			.post(url.login + `?id=${userId}&password=${userPw}&auth=0`)
			// .post(url.login, { id: userId, password: userPw, auth: 0 })
			.then(({ data }) => {
				console.log(data);
				closeModal();
			})
			.catch((err) => {
				alert('서버와 통신이 원활하지 않습니다.');
				console.log(err);
			});
	} else {
		api
			.post(url.login + `?id=${userId}&password=${userPw}&auth=1`)
			.then((resp) => {
				console.log(resp);
				!isUser && navigate('/owner');
			})
			.catch((err) => {
				alert(err);
			});
	}
};

const authSignUpFunc = (
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
			.then(({ data }) => {
				data === 'YES' ? alert('회원가입되었습니다') : alert('유효하지 않습니다.');
				setIsLoginComp(true);
			})
			.catch((err) => {
				console.log(err);
				alert('중복된 값이 존재합니다');
			});
	} else {
		api
			.post(url.addUser + `?id=${userId}&password=${userPw}&nickname=${userNick}&phone_number=${userPhone}&auth=1`)
			.then((resp) => {
				console.log(resp);
				alert('회원가입되었습니다.');
				setIsLoginComp(true);
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});
	}
};

const idCheckFunc = (id: string) => {
	api
		.post(url.idCheck + `?id=${id}&auth=0`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 아이디입니다') : alert('중복된 아이디입니다.');
		})
		.catch((err) => {
			alert(err);
		});
};

const nickCheckFunc = (nickName: string) => {
	api
		.post(url.nickCheck + `?nickname=${nickName}&auth=0`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 닉네임입니다') : alert('중복된 닉네임입니다.');
		})
		.catch((err) => {
			console.log(err);
		});
};

const kakaoLoginFunc = (code: string) => {
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

const kakaoSignUp = (nickName: string) => {
	api
		.post(url.kakaoAdd, { nickName: nickName })
		.then(({ data }) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const phoneCheck = (number: number) => {
	api
		.post(url.phoneCheck + `?number=${number}`)
		.then(({ data }) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export { authLoginFunc, authSignUpFunc, idCheckFunc, nickCheckFunc, kakaoLoginFunc, kakaoSignUp, phoneCheck };
