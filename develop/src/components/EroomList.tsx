import { useEffect, useState } from 'react';
import { EroomInfo, eroomInfoList } from '../constants/eroomInfoList';
import { UserLocation } from '../App';
import { distance } from '../tools/distance';
import useAxios from '../hooks/useAxios';
import { EROOMLIST } from '../constants/api';
import EroomItem from './EroomItem';
import styled from 'styled-components';
import Spinner from './Spinner';

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

const LoaderContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoaderText = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
`;

const EroomListWrapper = styled.div`
    width: 350px;
`;

const DistanceBtnContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
`;

const DistanceBtn = styled.div<{ active: string }>`
    cursor: pointer;
    width: 60px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${({ active }) => (active === 'true' ? 'green' : 'gray')}; /* 활성화된 버튼 색상 변경 */
    color: white;
`;

const NowMaxDistance = styled.div``;

function EroomList({ userLocation }: LocationProps) {
    const [maxDistance, setMaxDistance] = useState(5);
    const [distanceEroomList, setDistanceEroomList] = useState<null | DistanceEroomInfo[]>(null);
    const [nowEroomList, setNowEroomList] = useState<null | NowEroomInfo[]>(null);
    const [filtedEroomList, setFiltedEroomList] = useState<null | NowEroomInfo[]>(null);
    const { data, error, requestTime, refetch } = useAxios<EroomResponse>({ url: EROOMLIST });

    const distanceBtnHandler = (distance: 5 | 10 | 15) => {
        setMaxDistance(distance);
    };

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

    return filtedEroomList?.length == null ? (
        <LoaderContainer>
            <LoaderText>응급실 정보를 불러오고 있습니다.</LoaderText>
            <Spinner />
        </LoaderContainer>
    ) : (
        <EroomListWrapper>
            <DistanceBtnContainer>
                <DistanceBtn active={(maxDistance === 5).toString()} onClick={() => distanceBtnHandler(5)}>
                    5km
                </DistanceBtn>
                <DistanceBtn active={(maxDistance === 10).toString()} onClick={() => distanceBtnHandler(10)}>
                    10km
                </DistanceBtn>
                <DistanceBtn active={(maxDistance === 15).toString()} onClick={() => distanceBtnHandler(15)}>
                    15km
                </DistanceBtn>
            </DistanceBtnContainer>
            <div>데이터 업데이트 시각 : {requestTime}</div>
            <div onClick={refetch}>응급실 리스트 새로고침</div>

            {filtedEroomList.map((e) => (
                <EroomItem key={e.hpid} eroomInfo={e} userLocation={userLocation} />
            ))}
        </EroomListWrapper>
    );
}

export default EroomList;
