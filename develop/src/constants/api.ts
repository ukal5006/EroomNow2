import { UserLocation } from '../App';

interface KakaoMobilityProp {
    userLocation: UserLocation;
    eroomLocation: EroomLocation;
}

interface EroomLocation {
    lat: number;
    lon: number;
}

export const EROOMLIST = `https://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire?serviceKey=${process.env.REACT_APP_EROOM_KEY}&numOfRows=1000`;
export const KAKAOMOBILITY = ({ userLocation, eroomLocation }: KakaoMobilityProp) =>
    `https://apis-navi.kakaomobility.com/v1/directions?origin=${userLocation.longitude},${userLocation.latitude}&destination=${eroomLocation.lon},${eroomLocation.lat}`;
