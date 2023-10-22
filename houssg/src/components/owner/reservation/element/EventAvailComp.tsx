import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../hooks';
import { ownerHouseId, reservableRoomInfo } from '../../../../store/redux/calendarSlice';
import { ownerKey } from '../../../../assets/constant';
import { getRoomReservableDays } from '../../../../helper';
import styled from 'styled-components';
import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const EventAvailComp = () => {
	const houseId = useAppSelector(ownerHouseId);
	const { date, roomId, roomName, amount } = useAppSelector(reservableRoomInfo);
	const { isLoading, data, isSuccess, isError, error } = useQuery([ownerKey.roomReservableDays, houseId], () => getRoomReservableDays(roomId, date), {
		cacheTime: 2 * 60 * 1000, // 5분
		staleTime: 3 * 60 * 1000, // 2분
	});
	const [endDate, setEndDate] = useState(data?.data[0]);
	isError && console.log(error);
	console.log(data);
	const items: MenuProps['items'] =
		isSuccess &&
		data.data.map((element: string) => ({
			label: (
				<div
					onClick={() => {
						setEndDate(element);
					}}
				>
					{element}
				</div>
			),
		}));
	return (
		<Container>
			<InfoText>
				{roomName} : {amount}
			</InfoText>

			<Aligner>
				<InfoText>성함 : </InfoText>
				<InfoInput />
			</Aligner>
			<Aligner>
				<InfoText>전화번호 : </InfoText>
				<InfoInput />
			</Aligner>
			<Aligner>
				<InfoText>입실일 : </InfoText>
				<InfoText> {date} </InfoText>
			</Aligner>
			<Aligner>
				<InfoText>퇴실일 : </InfoText>

				{isLoading ? (
					<InfoText>로딩중...</InfoText>
				) : (
					isSuccess && (
						<Dropdown
							menu={{ items }}
							dropdownRender={(menu) => <ScrollableContainer>{React.cloneElement(menu as React.ReactElement)}</ScrollableContainer>}
						>
							<a
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								<Space>
									{endDate}
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					)
				)}
			</Aligner>
		</Container>
	);
};

export default EventAvailComp;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
const InfoText = styled.div`
	font-weight: 600;
	font-size: 0.9rem;
`;

const Aligner = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const InfoInput = styled.input`
	padding: 0.2rem;
`;

const ScrollableContainer = styled.div`
	height: 100px;
	overflow-y: auto; /* 세로 스크롤을 표시하려면 */

	/* 스크롤바 스타일 추가 (선택사항) */
	&::-webkit-scrollbar {
		width: 12px;
	}
`;
