import styled from 'styled-components';
import { useImageConverter } from '../../hooks';
import { flexCenter } from '../../assets/styles';

const ImageUploader: React.FC = () => {
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();

	return (
		<UploadContainer>
			<FileRegiInput type="file" accept="image/*" onChange={setIncodedImg} ref={imgRef} />
			{!imgFile ? (
				<UploadButton onClick={() => imgRef.current?.click()}>업로드하기</UploadButton>
			) : (
				<StyledImg onClick={() => imgRef.current?.click()} src={imgFile ? imgFile : undefined} alt="사업자 이미지" />
			)}
		</UploadContainer>
	);
};

export default ImageUploader;

const FileRegiInput = styled.input`
	cursor: pointer;
	display: none;
`;

const StyledImg = styled.img`
	width: 18rem;
	object-fit: contain;
	cursor: pointer;
	margin: 0.5rem 0;
`;

const UploadContainer = styled.div`
	${flexCenter}
`;

const UploadButton = styled.div`
	cursor: pointer;
`;
