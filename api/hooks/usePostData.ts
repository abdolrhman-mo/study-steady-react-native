import { useState } from 'react';
import apiClient from '../client';

export const usePostData = (endpoint: string, postData: any) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const postDataToServer = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post(endpoint, postData);
            setData(response.data);
        } catch (err: any) {
            if (err) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postDataToServer };
};