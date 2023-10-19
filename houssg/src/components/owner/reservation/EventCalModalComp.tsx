import { FC } from 'react';
import styled from 'styled-components';

const EventCalModalComp: FC<{ purposeType: string }> = ({ purposeType }) => {
	return (
		<>
			{purposeType === 'reserve' && (
				<Container>
					<div>예약 숙소</div>
					<div>예약 시간</div>
					<div>예약자</div>
				</Container>
			)}
			{purposeType === 'available' && (
				<Container>
					{/* 추가시 방넘버 방이름 날짜(시작 끝) 숙소넘버 숙소 아이디 고객 정보:입력값  고객번호 :"오프라인"  */}
					<div>예약 숙소</div>
					<div>예약 시간</div>
					<div>예약자</div>
				</Container>
			)}
		</>
	);
};

export default EventCalModalComp;

const Container = styled.div`
	display: flex;
`;
