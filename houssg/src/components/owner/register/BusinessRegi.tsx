import { useState } from 'react';
import { ownerRegiImg } from '../../../assets/images';
import { useImageConverter } from '../../../hooks';
import styled from 'styled-components';
import { useEffect } from 'react';
import { HouseRegiEachWrapper, UserReservationTitle, color, SmallIndicatorText } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { StepMover } from './element';
import { ownerUrl } from '../../../assets/constant';
import api from '../../../api/api';

const BusinessRegi: React.FC<RegiStepProps> = ({ goStep, step, funnelState }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRegistered, setIsRegistered] = useState(false);
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();
	const [businessImgFile, setBusinessImgFile] = useState<File>();
	const [businessData, setBusinessData] = useState<{ name: string; businessNum: string; businessImg: string }>({
		name: '',
		businessNum: '',
		businessImg: '',
	});

	// 이미 등록되었다면 해당 값 불러오기
	useEffect(() => {
		if (funnelState?.name) {
			setBusinessData({ name: funnelState.name, businessNum: funnelState.businessNum, businessImg: funnelState.businessImg });
			setIsRegistered(true);
		}
	}, [funnelState]);

	// 이미지 선택
	const onChangeBusinessImg = async () => {
		const selectedFile = imgRef.current?.files ? imgRef.current.files[0] : null;
		if (selectedFile) {
			const result = await setIncodedImg();
			if (result !== 'cancle') {
				setBusinessData({ ...businessData, businessImg: result });
				setBusinessImgFile(selectedFile);
				setIsRegistered(false);
			}
		}
	};
	// 등록 완료
	const onCheckOCRImage = async () => {
		if (!isLoading && imgFile && businessImgFile) {
			const formData = new FormData();
			formData.append('file', businessImgFile);
			setIsLoading(true);
			try {
				const { data } = await api.post(ownerUrl.checkBusinessNumber, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
				setBusinessData({ name: data.accomName, businessNum: data.businessNumber, businessImg: imgFile });
				setIsRegistered(true);
			} catch (err) {
				alert('사업자 인증에 실패했습니다');
			} finally {
				setIsLoading(false);
			}
		}
	};

	const onChangeHandler = (value: string, type: 'businessNum' | 'name') => {
		setBusinessData((prevData) => ({
			...prevData,
			[type]: value,
		}));
	};

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>사업자 등록</UserReservationTitle>

			<div>
				<InputWrapper>
					{!isRegistered && <InstructionLabel>{imgFile ? '사업자 등록을 진행해주세요' : '사진으로 등록하기'}</InstructionLabel>}
					<FileRegiInput type="file" accept=".png, .jpg" onChange={onChangeBusinessImg} ref={imgRef} />
					<StyledImg
						$isLoading={isLoading}
						$isRegistered={isRegistered}
						onClick={() => !isLoading && !isRegistered && imgRef.current?.click()}
						src={businessData.businessImg ? businessData.businessImg : ownerRegiImg}
						alt="사업자 이미지"
					/>
				</InputWrapper>
				{!businessData.businessImg ? (
					<InstructionBottomText>
						견본과 유사한 양식의 png, jpg의
						<br /> 사업자 등록증을 업로드 해주세요
					</InstructionBottomText>
				) : (
					!isRegistered && (
						<>
							<SmallIndicatorText>이미지 클릭으로 수정</SmallIndicatorText>
							<BusinessRegiBtn $isLoading={isLoading} onClick={onCheckOCRImage}>
								사업자 등록
							</BusinessRegiBtn>
						</>
					)
				)}
			</div>
			{isRegistered && (
				<>
					<InputAligner>
						<InputTitle>숙소명</InputTitle>
						<RegisteredInfo value={businessData.name} onChange={(e) => onChangeHandler(e.target.value, 'name')} />
					</InputAligner>
					<InputAligner>
						<InputTitle>사업자 번호</InputTitle>
						<RegisteredInfo value={businessData.businessNum} onChange={(e) => onChangeHandler(e.target.value, 'businessNum')} />
					</InputAligner>
				</>
			)}

			<StepMover inactive={!businessData.name && !businessData.businessNum} goStep={goStep} step={step} data={businessData} />
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

const StyledImg = styled.img<{ $isLoading: boolean; $isRegistered: boolean }>`
	max-width: 18rem;
	object-fit: contain;
	cursor: ${(props) => !props.$isRegistered && 'pointer'};
	cursor: ${(props) => props.$isLoading && 'wait'};

	margin: 0.5rem 0;
	min-height: 50px;
	min-width: 50px;
`;

const InstructionBottomText = styled.div`
	max-width: 18rem;
	color: ${color.color3};
	font-weight: 600;
	line-height: 1.2rem;
	font-size: 0.9rem;
`;

const InputAligner = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 0.3rem;
`;

const InputTitle = styled.div`
	font-weight: 600;
	margin-left: 2px;
`;
const RegisteredInfo = styled.input`
	margin-bottom: 0.5rem;
	font-weight: 500;
	font-size: 1rem;
	border: 1px solid ${color.basicColor};
	border-radius: 4px;
	line-height: 1.2rem;
	padding: 0.2rem;
	@media screen and (max-width: 400px) {
		font-size: 0.8rem;
	}
`;

const BusinessRegiBtn = styled.div<{ $isLoading: boolean }>`
	cursor: pointer;
	font-weight: 900;
	color: ${color.color2};
	height: 1.2rem;
	transition: color 0.1s, font-size 0.1s;
	cursor: ${(props) => props.$isLoading && 'wait'};

	&:hover {
		color: ${color.color1};
		font-size: 1.1rem;
	}
`;
