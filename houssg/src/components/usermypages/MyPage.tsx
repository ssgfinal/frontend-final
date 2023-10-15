import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

import MyCoupons from './MyCoupons';
import MyInformation from './MyInformation';
import MyReview from './MyReview';
import MyFavorite from './MyFavorite';

import { TabMenu } from '../common/TabMenu';
import { setMyCouponList } from '../../helper';
import { userKey } from '../../assets/constant/queryKey';

import { color } from '../../assets/styles';
import { CouponIcon, MyPointIcon, ProfileCircle } from '../../assets/icons';

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

	const { mutate } = useMutation((couponNumber: string) => setMyCouponList(couponNumber), {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myCoupon] });
			alert('등록완료');
		},
		onError: (error) => {
			console.log(error);
			alert('등록실패');
		},
	});

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
						{userNickName !== null ? <span>&nbsp;{userNickName}님</span> : <span>&nbsp;_님</span>}
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
				{clickTab === 'MyInformation' ? <MyInformation /> : clickTab === 'MyReview' ? <MyReview /> : <MyFavorite />}
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
