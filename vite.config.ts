// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      // "/auth" 로 시작하는 요청은 실제 백엔드 서버로 포워딩
      '/auth': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
      },
      // "/api" 로 시작하는 다른 엔드포인트도 동일하게 포워딩
      '/api': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 검색 API 요청 프록시 설정
      '/search': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
      },
    },
  },
});
