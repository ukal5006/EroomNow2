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
    const [distanceEroomList, setDistanceEroomList] = useState<null | DistanceEroomInfo[]>(null);

    useEffect(() => {
        setDistanceEroomList(
            eroomInfoList.map((eroomInfo) => {
                return {
                    ...eroomInfo,
                    distance: distance(userLocation.longitude, userLocation.latitude, eroomInfo.lon, eroomInfo.lat), // distance 속성 추가
                };
            })
        );
    }, [userLocation]);

    return <></>;
}

export default EroomList;
