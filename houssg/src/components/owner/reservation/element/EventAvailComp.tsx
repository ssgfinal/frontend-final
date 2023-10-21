import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../hooks';
import { ownerHouseId, reservableRoomInfo } from '../../../../store/redux/calendarSlice';
import { ownerKey } from '../../../../assets/constant';
import { getRoomReservableDays } from '../../../../helper';
import styled from 'styled-components';
import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';

const EventAvailComp = () => {
	const houseId = useAppSelector(ownerHouseId);
	const { date, roomId, roomName, amount } = useAppSelector(reservableRoomInfo);
	const { isLoading, data, isSuccess, isError, error } = useQuery([ownerKey.roomReservableDays, houseId], () => getRoomReservableDays(roomId, date), {
		cacheTime: 2 * 60 * 1000, // 5분
		staleTime: 3 * 60 * 1000, // 2분
	});
	isError && console.log(error);
	console.log(isSuccess && data.data);
	const [endDate, setEndDate] = useState(data?.data[0]);
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
		<div>
			<InfoText>
				{roomName} : {amount}
			</InfoText>
			<InfoText>입실일 : {date}</InfoText>
			<div>
				<InfoText>성함 : </InfoText>
				<input />
			</div>
			<div>
				<InfoText>전화번호 : </InfoText>
				<input />
			</div>

			<div>{isLoading}</div>
			{isSuccess && (
				<Dropdown menu={{ items }}>
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
			)}
		</div>
	);
};

export default EventAvailComp;

const InfoText = styled.div`
	font-weight: 600;
	font-size: 0.9rem;
`;
