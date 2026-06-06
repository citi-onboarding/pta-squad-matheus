/** @type {import('next').NextConfig} */

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};