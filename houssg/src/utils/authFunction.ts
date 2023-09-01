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
		api.post(url.login + `?id=${userId}&password=${userPw}&auth=0`).then((resp) => {
			alert(resp);
		});
	} else {
		api.post(url.login + `?id=${userId}&password=${userPw}&auth=1`).then((resp) => {
			alert(resp);
			!isUser && navigate('/owner');
		});
	}
};

export const authSignUpFunc = (userId: string, userNick: string, userPw: string, userPwCheck: string, userPhone: string, isUser: boolean) => {
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

	if (userPhone.trim() !== '') {
		alert('전화번호를 입력해 주세요.');
		return;
	}

	if (isUser) {
		api.post(url.adduser + `?id=${userId}&password=${userPw}&nickname=${userNick}&phone_number=${userPhone}&auth=0`).then((resp) => {
			alert(resp);
		});
	} else {
		api.post(url.adduser + `?id=${userId}&password=${userPw}&nickname=${userNick}&phone_number=${userPhone}&auth=1`).then((resp) => {
			alert(resp);
		});
	}
};
