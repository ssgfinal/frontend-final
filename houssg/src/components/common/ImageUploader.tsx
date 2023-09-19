import styled from 'styled-components';
import { useImageConverter } from '../../hooks';
import { flexCenter } from '../../assets/styles';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { createRef, useState } from 'react';
import 'cropperjs/dist/cropper.css';

const ImageUploader: React.FC = () => {
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();
	const cropperRef = createRef<ReactCropperElement>();
	const [cropData, setCropData] = useState<string>('');

	const getCropData = () => {
		console.log(cropperRef.current);
		if (typeof cropperRef.current?.cropper !== 'undefined') {
			setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
		}
	};

	return (
		<UploadContainer>
			<FileRegiInput type="file" accept="image/*" onChange={setIncodedImg} ref={imgRef} />
			{!imgFile ? (
				<UploadButton onClick={() => imgRef.current?.click()}>업로드하기</UploadButton>
			) : (
				<StyledImg onClick={() => imgRef.current?.click()} src={imgFile ? imgFile : undefined} alt="사업자 이미지" />
			)}
			{imgFile && (
				<>
					<Cropper
						ref={cropperRef}
						src={imgFile}
						scaleX={1}
						scaleY={1}
						style={{ height: 300, width: 300 }} //크롭 크기
						cropBoxResizable={false}
						modal={false} // 검은색 모달창 제거
						background={false} // 점자배경 제거
						initialAspectRatio={1}
						center={true}
						rotatable={true}
						draggable={true}
						dragMode="move"
						scalable={false}
						zoomable={true}
						movable={false}
						preview=".img-preview"
						viewMode={1}
						responsive={true} // 반응하도록 (화면 크기 작아질때 리랜더)
						autoCropArea={1}
						checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
						guides={true}
					/>
					<div>머징</div>
				</>
			)}

			{cropData && (
				<>
					<h1>
						<span>Crop</span>
						<button style={{ float: 'right' }} onClick={getCropData}>
							Crop Image
						</button>
					</h1>
					<img style={{ width: '100%' }} src={cropData} alt="cropped" />
				</>
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
	flex-direction: column;
`;

const UploadButton = styled.div`
	cursor: pointer;
`;
