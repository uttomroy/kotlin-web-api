/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/proxy/:path*',
                    destination: 'http://127.0.0.1:8080/:path*'
                },
                {
                    source: '/api/:path*',
                    destination: 'http://127.0.0.1:8080/api/:path*'
                }
            ];
        }
        return [];
    }
};

module.exports = nextConfig; 