/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "lh3.googleusercontent.com" },
        { protocol: "https", hostname: "seeklish.s3.amazonaws.com" },
      ],
      // Remove or comment out minimumCacheTTL to use default caching behavior
      // minimumCacheTTL: 60,
    },
  };
  
  export default nextConfig;