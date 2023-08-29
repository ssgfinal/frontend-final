// import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Koala from '../../assets/icons/Koala.jpg';
import Jellyfish from '../../assets/icons/Jellyfish.jpg';
import Desert from '../../assets/icons/Desert.jpg';
import Hydrangeas from '../../assets/icons/Hydrangeas.jpg';
import Lighthouse from '../../assets/icons/Lighthouse.jpg';

import Test from '../Test';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HomeSlider.css';

const HomeSlider = () => {
	// const [perview, setPerview] = useState(''); // 1 | 3 | 4 | 5
	// const [autodelay, setAutodelay] = useState(''); // 2500, 5000
	// const [outdoor_view, setOutdoor_view] = useState({}); // 숙소 이미지
	// const [review_rating, setReview_rating] = useState(''); // 평점

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
					<SwiperSlide>
						<Test />
					</SwiperSlide>
					<SwiperSlide>
						<Test />
					</SwiperSlide>
					<SwiperSlide>
						<Test />
					</SwiperSlide>
					<SwiperSlide>
						<Test />
					</SwiperSlide>
					<SwiperSlide>
						<Test />
					</SwiperSlide>
				</div>
			</Swiper>
		</HomeSliderContainer>
	);
};

export default HomeSlider;

const HomeSliderContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
