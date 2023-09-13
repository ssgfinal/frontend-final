import { useEffect } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { kakao }: any = window;

const KakaoMap = () => {
	useEffect(() => {
		const container = document.getElementById('map');
		console.log(container, 'container');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3,
		};
		const map = new kakao.maps.Map(container, options);

		const geocoder = new kakao.maps.services.Geocoder();
		//마커를 미리 생성
		const marker = new kakao.maps.Marker({
			position: new kakao.maps.LatLng(33.450701, 126.570667),
			map: map,
		});
	}, []);
	return (
		<MapContainer>
			{/* 스타일드 컴퍼넌트의 스타일이 map에 적용 안됨 */}
			<div className="mapStyle" id="map" />
		</MapContainer>
	);
};

export default KakaoMap;

const MapContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	.mapStyle {
		width: 500px;
		height: 400px;
	}
`;
