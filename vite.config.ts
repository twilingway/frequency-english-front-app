import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        VitePWA({
            filename: 'sw.ts',
            includeAssets: ['*.svg'],
            includeManifestIcons: false,
            injectRegister: 'script',
            srcDir: 'src/app/service-workers',
            strategies: 'injectManifest',
            registerType: 'autoUpdate',
            // outDir: 'dist',
            devOptions: {
                enabled: true,
                type: 'module',
            },
            injectManifest: {
                // swSrc: '/',
                // globDirectory: 'dist/',
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff2}'],
                // swDest: 'dist/sw.js',
            },
            // workbox: {
            //     globDirectory: 'dist/',
            //     globPatterns: ['**/*/{js,css,html,ico,png,svg,jpg,jpeg,woff2}'],
            //     swDest: 'dist/sw.js',
            // },
            manifest: {
                name: 'Я ★ Есть',
                short_name: 'Я ★ Есть',
                description: 'Приложение социальной психологической помощи',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/assets/images/android-icon-36x36.png',
                        sizes: '36x36',
                        type: 'image/png',
                    },
                    {
                        src: '/assets/images/android-icon-48x48.png',
                        sizes: '48x48',
                        type: 'image/png',
                    },
                    {
                        src: '/assets/images/android-icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: '/assets/images/android-icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                    },
                    {
                        src: '/assets/images/android-icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: '/assets/images/android-icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                ],
                display_override: ['window-controls-overlay'],
            },
        }),
    ],
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }
                },
            },
        },
    },
});
