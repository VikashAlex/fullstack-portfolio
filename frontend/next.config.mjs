/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**', // ya specific path like '/uploads/**'
            },
        ],
    },
};

export default nextConfig;
