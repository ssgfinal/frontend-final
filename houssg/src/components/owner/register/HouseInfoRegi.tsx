import { useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import { HouseRegiEachWrapper, UserReservationTitle, color, flexCenter } from '../../../assets/styles';
import { houseCategory, houseServiceCategory } from '../../../assets/constant';
import { CheckBox, StepMover } from './element';
import { RegiStepProps } from '../../../types';

const HouseInfoRegi: React.FC<RegiStepProps> = ({ step, goStep, funnelState }) => {
	const [houseNumber, setHouseNumber] = useState<string>('');
	const [currentType, setCurrentType] = useState<string>(houseCategory[0].value);
	const [checkedList, setCheckedList] = useState<number[]>(new Array(houseServiceCategory.length).fill(0));

	const handleChange = (value: string) => {
		setCurrentType(value);
	};

	const onChangeCheckedList = (index: number, value: number) => {
		const newCheckedList = [...checkedList];
		newCheckedList[index] = value;
		setCheckedList([...newCheckedList]);
	};

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
			<div>체크인 체크아웃 시간</div>
			<ServiceContainer>
				<SemiTitle>서비스 및 시설</SemiTitle>
				<CheckBoxContainer>
					{houseServiceCategory.map((element, i) => (
						<CheckBox key={element.value} element={element} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
					))}
				</CheckBoxContainer>
			</ServiceContainer>
			상세설명
			<input></input>
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
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 25px;
	width: 450px;

	@media screen and (max-width: 800px) {
		width: 250px;
		gap: 8px;
	}
`;
