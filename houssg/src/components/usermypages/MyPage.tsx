import { styled } from 'styled-components';
import { useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import { TabMenu } from '../common/TabMenu';

import MyInformation from './MyInformation';
import MyReview from './MyReview';
import MyFavorite from './MyFavorite';

import { color } from '../../assets/styles';
import { CouponIcon, MyPointIcon, ProfileCircle, accomodation } from '../../assets/icons';
import MyCoupons from './MyCoupons';
//import { Review } from '../house/Review';

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

const reviews = [
	{
		reservationNumber: 1234567,
		houseId: 7689,
		accomName: '가나다 Hotel',
		userId: 'abc',
		roomType: '패밀리룸',
		writeDate: '2023-09-11',
		reviewImage: accomodation,
		rating: 4.5,
		content: '야호 후기 좀 보여줭~',
		commentDate: null,
		commentContent: null,
	},
	{
		reservationNumber: 7654321,
		houseId: 1234,
		accomName: '라마바 Hotel',
		userId: 'abc',
		roomType: '더블룸',
		writeDate: '2023-09-12',
		reviewImage: accomodation,
		rating: 3.5,
		content:
			'보통이네용 후기를 작성해야 하는데 작성하기 싫어용 근데 써야해요 어쩌죠? 쓸 내용이 없습니다. 이제 없음 진짜 없음 어떡하지ㅠㅠㅠㅠ하지만 써야하겠죠 가나다라마바사아자차카타파하',
		commentDate: '2023-09-13',
		commentContent: '감사용~~~',
	},
	{
		reservationNumber: 7664371,
		houseId: 1235,
		accomName: '사아자 Hotel',
		userId: 'abc',
		roomType: '스위트룸',
		writeDate: '2023-09-13',
		reviewImage: null,
		rating: 4.0,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fugiat adipisci deserunt porro quia totam provident animi nemo labore temporibus voluptatem mollitia nostrum assumenda enim similique in doloribus eos consequatur.',
		commentDate: '2023-09-14',
		commentContent: '감사해용~~~',
	},
];

const favorites: { houseId: number; accomName: string; houseAddress: string; userId: string; rating: number; favorite: boolean }[] = [
	{
		houseId: 1235,
		accomName: '사아자 Hotel',
		houseAddress: '강원도 영월군 무릉도원면 명마동길 44-37',
		userId: 'abc',
		rating: 4.0,
		favorite: true,
	},
	{
		houseId: 1234,
		accomName: '라마바 Hotel',
		houseAddress: '전라북도 전주시 완산구 향교길 23-3',
		userId: 'abc',
		rating: 3.5,
		favorite: true,
	},
];
// lorem 하고 tab하면 예시내용이 나온다!치지말자!

const MyPage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const tabObj = [
		['MyInformation', '나의 정보'],
		['MyReview', '나의 후기'],
		['MyFavorite', '찜한 숙소'],
	];

	const [clickTab, setClickTab] = useState<string>('MyInformation');

	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'couponRegistration', modalSize: modalSize, modalText: '쿠폰번호를 입력하세요.' }));
	};

	return (
		<MyPageWrapper>
			<MyPageIconContainer>1:1문의</MyPageIconContainer>
			<MyPageMainContainer>
				<MyPageMainBox>
					<MyNickName>
						<IconImg src={ProfileCircle} />
						<span>홍길동님</span>
					</MyNickName>
					<MyPoint>
						<IconImg src={MyPointIcon} />
						<span>1000P</span>
					</MyPoint>
					<MyCoupon>
						<IconImg src={CouponIcon} />
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
				{clickTab === 'MyInformation' ? (
					<MyInformation />
				) : clickTab === 'MyReview' ? (
					<MyReview reviews={reviews} />
				) : (
					<MyFavorite favorites={favorites} />
				)}
			</MyPageContentsContainer>
		</MyPageWrapper>
	);
};

export default MyPage;

const MyPageWrapper = styled.div`
	margin: 1rem;
	display: grid;
	grid-template-columns: 0.1fr 1fr 0.1fr;
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

const IconImg = styled.img`
	width: 1.2rem;
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

const MyCoupon = styled.div`
	width: 100%;
	padding: 0.5rem;
	text-align: left;
	display: grid;
	grid-template-columns: 1fr 15fr 2fr;
	align-items: center;
	letter-spacing: -0.9px;
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

	@media (max-width: 460px) {
		font-size: 0.8rem;
		hr {
			width: 100%;
		}
	}

	@media (max-width: 350px) {
		font-size: 0.5rem;
		hr {
			width: 100%;
		}
	}

	@media (max-width: 310px) {
		font-size: 1rem;
		hr {
			width: 100%;
		}
	}
`;

const MyPageContentsContainer = styled.div`
	min-height: 100px;
	display: grid;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 5;
	grid-row-end: 6;
	border-radius: 1rem;
	box-shadow: 0px 0px 5px 0.5px ${color.color3};
	background-color: ${color.backColor};
`;
