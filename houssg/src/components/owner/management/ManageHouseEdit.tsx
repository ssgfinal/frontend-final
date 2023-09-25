import { HouseTabContainer, ManageReadTitle, NavClickComp, color, devideOnce } from '../../../assets/styles';
import { styled } from 'styled-components';
import { SetStateToggle } from '../../../types';
import { houseServiceCategory } from '../../../assets/constant';
import { CheckBox } from '../register/element';
import { useRef, useState } from 'react';
import hourClock from '../../../utils/hourClock';

const ManageHouseEdit: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	const newPhoneNumber = useRef<HTMLInputElement | null>(null);
	const newCheckIn = useRef<HTMLInputElement | null>(null);
	const newCheckOut = useRef<HTMLInputElement | null>(null);
	const newDetail = useRef<HTMLTextAreaElement | null>(null);
	//TODO: 수정 필요할지도
	const [checkedList, setCheckedList] = useState<number[]>(new Array(houseServiceCategory.length).fill(0));
	const onChangeCheckedList = (index: number, value: number) => {
		const newCheckedList = [...checkedList];
		newCheckedList[index] = value;
		setCheckedList([...newCheckedList]);
	};

	const onEditManageHouse = () => {
		{
			const checkinValue = newCheckIn.current?.value;
			const checkoutValue = newCheckOut.current?.value;
			const detailValue = newDetail.current?.value;

			const checkinTime = hourClock(checkinValue + '');
			const checkoutTime = hourClock(checkoutValue + '');

			// TODO: 서버에 보낼 때는 if로 수정
			newPhoneNumber.current && newCheckIn.current && newCheckOut.current && newDetail.current
				? console.log(newPhoneNumber.current.value, checkinTime, checkoutTime, detailValue)
				: false;

			// TODO: 기존의 숙소 정보를 들고오고(전역으로 관리할 듯?) 수정한 내용이 반영되어야...초기화 ㄴㄴ?
		}
	};

	return (
		<ManageWrapper>
			<ManageReadTitle>[리조트] 영등포 라이프스타일 F HOTEL</ManageReadTitle>
			<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
			<ManageHouseWrapper>
				<ManageHouseContainer>
					<ManageHouseEditTitle>전화번호</ManageHouseEditTitle>
					<ManageHouseInput type="number" ref={newPhoneNumber} placeholder="예시) 01012345678" />
					<ManageHouseEditTitle>입/퇴실 시간</ManageHouseEditTitle> <ManageHouseCheckinInput type="time" ref={newCheckIn} />
					<ManageHouseSpan>&frasl;</ManageHouseSpan>
					<ManageHouseCheckoutInput type="time" ref={newCheckOut} />
					<ManageHouseEditTitle>시설 및 서비스</ManageHouseEditTitle>
					<CheckBoxContainer>
						{/* TODO: 체크박스 추후 수정 */}
						{houseServiceCategory.map((service, i) => (
							<CheckBox key={service.value} element={service} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
						))}
					</CheckBoxContainer>
					{/* TODO: 상세설명 글자수 제한은 있는지? */}
					<ManageHouseEditTitle>상세설명</ManageHouseEditTitle> <ManageHouseText rows={8} ref={newDetail} />
				</ManageHouseContainer>
			</ManageHouseWrapper>
			<HouseTabContainer>
				<NavClickComp onClick={onEditManageHouse}>수정완료</NavClickComp>
				<NavClickComp onClick={() => setIsEditMode(false)}>취소하기</NavClickComp>
			</HouseTabContainer>
		</ManageWrapper>
	);
};

export default ManageHouseEdit;

const ManageWrapper = styled.div`
	max-width: 30rem;
	display: grid;
	justify-content: center;

	@media (min-width: 500px) {
		margin: auto;
	}

	@media (max-width: 800px) {
		padding: 0 3vw 0 3vw;
	}
`;

const HouseImg = styled.img`
	justify-self: center;
	max-width: 27rem;
	margin-bottom: 0.5rem;
	object-fit: contain;
	border-radius: 0.5rem;

	@media screen and (max-width: ${devideOnce.first}) {
		max-width: none;
		width: 23rem;
	}

	@media (max-width: 2000px) {
		width: 80%;
		transition: width 0.2s;
	}
`;

const ManageHouseWrapper = styled.div`
	text-align: left;
	padding: 0.1rem;
`;

const ManageHouseContainer = styled.div`
	display: grid;

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const ManageHouseEditTitle = styled.span`
	grid-column-start: 1;
	grid-column-end: 5;
	justify-self: left;
	padding: 1rem 0 1rem 0;
	color: ${color.color1};
	font-weight: bold;

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const CheckBoxContainer = styled.div`
	color: ${color.darkGrayColor};
	grid-column-start: 1;
	grid-column-end: 6;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	padding-bottom: 1rem;
`;

const ManageHouseCheckinInput = styled.input`
	grid-column-start: 1;
	grid-column-end: 3;
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

const ManageHouseSpan = styled.span`
	grid-column-start: 3;
	grid-column-end: 4;
	color: ${color.darkGrayColor};
	text-align: center;
	justify-self: center;
	align-self: center;
`;

const ManageHouseCheckoutInput = styled.input`
	grid-column-start: 4;
	grid-column-end: 6;
	width: 100%;
	justify-self: center;
	text-align: center;
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

const ManageHouseInput = styled.input`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	grid-column-start: 1;
	grid-column-end: 6;
	width: 100%;
	justify-self: center;
	outline: none;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	background-color: transparent;
	resize: none;
	height: 2rem;

	@media (max-width: 300px) {
		height: 1.3rem;
		font-size: 0.5rem;
		text-align: center;
	}
`;

const ManageHouseText = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 6;
	width: 100%;
	justify-self: center;
	outline: none;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	background-color: transparent;
	resize: none;

	&::-webkit-scrollbar {
		display: none;
	}
	&::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;
