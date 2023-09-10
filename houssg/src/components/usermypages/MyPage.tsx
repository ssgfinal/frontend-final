import { styled } from 'styled-components';
import { useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import { TabMenu } from '../common/TabMenu';

import MyInformation from './MyInformation';
import MyReview from './MyReview';
import MyFavorite from './MyFavorite';

import { color } from '../../assets/styles';
import { CouponIcon, MyPointIcon, ProfileCircle } from '../../assets/icons';
import MyCoupons from './MyCoupons';

const coupons = [
	{
		userId: 'abc',
		couponNumber: 123456724124,
		couponName: '9월 이벤트',
		isUsed: 0,
		couponDiscount: 10000,
	},
	{
		userId: 'abc',
		couponNumber: 231721984721,
		couponName: '9월 빅세일',
		isUsed: 0,
		couponDiscount: 50000,
	},
];
const MyPage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const tabObj = [
		['MyInformation', '나의 정보'],
		['MyReview', '나의 리뷰'],
		['MyFavorite', '찜한 숙소'],
	];

	const [clickTab, setClickTab] = useState<string>('MyInformation');

	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'couponregistration', modalSize: modalSize }));
	};

	return (
		<MyPageWrapper>
			<MyPageIconContainer>1:1문의</MyPageIconContainer>
			<MyPageMainContainer>
				<MyPageMainBox>
					<MyNickName>
						<ProfileImg src={ProfileCircle} />
						<span>홍길동님</span>
					</MyNickName>
					<MyPoint>
						<PointImg src={MyPointIcon} />
						<span>1000P</span>
					</MyPoint>
					<MyCoupon>
						<CouponImg src={CouponIcon} />
						<div>
							쿠폰함<CouponList onClick={toggleDropdown}>{isDropdownOpen ? <>&#9650;</> : <>&#9660;</>}</CouponList>
						</div>
					</MyCoupon>
					{isDropdownOpen && (
						<DropdownContent>
							<CouponRegistration>
								<input type="text" placeholder="쿠폰번호 입력" />
								<button onClick={modalOpen}>등록</button>
							</CouponRegistration>
							<DropCouponList>
								{coupons.map((coupon, index) => (
									<div key={index}>
										<MyCoupons coupons={coupon} />
									</div>
								))}
							</DropCouponList>
						</DropdownContent>
					)}
				</MyPageMainBox>
			</MyPageMainContainer>
			<MyPageTabContainer>
				<TabContainer>
					<div></div>
					<TabMenu tabObj={tabObj} clickTab={clickTab} setClickTab={setClickTab} />
				</TabContainer>
				<div></div>
			</MyPageTabContainer>
			<MyPageContentsContainer>
				{clickTab === 'MyInformation' ? <MyInformation /> : clickTab === 'MyReview' ? <MyReview /> : <MyFavorite />}
			</MyPageContentsContainer>
		</MyPageWrapper>
	);
};

export default MyPage;

const MyPageWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 0.2fr 1fr 0.2fr;
	grid-template-rows: 0.2fr 0.5fr 0.1fr 0.1fr 1fr 0.5fr;
	justify-content: center;

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}

	img {
		@media (max-width: 900px) {
			width: 1rem;
		}

		@media (max-width: 430px) {
			width: 0.8rem;
			margin-right: 1vw;
		}

		@media (max-width: 320px) {
			width: 0.7rem;
			margin-right: 1vw;
		}
	}
`;

const MyPageIconContainer = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
	justify-self: right;
	align-self: center;
	font-size: 0.4rem;
`;

const MyPageMainContainer = styled.div`
	display: grid;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
`;

const MyPageMainBox = styled.div`
	padding: 0.7rem;
	border-radius: 1rem;
	box-shadow: 0px 0px 5px 0.5px ${color.unSelectColor};
	background-color: ${color.backColor};
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(3, 1fr);
	align-items: center;
	color: ${color.darkGrayColor};
`;

const MyNickName = styled.div`
	width: 100%;
	padding: 0.5rem;
	padding-bottom: 0.8rem;
	text-align: left;
	border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 1fr 20fr;
	align-items: end;
	letter-spacing: -0.9px;
`;

const ProfileImg = styled.img`
	width: 1.2rem;
`;

const MyPoint = styled.div`
	width: 100%;
	padding: 0.5rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
	text-align: left;
	border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 1fr 20fr;
	align-items: center;
	letter-spacing: -0.9px;
`;

const PointImg = styled.img`
	width: 1.2rem;
`;

const MyCoupon = styled.div`
	width: 100%;
	padding: 0.5rem;
	text-align: left;
	display: grid;
	grid-template-columns: 1fr 15fr 2fr;
	align-items: center;
	letter-spacing: -0.9px;
`;

const CouponImg = styled.img`
	width: 1.2rem;
`;

const CouponList = styled.button`
	color: ${color.darkGrayColor};
	background-color: ${color.backColor};
	border: none;
`;

const DropdownContent = styled.div`
	border-top: 1px solid ${color.unSelectColor};
	padding: 1vw;
`;

const DropCouponList = styled.div`
	margin-top: 1vw;
	padding-left: 2vw;
	padding-right: 2vw;
	text-align: left;
`;

const CouponRegistration = styled.div`
	display: grid;
	grid-template-columns: 5fr 1fr;

	@media (max-width: 900px) {
		grid-template-columns: 5fr 1fr;
	}

	@media (max-width: 430px) {
		grid-template-columns: 5fr 1fr;
	}

	@media (max-width: 320px) {
		grid-template-columns: 4fr 2fr;
	}

	button {
		justify-self: center;
		color: ${color.color1};
		border: 1px solid ${color.unSelectColor};
		border-radius: 0.4rem;

		@media (max-width: 900px) {
			font-size: 0.8rem;
		}

		@media (max-width: 430px) {
			font-size: 0.5rem;
		}

		@media (max-width: 320px) {
			font-size: 0.05rem;
		}
	}

	button:hover {
		cursor: pointer;
		border: 1px solid ${color.color3};
		color: ${color.backColor};
		background-color: ${color.color3};
	}

	input {
		justify-self: right;
		outline: none;
		color: ${color.color1};
		border: 1px solid ${color.unSelectColor};
		border-radius: 1rem;
		width: 95%;
		padding: 0.5rem;
		font-size: 1rem;
		text-align: center;

		@media (max-width: 900px) {
			font-size: 0.8rem;
		}

		@media (max-width: 430px) {
			justify-self: center;
			font-size: 0.5rem;
		}

		@media (max-width: 320px) {
			justify-self: center;
			width: 90%;
			font-size: 0.05rem;
		}
	}
`;

const MyPageTabContainer = styled.div`
	display: grid;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 4;
	grid-row-end: 5;
	justify-content: center;
	align-content: end;
`;

const TabContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
	justify-items: center;

	@media (max-width: 900px) {
		font-size: 1rem;
		hr {
			width: 100%;
		}
	}

	@media (max-width: 430px) {
		font-size: 0.5rem;
		hr {
			width: 100%;
		}
	}

	@media (max-width: 320px) {
		font-size: 0.8rem;
		hr {
			width: 100%;
		}
	}
`;

const MyPageContentsContainer = styled.div`
	display: grid;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 5;
	grid-row-end: 6;
	border-radius: 1rem;
	box-shadow: 0px 0px 5px 0.5px ${color.color3};
	background-color: ${color.backColor};
`;
