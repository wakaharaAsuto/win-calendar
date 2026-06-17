import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import TanStackRouterVite from '@tanstack/router-plugin/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh: true,
        }),
        TanStackRouterVite({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: 'resources/js/routes',
            generatedRouteTree: 'resources/js/routeTree.gen.ts',
        }),
        tailwindcss(),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
