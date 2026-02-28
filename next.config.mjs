/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com", "www.youtube.com", "cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'salmankhanfilms.com', // Your non-www domain
          },
        ],
        destination: 'https://www.salmankhanfilms.com/:path*', // Your www domain
        permanent: true, // Use permanent: true for a 301 redirect
      },
    ];
  },
};

export default nextConfig;
