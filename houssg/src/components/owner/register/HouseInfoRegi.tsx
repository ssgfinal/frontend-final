import { useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import { HouseRegiEachWrapper, UserReservationTitle, color, flexCenter } from '../../../assets/styles';
import { houseCategory, houseServiceCategory } from '../../../assets/constant';
import { CheckBox, StepMover } from './element';
import { RegiStepProps } from '../../../types';

const HouseInfoRegi: React.FC<RegiStepProps> = ({ step, goStep, funnelState }) => {
	const [currentType, setCurrentType] = useState<string>(houseCategory[0].value);
	const [houseNumber, setHouseNumber] = useState<string>('');

	const handleChange = (value: string) => {
		console.log(value);
		setCurrentType(value);
	};
	//TODO: 수정
	const checkedList: number[] = new Array(houseServiceCategory.length).fill(0);
	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 정보</UserReservationTitle>
			<div>
				숙소 전화 번호 : <input placeholder="ex) 01012345678" onChange={(e) => setHouseNumber(e.target.value)} />
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
			<StepMover
				inactive={false}
				goStep={goStep}
				step={step}
				last
				data={{ ...funnelState, houseService: checkedList, houseNumber, houseType: currentType }}
			/>
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
