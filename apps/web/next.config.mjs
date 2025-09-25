/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove i18n config when using App Router with [locale] segments
  
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
