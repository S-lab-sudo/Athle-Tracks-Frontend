import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'athletracks.com',
      'www.athletracks.com'
    ],
    hmr: {
      protocol: 'wss',
      host: 'athletracks.com',
      clientPort: 443
    },
    fs: {
      allow: ['/home/ubuntu/Athle-Tracks-Frontend'],
      strict: false
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      external: [/^\/\.git/, /^\/\.DS_Store/]
    }
  }
});
