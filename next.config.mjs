/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8080',
          pathname: '/agents/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  