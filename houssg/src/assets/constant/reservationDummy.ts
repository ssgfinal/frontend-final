// 더미 데이터를 index.ts에 등록하지 않기!!!

export const ReviewDummy = [
	{
		review_writer: '홍길동123',
		review_number: 1,
		reservation_number: 123,
		review_content: '좋은 숙소입니다.',
		rating: 5,
		report_status: 0,
		creation_time: '2023-08-28 10:00:00',
		comment: { text: '감사합니다', date: '2023-08-29 18:00:00' },
		member_id: 456,
	},
	{
		review_writer: '홍길동133',
		review_number: 2,
		reservation_number: 123,
		review_content: '좋은 숙소입니다.',
		rating: 5,
		report_status: 0,
		creation_time: '2023-08-28 10:00:00',
		comment: null,
		member_id: 426,
	},
];

export const RoomList = [
	{
		room_number: 1,
		room_category: '일반룸',
		room_detail: '상세정보',
		room_price: 200000,
		room_availability: 1,
		room_use: 4,
		accom_number: 33,
	},
	{
		room_number: 2,
		room_category: '스위트룸',
		room_detail: '상세정보',
		room_price: 200000,
		room_availability: 2,
		room_use: 4,
		accom_number: 33,
	},
];
