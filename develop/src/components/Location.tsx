import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LocationContainer = styled.div``;

function Location() {
    const [userLocation, setUserLocation] = useState('Location');
    const [error, setError] = useState<string | null>(null);

    // 위치 권한 요청 및 위치 가져오기
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
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

        getUserLocation();
    }, []);

    return (
        <>
            <LocationContainer>{error ? error : userLocation}</LocationContainer>
        </>
    );
}

export default Location;
