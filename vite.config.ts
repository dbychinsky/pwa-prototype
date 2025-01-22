import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: () => {
                    return `[name]-[hash][extname]`;
                },
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: '[name]-[hash].js',
            },
        },
        // rollupOptions: {
        //     output: {
        //         assetFileNames: () => {
        //             return `[name][extname]`;
        //         },
        //         chunkFileNames: '[name].js',
        //         entryFileNames: '[name].js',
        //     },
        // },
    },
})
