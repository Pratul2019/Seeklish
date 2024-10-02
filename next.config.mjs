/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Optimize production builds
  swcMinify: true,

  // Configure image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "seeklish.s3.amazonaws.com",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24, // 1 day in seconds
    formats: ["image/avif", "image/webp"],
  },

  // Enable compression for better performance
  compress: true,

  // Set appropriate headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://maps.googleapis.com;",
          },
        ],
      },
    ];
  },

  // Enable build-time type checking
  typescript: {
    ignoreBuildErrors: false,
  },

  // Customize Webpack configuration
  webpack: (config, { buildId, webpack }) => {
    // Add any custom Webpack plugins
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.BUILD_ID": JSON.stringify(buildId),
      })
    );
    return config;
  },

  // Configure runtime configuration
  publicRuntimeConfig: {
    // Add any configuration you want available on both server and client
  },

  serverRuntimeConfig: {
    // Add any configuration you want available only on the server
  },

  // Other configurations...
};

export default nextConfig;