import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> | false = {
    "theme_color": "#8936FF",
    "background_color": "#2EC6FE",
    "icons": [{
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "icon512_maskable.png",
        "type": "image/png"
    }, {"purpose": "any", "sizes": "512x512", "src": "icon512_rounded.png", "type": "image/png"}],
    "screenshots": [{src: "/screenshots/desctop.png", type: "img/png", sizes: "1447x780", form_factor: "wide"},
        {src: "/screenshots/mobile.png", type: "img/png", sizes: "292x595", form_factor: "narrow"}],
    "orientation": "any",
    "display": "standalone",
    "lang": "ru-RU",
    "name": "pwa-prototype",
    "short_name": "pwa",
    "start_url": "."
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        registerType: "autoUpdate",
        workbox: {globPatterns: ["**/*.{html,js,ts,tsx,ico,png,svg,woff,woff2}"]},
        manifest: manifest
    })],
})
