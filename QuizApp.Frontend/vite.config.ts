import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@emotion/styled': '@emotion/styled',
      '@emotion/react': '@emotion/react'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5203',
        changeOrigin: true,
        secure: false,
      },
      '/thumbnails': {
        target: 'http://localhost:5203',
        changeOrigin: true,
      },
      '/avatars': {
        target: 'http://localhost:5203',
        changeOrigin: true,
      }
    }
  }
});