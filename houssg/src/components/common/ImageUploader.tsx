import styled from 'styled-components';
import { useImageConverter } from '../../hooks';
import { color, flexCenter } from '../../assets/styles';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { createRef, useState } from 'react';

import 'cropperjs/dist/cropper.css';
import { capture, rotateL, rotateR } from '../../assets/icons';
import { UploaderSize } from '../../types/common';

const ImageUploader: React.FC<UploaderSize> = ({ height, width, children, setImage }) => {
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();
	const cropperRef = createRef<ReactCropperElement>();
	const [isCropped, setIsCropped] = useState<boolean>(false);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const setNewIncodeImg = async () => {
		setIsUploading(true);
		const result = await setIncodedImg();

		if (result !== 'cancle') {
			setIsCropped(false);
			return;
		}
		setIsUploading(false);
	};

	const getCropData = () => {
		if (typeof cropperRef.current?.cropper !== 'undefined') {
			const succeedImg = cropperRef.current?.cropper.getCroppedCanvas().toDataURL('image/webp');
			setImage(succeedImg);
			setIsCropped(true);
			setIsUploading(false);
		}
	};

	const imageRotater = (degree: number) => {
		if (typeof cropperRef.current?.cropper !== 'undefined') {
			cropperRef.current?.cropper.rotate(degree);
		}
	};

	return (
		<UploadContainer>
			<FileRegiInput type="file" accept="image/*" onChange={setNewIncodeImg} ref={imgRef} />
			<>
				{imgFile && !isCropped && (
					<>
						<Cropper
							ref={cropperRef}
							src={imgFile}
							style={{ height, width }} // 크롭 크기
							cropBoxResizable={false}
							background={false} // 점자 배경 제거
							initialAspectRatio={1}
							center={true} // 가운데 정렬
							rotatable={true}
							draggable={true} // 크롭 영역 이동
							dragMode="move"
							zoomable={true} // 이미지 확대
							movable={true} // 이미지 이동
							viewMode={1}
							responsive={true} // 반응형 (화면 크기 작아질 때 리랜더)
							autoCropArea={1}
							checkOrientation={false}
						/>
						<CropSvgContainer width={width}>
							<RotateImg src={rotateL} onClick={() => imageRotater(-90)} />
							<CaptureImg src={capture} onClick={getCropData} />
							<RotateImg src={rotateR} onClick={() => imageRotater(90)} />
						</CropSvgContainer>
					</>
				)}
			</>
			{!isUploading && <UploadButton onClick={() => imgRef.current?.click()}>{children}</UploadButton>}
		</UploadContainer>
	);
};

export default ImageUploader;

const FileRegiInput = styled.input`
	cursor: pointer;
	display: none;
`;

const UploadContainer = styled.div`
	${flexCenter}
	flex-direction: column;
`;

const UploadButton = styled.div`
	cursor: pointer;
`;

const CropSvgContainer = styled.div<{ width: string }>`
	${flexCenter}
	justify-content: space-between;
	flex-direction: row;
	width: ${(props) => props.width};
	height: 3rem;
	background-color: ${color.lightGrayColor};
	padding: 0 0.5rem;
`;

const RotateImg = styled.img`
	cursor: pointer;
	width: 2em !important;
	height: 2em !important;
	max-width: 2rem;
`;

const CaptureImg = styled.img`
	cursor: pointer;
	width: 2.6em !important;
	height: 2.5em !important;

	max-width: 2.6rem;
`;
