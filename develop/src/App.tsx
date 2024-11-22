import styled from 'styled-components';
import Location from './components/Location';
import { GlobalStyle } from './styles/GlobalStyle';
import EroomList from './components/EroomList';
import { useEffect, useState } from 'react';

export interface UserLocation {
    latitude: number;
    longitude: number;
}

const AppContainer = styled.div`
    width: 100vw;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    margin: 0px auto;
`;

function App() {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

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
                            alert('위치 권한이 거부되었습니다. 위치 권한을 허용해 주세요.');
                            break;
                        case err.POSITION_UNAVAILABLE:
                            alert('위치 정보를 사용할 수 없습니다.');
                            break;
                        case err.TIMEOUT:
                            alert('위치 요청이 시간 초과되었습니다.');
                            break;
                    }
                }
            );
        } else {
            alert('Geolocation이 지원되지 않는 브라우저입니다.');
        }
    };

    // 위치 권한 요청 및 위치 가져오기
    useEffect(() => {
        getUserLocation();
    }, []);

    return (
        <>
            <GlobalStyle />
            <AppContainer>
                {userLocation ? (
                    <>
                        <Location userLocation={userLocation} />
                        <EroomList userLocation={userLocation} />
                    </>
                ) : (
                    <></>
                )}
            </AppContainer>
        </>
    );
}

export default App;
