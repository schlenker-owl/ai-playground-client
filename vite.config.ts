import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // For dev, proxy /api → ai-server to avoid CORS
  const target = env.VITE_AI_SERVER_URL || 'http://ai-server:8000';
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    }
  };
});
