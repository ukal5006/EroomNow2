import { useEffect, useState } from 'react';
import { EroomInfo, eroomInfoList } from '../constants/eroomInfoList';
import { UserLocation } from '../App';
import { distance } from '../tools/distance';
import useAxios from '../hooks/useAxios';
import { EROOMLIST } from '../constants/api';
import EroomItem from './EroomItem';

interface LocationProps {
    userLocation: UserLocation;
}

interface DistanceEroomInfo extends EroomInfo {
    distance: number;
}

export interface NowEroomInfo extends DistanceEroomInfo {
    hvidate: string;
    hvec: number;
}

interface EroomResponse {
    response: {
        body: {
            items: {
                item: {
                    hvec: number;
                    hvidate: string;
                }[];
            };
        };
    };
}

function EroomList({ userLocation }: LocationProps) {
    const [maxDistance, setMaxDistance] = useState(10);
    const [distanceEroomList, setDistanceEroomList] = useState<null | DistanceEroomInfo[]>(null);
    const [nowEroomList, setNowEroomList] = useState<null | NowEroomInfo[]>(null);
    const [filtedEroomList, setFiltedEroomList] = useState<null | NowEroomInfo[]>(null);
    const { data, loading, error } = useAxios<EroomResponse>({ url: EROOMLIST });

    // 응급실 기본 정보에 사용자와의 거리 추가
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
                    distance: distanceValue,
                };
            })
        );
    }, [userLocation]);

    // 실시간 응급실 정보 추가
    useEffect(() => {
        if (distanceEroomList && data) {
            const liveEroomList = distanceEroomList?.map((eroom, index) => {
                return {
                    ...eroom,
                    hvec: data.response.body.items.item[index].hvec, // hvec 추가
                    hvidate: data.response.body.items.item[index].hvidate, // hvidate 추가
                };
            });

            setNowEroomList(liveEroomList);
        }
    }, [distanceEroomList, data]);

    // 사용자와의 거리에 따라 필터링 초기값 10
    useEffect(() => {
        if (nowEroomList) {
            setFiltedEroomList(
                nowEroomList
                    .filter((nowEroomInfo) => nowEroomInfo.distance < maxDistance)
                    .sort((a, b) => a.distance - b.distance)
            );
        }
    }, [nowEroomList, maxDistance]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <>
            {filtedEroomList?.length == null
                ? '로딩중'
                : filtedEroomList.map((e) => <EroomItem key={e.hpid} eroomInfo={e} />)}
        </>
    );
}

export default EroomList;
