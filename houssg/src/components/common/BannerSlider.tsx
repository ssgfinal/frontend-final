import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Koala from '../../assets/icons/Koala.jpg';
import Jellyfish from '../../assets/icons/Jellyfish.jpg';
import Desert from '../../assets/icons/Desert.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [Koala, Jellyfish, Desert];

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
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 1,
						spaceBetween: 10,
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
								<img src={image} alt={`Image ${index}`} style={{ width: '100%', height: '13vw' }} />
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
	@media (max-width: 640px) {
		.mySwiper {
			width: 100vw;
		}
	}
	@media (max-width: 768px) {
		.mySwiper {
			width: 100vw;
		}
	}

	@media (min-width: 1024px) {
		.mySwiper {
			width: 100vw;
		}
	}
`;
