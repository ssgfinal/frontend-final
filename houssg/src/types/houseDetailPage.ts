// 숙소 상세 페이지에서 쓰는 자료형들

interface HouseBaseInfo {
	accomNumber: number;
	accomName: string;
	minPrice: number;
	avgRating: number;
	reviewCount: number;
	accomAddress: string;
	img: string;
	isFavorite: true;
	accomCategory: string;
	accomDetails: string;
	addRequest?: number;
	deletionRequest?: number;
	auth?: number;
	businessNumber: string;
	checkIn: string;
	checkOut: string;
	id?: string;
	service: number[];
	teleNumber: string;
}

interface ServiceList {
	value: string;
	text: string;
	icon: string;
}

export type { HouseBaseInfo, ServiceList };