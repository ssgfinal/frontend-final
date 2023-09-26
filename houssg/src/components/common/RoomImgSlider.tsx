import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';

import { color } from '../../assets/styles';
import { RoomSlideProps } from '../../types';

const RoomImgSlider: React.FC<RoomSlideProps> = ({ children, data, setData }) => {
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
				{data.length === 0 ? (
					<SwiperSlide>
						<div>이미지가 </div>
						<div>없습니다.</div>
					</SwiperSlide>
				) : (
					data.map((element, index) => (
						<SwiperSlide key={index}>
							<SlideImg src={element} alt={`Image ${index}`} />
							{!!setData && <DeleteImg onClick={() => setData(index)} />}
						</SwiperSlide>
					))
				)}
				{!!children && <SwiperSlide>{children}</SwiperSlide>}
			</Swiper>
		</SwiperWrapper>
	);
};

export default RoomImgSlider;

const SwiperWrapper = styled.div`
	width: 100%;
	height: 100%;
	/* width: 500px;
	height: 500px; */

	.swiper {
		width: 100% !important;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 1rem;
		background-color: ${color.backColor};
		padding: 1rem;
		/* Center slide text vertically */
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
`;

const SlideImg = styled.img`
	width: 95%;
	height: 95%;
`;

const DeleteImg = styled.img`
	position: absolute;
	right: 0;
	top: 0;
	width: 10%;
	height: 10%;
	cursor: pointer;
`;
