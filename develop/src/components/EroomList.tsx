import { useEffect, useState } from 'react';
import { EroomInfo, eroomInfoList } from '../constants/eroomInfoList';
import { UserLocation } from '../App';
import { distance } from '../tools/distance';

interface LocationProps {
    userLocation: UserLocation;
}

interface DistanceEroomInfo extends EroomInfo {
    distance: number;
}

function EroomList({ userLocation }: LocationProps) {
    const [maxDistance, setMaxDistance] = useState(20);
    const [distanceEroomList, setDistanceEroomList] = useState<null | DistanceEroomInfo[]>(null);
    const [filtedEroomList, setFiltedEroomList] = useState<null | DistanceEroomInfo[]>(null);

    useEffect(() => {
        setDistanceEroomList(
            eroomInfoList.map((eroomInfo) => {
                const distanceValue = distance(
                    userLocation.longitude,
                    userLocation.latitude,
                    eroomInfo.lon,
                    eroomInfo.lat
                );

                return {
                    ...eroomInfo,
                    distance: distanceValue, // distance 속성 추가
                };
            })
        );
    }, [userLocation]);

    useEffect(() => {
        if (distanceEroomList) {
            setFiltedEroomList(
                distanceEroomList.filter((distanceEroomInfo) => distanceEroomInfo.distance < maxDistance) // 거리에 따라 필터링
            );
        }
    }, [distanceEroomList, maxDistance]);

    useEffect(() => {
        if (filtedEroomList) {
            console.log(filtedEroomList);
        }
    }, [filtedEroomList]);

    return <></>;
}

export default EroomList;
