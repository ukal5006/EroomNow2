import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserLocation } from '../App';
import Spinner from './Spinner';

interface LocationProps {
    userLocation: UserLocation;
}

const { kakao } = window;

const LocationContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const LocationText = styled.div`
    font-size: 18px;
`;

function Location({ userLocation }: LocationProps) {
    const [address, setAddress] = useState<string | null>(null);
    const geocoder = new kakao.maps.services.Geocoder();
    const [loading, setLoading] = useState(true);

    // 위치 -> 주소
    useEffect(() => {
        if (userLocation) {
            geocoder.coord2Address(userLocation.longitude, userLocation.latitude, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const address = result[0].address.address_name;
                    setAddress(address);
                    setLoading(false);
                } else {
                    alert('주소를 가져오는 데 실패했습니다.');
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLocation]);

    return loading ? (
        <Spinner />
    ) : (
        <LocationContainer>
            <LocationText>현재 위치 : </LocationText>
            <LocationText>{address}</LocationText>
        </LocationContainer>
    );
}

export default Location;
