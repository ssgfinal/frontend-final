import api from '../api/api';
import { authUrl } from '../assets/constant';
import { AuthLoginFunc, AuthSignUpFunc } from '../types';

const authLoginFunc: AuthLoginFunc = (userId, userPw, dispatch, __postLogin) => {
	if (userId.trim() === '') {
		alert('아이디가 비어있습니다.');
		return;
	}
	if (userPw.trim() === '') {
		alert('비밀번호가 비어있습니다.');
		return;
	}

	dispatch(__postLogin({ id: userId, password: userPw }));
};

const authSignUpFunc: AuthSignUpFunc = (userId, userNick, userPw, userPwCheck, userPhone, dispatch, __postSignUp) => {
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
	dispatch(__postSignUp({ id: userId, password: userPw, nickname: userNick, phonenumber: userPhone }));
	// api
	// 	.post(authUrl.signUp, { id: userId, password: userPw, nickname: userNick, phonenumber: userPhone })
	// 	.then(({ data }) => {
	// 		data === 'YES' ? alert('회원가입되었습니다') : alert('형식에 맞지 않습니다.');
	// 		setIsLoginComp('login');
	// 	})
	// 	.catch(({ response }) => {
	// 		// console.log(response.status);
	// 		if (response.status === 403) {
	// 			alert('중복된 값이 존재합니다');
	// 		}
	// 	});
};

const idCheckFunc = (id: string) => {
	api
		.post(authUrl.idCheck + `?id=${id}`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 아이디입니다') : alert('중복된 아이디입니다.');
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

const nickCheckFunc = (nickName: string) => {
	api
		.post(authUrl.nickCheck + `?nickname=${nickName}&auth=0`)
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
		.post(authUrl.phoneCheck, { recipientPhoneNumber: phone })
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
		.post(authUrl.findId + `?phone_number=${phone}`)
		.then(({ data }) => {
			console.log(data);
			text = '성공';
		})
		.catch(({ response }) => {
			console.log(response);
		});

	return text;
};

const onFindIdCheck = ({ verificationCode, phone_number }: { verificationCode: string; phone_number: string }) => {
	api
		.post(authUrl.findIdCheck, null, { params: { verificationCode, phone_number } })
		.then((resp) => {
			console.log(resp);
		})
		.catch((err) => {
			console.log(err);
		});
};

const onFindPw = ({ id, phone_number }: { id: string; phone_number: string }) => {
	api
		.post(authUrl.findPw, null, { params: { id, phone_number } })
		.then((resp) => {
			console.log(resp);
		})
		.catch((err) => {
			console.log(err);
		});
};

const onUpdateNewPw = ({ id, newPassword }: { id: string; newPassword: string }) => {
	api
		.post(authUrl.updatePw, null, { params: { id, newPassword } })
		.then((resp) => {
			console.log(resp);
		})
		.catch((err) => {
			console.log(err);
		});
};

const phoneAuthCheck = (number: string) => {
	api
		.post(authUrl.phoneAuthCheck + `?verificationCode=${number}`)
		.then(({ data }) => {
			console.log(data);
		})
		.catch(({ err }) => {
			console.log(err, '에러 메시지');
		});
};

const kakaoLoginFunc = (code: string) => {
	// TODO: authUrl 수정
	api
		.post(authUrl.kakaoLogin, code)
		.then((res) => {
			return res;
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

const kakaoSignUp = (nickName: string) => {
	api
		.post(authUrl.kakaoAdd, { nickName })
		.then(({ data }) => {
			console.log(data);
		})
		.catch(({ response }) => {
			console.log(response);
		});
};

export { authLoginFunc, authSignUpFunc, idCheckFunc, nickCheckFunc, kakaoLoginFunc, kakaoSignUp };
export { onPhoneUsableCheck, phoneAuthCheck, onFindId, onFindIdCheck, onFindPw, onUpdateNewPw };
