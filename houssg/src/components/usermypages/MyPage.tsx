import { styled } from 'styled-components';
// import {
// 	MyHeartIcon,
// 	HeartIcon,
// 	FullHeartIcon,
// 	PointIcon,
// 	CouponIcon,
// 	EditIcon,
// 	ReviewIcon,
// 	MyPointIcon,
// 	accomodation,
// } from '../../assets/icons/index';
// import { openModal } from '../../store/redux/modalSlice';
// import { useAppDispatch } from '../../hooks';
import { color } from '../../assets/styles';
import BriefHouse from '../house/BriefHouse';
import { accomodation } from '../../assets/icons';

const MyPage = () => {
	// const dispatch = useAppDispatch();

	// const modalOpen = () => {
	// 	const modalSize = window.innerWidth >= 1000 ? 500 : 400;
	// 	dispatch(openModal({ modalComponent: 'update', modalSize: modalSize }));
	// };

	return (
		<MyPageWrapper>
			<MyPageWra>
				<div></div>
				<MyPageTabContainer>
					<MyPageSideBar>
						<div></div>
						<MyInformation>나의 정보</MyInformation>
						<MyReview>나의 리뷰</MyReview>
						<MyFavorite>찜한 숙소</MyFavorite>
						<Boundary>
							<hr />
						</Boundary>
						<MyConsultation>1:1상담</MyConsultation>
						<Withdrawal>회원탈퇴</Withdrawal>
					</MyPageSideBar>
				</MyPageTabContainer>
				<div></div>
				<MyPageContainer>
					<ReviewContainer>review</ReviewContainer>
					<HeartContainer>Heart</HeartContainer>
					<ComponentBox>
						<BriefHouse
							house={{
								houseId: 9,
								name: '환영펜션',
								price: '44000원',
								rating: 5.0,
								location: '부산시 중구 남포',
								image: accomodation,
							}}
						/>
					</ComponentBox>
				</MyPageContainer>
				<div></div>
			</MyPageWra>
		</MyPageWrapper>
	);
};

export default MyPage;

const MyPageWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	//background-color: rgba(90, 90, 90, 0.5);
	background-color: rgba(90, 90, 90, 0.05);

	@media (max-width: 700px) and (max-height: 300px) {
		width: 100vw;
		height: 2500px;
		justify-content: flex-start;
	}

	@media (min-width: 700px) and (max-width: 1300px) {
		width: 100%;
		//height: 2500px;
		justify-content: flex-start;
	}

	@media (min-width: 1400px) {
		width: 100%;
		height: 2500px; // px로 해도 되는지 물어보기
		justify-content: flex-start;
	}
`;

const MyPageWra = styled.div`
	display: grid;
	grid-template-columns: 0.3fr 1fr 0.3fr 5fr 0.3fr;
	justify-items: center;
	align-items: center;

	/* @media (max-width: 700px) {
		width: 100%;
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		width: 100%;
	}

	@media (min-width: 1400px) {
		width: 100%;
	} */
`;

const MyPageSideBar = styled.div`
	height: 100%;
	margin: auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr repeat(3, 2fr) 5fr 1fr 1fr 1fr;
	justify-items: center;
	align-items: end;
	grid-row-gap: 1rem;
`;

const MyInformation = styled.div`
	//margin-top: 100px;
	width: 80%;
	text-align: center;
	align-self: center;
	/* line-height: 10vh;
	border-right: 5px solid ${color.color1}; */
	//background-color: ${color.unSelectColor};

	&:hover {
		line-height: 3vw;
		border-right: 5px solid ${color.color1};
	}
`;

const MyReview = styled.div`
	width: 80%;
	height: 8vh;
	text-align: center;
	line-height: 8vh;
	//background-color: ${color.unSelectColor};
`;

const MyFavorite = styled.div`
	width: 80%;
	height: 8vh;
	text-align: center;
	line-height: 8vh;
`;

const Boundary = styled.div`
	width: 80%;
	margin: 0 auto;
`;

const MyConsultation = styled.div`
	width: 80%;
	align-self: start;
	text-align: center;
`;

const Withdrawal = styled.div`
	width: 80%;
	align-self: start;
	text-align: center;
`;

const MyPageTabContainer = styled.div`
	/* border-radius: 1rem; */
	width: 100%;
	height: 100%;
	box-shadow: 3px 4px 5px 3px ${color.unSelectColor};
	background-color: ${color.backColor};
`;

const MyPageContainer = styled.div`
	width: 90%;
	height: 100%;
	/* margin: 1rem;
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	box-shadow: 0px 0px 8px 1px ${color.color4};
	background-color: ${color.backColor}; */
`;

const ReviewContainer = styled.div`
	height: 200px;
	margin: 1rem;
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	box-shadow: 0px 0px 8px 1px ${color.color4};
	background-color: ${color.backColor};
`;

const HeartContainer = styled.div`
	height: 200px;
	margin: 1rem;
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	box-shadow: 0px 0px 8px 1px ${color.color4};
	background-color: ${color.backColor};
`;

const ComponentBox = styled.div`
	margin: 1rem;
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	box-shadow: 0px 0px 8px 1px ${color.color4};
	background-color: ${color.backColor};
`;
