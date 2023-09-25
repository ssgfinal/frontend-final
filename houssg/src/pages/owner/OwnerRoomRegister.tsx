import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RegiHeadText } from '../../assets/styles';
import { ImageUploader, RoomImgSlider } from '../../components/common';

const OwnerRoomRegister = () => {
	const { houseId } = useParams();

	const [houseImgs, setHouseImgs] = useState([]);

	return (
		<RoomRegisterWrap>
			<RegiHeadText>객실 등록</RegiHeadText>
			<RegisterInputWrapper>
				<div>객실종류</div>
				<div>객실 사진</div>
				<ImageUploader
					height="100px"
					width="100px"
					setImage={() => {
						console.log('');
					}}
				>
					업로드하기
				</ImageUploader>
				<RoomImgSlider />
				<br />
				<div>객실 서비스</div>
				<div>방 개수</div>
				<div>객실 가격</div>
			</RegisterInputWrapper>
			<br />
			<div>{houseId}</div>
		</RoomRegisterWrap>
	);
};

export default OwnerRoomRegister;

const RoomRegisterWrap = styled.div`
	margin: 1rem auto;
	max-width: 700px;
`;

const RegisterInputWrapper = styled.div`
	margin-top: 0.5rem;
`;
