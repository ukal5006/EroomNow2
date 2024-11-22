import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { NowEroomInfo } from './EroomList';
import { formatDateTime } from '../tools/formatDateTime';
import KakaoMap from './KakaoMap';
import { UserLocation } from '../App';

interface EroomItemProps {
    eroomInfo: NowEroomInfo;
    userLocation: UserLocation;
}

const EroomItemContainer = styled.div`
    display: flex;
    border: 1px solid black;
    height: 70px;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
    border-radius: 15px;
    cursor: pointer; /* 클릭할 수 있음을 나타내기 위해 커서 변경 */
    margin-top: 10px;
`;

const EroomName = styled.div`
    flex: 1;
`;

const EroomCount = styled.div<{ hvec: number }>`
    color: white;
    width: 40px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    ${(props) => {
        if (props.hvec === 0) {
            return css`
                background-color: gray;
            `;
        } else if (props.hvec >= 1 && props.hvec <= 4) {
            return css`
                background-color: red;
            `;
        } else if (props.hvec >= 5 && props.hvec <= 9) {
            return css`
                background-color: orange;
            `;
        } else if (props.hvec >= 10) {
            return css`
                background-color: green;
            `;
        }
    }}
`;

const EroomDistance = styled.div`
    width: 65px;
    text-align: end;
    margin-left: 20px;
`;

// Modal 컴포넌트
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99; /* 모달이 다른 컴포넌트 위에 오도록 */
`;

const ModalWrapper = styled.div`
    max-width: 500px;
    position: relative;
    background: white;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 90%;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    width: 20px;
    height: 20px;
    background-color: tomato;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white; /* hover 시 글자색 변경 */
`;

const ModalContent = styled.div`
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    width: 100%;
`;

const ContentContext = styled.div`
    font-size: 18px;
    & > div {
        margin-top: 10px;
    }
`;

const Name = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const Address = styled.div`
    font-size: 12px;
    color: gray;
`;

const Distance = styled.div``;

const Count = styled.div``;

const Tel = styled.div``;

const CallBtn = styled.a``;

const UpdateTime = styled.div`
    font-size: 12px;
    color: gray;
`;

function EroomItem({ eroomInfo, userLocation }: EroomItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 모달 열림 상태에 따라 body 스크롤 방지
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset'; // 컴포넌트 언마운트 시 스크롤 복구
        };
    }, [isModalOpen]);

    return (
        <>
            <EroomItemContainer onClick={handleOpenModal}>
                <EroomName>{eroomInfo.dutyName}</EroomName>
                <EroomCount hvec={eroomInfo.hvec}>{eroomInfo.hvec}</EroomCount>
                <EroomDistance>{Math.round(eroomInfo.distance * 100) / 100}km</EroomDistance>
            </EroomItemContainer>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalWrapper>
                        <CloseButton onClick={handleCloseModal}>x</CloseButton>
                        <ModalContent>
                            <KakaoMap
                                userLocation={userLocation}
                                eroomInfo={{
                                    lat: eroomInfo.lat,
                                    lon: eroomInfo.lon,
                                    distance: eroomInfo.distance,
                                    name: eroomInfo.dutyName,
                                }}
                            />
                            <ContentContext>
                                <Name>{eroomInfo.dutyName}</Name>
                                <Address>{eroomInfo.dutyAddr}</Address>
                                <Distance>{Math.round(eroomInfo.distance * 100) / 100}km</Distance>
                                <Tel>
                                    전화번호 : {eroomInfo.dutyTel3}{' '}
                                    <CallBtn href={`tel:${eroomInfo.dutyTel3}`}>📞</CallBtn>
                                </Tel>
                                <Count>가용 침상 수 : {eroomInfo.hvec}</Count>
                                <UpdateTime>업데이트 시간 : {formatDateTime(eroomInfo.hvidate.toString())}</UpdateTime>
                            </ContentContext>
                        </ModalContent>
                    </ModalWrapper>
                </ModalOverlay>
            )}
        </>
    );
}

export default EroomItem;
