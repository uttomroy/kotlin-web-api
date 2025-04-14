/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/proxy/:path*',
                    destination: 'http://localhost:8080/:path*'
                }
            ];
        }
        return [];
}
};

module.exports = nextConfig; 