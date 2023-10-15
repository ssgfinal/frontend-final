// 더미 데이터를 index.ts에 등록하지 않기!!!

import { accomodation } from '../icons';

// TODO: 제거 사업자는 안씀
export const ReviewDummy = [
	{
		review_writer: '무조',
		review_number: 1,
		reservation_number: 123,
		review_content: '좋은 숙소입니다.',
		rating: 5,
		report_status: 0,
		creation_time: '2023-08-28 10:59:12',
		roomType: '더블룸',
		reviewImage: null,
		comment: null,
		member_id: 456,
	},
	{
		review_writer: '홍길동길동길동길',
		review_number: 2,
		reservation_number: 456,
		review_content: '좋은 숙소입니다.',
		rating: 3,
		report_status: 0,
		creation_time: '2023-08-29 08:12:23',
		roomType: '더블룸',
		reviewImage: accomodation,
		comment: {
			text: '감사합니다하하하하하하하하하하하하하하하하하핳리뷰쓰기실헝용용용',
			date: '2023-08-29 18:09:01',
		},
		member_id: 426,
	},
];

export const RoomList = [
	{
		accom_number: 33,
		room_image:
			'https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe',
		room_number: 1,
		room_category: '일반룸',
		room_detail: '상세정보입니다',
		room_price: 200000,
		room_count: 4,
	},
	{
		accom_number: 33,
		room_image:
			'https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe',
		room_number: 2,
		room_category: '스위트룸',
		room_detail: '상세정보',
		room_price: 200000,
		room_count: 4,
	},
];

export const eventList = [
	{
		title: '점심약속',
		date: '2023-09-13',
		allDay: true,
	},
	{
		title: '점심약속',
		date: '2023-09-12',
		allDay: true,
	},
	{
		title: '점심3약속',
		date: '2023-09-12',
		allDay: true,
	},
	{
		title: '점심4약속',
		date: '2023-09-12',
		allDay: true,
	},
	{
		title: '점심약속',
		date: '2023-09-12',
		allDay: true,
	},
	{
		title: '점심약속',
		date: '2023-09-11',
		allDay: true,
	},
	{
		title: '비지니스',
		start: '2023-09-18 12:30:00',
		constraint: '김사장과 복싱',
		end: '2023-09-20 12:30',
		allDay: true,
	},
	{
		title: '비지니스',
		start: '2023-09-22 12:30:00',
		constraint: '김사장과 복싱',
		end: '2023-09-25 12:30',
		allDay: true,
	},
];
