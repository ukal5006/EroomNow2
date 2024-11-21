import styled, { css } from 'styled-components';
import { NowEroomInfo } from './EroomList';

interface EroomItemProps {
    eroomInfo: NowEroomInfo; // NowEroomInfo 타입을 사용하여 props 정의
}

const EroomItemContainer = styled.div`
    display: flex;
    border: 1px solid black;
    height: 70px;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
    border-radius: 15px;
`;

const EroomName = styled.div`
    flex: 1;
`;

const EroomCount = styled.div<{ hvec: number }>`
    color: white;
    width: 30px;
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

function EroomItem({ eroomInfo }: EroomItemProps) {
    return (
        <EroomItemContainer>
            <EroomName>{eroomInfo.dutyName}</EroomName>
            <EroomCount hvec={eroomInfo.hvec}>{eroomInfo.hvec}</EroomCount>
            <EroomDistance>{Math.round(eroomInfo.distance * 100) / 100}km</EroomDistance>
        </EroomItemContainer>
    );
}

export default EroomItem;
