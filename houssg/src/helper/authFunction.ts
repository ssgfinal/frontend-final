import api from '../api/api';
import { url } from '../assets/constant';

const authLoginFunc = (userId: string, userPw: string, closeModal: () => void) => {
	if (userId.trim() === '') {
		alert('아이디를 입력해주세요');
		return;
	}
	if (userPw.trim() === '') {
		alert('비밀번호를 입력해주세요');
		return;
	}

	api
		.post(url.login, { id: userId, password: userPw })
		.then((data) => {
			console.log(data);
			closeModal();
		})
		.catch(({ response }) => {
			alert('서버와 통신이 원활하지 않습니다.');
			console.log(response, '리스폰스');
		});
};

const authSignUpFunc = (
	userId: string,
	userNick: string,
	userPw: string,
	userPwCheck: string,
	userPhone: string,
	setIsLoginComp: React.Dispatch<React.SetStateAction<string>>,
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
		alert('휴대전화가 없습니다.');
		return;
	}
	api
		.post(url.signUp, { id: userId, password: userPw, nickname: userNick, phonenumber: userPhone })
		.then(({ data }) => {
			data === 'YES' ? alert('회원가입되었습니다') : alert('형식에 맞지 않습니다.');
			setIsLoginComp('login');
		})
		.catch(({ response }) => {
			// console.log(response.status);
			if (response.status === 403) {
				alert('중복된 값이 존재합니다');
			}
		});
};

const idCheckFunc = (id: string) => {
	api
		.post(url.idCheck + `?id=${id}`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 아이디입니다') : alert('중복된 아이디입니다.');
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

const nickCheckFunc = (nickName: string) => {
	api
		.post(url.nickCheck + `?nickname=${nickName}&auth=0`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 닉네임입니다') : alert('중복된 닉네임입니다.');
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

const onPhoneUsableCheck = (phone: string) => {
	let text = '실패';
	api
		.post(url.phoneCheck, { recipientPhoneNumber: phone })
		.then(({ data }) => {
			console.log(data);
			text = '성공';
		})
		.catch(({ response }) => {
			console.log(response);
		});

	return text;
};

const onFindId = (phone: string) => {
	let text = '실패';
	api
		.post(url.findId + `?phone_number *=${phone}`)
		.then(({ data }) => {
			console.log(data);
			text = '성공';
		})
		.catch(({ response }) => {
			console.log(response);
		});

	return text;
};

const phoneAuthCheck = (number: string) => {
	api
		.post(url.phoneAuthCheck + `?verificationCode=${number}`)
		.then(({ data }) => {
			console.log(data);
		})
		.catch(({ response }) => {
			console.log(response, '에러 메시지');
		});
};

const kakaoLoginFunc = (code: string) => {
	// TODO: url 수정
	api
		.post(url.kakaoLogin, code)
		.then((res) => {
			return res;
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

const kakaoSignUp = (nickName: string) => {
	api
		.post(url.kakaoAdd, { nickName: nickName })
		.then(({ data }) => {
			console.log(data);
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

export { authLoginFunc, authSignUpFunc, idCheckFunc, nickCheckFunc, kakaoLoginFunc, kakaoSignUp };
export { onPhoneUsableCheck, phoneAuthCheck, onFindId };
