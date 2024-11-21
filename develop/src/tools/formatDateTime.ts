export function formatDateTime(dateTimeString: string) {
    const year = dateTimeString.substring(0, 4); // 년도
    const month = dateTimeString.substring(4, 6); // 월
    const day = dateTimeString.substring(6, 8); // 일
    const hours = dateTimeString.substring(8, 10); // 시간
    const minutes = dateTimeString.substring(10, 12); // 분
    const seconds = dateTimeString.substring(12, 14); // 초

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
