import { Select } from 'antd';
import { useState } from 'react';
import { HouseRegiEachWrapper, UserReservationTitle, color, flexCenter } from '../../../assets/styles';
import { houseCategory, houseServiceCategory } from '../../../assets/constant';
import styled from 'styled-components';
import { CheckBox } from './element';
import { RegiStepProps } from '../../../types';

const HouseInfoRegi: React.FC<RegiStepProps> = ({ step, goStep }) => {
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

			<ServiceContainer>
				<SemiTitle>서비스 및 시설</SemiTitle>
				<CheckBoxContainer>
					{houseServiceCategory.map((element, i) => (
						<CheckBox key={element.value} element={element} index={i} checkedList={checkedList} />
					))}
				</CheckBoxContainer>
			</ServiceContainer>
			<button
				onClick={() => {
					goStep(2);
				}}
			>
				뒤로
			</button>
			<button
				onClick={() => {
					goStep(0);
				}}
			>
				{step}에서 종료
			</button>
		</HouseRegiEachWrapper>
	);
};

export default HouseInfoRegi;

const HouseType = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const SemiTitle = styled.div`
	float: right;
	font-size: 1.1rem;
	font-weight: 600;
	color: ${color.color3};
`;

const ServiceContainer = styled.div`
	${flexCenter};
	flex-direction: column;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
	width: 490px;

	@media screen and (max-width: 800px) {
		width: 250px;
		gap: 8px;
	}
`;
