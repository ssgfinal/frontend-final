import { useRef, useState } from 'react';
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

	const checkIn = useRef<HTMLInputElement | null>(null);
	const checkOut = useRef<HTMLInputElement | null>(null);

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
			<HouseInfoAligner>
				<SemiTitle>숙소 종류 : </SemiTitle>
				<Select value={currentType} onChange={handleChange} options={houseCategory} style={{ width: 150 }} />
			</HouseInfoAligner>
			<HouseInfoAligner>
				<SemiTitle>숙소 전화 번호 :</SemiTitle>
				<HousePhoneNum placeholder="ex) 01012345678" onChange={(e) => setHouseNumber(e.target.value)} />
			</HouseInfoAligner>
			<HouseInfoAligner>
				<SemiTitle>체크인</SemiTitle>
				<CheckInput type="time" ref={checkIn} />
			</HouseInfoAligner>
			<HouseInfoAligner>
				<SemiTitle>체크아웃</SemiTitle>
				<CheckInput type="time" ref={checkOut} />
			</HouseInfoAligner>
			<ServiceContainer>
				<SemiTitle>서비스 및 시설</SemiTitle>
				<CheckBoxContainer>
					{houseServiceCategory.map((element, i) => (
						<CheckBox key={element.value} element={element} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
					))}
				</CheckBoxContainer>
			</ServiceContainer>
			<SemiTitle>상세설명</SemiTitle>
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

const HouseInfoAligner = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 1rem;
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
	margin-top: 1rem;

	@media screen and (max-width: 800px) {
		width: 250px;
		gap: 8px;
	}
`;

const HousePhoneNum = styled.input`
	border-radius: 0.3rem;
	padding: 0.4rem;
`;

const CheckInput = styled.input`
	&:hover {
		border: 1px solid ${color.color2};
		outline: 2px solid ${color.color2};
	}

	cursor: pointer;
	width: 100%;
	text-align: center;
	justify-self: center;
	height: 2rem;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	outline: none;

	@media (max-width: 300px) {
		height: 1.3rem;
		font-size: 0.5rem;
	}
`;
