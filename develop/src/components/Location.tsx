import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserLocation } from '../App';

const LocationContainer = styled.div``;

interface LocationProps {
    userLocation: UserLocation;
}

const { kakao } = window;

function Location({ userLocation }: LocationProps) {
    const [address, setAddress] = useState<string | null>(null);
    const geocoder = new kakao.maps.services.Geocoder();

    // 위치 -> 주소
    useEffect(() => {
        if (userLocation) {
            geocoder.coord2Address(userLocation.longitude, userLocation.latitude, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const address = result[0].address.address_name;
                    setAddress(address);
                } else {
                    // setError('주소를 가져오는 데 실패했습니다.');
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLocation]);

    return (
        <LocationContainer>
            <>
                <div>위도: {userLocation?.latitude}</div>
                <div>경도: {userLocation?.longitude}</div>
                {address ? address : null}
            </>
        </LocationContainer>
    );
}

export default Location;
