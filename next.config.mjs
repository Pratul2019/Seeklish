/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Optimize production builds
  swcMinify: true,

  // Configure image optimization
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "seeklish.s3.amazonaws.com" },
    ],
    // Optimize image loading
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable image caching (adjust as needed)
    minimumCacheTTL: 60 * 60 * 24, // 1 day in seconds
  },

  // Enable compression for better performance
  compress: true,

  // Set appropriate headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Optimize for production environment
  env: {
    NODE_ENV: 'production',
  },

  // Enable output tracing for better debugging in production
  outputTracing: true,

  // Customize the build output directory if needed
  // distDir: 'build',

  // Add any necessary redirects
  // async redirects() {
  //   return [
  //     // Add your redirects here
  //   ];
  // },

  // Add any necessary rewrites
  // async rewrites() {
  //   return [
  //     // Add your rewrites here
  //   ];
  // },
};

export default nextConfig;