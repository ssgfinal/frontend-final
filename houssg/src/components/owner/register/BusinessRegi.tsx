import { useState } from 'react';
import { ownerRegiImg } from '../../../assets/images';
import { useImageConverter } from '../../../hooks';
import styled from 'styled-components';
import { HouseRegiEachWrapper, color } from '../../../assets/styles';

const BusinessRegi = () => {
	const [isRegistered, setIsRegistered] = useState(false);
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();

	return (
		<HouseRegiEachWrapper>
			{!isRegistered ? (
				<div>
					<InputWrapper>
						<InstructionLabel>{imgFile ? '사업자 등록을 진행해주세요' : '견본을 클릭해서 등록해주세요'}</InstructionLabel>
						<FileRegiInput type="file" accept="image/*" onChange={setIncodedImg} ref={imgRef} />
						<StyledImg onClick={() => imgRef.current?.click()} src={imgFile ? imgFile : ownerRegiImg} alt="사업자 이미지" />
					</InputWrapper>
					{!imgFile ? (
						<InstructionBottomText>이미지 등록시 유의해야 할 조건들을 대충 나열한 글,, 나중에 구체화 되면 반영할듯</InstructionBottomText>
					) : (
						<button onClick={() => setIsRegistered(true)}>사업자 등록</button>
					)}
				</div>
			) : (
				<div>
					<div>상호 : 서버로 부터 받은 값 </div>
					<div>숙소명 :서버로 부터 받은 값</div>
				</div>
			)}
		</HouseRegiEachWrapper>
	);
};

export default BusinessRegi;

const FileRegiInput = styled.input`
	cursor: pointer;
	display: none;
`;

const InstructionLabel = styled.label`
	color: ${color.color2};
	font-weight: 600;
`;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const StyledImg = styled.img`
	width: 18rem;
	object-fit: contain;
	cursor: pointer;
	margin: 0.5rem 0;
`;

const InstructionBottomText = styled.div`
	width: 18rem;
`;
