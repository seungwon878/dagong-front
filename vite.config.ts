// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/auth" 로 시작하는 요청은 실제 백엔드 서버로 포워딩
      '/auth': {
        target: 'http://13.209.95.208:8080',
        changeOrigin: true,
      },
      // "/api" 로 시작하는 다른 엔드포인트도 동일하게 포워딩
      '/api': {
        target: 'http://13.209.95.208:8080',
        changeOrigin: true,
      },
      // 검색 API 요청 프록시 설정
      '/search': {
        target: 'http://13.209.95.208:8080',
        changeOrigin: true,
      },
    },
  },
});
