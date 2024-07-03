/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

// Конвертировать import.meta.url в путь файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
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
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
