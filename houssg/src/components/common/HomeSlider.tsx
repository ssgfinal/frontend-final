import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import BriefHouse from '../BriefHouse';
import Koala from '../../assets/icons/Koala.jpg';
import Jellyfish from '../../assets/icons/Jellyfish.jpg';
import Desert from '../../assets/icons/Desert.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// TODO : 임시 데이터, Map 돌린 후는 삭제
const house = [
	{
		name: '가나다 Hotel',
		price: '100,000원',
		rating: 4.5,
		location: '부산',
		image: Koala,
	},
	{
		name: '가나다 Hotel',
		price: '100,000원',
		rating: 4.5,
		location: '부산',
		image: Desert,
	},
	{
		name: '가나다 Hotel',
		price: '100,000원',
		rating: 4.5,
		location: '부산',
		image: Jellyfish,
	},
	{
		name: '가나다 Hotel',
		price: '100,000원',
		rating: 4.5,
		location: '부산',
		image: Koala,
	},
	{
		name: '가나다 Hotel',
		price: '100,000원',
		rating: 4.5,
		location: '부산',
		image: Jellyfish,
	},
];

const HomeSlider = () => {
	// TODO: Map 돌릴 때 사용될 부분, 백 받은 후, 확인하고 오류가 있으면 수정 예정
	//const [houses, setHouses] = useState([]);

	// useEffect(() => {
	// 	fetch('URL_TO_YOUR_API_ENDPOINT')
	// 		.then((response) => response.json())
	// 		.then((data) => setHouses(data))
	// 		.catch((error) => console.error('Error fetching data:', error));
	// }, []);

	return (
		<HomeSliderContainer>
			<Swiper
				slidesPerView={1}
				slidesPerGroup={1}
				breakpoints={{
					380: {
						slidesPerView: 1,
					},
					540: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				navigation={true}
				modules={[Navigation]}
				className="homeSwiper"
			>
				<div className="swiper-slide">
					{house.map((item, index) => (
						<SwiperSlide key={index}>
							<BriefHouse house={item} />
						</SwiperSlide>
					))}
				</div>
			</Swiper>
		</HomeSliderContainer>
	);
};

export default HomeSlider;

// TODO: 해당 숙소 상세페이지로 이동할 때, 한 번 더 확인
const HomeSliderContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	.swiper-wrapper {
		margin: 0.5rem;
	}

	@media (max-width: 380px) and (min-width: 540px) {
		.homeSwiper {
			width: 70vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media (max-width: 540px) and (min-width: 768px) {
		.homeSwiper {
			width: 70vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media (max-width: 768px) and (min-width: 1024px) {
		.homeSwiper {
			width: 70vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media (min-width: 1024px) {
		.homeSwiper {
			width: 87vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;
