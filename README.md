# ZANKTUM VILLAS — Alanya

Marketing-Website für die **ZANKTUM VILLAS ALANYA** — zwei exklusive Luxus-Zwillingsvillen
(Villa Alpha & Villa Beta) ca. 250 m über Alanya in Bektaş, mit künstlerischer Ausstattung
von **Margarete Eckert-Preisser** und der Wahrzeichen-Skulptur **Z-Cleopatra**.

Single-Page-App in React + TypeScript + Vite. Eine einzige Codebasis bedient drei Domains.

| URL | Base-Pfad | Server-Ordner |
|-----|-----------|---------------|
| https://mutlucagri.com/ | `/` | `httpdocs/mutlucagri/` |
| https://zanktum.com/ | `/` | `httpdocs/zanktum/` |
| https://eckertpreisser.de/alanya/ | `/alanya/` | `httpdocs/alanya/` |

> **Hinweis zum Namen:** Das Projekt hieß ursprünglich *SANCTUM* und wurde auf *ZANKTUM*
> umbenannt (Brand final). Einige Dateinamen und Komponenten tragen noch das alte Kürzel
> (`sanctumContent.ts`, `WhySanctum.tsx`) — das ist nur die Datei-Benennung, alle sichtbaren
> Inhalte sagen „ZANKTUM".

---

## Tech-Stack

| Bereich | Technologie |
|---------|-------------|
| Framework | React 19 |
| Sprache | TypeScript 5.8 |
| Build / Dev-Server | Vite 6 |
| Styling | Tailwind CSS (per CDN in `index.html`, inkl. eigener Theme-Farben/Fonts) |
| Animationen | Framer Motion |
| Icons | lucide-react |
| KI-Concierge | `@google/genai` (Google Gemini) |
| Fonts | Cinzel, Playfair Display, Lato (Google Fonts) |

Es gibt **keinen** CSS-Build-Schritt — Tailwind läuft über das CDN-Skript und wird in
`index.html` über `tailwind.config` konfiguriert (Farben `gold`, `navy`, `cream`, `bronze`;
Schriften `serif`/`sans`/`display`).

---

## Features

- **9 Sprachen** mit Umschalter: EN, DE, AR, RU, UK, ZH, ES, FR, TR.
  Arabisch (`ar`) schaltet automatisch auf **RTL** (`document.documentElement.dir`).
- **Hash-Routing ohne Router-Bibliothek** — die Route wird in `App.tsx` aus
  `window.location.hash` abgeleitet (z. B. `#/villas`, `#/explore`, `#/sculpture`).
- **Villa Explorer** („Entdecken"-Funktion) — interaktiver Durchlauf der Villen von außen nach
  innen, Etage für Etage, inkl. Grundriss-Overlays. Kern-Feature, bleibt erhalten.
- **Z-Cleopatra-Skulptur-Seite** (`#/sculpture`).
- **KI-Concierge „Aria"** (`Concierge.tsx` + `services/geminiService.ts`) — beantwortet
  Besucherfragen auf Basis der Villen-Daten via Gemini. Benötigt `GEMINI_API_KEY`.
- **Kontaktformular**, Cookie-Banner, rechtliche Seiten (Impressum, Datenschutz, Cookies).

---

## Projektstruktur

```
.
├── index.html              # Einstiegspunkt, Tailwind-CDN + Theme-Config, Google Fonts
├── index.tsx               # React-Mount
├── App.tsx                 # Layout, Navigation, Sprachumschalter, Hash-Routing
├── constants.ts            # Villen-Daten, Navigation, Explorer-/UI-Texte (alle Sprachen)
├── sanctumContent.ts       # Lange Inhaltstexte (Cleopatra, Künstlerin, etc.) je Sprache
├── types.ts                # Gemeinsame TypeScript-Typen (u. a. Language)
├── components/             # Alle UI-Sektionen (Hero, VillaExplorer, CleopatraSection, …)
├── services/
│   └── geminiService.ts    # KI-Concierge-Anbindung (Gemini)
├── assets/
│   └── cleopatra-sculpture.png   # Cleopatra-Bild — über Vite gebundlet (Cache-Hash!)
├── public/
│   ├── images/             # Statische Bilder: exterior, attic, basement, first-floor,
│   │                       #   ground-floor, floorplans, cleopatra, villa2
│   └── .htaccess           # SPA-Fallback (serverseitig pro Ordner, nicht überschreiben)
├── deploy.sh               # EINZIGE korrekte Deploy-Methode (siehe unten)
└── vite.config.ts          # Base-Pfad via VITE_BASE_PATH, Dev-Port 3000
```

### Inhalte ändern

Texte und Villen-Daten liegen zentral und mehrsprachig:

- **`constants.ts`** — Villen (`Villa Alpha` / `Villa Beta`: Preise, Ausstattung, Bildlisten
  `heroImages`/`exteriorImages`), Navigationslinks, Explorer- und UI-Beschriftungen.
- **`sanctumContent.ts`** — längere Fließtexte (Cleopatra-Seite, Künstlerin-Bio, etc.).

Beide Dateien sind nach Sprache (`Record<Language, …>`) gegliedert — eine Änderung muss in
jeder Sprache gepflegt werden.

---

## Lokal entwickeln

**Voraussetzung:** Node.js (18+).

```bash
npm install

# Optional: KI-Concierge aktivieren
echo "GEMINI_API_KEY=dein_key" > .env.local

npm run dev          # Dev-Server auf http://localhost:3000
```

Ohne `GEMINI_API_KEY` läuft die Seite normal; nur der KI-Concierge antwortet dann nicht.

### Build

```bash
npm run build                              # Standard-Build (Base /alanya/)
VITE_BASE_PATH=/ npm run build            # Build mit Root-Base (mutlucagri / zanktum)
```

Der Base-Pfad steuert, unter welchem Unterordner die App ausgeliefert wird, und wird in
`vite.config.ts` aus `VITE_BASE_PATH` gelesen (Default `/alanya/`).

---

## Deployment

> **Immer** `./deploy.sh` benutzen. Niemals einen alten `dist`-Ordner manuell per FTP
> hochladen — dadurch ging wiederholt eine veraltete Version live.

```bash
./deploy.sh
```

Das Skript:

1. baut zwei Varianten frisch (`dist_mutlucagri/` mit Base `/`, `dist_alanya/` mit Base `/alanya/`),
2. lädt sie per `rsync` an die drei Zielordner (siehe Tabelle oben) auf den Server,
3. lässt serverseitige `.htaccess`-Dateien unangetastet (`--exclude`).

**Zugangsdaten** liegen **außerhalb** des Repos in `~/.config/eckert-server/credentials.env`
(wird vom Skript geladen) — niemals ins Repo committen.

**Server:** vServer mit Plesk/Apache, auf dem **mehrere Live-Sites parallel** laufen. Vor
Server-Aktionen prüfen, dass keine andere Seite betroffen ist. `deploy.sh` schreibt
ausschließlich in die drei ZANKTUM-Ordner.

### Cache-Falle bei Bildern (wichtig!)

Das CDN/der Cache (Cloudflare) liefert statische Assets mit langer Cache-Dauer aus. Wird eine
Bilddatei unter **gleichem Namen** ersetzt, bekommen Besucher weiter die alte Version. Lösungen:

- **`public/images/...`** — beim Austauschen den Cache-Buster in der URL hochzählen, z. B.
  `exterior/3.png?v=2` → `?v=3` in `constants.ts`. Damit ändert sich die URL.
- **`assets/cleopatra-sculpture.png`** — wird über Vite **importiert**, bekommt also einen
  Inhalts-Hash im Dateinamen. Bild einfach ersetzen + `./deploy.sh` — die URL ändert sich
  automatisch, Cache kann nie eine alte Version ausliefern.

---

## Lizenz / Status

Privates Projekt von Eckert · Preisser. Kein Open-Source-Release.
