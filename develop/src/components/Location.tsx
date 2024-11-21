import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface UserLocation {
    latitude: number;
    longitude: number;
}

const LocationContainer = styled.div``;

const { kakao } = window;

function Location() {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const geocoder = new kakao.maps.services.Geocoder();

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (err) => {
                    switch (err.code) {
                        case err.PERMISSION_DENIED:
                            setError('위치 권한이 거부되었습니다. 위치 권한을 허용해 주세요.');
                            break;
                        case err.POSITION_UNAVAILABLE:
                            setError('위치 정보를 사용할 수 없습니다.');
                            break;
                        case err.TIMEOUT:
                            setError('위치 요청이 시간 초과되었습니다.');
                            break;
                    }
                }
            );
        } else {
            setError('Geolocation이 지원되지 않는 브라우저입니다.');
        }
    };

    // 위치 권한 요청 및 위치 가져오기
    useEffect(() => {
        getUserLocation();
    }, []);

    // 위치 -> 주소
    useEffect(() => {
        if (userLocation) {
            geocoder.coord2Address(userLocation.longitude, userLocation.latitude, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const address = result[0].address.address_name;
                    setAddress(address);
                } else {
                    setError('주소를 가져오는 데 실패했습니다.');
                }
            });
        }
    }, [userLocation]);

    return (
        <LocationContainer>
            {error ? (
                error
            ) : (
                <>
                    <div>위도: {userLocation?.latitude}</div>
                    <div>경도: {userLocation?.longitude}</div>
                    {address ? address : null}
                </>
            )}
        </LocationContainer>
    );
}

export default Location;
