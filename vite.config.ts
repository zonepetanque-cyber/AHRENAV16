import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import fs from 'fs';

// Plugin : injecte le timestamp de build dans sw.js dans dist/
function swVersionPlugin(): Plugin {
  const buildVersion = Date.now().toString();
  return {
    name: 'sw-version',
    closeBundle() {
      // closeBundle est appelé après writeBundle, plus fiable
      const swPath = path.resolve(__dirname, 'dist/sw.js');
      if (fs.existsSync(swPath)) {
        let content = fs.readFileSync(swPath, 'utf-8');
        content = content.replace(/self\.__APP_VERSION__ \|\| '1'/g, `'${buildVersion}'`);
        fs.writeFileSync(swPath, content);
        console.log(`[sw-version] Cache version → ahrena-v${buildVersion}`);
      } else {
        console.warn('[sw-version] dist/sw.js introuvable — vérifier que public/sw.js existe');
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
