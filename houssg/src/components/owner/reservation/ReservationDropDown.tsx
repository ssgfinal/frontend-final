import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { ReservationDropDown } from '../../../types';
import { useAppDispatch } from '../../../hooks';
import { setOwnerHouse } from '../../../store/redux/calendarSlice';
import { useEffect } from 'react';

const ReservationDropDown: React.FC<ReservationDropDown> = ({ accomList, houseIndex, setHouseIndex }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setOwnerHouse({ houseId: accomList[0].accomNumber, houseName: accomList[0].accomName }));
	}, [dispatch, accomList]);

	const items: MenuProps['items'] = accomList.map((house, index) => {
		return {
			label: (
				<div
					onClick={() => {
						setHouseIndex(index);
						dispatch(setOwnerHouse({ houseId: accomList[index].accomNumber, houseName: accomList[index].accomName }));
					}}
				>
					{house.accomName}
				</div>
			),
			key: index,
		};
	});

	return (
		<DrowdownWrapper>
			<Dropdown menu={{ items }} trigger={['click']}>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						{accomList[houseIndex].accomName}
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>
		</DrowdownWrapper>
	);
};

export default ReservationDropDown;

const DrowdownWrapper = styled.div`
	margin: 1rem 0;
	cursor: pointer;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
	padding: 0.5rem;
	border-radius: 0.5rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	.ant-space-item {
		font-size: 1.1rem;
		color: ${color.basicColor};
		font-weight: 700;
	}

	@media screen and (max-width: 600px) {
		.ant-space-item {
			font-size: 0.65rem;
		}
	}
`;
