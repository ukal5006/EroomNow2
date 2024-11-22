import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface UseAxiosProps {
    url: string;
    headers?: Record<string, string>;
}

function useAxios<T>({ url, headers }: UseAxiosProps) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [requestTime, setRequestTime] = useState<string | null>(null); // 요청 시간을 저장할 상태 추가

    const fetchData = useCallback(async () => {
        try {
            const config: AxiosRequestConfig = {
                url,
                headers,
                method: 'GET',
            };

            const response = await axios(config);
            setData(response.data);
            setError(null); // 성공하면 에러 상태 초기화

            // 요청 시간 기록
            const currentTime = new Date().toISOString().replace('T', ' ').slice(0, 19); // "xxxx-xx-xx xx:xx:xx" 형식
            setRequestTime(currentTime);
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.message);
            setData(null); // 에러 발생 시 데이터 초기화
            setRequestTime(null); // 에러 발생 시 요청 시간 초기화
        }
    }, [url, headers]);

    useEffect(() => {
        fetchData(); // 컴포넌트 마운트 시 데이터 fetch
    }, [fetchData]);

    return { data, error, requestTime, refetch: fetchData }; // 요청 시간도 반환
}

export default useAxios;
