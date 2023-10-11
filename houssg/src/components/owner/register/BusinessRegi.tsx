import { useState } from 'react';
import { ownerRegiImg } from '../../../assets/images';
import { useImageConverter } from '../../../hooks';
import styled from 'styled-components';
import { useEffect } from 'react';
import { HouseRegiEachWrapper, UserReservationTitle, color, SmallIndicatorText } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { StepMover } from './element';

const BusinessRegi: React.FC<RegiStepProps> = ({ goStep, step, funnelState }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isRegistered, setIsRegistered] = useState(false);
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();
	const [businessData, setBusinessData] = useState<{ name: string; businessNum: number; businessImg: string }>({
		name: '',
		businessNum: 0,
		businessImg: '',
	});

	// 이미 등록되었다면 해당 값 불러오기
	useEffect(() => {
		if (funnelState?.name) {
			setBusinessData({ name: funnelState.name, businessNum: funnelState.businessNum, businessImg: funnelState.businessImg });
			setIsRegistered(true);
		}
		setIsLoading(false);
	}, [funnelState]);

	// 이미지 선택
	const onChangeBusinessImg = async () => {
		const result = await setIncodedImg();
		if (result !== 'cancle') {
			setBusinessData({ ...businessData, businessImg: result });
			setIsRegistered(false);
		}
	};

	// 등록 완료
	const onRegister = () => {
		if (imgFile) {
			setIsRegistered(true);
			setBusinessData({ name: '숙소에서 받은 상호22', businessNum: 333312322, businessImg: imgFile });
		}
	};

	if (isLoading) {
		return null;
	}

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>사업자 등록</UserReservationTitle>

			<div>
				<InputWrapper>
					{!isRegistered && <InstructionLabel>{imgFile ? '사업자 등록을 진행해주세요' : '견본을 클릭해서 등록해주세요'}</InstructionLabel>}
					<FileRegiInput type="file" accept="image/*" onChange={onChangeBusinessImg} ref={imgRef} />
					<StyledImg
						onClick={() => imgRef.current?.click()}
						src={businessData.businessImg ? businessData.businessImg : ownerRegiImg}
						alt="사업자 이미지"
					/>
				</InputWrapper>
				{!businessData.businessImg ? (
					<InstructionBottomText>이미지 등록시 유의해야 할 조건들을 대충 나열한 글,, 나중에 구체화 되면 반영할듯</InstructionBottomText>
				) : !isRegistered ? (
					<button onClick={onRegister}>사업자 등록</button>
				) : (
					<SmallIndicatorText>이미지 클릭으로 수정</SmallIndicatorText>
				)}
			</div>
			{isRegistered && (
				<div>
					<div>숙소명 :{businessData.name} </div>
					<div>사업자 번호 : {businessData.businessNum}</div>
				</div>
			)}
			<StepMover inactive={!isRegistered} goStep={goStep} step={step} data={businessData} />
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
`;

const StyledImg = styled.img`
	width: 18rem;
	object-fit: contain;
	cursor: pointer;
	margin: 0.5rem 0;
	min-height: 50px;
	min-width: 50px;
`;

const InstructionBottomText = styled.div`
	width: 18rem;
`;
