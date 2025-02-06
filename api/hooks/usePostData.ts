import { useState } from 'react';
import apiClient from '../client';

export const usePostData = (endpoint: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const postDataToServer = async (postData: any) => {
        setLoading(true);
        try {
            console.log('Sending POST request to:', endpoint);
            console.log('Payload:', postData);
            const response = await apiClient.post(endpoint, postData);
            console.log('usePostData Response:', response.data);
            setData(response.data);
        } catch (err: any) {
            console.error('Error during POST request:', err.response || err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postDataToServer };
};