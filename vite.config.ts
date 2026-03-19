import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import fs from 'fs';

// Plugin : injecte le timestamp de build dans sw.js au moment du bundle
function swVersionPlugin(): Plugin {
  const buildVersion = Date.now().toString();
  return {
    name: 'sw-version',
    // writeBundle est appelé après que Vite a tout écrit dans dist/
    writeBundle() {
      const swPath = path.resolve(__dirname, 'dist/sw.js');
      if (fs.existsSync(swPath)) {
        let content = fs.readFileSync(swPath, 'utf-8');
        // Remplace toutes les occurrences (sécurité)
        content = content.replace(/__APP_VERSION__/g, buildVersion);
        fs.writeFileSync(swPath, content);
        console.log(`[sw-version] sw.js version → ${buildVersion}`);
      } else {
        console.warn('[sw-version] dist/sw.js introuvable');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), swVersionPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
