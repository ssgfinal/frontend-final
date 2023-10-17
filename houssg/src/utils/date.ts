import { Schedule } from '../types';

// Date 형식 기본 (Tue Oct 17 2023 13:09:14 GMT+0900 ) -> 2023-10-17 로 변환해주는 함수
const dateFormat = (date: Date) => {
	const dateFormat2 =
		date.getFullYear() +
		'-' +
		(date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
		'-' +
		(date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
	return dateFormat2;
};

// 한 자리 숫자를 두 글자로 변환하는 함수
const makeTwo = (date: number) => {
	if (date < 10) {
		return '0' + date;
	}
	return date;
};

// 입력받은 시작일과 종료일 예약 가능 여부를 확인하는 함수
// 기간 내 매진된 날짜가 포함되어있으면 'impossible' 을 반환
const periodCheck = (soldOutList: Schedule[], startDate: string, endDate: string) => {
	let isPossible = true;
	for (let i = Number(startDate.slice(8, 10)); i < Number(endDate.slice(8, 10)); i++) {
		soldOutList.forEach((room: Schedule) => {
			if (room.date === endDate.slice(0, 8) + i) {
				isPossible = false;
			}
		});
	}
	return isPossible ? 'possible' : 'impossible';
};

// 입력받은 두 날짜로 (몇박 며칠 할 때의 ) 박 수 계산하는 함수
function calculateNights(startDate: string, endDate: string) {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const timeDifference = end.getTime() - start.getTime();
	const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
	return nights;
}

export { dateFormat, makeTwo, periodCheck, calculateNights };
