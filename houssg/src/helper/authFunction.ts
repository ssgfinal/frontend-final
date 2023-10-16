import api from '../api/api';
import { authUrl, regSignUp } from '../assets/constant';
import { AuthLoginFunc, AuthSignUpFunc, ProcessType, SmsParameter } from '../types';

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
	if (userId.trim() === '' || !regSignUp.regId.reg.test(userId)) {
		alert('아이디를 확인해주세요');
		return;
	}
	if (userPw.trim() === '' || !regSignUp.regPw.reg.test(userPw)) {
		alert('비밀번호를 확인해주세요');
		return;
	}
	if (userNick.trim() === '' || !regSignUp.regNick.reg.test(userNick)) {
		alert('닉네임을 확인해주세요');
		return;
	}
	if (userPwCheck.trim() !== userPw.trim()) {
		alert('비밀번호확인을 확인해주세요.');
		return;
	}
	if (userPhone.trim() === '') {
		alert('전화번호를 확인해주세요.');
		return;
	}
	dispatch(__postSignUp({ id: userId, password: userPw, nickname: userNick, phonenumber: userPhone }));
};

const idCheckFunc = (id: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
	setIsLoading(true);
	api
		.post(authUrl.idCheck + `?id=${id}`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 아이디입니다') : alert('중복된 아이디입니다.');
		})
		.catch(({ error }) => {
			console.log(error);
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const nickCheckFunc = (nickName: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
	setIsLoading(true);
	api
		.post(authUrl.nickCheck + `?nickname=${nickName}&auth=0`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 닉네임입니다') : alert('중복된 닉네임입니다.');
		})
		.catch(({ response }) => {
			console.log(response);
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const onPhoneUsableCheck: SmsParameter = (phone, setIsLoading, setTimeStatus, setTime) => {
	if (!regSignUp.regPhone.reg.test(phone)) {
		return;
	}
	setIsLoading(true);
	api
		.post(authUrl.phoneCheck, { recipientPhoneNumber: phone })
		.then(({ data }) => {
			if (data.statusCode === '202') {
				setTimeStatus('start');
				setTime(180);
			}
		})
		.catch(({ response }) => {
			response.status === 400 ? alert('이미 가입된 번호입니다.') : alert('잘못된 요청입니다.');
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const phoneAuthCheck = (
	number: string,
	phoneNumber: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setConfirmed: React.Dispatch<React.SetStateAction<boolean>>,
	setPermittedUserId?: () => void,
) => {
	setIsLoading(true);
	api
		.post(authUrl.phoneAuthCheck + `?verificationCode=${number}&phoneNumber=${phoneNumber}`)
		.then((data) => {
			console.log(data);
			if (data.status === 200) {
				setConfirmed(true);
				setPermittedUserId && setPermittedUserId();
			}
		})
		.catch((err) => {
			alert('일치하지 않습니다.');
			console.log(err, '에러 메시지');
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const onFindId = (
	phone: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setTimeStatus: React.Dispatch<React.SetStateAction<ProcessType>>,
	setTime: React.Dispatch<React.SetStateAction<number>>,
) => {
	setIsLoading(true);
	api
		.post(authUrl.findId + `?phone_number=${phone}`)
		.then(({ data }) => {
			if (data.statusCode === '202') {
				setTimeStatus('start');
				setTime(180);
			}
		})
		.catch(({ response }) => {
			if (response.status >= 400 && response.status < 500) {
				alert('가입되지 않은 번호입니다.');
			}
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const onFindIdCheck = (
	verificationCode: string,
	phoneNumber: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setState: React.Dispatch<React.SetStateAction<boolean>>,
	setFoundId: React.Dispatch<React.SetStateAction<string>>,
) => {
	setIsLoading(true);
	api
		.post(authUrl.findIdCheck, null, { params: { verificationCode, phoneNumber } })
		.then((resp) => {
			setState(true);
			setFoundId(resp.data.id);
		})
		.catch((err) => {
			if (err.response.status >= 400 && err.response.status < 500) {
				alert('일치하지 않습니다.');
			}
			console.log(err);
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const onFindPw = (
	id: string,
	phone_number: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setTimeStatus: React.Dispatch<React.SetStateAction<ProcessType>>,
	setTime: React.Dispatch<React.SetStateAction<number>>,
) => {
	setIsLoading(true);

	api
		.post(authUrl.findPw, null, { params: { id, phone_number } })
		.then(() => {
			setTimeStatus('start');
			setTime(180);
		})
		.catch((err) => {
			err.response.status === 400 ? alert('일치하지 않습니다.') : alert('잘못된 요청입니다.');

			console.log(err);
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const onUpdateNewPw = (
	id: string,
	newPassword: string,
	setAuthStep: React.Dispatch<React.SetStateAction<string>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	setIsLoading(true);
	api
		.post(authUrl.updatePw, null, { params: { id, newPassword } })
		.then(() => {
			setAuthStep('login');
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			setIsLoading(false);
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
