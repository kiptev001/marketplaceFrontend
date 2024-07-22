/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

// Конвертировать import.meta.url в путь файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ];
  },
  experimental: {
    ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thespruce.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '80.img.avito.st',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.thaisell.net',
        port: '',
        pathname:'/**',
      }
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
