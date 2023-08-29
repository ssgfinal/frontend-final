// import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Test from '../Test';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Koala from '../../assets/icons/Koala.jpg';
import Jellyfish from '../../assets/icons/Jellyfish.jpg';
import Desert from '../../assets/icons/Desert.jpg';

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
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 10,
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
				modules={[Autoplay, Pagination, Navigation]}
				// slideToClickedSlide={true}
				className="homeSwiper"
			>
				<div className="swiper-slide">
					{house.map((item, index) => (
						<SwiperSlide key={index}>
							<Test house={item} />
						</SwiperSlide>
					))}
				</div>
			</Swiper>
		</HomeSliderContainer>
	);
};

export default HomeSlider;

const HomeSliderContainer = styled.div`
	cursor: pointer;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 640px) {
		.homeSwiper {
			flex-direction: column;
			align-items: flex-start;
			width: 80vw;
		}
	}

	@media (max-width: 768px) {
		.homeSwiper {
			width: 80vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media (min-width: 1024px) {
		.homeSwiper {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;
