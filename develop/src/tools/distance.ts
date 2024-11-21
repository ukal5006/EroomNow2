export function distance(userLon: number, userLat: number, eroomLon: number, eroomLat: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371; // 지구의 반지름 (킬로미터 단위)

    const dLat = toRadians(eroomLat - userLat);
    const dLon = toRadians(eroomLon - userLon);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(userLat)) * Math.cos(toRadians(eroomLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // 거리 계산 (킬로미터)

    return distance;
}
