import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface UseAxiosProps {
    url: string;
    headers?: Record<string, string>;
}

function useAxios<T>({ url, headers }: UseAxiosProps) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config: AxiosRequestConfig = {
                    url,
                    headers,
                    method: 'GET',
                };

                const response = await axios(config);
                setData(response.data);
            } catch (err) {
                const axiosError = err as AxiosError;
                setError(axiosError.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, headers]);

    return { data, loading, error };
}

export default useAxios;
