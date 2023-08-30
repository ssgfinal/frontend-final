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
	// TODO:
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
				spaceBetween={5}
				slidesPerGroup={1}
				breakpoints={{
					380: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					540: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 40,
					},
				}}
				navigation={true}
				modules={[Navigation]}
				className="homeSwiper"
			>
				<div className="swiper-wrapper">
					<div className="swiper-slide">
						{house.map((item, index) => (
							<SwiperSlide key={index}>
								<BriefHouse house={item} />
							</SwiperSlide>
						))}
					</div>
				</div>
			</Swiper>
		</HomeSliderContainer>
	);
};

export default HomeSlider;

// TODO: 마진 아래랑 양옆, hover랑 gap주기
const HomeSliderContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	.swiper-wrapper {
		gap: 1rem;
	}

	.swiper-slider {
		margin: 1rem;
	}

	@media (max-width: 380px) and (min-width: 540px) {
		.homeSwiper {
			flex-direction: column;
			align-items: flex-start;
			width: 10vw;
		}
	}

	@media (max-width: 540px) and (min-width: 768px) {
		.homeSwiper {
			width: 60vw;
		}
	}

	@media (max-width: 768px) and (min-width: 1024px) {
		.homeSwiper {
			width: 60vw;
		}
	}

	@media (min-width: 1024px) {
		.homeSwiper {
			width: 80vw;
		}
	}
`;
