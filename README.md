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

## Supabase sozlash

1. `.env` faylini to'ldiring:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

2. Supabase SQL Editor'da `supabase/schema.sql` faylini ishga tushiring.

3. Admin paneldan saqlangan ma'lumotlar `public.site_content` jadvaliga yoziladi:
	- `site_stats`
	- `site_news`
	- `site_team`

Eslatma: Admin login holati hozircha `localStorage` orqali tekshiriladi (`admin_auth`).

## Muhim fayllar

- `src/App.vue` — sahifa kompozitsiyasi
- `src/style.css` — global dizayn va animatsiyalar
- `src/data/homepageContent.js` — barcha matnlar/kontent
- `src/utils/textNormalize.js` — imlo apostrof normalizatsiyasi
- `src/components/sections/*` — bo‘lim komponentlari
- `src/components/common/BaseCarousel.vue` — umumiy karusel
- `src/supabase.js` — Supabase client
- `supabase/schema.sql` — jadval va RLS policy sozlamalari
