import { styled } from 'styled-components';
import { useState, useRef } from 'react';
import { TabMenu } from '../common/TabMenu';
import MyCoupons from './MyCoupons';
import MyInformation from './MyInformation';
import MyReview from './MyReview';
import MyFavorite from './MyFavorite';
import { color } from '../../assets/styles';
import { CouponIcon, MyPointIcon, ProfileCircle } from '../../assets/icons';

// TODO: 더미데이터
import { accomodation } from '../../assets/icons';

// TODO: 서버 > 쿠폰등록
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { MyCouponList } from '../../types';
// import { useQuery } from '@tanstack/react-query';
import { userKey } from '../../assets/constant/queryKey';
import { setCouponList } from '../../helper';

const reviews: {
	reviewNumber: number;
	reservationNumber: number;
	houseId: number;
	accomName: string;
	userId: string;
	roomType: string;
	writeDate: string;
	reviewImage: string | null;
	rating: number;
	content: string;
	commentDate: string | null;
	commentContent: string | null;
}[] = [
	{
		reviewNumber: 1,
		reservationNumber: 7654321,
		houseId: 1234,
		accomName: '가나다 Hotel',
		userId: 'abc',
		roomType: '패밀리룸',
		writeDate: '2023-09-10 18:00:00',
		reviewImage: accomodation,
		rating: 3.5,
		content:
			'안녕하십니까 250자 글자 테스트 중입니다 과연 250자가 될까요?? 맥스렝스 썼는데 될지 안 될지 모르겠지만 250자가 그렇게 긴 글이 아니면서도 또 긴 글자이기도 하고 어떡하지 더이상은 쓸 내용이 없는데 언제까지 써야할까요??이제 진짜 없는데 언제까지 테스트로 글을 쓰고 있어야 하는지 제발 살려줘 이제 그만 멈춰 이 텍스트애리어 자식아 그만해라 250자 이제 넘은 거 같은데 언제까지 쳐야하는 건지 뉴뉴뉴뉴 이제 그만 치게 해줘 살려줘 언제까',
		commentDate: null,
		commentContent: null,
	},
	{
		reviewNumber: 2,
		reservationNumber: 7654321,
		houseId: 1234,
		accomName: '라마바 Hotel',
		userId: 'abc',
		roomType: '더블룸',
		writeDate: '2023-09-12 18:00:00',
		reviewImage: accomodation,
		rating: 3.5,
		content:
			'보통이네용 후기를 작성해야 하는데 작성하기 싫어용 근데 써야해요 어쩌죠? 쓸 내용이 없습니다. 이제 없음 진짜 없음 어떡하지ㅠㅠㅠㅠ하지만 써야하겠죠 가나다라마바사아자차카타파하',
		commentDate: '2023-09-13 18:00:00',
		commentContent: '감사용~~~',
	},
	{
		reviewNumber: 3,
		reservationNumber: 7664371,
		houseId: 1235,
		accomName: '사아자 Hotel',
		userId: 'hjr123',
		roomType: '스위트룸',
		writeDate: '2023-09-13 18:00:00',
		reviewImage: null,
		rating: 4.0,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, fugiat adipisci deserunt porro quia totam provident animi nemo labore temporibus voluptatem mollitia nostrum assumenda enim similique in doloribus eos consequatur.',
		commentDate: '2023-09-14 18:00:00',
		commentContent: '감사해용~~~',
	},
];

const favorites: { houseId: number; accomName: string; houseAddress: string; userId: string; rating: number; favorite: boolean }[] = [
	{
		houseId: 1235,
		accomName: '사아자 Hotel',
		houseAddress: '강원도 영월군 무릉도원면 명마동길 44-37',
		userId: 'hjr123',
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

const MyPage = () => {
	const userNickName = sessionStorage.getItem('nickname');
	const userPoint = sessionStorage.getItem('point');
	const newCoupon = useRef<HTMLInputElement | null>(null);

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

	// 쿠폰 등록
	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		(couponNumber: string) => {
			return setCouponList(couponNumber);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [userKey.myCoupon] });
				alert('등록완료');
			},
		},
	);

	const onRegistration = () => {
		const couponNumber = newCoupon.current?.value;

		if (newCoupon.current && couponNumber) {
			mutate(couponNumber);
		} else if (couponNumber === '') {
			alert('쿠폰번호를 입력해주세요.');
		}
	};

	return (
		<MyPageWrapper>
			<MyPageMainContainer>
				<MyPageMainBox>
					<MyNickName>
						<IconImg src={ProfileCircle} />
						<span>&nbsp;{userNickName}님</span>
					</MyNickName>
					<MyPoint>
						<IconImg src={MyPointIcon} />
						{userPoint !== null ? <span>&nbsp;{userPoint.toLocaleString()}P</span> : <span>&nbsp;0P</span>}
					</MyPoint>

					<MyCoupon>
						<IconImg src={CouponIcon} />
						<div>
							&nbsp;쿠폰함&nbsp;<CouponList onClick={toggleDropdown}>{isDropdownOpen ? <>&#9650;</> : <>&#9660;</>}</CouponList>
						</div>
					</MyCoupon>
					{isDropdownOpen && (
						<DropdownContent>
							<CouponRegistration>
								<input type="text" ref={newCoupon} placeholder="쿠폰번호 입력" />
								<button onClick={onRegistration}>등록</button>
							</CouponRegistration>
							<DropCouponList>
								<MyCoupons />
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
	margin: 2rem;
	display: grid;
	grid-template-columns: 0.3fr 1fr 0.3fr;
	justify-content: center;

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		margin: 1rem;
		grid-template-columns: 0.1fr 1fr 0.1fr;
		font-size: 0.8rem;
	}
`;

const MyPageMainContainer = styled.div`
	display: grid;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
`;

const MyPageMainBox = styled.div`
	padding: 1.3rem;
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
	padding-bottom: 1rem;
	text-align: left;
	border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 1fr 20fr;
	align-items: end;
	letter-spacing: -0.9px;
`;

const IconImg = styled.img`
	width: 1.2rem;

	@media (max-width: 900px) {
		width: 1rem;
	}

	@media (max-width: 430px) {
		width: 0.8rem;
		margin-right: 1vw;
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
	grid-template-columns: 1fr 20fr;
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
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 5fr 1fr;

	@media (max-width: 900px) {
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
		border-radius: 0.4rem;
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

	@media (max-width: 700px) {
		font-size: 0.8rem;
	}

	@media (max-width: 460px) {
		font-size: 0.5rem;
	}

	@media (max-width: 400px) {
		font-size: 0.8rem;
	}

	@media (max-width: 350px) {
		font-size: 0.5rem;
	}

	@media (max-width: 310px) {
		font-size: 1rem;
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
