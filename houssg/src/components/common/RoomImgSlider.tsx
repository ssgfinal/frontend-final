import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';

import { color } from '../../assets/styles';
import { RoomSlideProps } from '../../types';
import { deleteIcon } from '../../assets/icons';

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
						<div>
							<img></img>
						</div>
					</SwiperSlide>
				) : (
					data.map((element, index) => (
						<SwiperSlide key={index}>
							<SlideImg src={element} alt={`Image ${index}`} />
							{!!setData && <DeleteImg onClick={() => setData(index)} src={deleteIcon} />}
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
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
`;

const SlideImg = styled.img`
	width: 95%;
	height: 95%;
	margin-bottom: 1rem;
	border-radius: 1rem;
`;

const DeleteImg = styled.img`
	position: absolute;
	right: 10%;
	top: 5%;
	width: 10%;
	height: 10%;
	cursor: pointer;
`;
