import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: true, // Enables true sourcemaps so line numbers map to your source files
    cssCodeSplit: true,
  },
  server: {
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});