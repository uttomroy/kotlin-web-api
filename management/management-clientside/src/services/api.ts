import config from '@/config/config';

const defaultOptions: RequestInit = {
    credentials: 'same-origin',  // Changed back to same-origin since we're using proxy
    headers: {
        'Content-Type': 'application/json',
    },
};

// Helper to get the base URL depending on the environment
const getBaseUrl = (endpoint: string) => {
    if (process.env.NODE_ENV === 'development') {
        // In development, use the Next.js proxy path
        return `/proxy/${endpoint}`;
    }
    // In production, use the full URL from config
    return `${config.API_BASE_URL}${endpoint}`;
};

export const api = {
    get: async (endpoint: string) => {
        console.log(getBaseUrl(endpoint));
        const response = await fetch(getBaseUrl(endpoint), {
            ...defaultOptions,
            method: 'GET',
        });
        return response;
    },

    post: async (endpoint: string, data?: any) => {
        const response = await fetch(getBaseUrl(endpoint), {
            ...defaultOptions,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
        return response;
    }
}; 