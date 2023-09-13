import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import styled from 'styled-components';
import { color } from '../../../assets/styles';

const ReservationDropDown = () => {
	const list = ['A호텔', 'KDT 호텔', '더 뉴 SSG 호텔'];
	const [selectedHouse, setSelectedHouse] = useState(list[0]);
	const items: MenuProps['items'] = list.map((element, index) => {
		return {
			label: (
				<div
					onClick={() => {
						setSelectedHouse(element);
					}}
				>
					{element}
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
						{selectedHouse}
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

	.ant-space-item {
		font-size: 1.5rem;
		color: ${color.color1};
		font-weight: 700;
	}
`;
