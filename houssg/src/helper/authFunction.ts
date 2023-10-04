import api from '../api/api';
import { authUrl } from '../assets/constant';
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
};

const idCheckFunc = (id: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
	setIsLoading(true);
	api
		.post(authUrl.idCheck + `?id=${id}`)
		.then(({ data }) => {
			data === 'YES' ? alert('유효한 아이디입니다') : alert('중복된 아이디입니다.');
		})
		.catch(({ response }) => {
			console.log(response);
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

const onPhoneUsableCheck: SmsParameter = (phone, setIsLoading, setSmsId, setTimeStatus, setTime) => {
	setIsLoading(true);
	console.log(phone);
	api
		.post(authUrl.phoneCheck, { recipientPhoneNumber: phone })
		.then(({ data }) => {
			if (data.statusCode === '202') {
				setSmsId(data.sessionId);
				setTimeStatus('start');
				setTime(180);
			}
		})
		.catch(({ response }) => {
			console.log(response);
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const phoneAuthCheck = (
	number: string,
	smsId: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setConfirmed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	console.log(smsId);
	setIsLoading(true);
	api
		.post(authUrl.phoneAuthCheck + `?verificationCode=${number}&sessionId=${smsId}`)
		.then((data) => {
			console.log(data);
			data.status === 200 && setConfirmed(true);
		})
		.catch((err) => {
			console.log(err, '에러 메시지');
		})
		.finally(() => {
			setIsLoading(false);
		});
};

const onFindId = (
	phone: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setSmsId: React.Dispatch<React.SetStateAction<string>>,
	setTimeStatus: React.Dispatch<React.SetStateAction<ProcessType>>,
	setTime: React.Dispatch<React.SetStateAction<number>>,
) => {
	api
		.post(authUrl.findId + `?phone_number=${phone}`)
		.then(({ data }) => {
			if (data.statusCode === '202') {
				setSmsId(data.sessionId);
				setTimeStatus('start');
				setTime(180);
			}
		})
		.catch(({ response }) => {
			console.log(response);
		})
		.finally(() => {
			setIsLoading(false);
		});
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
