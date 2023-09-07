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
import { useState } from 'react';

import { TabMenu } from '../common/TabMenu';
import MyInformation from './MyInformation';
import MyReview from './MyReview';
import MyFavorite from './MyFavorite';

const MyPage: React.FC = () => {
	// interface MyPageTabProps {
	// 	tabObj: string[][];
	// 	clickTab: string;
	// 	setClickTab: React.Dispatch<React.SetStateAction<string>>;
	// }
	const tabObj = [
		['MyInformation', '나의 정보'],
		['MyReview', '나의 리뷰'],
		['MyFavorite', '찜한 숙소'],
	];

	const [clickTab, setClickTab] = useState<string>('MyInformation');
	// const dispatch = useAppDispatch();

	// const modalOpen = () => {
	// 	const modalSize = window.innerWidth >= 1000 ? 500 : 400;
	// 	dispatch(openModal({ modalComponent: 'update', modalSize: modalSize }));
	// };

	return (
		<MyPageWrapper>
			<MyPageMainContainer>
				<MyPageMain>gg</MyPageMain>
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
	height: 100vh;
	display: grid;
	grid-template-columns: 0.2fr 1fr 0.2fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`;

const MyPageMainContainer = styled.div`
	display: grid;
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 1;
	grid-row-end: 2;
`;

const MyPageMain = styled.div`
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	box-shadow: 0px 0px 8px 1px ${color.unSelectColor};
	background-color: ${color.backColor};
`;

const MyPageTabContainer = styled.div`
	display: grid;
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 3;
	justify-content: center;
	//background-color: gray;
`;

const TabContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	grid-template-rows: 1fr;
	justify-items: center;
`;

// const MyInformation = styled.div`
// 	align-self: center;
// `;

// const MyReview = styled.div`
// 	align-self: center;
// `;

// const MyFavorite = styled.div`
// 	align-self: center;
// `;

const MyPageContentsContainer = styled.div`
	display: grid;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	box-shadow: 0px 0px 8px 1px ${color.unSelectColor};
	background-color: ${color.backColor};
`;
