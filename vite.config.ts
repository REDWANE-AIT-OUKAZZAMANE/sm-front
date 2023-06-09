import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr()],
    build: {
      rollupOptions: {
        external: 'NonExistingPath',
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/ws': {
          target: process.env.VITE_APP_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '/api': {
          target: process.env.VITE_APP_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
