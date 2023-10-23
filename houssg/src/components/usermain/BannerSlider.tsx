import { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { MainCoupon } from '../../types';
import { userKey } from '../../assets/constant/queryKey';
import { getMainCoupon } from '../../helper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { color } from '../../assets/styles';
import { couponBanner, eventBanner } from '../../assets/images';

const images = [eventBanner];

const BannerSlider = () => {
	const progressCircle = useRef<SVGSVGElement | null>(null);
	const progressContent = useRef<HTMLDivElement | null>(null);
	const onAutoplayTimeLeft = (_: unknown, time: number, progress: number) => {
		progressCircle.current?.style.setProperty('--progress', 1 - progress + '');
		if (progressContent.current) {
			progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
		}
	};

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: MainCoupon[] }>([userKey.mainCoupon], () => getMainCoupon(), {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		isSuccess && (
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
					{data.data?.map((coupon, couponNumber) => {
						if (coupon) {
							return (
								<SwiperSlide key={couponNumber}>
									{coupon.expirationStatus !== 1 ? (
										<MainCouponContainer>
											<NameBox>
												{coupon.couponName}({coupon.couponNumber})
											</NameBox>
											<DiscountBox>{coupon.discount.toLocaleString()}원</DiscountBox>
											<ExpirationDateBox>유효기간 ~{coupon.expirationDate}</ExpirationDateBox>
										</MainCouponContainer>
									) : (
										<></>
									)}
								</SwiperSlide>
							);
						}
					})}
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
		)
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

// 배너에 progress 효과
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

// 배너에 progress 효과
const AutoplayProgress = styled(TimeCircle)`
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: ${color.color1};

	svg {
		--progress: 0;
		position: absolute;
		z-index: 2;
		stroke-width: 4px;
		stroke: ${color.color1};
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
	height: 25vw;

	@media (max-width: 600px) {
		height: 8rem;
	}
`;

// 배너 이미지
const SwiperMainBanner = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
`;

const MainCouponContainer = styled.div`
	background-image: url(${couponBanner});
	background-repeat: round;
	width: 100%;
	height: 25vw;
	display: flex;
	justify-content: space-around;
	flex-direction: column;

	@media (max-width: 600px) {
		height: 8rem;
	}
`;

const NameBox = styled.p`
	font-size: 1.5rem;
	font-weight: bold;
	margin-top: 2rem;
	color: ${color.backColor};
	-webkit-text-stroke: 1px ${color.basicColor};

	@media (max-width: 660px) {
		font-size: 1rem;
	}
	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const DiscountBox = styled.p`
	font-size: 3rem;
	font-weight: bold;
	padding: 1rem;
	color: ${color.backColor};
	-webkit-text-stroke: 1px ${color.basicColor};
	@media (max-width: 660px) {
		font-size: 1rem;
	}
	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const ExpirationDateBox = styled.p`
	text-align: right;
	font-weight: bold;
	font-size: 1.2rem;
	padding: 0 2rem;
	color: ${color.backColor};
	-webkit-text-stroke: 1px ${color.basicColor};
	@media (max-width: 660px) {
		font-size: 1rem;
	}
	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;
