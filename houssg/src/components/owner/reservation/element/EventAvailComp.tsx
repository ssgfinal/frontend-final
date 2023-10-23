import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { ownerHouseId, ownerHouseName, reservableRoomInfo } from '../../../../store/redux/calendarSlice';
import { ownerKey } from '../../../../assets/constant';
import { addOfflineReservation, getRoomReservableDays } from '../../../../helper';
import styled from 'styled-components';
import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { color } from '../../../../assets/styles';
import { closeModal } from '../../../../store/redux/modalSlice';

const EventAvailComp = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const houseId = useAppSelector(ownerHouseId);
	const accomName = useAppSelector(ownerHouseName);
	const { date, roomId, roomName } = useAppSelector(reservableRoomInfo);
	const splittedDate = date.split('-');
	const calendarDate = splittedDate[0] + '-' + splittedDate[1];
	const { isLoading, data, isSuccess, isError } = useQuery([ownerKey.roomReservableDays, houseId, date], () => getRoomReservableDays(roomId, date), {
		cacheTime: 2 * 60 * 1000,
		staleTime: 3 * 60 * 1000,
	});
	const [endDate, setEndDate] = useState(data?.data[0]);
	const [number, setNumber] = useState('');
	const [name, setName] = useState('');

	isError && alert('조회 실패');

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
	const onChangeValue = (value: string, type: 'name' | 'number') => {
		type === 'name' ? setName(value) : setNumber(value);
	};

	const { mutate } = useMutation({
		mutationFn: () =>
			addOfflineReservation({
				accomNumber: houseId,
				accomName,
				roomNumber: roomId,
				roomCategory: roomName,
				guestName: name + '++' + number,
				startDate: date,
				endDate: endDate,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ownerKey.roomReservableDays, houseId, date] });
			queryClient.invalidateQueries({ queryKey: [ownerKey.reserveAvailability, houseId, calendarDate] });
			queryClient.invalidateQueries({ queryKey: [ownerKey.getReservationData, houseId, calendarDate] });
			alert('추가완료');
			dispatch(closeModal());
		},
		onError: () => {
			alert('추가실패');
		},
	});

	const onAddOfflineReserve = () => {
		const regText = /[^가-힣a-zA-Z0-9]/;
		if (regText.test(number) && regText.test(name)) {
			alert('한글단어와 영어로만 작성부탁드립니다.');
			return;
		}

		endDate && mutate();
	};

	return (
		<Container>
			<Aligner>
				<InfoText>객실명 : </InfoText>
				<InfoText>{roomName} </InfoText>
			</Aligner>
			<Aligner>
				<InfoText>성함 : </InfoText>
				<InfoInput value={name} onChange={(e) => onChangeValue(e.target.value, 'name')} />
			</Aligner>
			<Aligner>
				<InfoText>전화번호 : </InfoText>
				<InfoInput value={number} onChange={(e) => onChangeValue(e.target.value, 'number')} />
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
			<ReserveBtn disabled={!number && !name && !endDate} onClick={onAddOfflineReserve}>
				예약하기
			</ReserveBtn>
		</Container>
	);
};

export default EventAvailComp;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	max-width: 300px;
`;
const InfoText = styled.div`
	font-weight: 600;
	font-size: 0.9rem;
`;

const Aligner = styled.div`
	display: grid;
	gap: 0.5rem;
	grid-template-columns: 40% 60%;
	align-items: center;
`;

const InfoInput = styled.input`
	padding: 0.2rem;
	border-radius: 4px;
	max-width: 100px;
`;

const ScrollableContainer = styled.div`
	height: 100px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 12px;
	}
`;

const ReserveBtn = styled.button<{ disabled: boolean }>`
	margin: 0.5rem auto;
	border: 2px solid ${color.color2};
	background-color: ${color.color2};
	border-radius: 4px;
	color: ${color.backColor};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
