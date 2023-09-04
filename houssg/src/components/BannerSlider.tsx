import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Banner from '../assets/images/Banner.jpg';
import House from '../assets/images/Lighthouse.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [Banner, House];

const BannerSlider = () => {
	return (
		<BannerContainer>
			<Swiper
				slidesPerView={1}
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
					380: {
						slidesPerView: 1,
					},
					540: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 1,
					},
					1024: {
						slidesPerView: 1,
					},
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				<div className="swiper-wrapper">
					<div className="swiper-banner">
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image} alt={`Image ${index}`} className="swiper-main-banner" />
							</SwiperSlide>
						))}
					</div>
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

	@media (min-width: 100px) {
		.swiper-main-banner {
			width: 100vw;
			height: 25vw;
		}
	}

	@media (min-width: 1700px) {
		.swiper-main-banner {
			width: 100%;
			height: 15vh;
		}
	}
`;
