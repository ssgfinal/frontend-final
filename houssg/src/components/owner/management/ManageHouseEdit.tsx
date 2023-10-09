import { HouseTabContainer, ManageReadTitle, NavClickComp, color } from '../../../assets/styles';
import { styled } from 'styled-components';
import { MyHouseDataHandleComp } from '../../../types';
import { houseServiceCategory } from '../../../assets/constant';
import { CheckBox } from '../register/element';
import { useEffect, useRef, useState } from 'react';
import { useCalWindowWidth } from '../../../hooks';
import { ImageUploader } from '../../common';
import { base64ToFile, pxToRem } from '../../../utils';

const ManageHouseEdit: React.FC<MyHouseDataHandleComp> = ({ house, setIsEditMode }) => {
	const newPhoneNumber = useRef<HTMLInputElement | null>(null);
	const newCheckIn = useRef<HTMLInputElement | null>(null);
	const newCheckOut = useRef<HTMLInputElement | null>(null);
	const newDetail = useRef<HTMLTextAreaElement | null>(null);

	const [newImg, setNewImg] = useState(house.img);
	const windowWidth = useCalWindowWidth();
	const [uploaderSize, setUploaderSize] = useState({ width: '28rem', height: '21rem' });
	const [newImgFile, setNewImgFile] = useState<File | null>(null);
	useEffect(() => {
		let widthNumber: number;
		const ratio = 3 / 4;

		switch (true) {
			case windowWidth < 427:
				widthNumber = 16;
				break;
			case windowWidth >= 427 && windowWidth < 747:
				widthNumber = pxToRem(windowWidth) * 0.6;
				console.log(widthNumber);
				break;
			default:
				widthNumber = 28;
		}
		const width = widthNumber + 'rem';
		const height = widthNumber * ratio + 'rem';
		setUploaderSize({ width, height });
	}, [windowWidth]);

	const [checkedList, setCheckedList] = useState<number[]>(house.service);
	const onChangeCheckedList = (index: number, value: number) => {
		const newCheckedList = [...checkedList];
		newCheckedList[index] = value;
		setCheckedList([...newCheckedList]);
	};

	const onEditManageHouse = () => {
		const newCheckInValue = newCheckIn.current?.value;
		const newCheckOutValue = newCheckOut.current?.value;
		const newDetailValue = newDetail.current?.value;
		const newPhoneNumberValue = newPhoneNumber.current?.value;
		// TODO: 서버에 보낼 때는 if로 수정
		const { checkIn, checkOut, accomDetails, teleNumber } = house;
		// 변경값이 없으면 수정 취소
		if (
			newCheckInValue === checkIn &&
			newCheckOutValue === checkOut &&
			newDetailValue === accomDetails &&
			newImgFile === null &&
			newPhoneNumberValue === teleNumber
		) {
			setIsEditMode(false);
		}

		// api.post()
	};

	const onAddNewFileData = (file: string) => {
		// base64를 다시 인코딩
		setNewImgFile(base64ToFile(file, house.accomName));
	};

	return (
		<ManageWrapper>
			<ManageReadTitle>
				[{house.accomCategory}] {house.accomName}
			</ManageReadTitle>
			<ImageUploader width={uploaderSize.width} height={uploaderSize.height} setImage={setNewImg} setImgFile={onAddNewFileData}>
				수정하기
			</ImageUploader>

			<HouseImg src={newImg} />
			<ManageHouseWrapper>
				<ManageHouseContainer>
					<ManageHouseEditTitle>전화번호</ManageHouseEditTitle>
					<ManageHouseInput type="number" ref={newPhoneNumber} defaultValue={house.teleNumber} placeholder="예시) 01012345678" />
					<ManageHouseEditTitle>입/퇴실 시간</ManageHouseEditTitle>
					<ManageHouseCheckinInput type="time" ref={newCheckIn} defaultValue={house.checkIn} />
					<ManageHouseSpan>&frasl;</ManageHouseSpan>
					<ManageHouseCheckoutInput type="time" ref={newCheckOut} defaultValue={house.checkOut} />
					<ManageHouseEditTitle>시설 및 서비스</ManageHouseEditTitle>
					<CheckBoxContainer>
						{houseServiceCategory.map((service, i) => (
							<CheckBox key={service.value} element={service} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
						))}
					</CheckBoxContainer>
					{/* TODO: 상세설명 글자수 제한은 있는지? */}
					<ManageHouseEditTitle>상세설명</ManageHouseEditTitle>
					<ManageHouseText rows={8} ref={newDetail} defaultValue={house.accomDetails} maxLength={300} />
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
	max-width: 34rem;
	display: grid;
	justify-content: center;

	@media (min-width: 500px) {
		margin: auto;
	}

	@media (max-width: 800px) {
		padding: 0 1rem 0 1rem;
	}
`;

const HouseImg = styled.img`
	justify-self: center;
	max-width: 28rem;
	margin-bottom: 0.5rem;
	object-fit: contain;
	border-radius: 0.5rem;
	width: 60vw;
	min-width: 16rem;
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
		font-size: 0.8rem;
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
	&:hover {
		border: 1px solid ${color.color2};
		outline: 2px solid ${color.color2};
	}

	cursor: pointer;
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
	&:hover {
		border: 1px solid ${color.color2};
		outline: 2px solid ${color.color2};
	}

	cursor: pointer;
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

	&:hover {
		border: 1px solid ${color.color2};
		outline: 2px solid ${color.color2};
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
	padding-left: 0.5rem;

	@media (max-width: 300px) {
		height: 1.3rem;
		font-size: 0.8rem;
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

	&:hover {
		border: 1px solid ${color.color2};
		outline: 2px solid ${color.color2};
	}

	&::-webkit-scrollbar {
		display: none;
	}
	&::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 300px) {
		font-size: 0.8rem;
	}
`;
