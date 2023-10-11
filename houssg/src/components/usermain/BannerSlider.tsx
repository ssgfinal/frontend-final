import { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Banner from '../../assets/images/Banner.jpg';
import House from '../../assets/images/Lighthouse.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { color } from '../../assets/styles';

const images = [Banner, House];

const BannerSlider = () => {
	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLDivElement | null>(null);
	const onAutoplayTimeLeft = (_: unknown, time: number, progress: number) => {
		progressCircle.current?.style.setProperty('--progress', 1 - progress + '');
		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
		}
	};

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
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				onAutoplayTimeLeft={onAutoplayTimeLeft}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<BannerBox>
							<SwiperMainBanner src={image} alt={`Image ${index}`} />
						</BannerBox>
					</SwiperSlide>
				))}
			</Swiper>
			<TimeCircle>
				<AutoplayProgress>
					<svg viewBox="0 0 48 48" ref={progressCircle}>
						<circle cx="24" cy="24" r="20"></circle>
					</svg>
					<span ref={progressContent}></span>
				</AutoplayProgress>
			</TimeCircle>
		</BannerContainer>
	);
};

export default BannerSlider;

const BannerContainer = styled.div`
	position: relative;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	.swiper-pagination-bullet {
		background: ${color.color2};
	}

	.swiper-button-prev {
		display: none;
	}

	.swiper-button-next {
		display: none;
	}
`;

// TODO: 배너에 progress 효과
const TimeCircle = styled.div`
	position: absolute;
	z-index: 2;
	top: 3%;
	right: 1%;
	width: 50px;
	height: 50px;

	@media (max-width: 400px) {
		top: -5%;
	}
`;

// TODO: 배너에 progress 효과
const AutoplayProgress = styled(TimeCircle)`
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: ${color.backColor};

	svg {
		--progress: 0;
		position: absolute;
		z-index: 2;
		stroke-width: 4px;
		stroke: ${color.backColor};
		fill: none;
		stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
		stroke-dasharray: 125.6;
		transform: rotate(-90deg);
	}

	@media (max-width: 400px) {
		width: 50%;
		font-size: 0.5rem;

		svg {
			stroke-width: 2px;
		}
	}
`;

const BannerBox = styled.div`
	position: relative;
	display: grid;
	align-items: center;
	width: 100vw;
	max-width: 2000px;
	height: 15rem;

	@media (max-width: 400px) {
		height: 8rem;
	}
`;

// TODO: 배너 이미지
const SwiperMainBanner = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
`;
