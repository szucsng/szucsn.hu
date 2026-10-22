# Portfólió — Next.js + TypeScript

Egyoldalas portfólió fejlesztői és fotós munkákhoz, egy közös "frame" logikával:
minden projekt (kód vagy fotó) egy kártya, EXIF-stílusú metaadatokkal.

## Gyors indítás

```bash
npm install
npm run dev
```

Ezután nyisd meg: http://localhost:5070

## Amit szerkessz

1. **`lib/site.ts`** — neved, tagline, email, közösségi linkek, "Rólam" szöveg,
   és a kamera-beállítás stílusú skill lista. **Ezt mindenképp cseréld le.**
2. **`lib/frames.ts`** — a munkáid listája (kód projektek és fotósorozatok).
   Minden elemnek van egy `swatch` gradiens (placeholder borító) és egy
   `meta` tömb (a kártyán megjelenő apró feliratok, pl. `f/2.8`, `LANG: TypeScript`).
3. **Képek** — jelenleg CSS gradiens placeholder van a kártyák és a portré
   helyén (hogy azonnal működjön kép nélkül is). Ha valódi képeket akarsz:
   - tedd a fájlokat a `public/images/` mappába,
   - majd a `components/FrameCard.tsx` és `components/About.tsx` fájlokban
     cseréld a `style={{ backgroundImage: ... }}` sort egy Next.js `<Image>`
     komponensre, pl.:
     ```tsx
     import Image from "next/image";
     <Image src="/images/projekt-01.jpg" alt="..." fill className="object-cover" />
     ```

## Sablonok — `lib/frames.ts`

Új munka hozzáadásához másold be az alábbi két sablon egyikét a `frames` tömbbe.

### Kód projekt

```ts
{
  id: "05",
  slug: "projekt-neve",
  kind: "code",
  title: "Projekt neve",
  year: "2026",
  description:
    "Rövid, egy-két mondatos leírás — ez jelenik meg a kártyán.",
  longDescription:
    "Hosszabb leírás a projektoldalhoz.\n\nA második bekezdést egy üres sor választja el.",
  meta: [
    { label: "LANG", value: "TypeScript · React" },
    { label: "STACK", value: "Next.js" },
    { label: "SZEREP", value: "Fejlesztő" },
  ],
  href: "https://pelda.hu", // opcionális — ha van, megjelenik az "Oldal megtekintése" gomb
  swatch: ["#2a0e1a", "#e2559a"],
  logo: "/images/logos/projekt-neve.png", // opcionális, átlátszó hátterű PNG
  role: "Fejlesztő & designer",
  technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
},
```

### Fotósorozat

```ts
{
  id: "06",
  slug: "fotosorozat-neve",
  kind: "photo",
  title: "Fotósorozat neve",
  year: "2026",
  description:
    "Rövid leírás a sorozatról — ez jelenik meg a kártyán.",
  longDescription:
    "Hosszabb leírás a sorozatról.\n\nA második bekezdés.",
  meta: [
    { label: "f/", value: "2.8" },
    { label: "ISO", value: "400" },
  ],
  href: "#",
  swatch: ["#1c1a17", "#B8492E"],
  gallery: [
    "/images/galleries/foto-01.jpg",
    "/images/galleries/foto-02.jpg",
    "/images/galleries/foto-03.jpg",
  ],
  role: "Fotós & utómunka",
  technologies: ["Canon EOS 6D", "24-105mm", "Lightroom"],
},
```

Fontosabb mezők:

- `kind: "code"` — a kártya mindig a projekt leírására visz. Ha van `href`, az élő oldal a leírás oldalán az **Oldal megtekintése** gombbal nyílik meg.
- `kind: "photo"` — a `gallery` képei albumként jelennek meg a projektoldalon, vágás nélkül.
- `slug` — ebből lesz a URL: `/munkak/plczk-art`.
- `swatch` — a borító gradiens két színe; a második szín lesz a projektoldal accentje is.
- `logo` — opcionális, érdemes átlátszó hátterű PNG-t használni.
- `gallery` — a képek a `public/images/galleries/` mappából.
- `longDescription` — a bekezdéseket `\n\n` választja el.
- `id` — csak a kártyán megjelenő sorszám, legyen egyedi.

## Domain hozzákötés — mivel már van domained

Két egyszerű út van, attól függően, hogyan akarod üzemeltetni:

### A) Vercel (ajánlott, ingyenes, a Next.js készítője)

1. Töltsd fel ezt a projektet egy GitHub repóba.
2. Regisztrálj a https://vercel.com oldalon, és importáld a repót
   ("New Project" → válaszd ki a repót → Deploy).
3. A Vercel automatikusan felismeri, hogy Next.js projekt, nincs extra beállítás.
4. Deploy után: Project → Settings → Domains → add meg a saját domained
   (pl. `pelda-domain.hu`).
5. A domain-szolgáltatódnál (ahol vetted a domaint) állítsd be a Vercel
   által kért DNS rekordot (általában egy `A` rekord a Vercel IP-jére, vagy
   egy `CNAME` a `cname.vercel-dns.com`-ra — a Vercel felülete pontosan
   megmondja, mit kell beírni).
6. A HTTPS tanúsítványt a Vercel automatikusan kiállítja.

### B) Saját szerver (VPS) Node.js-szel

1. `npm run build` — legenerálja a production buildet.
2. `npm run start` — elindítja a Node szervert (az 5070-es porton).
3. Állíts be egy reverse proxy-t (pl. nginx vagy Caddy) a domaineden az
   5070-es portra, és kérj HTTPS-t (pl. Caddy automatikusan, vagy
   Let's Encrypt / certbot nginx-szel).
4. A domain DNS-ében egy `A` rekordot állíts be a szervered IP-jére.
5. Ajánlott egy folyamatszervező (pl. `pm2 start npm --name portfolio -- start`),
   hogy a Node szerver újraindulás után is fusson.

## Betűtípusok

A projekt a Google Fonts-ot használja (`Fraunces`, `Inter`, `JetBrains Mono`)
a `next/font/google` csomagon keresztül — ez build időben tölti le és
saját magát hosztolja a betűtípusokat, tehát nincs külső lekérés futásidőben,
és nem küld adatot a Google-nek a látogatóidról.

## Struktúra

```
app/            Next.js App Router (layout, oldal, globális CSS)
components/     Nav, Hero, FrameGrid, FrameCard, About, Contact, Footer
lib/            site.ts (személyes adatok) és frames.ts (munkák listája)
public/images/  ide kerülnek a saját képeid
```
