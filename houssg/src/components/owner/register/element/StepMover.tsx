import styled from 'styled-components';
import { StepMoverType } from '../../../../types';
import { color } from '../../../../assets/styles';
import api from '../../../../api/api';
import { ownerUrl } from '../../../../assets/constant';

const StepMover: React.FC<StepMoverType> = ({ goStep, step, data, inactive, last }) => {
	const onRegiFunnelData = () => {
		// !inactive
		const formData = new FormData();
		if (data.houseImageFile !== null) {
			formData.append('file', data.houseImageFile as File);
		}

		const requestData = {
			accomName: data.name,
			accomAddress: data.targetAddress,
			teleNumber: data.houseNumber,
			accomCategory: data.houseType,
			accomDetails: data.detailText,
			checkIn: data.checkIn,
			checkOut: data.checkOut,
			businessNumber: data.businessNum,
			facilityDto: data.houseService,
		};

		console.log(data.houseImageFile, '이미지파일');
		console.log(requestData, 'request');

		const json = JSON.stringify(requestData);
		const blob = new Blob([json], { type: 'application/json' });
		formData.append('request', blob);
		return api.post(ownerUrl.houseRegister, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
	};
	// if (data.houseService) {
	// 	const dtoKey = ['nearbySea', 'parkingAvailable', 'pool', 'spa', 'wifi', 'twinBed', 'barbecue', 'noSmoking', 'luggageStorage', 'freeMovieOtt'];

	// 	const resultObject: Record<string, number> = {};

	// 	// 배열의 길이를 기준으로 반복하면서 객체를 만듭니다.
	// 	for (let i = 0; i < dtoKey.length; i++) {
	// 		const key = dtoKey[i];
	// 		const value = data.houseService[i];
	// 		resultObject[key] = value;
	// 	}
	// 	const requestData = {
	// 		accomName: data.name,
	// 		accomAddress: data.targetAddress,
	// 		teleNumber: data.houseNumber,
	// 		accomCategory: data.houseType,
	// 		accomDetails: data.detailText,
	// 		checkIn: data.checkIn,
	// 		checkOut: data.checkOut,
	// 		businessNumber: data.businessNum,
	// 		facilityDto: data.houseService,
	// 	};

	// 	console.log(data.houseImageFile, '이미지파일');
	// 	console.log(requestData, 'request');

	// 	const json = JSON.stringify(requestData);
	// 	const blob = new Blob([json], { type: 'application/json' });
	// 	formData.append('request', blob);
	// 	return api.post(ownerUrl.houseRegister, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
	// }

	return (
		<StepBtnAligner>
			{!!step && <StepBtn onClick={() => goStep(step - 1)}>이전</StepBtn>}
			{last ? (
				<StepBtn $inactive={inactive} onClick={onRegiFunnelData}>
					등록하기
				</StepBtn>
			) : (
				<StepBtn $inactive={inactive} onClick={() => !inactive && goStep(step + 1, data)}>
					다음 단계로
				</StepBtn>
			)}
		</StepBtnAligner>
	);
};

export default StepMover;

const StepBtnAligner = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	max-width: 500px;
	width: 100%;
	margin-top: 2rem;
`;

const StepBtn = styled.div<{ $inactive?: boolean }>`
	color: ${color.backColor};
	background-color: ${color.color2};
	border: 1px solid ${color.color2};
	border-radius: 0.3rem;
	margin-right: 1rem;
	padding: 0.4rem;
	text-align: center;
	&:hover {
		font-weight: ${(props) => !props.$inactive && 800};
	}
	cursor: ${(props) => (props.$inactive ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.$inactive ? 0.5 : 1)};
`;
