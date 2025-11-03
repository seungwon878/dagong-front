// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
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
      // 위치/주소 API 요청 프록시 설정
      '/location': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
      },
      // 채팅 API 요청 프록시 설정
      '/chat': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
      },
      // 공동구매 API 요청 프록시 설정
      '/purchases': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
      },
      // 회원 API 요청 프록시 설정
      '/member': {
        target: 'http://3.39.43.178:8080',
        changeOrigin: true,
      },
    },
  },
});
