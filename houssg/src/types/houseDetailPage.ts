// 숙소 상세 페이지에서 쓰는 자료형들

interface HouseBaseInfo {
	accomNumber: number;
	accomName: string;
	minPrice: number;
	avgRating: number;
	reviewCount: number;
	accomAddress: string;
	img?: string;
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

interface HouseProps {
	house: HouseBaseInfo;
}

interface HouseListProps {
	houseList: HouseBaseInfo[];
}

interface ServiceList {
	value: string;
	text: string;
	icon: string;
}

interface ReviewType {
	reviewNumber: number;
	reviewCreationTime: string;
	nickname: string;
	roomCategory: string;
	reviewRating: number;
	img?: string;
	reviewContent: string;
	reviewCommentTime?: string;
	reviewComment?: string;
}

interface ReviewProps {
	review: ReviewType;
}

interface SearchHouse extends HouseBaseInfo {
	totalCount: number;
	page: number[];
	pageParam: number[];
}

export type { HouseBaseInfo, HouseProps, HouseListProps, ServiceList, ReviewType, ReviewProps, SearchHouse };
