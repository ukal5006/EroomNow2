import { NowEroomInfo } from './EroomList';

interface EroomItemProps {
    eroomInfo: NowEroomInfo; // NowEroomInfo 타입을 사용하여 props 정의
}

function EroomItem({ eroomInfo }: EroomItemProps) {
    return (
        <>
            <div>{eroomInfo.dutyName}</div>
            <div>{eroomInfo.dutyTel3}</div>
            <div>{eroomInfo.hpid}</div>
            <div>{eroomInfo.hvec}</div>
            <div>{eroomInfo.hvidate}</div>
            <div>거리 : {eroomInfo.distance}</div>
        </>
    );
}

export default EroomItem;
