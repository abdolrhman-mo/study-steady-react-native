import { getToken } from '@/utils/tokenStorage';
import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://127.0.0.1:8000',
    baseURL: 'https://ycproject2.pythonanywhere.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        // console.log('client token:', token);
        if (token) {
            // console.log(`we're sending tokennn`)
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
