import api from '../api/api';
import { userUrl } from '../assets/constant';
import { reviewDto } from '../types';

// 리뷰 작성
const setReview = (formData: FormData) => {
	return api.post(userUrl.addReview, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// 리뷰 보내기
const setReviewFormData = ({ reviewContent, reviewRating, reservationNumber, roomNumber, accomNumber, file }: reviewDto) => {
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
	}

	const reviewDto = {
		reviewContent,
		reviewRating,
		reservationNumber,
		roomNumber,
		accomNumber,
		file,
	};
	const json = JSON.stringify(reviewDto);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('request', blob);
	return formData;
};

// 리뷰 보기
const getMyPreview = (reservationNumber: number) => {
	return api.get(userUrl.preview, { params: { reservationNumber: reservationNumber } });
};

export { setReview, getMyPreview, setReviewFormData };
