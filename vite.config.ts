// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // If no env is provided, default to localhost:8000 (NOT ai-server)
  const target = env.VITE_AI_SERVER_URL || 'http://localhost:8000';
  console.log(`[vite] proxy /api -> ${target}`);
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
  };
});
