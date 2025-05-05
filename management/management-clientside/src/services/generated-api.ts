import { Configuration } from '../generated/api';

// Create base configuration for all API clients
export const createApiConfig = () => new Configuration({
    basePath: process.env.NODE_ENV === 'development' ? "/proxy" : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8080',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});
