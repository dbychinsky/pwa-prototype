# PWA (React + TypeScript + Vite)

1) Устанавливаем Vite+TS
2) Устанавливаем плагин vite-plugin-pwa
3) npm install
4) В файле vite.config.ts добавляем подключение плагина с параметрами

```typescript
VitePWA({
    registerType: "autoUpdate",
    workbox: {globPatterns: ["**/*.{html,js,ts,tsx,ico,png,svg,woff,woff2}"]}
})
```

* **registerType** - автообновление приложения
* **globPatterns** - файлы для кэширования

5) В этом же файле делаем настройку манифест (отдельный файл не требуется)

```typescript
    manifest: manifest
```

Генерируем файл манифеста и как переменную вставляем в параметр.

6) Добавляем скриншоты приложения для предпоказа при установке.
   В объекте manifest добавляем поле screenshots и делаем описние.
7) Добавляем файл robots.txt для поисковых роботов.
8) Регистрируем service worker.
Для регистрации добавляем код в main.tsx
```tsx
import { registerSW } from "virtual:pwa-register"

registerSW({immediate: true});
```
В файл tsconfig.app.json добавляем тип
```json
{
  "types": [
    "vite-plugin-pwa/client"
  ]
}
```