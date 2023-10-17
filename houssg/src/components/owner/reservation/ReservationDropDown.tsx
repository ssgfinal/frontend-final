import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import styled from 'styled-components';
import { color } from '../../../assets/styles';

const ReservationDropDown: React.FC<{
	accomList: {
		accomNumber: number;
		accomName: string;
	}[];
	houseIndex: number;
	setHouseIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({ accomList, houseIndex, setHouseIndex }) => {
	const items: MenuProps['items'] = accomList.map((house, index) => {
		return {
			label: (
				<div
					onClick={() => {
						setHouseIndex(index);
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

	.ant-space-item {
		font-size: 1.5rem;
		color: ${color.color1};
		font-weight: 700;
	}
`;
