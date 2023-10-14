import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { ownerKey } from '../../../assets/constant';
import { getHouseReview } from '../../../helper';
import RoomReviewComp from './element/RoomReviewComp';
import { OwnerHouseReviewType } from '../../../types';

const ManageReview: React.FC<{ accomNumber: number }> = ({ accomNumber }) => {
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: OwnerHouseReviewType[] }>(
		[ownerKey.houseReview, accomNumber],
		() => getHouseReview(accomNumber),
		{
			cacheTime: 7 * 60 * 1000,
			staleTime: 5 * 60 * 1000,
		},
	);

	isSuccess && console.log(data);
	if (isError) {
		console.log(error, 'error');
		return <div>실패...</div>;
	}

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		<Wrapper>
			{!data?.data.length ? <div>리뷰가 없습니다</div> : data?.data.map((review) => <RoomReviewComp review={review} key={review.reviewNumber} />)}
		</Wrapper>
	);
};

export default ManageReview;

const Wrapper = styled.div`
	padding-top: 3rem;
`;
