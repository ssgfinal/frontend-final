import api from '../api/api';
import { userUrl } from '../assets/constant';

// 닉네임
const setUpdateNickName = async (newNickName: string) => {
	try {
		const resp = await api.post(userUrl.updateNick, null, { params: { nickname: newNickName } });
		resp.status === 200 && sessionStorage.setItem('nickname', newNickName);
		alert('성공');
		return resp;
	} catch (error) {
		alert('실패');
		return console.error(error);
	}
};

// 비밀번호
const setUpdatePassword = async (password: string, newPassword: string) => {
	try {
		const resp = await api.post(userUrl.updateMyPw, null, { params: { password: password, newPassword: newPassword } });
		alert('성공');
		return resp;
	} catch (error) {
		alert('실패');
		return console.error(error);
	}
};

// 전화번호 인증
const smsMyPhoneAuth = async (newPhone: string, smsPhone: string) => {
	try {
		const resp = await api.post(userUrl.checkNewPhone, null, { params: { phoneNumber: newPhone, verificationCode: smsPhone } });
		resp.status === 200 && sessionStorage.setItem('phone', newPhone);
		alert('성공');
		return resp;
	} catch (error) {
		alert('실패');
		return console.error(error);
	}
};

// 문자발송
const setNewPhoneNumber = async (newPhone: string) => {
	try {
		const resp = await api.post(userUrl.updatePhone, null, { params: { phone_number: newPhone } });
		alert('성공');
		return resp;
	} catch (error) {
		alert('실패');
		return console.error(error);
	}
};

// 쿠폰
const getMyCouponList = () => api.get(userUrl.myCoupon);

const setMyCouponList = (couponNumber: string) => {
	return api.post(userUrl.enrollCoupon, { couponNumber: couponNumber });
};

// 리뷰
const getMyReviewList = async (page: number, pageSize: number, { pageParam = 1 }) => {
	try {
		const resp = await api.get(userUrl.myReview, { params: { page, pageSize, pageParam } });
		return resp.data;
	} catch (error) {
		console.error(error);
	}
};

// 찜
const getMyFavoriteList = () => api.get(userUrl.myFavorite);

export {
	setUpdateNickName,
	setUpdatePassword,
	smsMyPhoneAuth,
	setNewPhoneNumber,
	getMyCouponList,
	setMyCouponList,
	getMyReviewList,
	getMyFavoriteList,
};
