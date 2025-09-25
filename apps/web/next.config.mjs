/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove i18n config when using App Router with [locale] segments
  
  // Configure for Replit environment - allow dev origins
  allowedDevOrigins: [
    '*.replit.dev',
    '*.kirk.replit.dev',
    '127.0.0.1',
    'localhost'
  ],
  
  // Allow external hosts for Replit proxy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
