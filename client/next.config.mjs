/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:5001/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;