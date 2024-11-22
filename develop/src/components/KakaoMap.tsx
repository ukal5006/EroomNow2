import { useEffect } from 'react';
import { UserLocation } from '../App';
import styled from 'styled-components';
import userMarker from '../assets/userMarker.png'; // 사용자 이미지 경로
import eroomMarker from '../assets/eroomMarker.png'; // Eroom 이미지 경로

interface KakaoMapProps {
    userLocation: UserLocation;
    eroomInfo: { lat: number; lon: number; distance: number; name: string };
}

const MapWrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 400px;
    border-radius: 10px;
`;

function KakaoMap({ userLocation, eroomInfo }: KakaoMapProps) {
    useEffect(() => {
        const container = document.getElementById('map');

        if (container) {
            const options = {
                center: new window.kakao.maps.LatLng(
                    (userLocation.latitude + eroomInfo.lat) / 2,
                    (userLocation.longitude + eroomInfo.lon) / 2
                ),
                level: 6,
            };

            const map = new window.kakao.maps.Map(container, options);

            // 마커 추가
            const positions = [
                {
                    title: '내 위치',
                    latlng: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
                },
                {
                    title: eroomInfo.name,
                    latlng: new kakao.maps.LatLng(eroomInfo.lat, eroomInfo.lon),
                },
            ];

            for (let i = 0; i < positions.length; i++) {
                // 마커 이미지의 이미지 크기 입니다
                const imageSize = new kakao.maps.Size(40, 40);

                // 마커 이미지를 생성합니다
                const userMarkerImage = new kakao.maps.MarkerImage(userMarker, imageSize);
                const eroomMarkerImage = new kakao.maps.MarkerImage(eroomMarker, imageSize);

                // 마커를 생성합니다
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커를 표시할 위치
                    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: positions[i].title === '내 위치' ? userMarkerImage : eroomMarkerImage, // 마커 이미지
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <MapWrapper id="map" />;
}

export default KakaoMap;
