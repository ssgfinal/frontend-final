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

export type { HouseBaseInfo };
