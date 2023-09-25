import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import { color } from '../../assets/styles';

const RoomImgSlider = () => {
	return (
		<SwiperWrapper>
			<Swiper
				pagination={{
					type: 'fraction',
				}}
				navigation={false}
				modules={[Pagination, Navigation]}
				loop={true}
			>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
				<SwiperSlide>Slide 6</SwiperSlide>
				<SwiperSlide>Slide 7</SwiperSlide>
				<SwiperSlide>Slide 8</SwiperSlide>
				<SwiperSlide>Slide 9</SwiperSlide>
			</Swiper>
		</SwiperWrapper>
	);
};

export default RoomImgSlider;

const SwiperWrapper = styled.div`
	/* max-width: 600px;
	max-height: 600px;
	width: 100%;
	height: 100%; */
	width: 500px;
	height: 500px;
	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: ${color.backColor};

		/* Center slide text vertically */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
