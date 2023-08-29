// import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import Koala from '../../assets/icons/Koala.svg';
import Koala from '../../assets/icons/Koala.jpg';
import Jellyfish from '../../assets/icons/Jellyfish.jpg';
import Desert from '../../assets/icons/Desert.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './BannerSlider.css';

const BannerSlider = () => {
	return (
		<BannerContainer>
			<Swiper
				slidesPerView={1}
				spaceBetween={50}
				centeredSlides={true}
				loop={true}
				autoplay={{
					delay: 5000,
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
						slidesPerView: 1,
						spaceBetween: 30,
					},
					1024: {
						slidesPerView: 1,
						spaceBetween: 40,
					},
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				// slideToClickedSlide={true}
				className="mySwiper"
			>
				<div className="swiper-banner">
					<SwiperSlide>
						<img src={Koala} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Jellyfish} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Desert} />
					</SwiperSlide>
				</div>
			</Swiper>
		</BannerContainer>
	);
};

export default BannerSlider;

const BannerContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
