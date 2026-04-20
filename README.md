# science.tuit.uz

TUIT Incubation Center uchun `Vue 3 + Vite` asosidagi Home page loyihasi.

## Asosiy imkoniyatlar

- Screenshot uslubiga mos sectionlar: Header, Hero, Stats, Services, News, Tasks, Team, Footer
- Yagona matn manbasi: `src/data/homepageContent.js`
- Apostrof standarti: `ʻ` (U+02BB) ni avtomatik birxillashtirish
- Qayta ishlatiladigan karusel: `src/components/common/BaseCarousel.vue`
- Responsiv dizayn va yumshoq animatsiyalar

## Ishga tushirish

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Muhim fayllar

- `src/App.vue` — sahifa kompozitsiyasi
- `src/style.css` — global dizayn va animatsiyalar
- `src/data/homepageContent.js` — barcha matnlar/kontent
- `src/utils/textNormalize.js` — imlo apostrof normalizatsiyasi
- `src/components/sections/*` — bo‘lim komponentlari
- `src/components/common/BaseCarousel.vue` — umumiy karusel
