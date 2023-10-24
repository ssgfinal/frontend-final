import api from '../api/api';
import { userUrl } from '../assets/constant';
import { AddUserReview, CancelReservationType } from '../types';

// 예약 성공 백에 전달
const userReservationSuccess = (reservationNumber: number) => {
	return api.patch(userUrl.isPaymentSuccess, { reservationNumber, sign: 'success' });
};

// 예약 취소
const userCancelReservation = ({ reservationNumber, bank, account }: CancelReservationType) => {
	return api.patch(userUrl.reservationCancel, null, {
		params: { reservationNumber: reservationNumber, bank: bank, account: account },
	});
};

// 리뷰 작성
const setReview = async (formData: FormData) => {
	console.log('formData??', ...formData);
	const resp = await api.post(userUrl.addReview, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
	return resp;
};

// 리뷰 보내기
const setReviewFormData = ({ reviewContent, reviewRating, reservationNumber, roomNumber, accomNumber, file }: AddUserReview) => {
	console.log('setReviewFormData?', reviewContent, reviewRating, reservationNumber, roomNumber, accomNumber, file);
	if (!reservationNumber && !roomNumber && !accomNumber) {
		alert('잘못된 접근입니다.');
		return 'false';
	}

	if (!reviewContent && !reviewRating) {
		alert('빈 값이 존재합니다.');
		return 'false';
	}

	const formData = new FormData();

	if (file) {
		formData.append('file', file);
		console.log('file!', typeof file);
	}

	const requestData = {
		reviewContent,
		reviewRating,
		reservationNumber,
		roomNumber,
		accomNumber,
	};
	const json = JSON.stringify(requestData);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('reviewDto', blob);
	return formData;
};

// 리뷰 보기
const getMyPreview = (reservationNumber: number) => {
	return api.get(userUrl.preview, { params: { reservationNumber: reservationNumber } });
};

export { setReview, getMyPreview, setReviewFormData, userCancelReservation, userReservationSuccess };
