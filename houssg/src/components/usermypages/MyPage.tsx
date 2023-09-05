import { styled } from 'styled-components';
import { MyHeartIcon, HeartIcon, FullHeartIcon, PointIcon, CouponIcon, EditIcon, ReviewIcon, MyPointIcon } from '../../assets/icons/index';

const MyPage = () => {
	return (
		<MyPageWrapper>
			마이페이지
			<br />
			<HeartImg src={HeartIcon} />
			<br />
			<FullHeartImg src={FullHeartIcon} />
			<br />
			<PointImag src={PointIcon} />
			<br />
			<MyHeartImg src={MyHeartIcon} />
			<br />
			<MyPointImag src={MyPointIcon} />
			<br />
			<CouponImg src={CouponIcon} />
			<br />
			<EditImg src={EditIcon} />
			<br />
			<ReviewImg src={ReviewIcon} />
		</MyPageWrapper>
	);
};

export default MyPage;

const MyPageWrapper = styled.div`
	width: 100%;
`;

const MyHeartImg = styled.img`
	width: 1rem;
`;

const HeartImg = styled.img`
	width: 1rem;
`;

const FullHeartImg = styled.img`
	width: 1rem;
`;

const PointImag = styled.img`
	width: 1.2rem;
`;

const MyPointImag = styled.img`
	width: 1rem;
`;

const CouponImg = styled.img`
	width: 1rem;
`;

const EditImg = styled.img`
	width: 1rem;
`;

const ReviewImg = styled.img`
	width: 1rem;
`;
