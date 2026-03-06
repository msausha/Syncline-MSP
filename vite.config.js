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
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1200,

    rollupOptions: {
      output: {
        manualChunks: {
          'map': ['leaflet', 'react-leaflet', 'maplibre-gl'],
        },
      },
    },
  },

  server: {
    hmr: {
      overlay: true,
    },
  },

  optimizeDeps: {
    include: [
      'react', 'react-dom', 'framer-motion',
      'lucide-react', 'leaflet', 'react-leaflet',
    ],
  },
});