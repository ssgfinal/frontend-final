import { useEffect } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { kakao }: any = window;

interface locationType {
	location: string;
}

const KakaoMap: React.FC<locationType> = ({ location }) => {
	const kakaoMaps = kakao.maps;

	useEffect(() => {
		if (location) {
			const container = document.getElementsByClassName('mapStyle')[0]; //

			const geocoder = new kakaoMaps.services.Geocoder();

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			geocoder.addressSearch(location, function (result: { x: any; y: any }[], status: any) {
				// 정상적으로 검색이 완료됐으면
				if (status === kakao.maps.services.Status.OK) {
					const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
					const options = {
						center: coords,
						level: 3,
					};

					const map = new kakaoMaps.Map(container, options);
					map.setCenter(coords);

					// 결과값으로 받은 위치를 마커로 표시합니다
					new kakao.maps.Marker({
						map: map,
						position: coords,
					});
				}
			});
		}
	}, [location, kakaoMaps]);
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
		width: 350px;
		height: 320px;
	}

	@media screen and (max-width: 800px) {
		.mapStyle {
			width: 270px;
			height: 200px;
		}
	}
`;
