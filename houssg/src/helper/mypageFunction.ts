import api from '../api/api';
import { userUrl } from '../assets/constant';

// 닉네임
const setUpdateNickName = async (newNickName: string) => {
	const resp = await api.post(userUrl.updateNick, null, { params: { nickname: newNickName } });
	resp.status === 200 && sessionStorage.setItem('nickname', newNickName);
	return resp;
};

// 비밀번호
const setUpdatePassword = (password: string, newPassword: string) => {
	return api.post(userUrl.updateMyPw, null, { params: { password: password, newPassword: newPassword } });
};

// 전화번호 인증
const smsMyPhoneAuth = (newPhone: string, smsPhone: string) => {
	return api.post(userUrl.checkNewPhone, null, { params: { phoneNumber: newPhone, verificationCode: smsPhone } });
};

// 문자발송
const setNewPhoneNumber = (newPhone: string) => {
	return api.post(userUrl.updatePhone, null, { params: { phone_number: newPhone } });
};

// 쿠폰
const getMyCouponList = () => api.get(userUrl.myCoupon);

const setMyCouponList = (couponNumber: string) => {
	return api.post(userUrl.enrollCoupon, { couponNumber: couponNumber });
};

// 리뷰
const getMyReviewList = () => api.get(userUrl.myReview);

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
