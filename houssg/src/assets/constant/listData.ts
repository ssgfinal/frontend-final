import { beach, parking, pool, bath, wifi, bed, barbecue, nosmoking, luggage, ott, ocean, pc } from '../icons';

const houseCategory = [
	{
		value: '호텔',
		label: '호텔',
	},
	{
		value: '모텔',
		label: '모텔',
	},
	{
		value: '펜션',
		label: '펜션',
	},
];

const houseServiceCategory = [
	{
		value: 'nearby_sea',
		text: '바닷가 근처',
		icon: beach,
	},
	{
		value: 'parking_available',
		text: '주차 가능',
		icon: parking,
	},
	{
		value: 'pool',
		text: '수영장',
		icon: pool,
	},
	{
		value: 'spa',
		text: '욕조',
		icon: bath,
	},
	{
		value: 'wifi',
		text: '와이파이',
		icon: wifi,
	},
	{
		value: 'twin_bed',
		text: '트윈베드',
		icon: bed,
	},
	{
		value: 'barbecue',
		text: '바베큐',
		icon: barbecue,
	},
	{
		value: 'no_smoking',
		text: '금연',
		icon: nosmoking,
	},
	{
		value: 'luggage_storage',
		text: '수화물보관',
		icon: luggage,
	},
	{
		value: 'free_movie_ott',
		text: 'OTT',
		icon: ott,
	},
];

const roomServiceCategory = [
	{
		value: 'city_view',
		text: '씨티 뷰',
	},
	{
		value: 'ocean_view',
		text: '오션 뷰',
		icon: ocean,
	},
	{
		value: 'pc',
		text: 'PC',
		icon: pc,
	},
	{
		value: 'no_smoking',
		text: '금연',
		icon: nosmoking,
	},
	{
		value: 'double_bed',
		text: '더블 베드',
		icon: bed,
	},
	{
		value: 'queen_bed',
		text: '퀸 베드',
		icon: bed,
	},
	{
		value: 'king_bed',
		text: '킹 베드',
		icon: bed,
	},
];
export { houseCategory, houseServiceCategory, roomServiceCategory };
