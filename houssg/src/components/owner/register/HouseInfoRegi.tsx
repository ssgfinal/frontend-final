import { Select } from 'antd';
import { useState } from 'react';
import { HouseRegiEachWrapper, UserReservationTitle } from '../../../assets/styles';
import { houseCategory, houseServiceCategory } from '../../../assets/constant';
import styled from 'styled-components';

const HouseInfoRegi = () => {
	const [currentType, setCurrentType] = useState<{ value: string; label: string }>(houseCategory[0]);
	const handleChange = (value: { value: string; label: string }) => {
		setCurrentType(value);
	};

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 정보</UserReservationTitle>
			<div>
				숙소 전화 번호 : <input placeholder="ex) 01012345678" />
			</div>
			<HouseType>
				<div>숙소 종류 : </div>
				<Select value={currentType} onChange={handleChange} options={houseCategory} style={{ width: 150 }} />
			</HouseType>

			<div>
				서비스 및 시절
				{houseServiceCategory.map((element) => (
					<div key={element.value}>{element.text}</div>
				))}
			</div>
		</HouseRegiEachWrapper>
	);
};

export default HouseInfoRegi;

const HouseType = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
