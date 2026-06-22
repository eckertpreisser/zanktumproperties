<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DN4cV0aEONKX4xHui0VWHEAPNcHxCfI3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy (Webseite veröffentlichen)

**Immer** das Deploy-Skript benutzen — niemals einen alten `dist`-Ordner per FTP hochladen
(dadurch kam immer wieder die alte Version ohne Grundrisse live):

```
./deploy.sh
```

Das Skript baut die aktuelle Version aus diesem Projekt frisch und lädt sie an die zwei
richtigen Stellen hoch:

| URL | Base-Pfad | Server-Ordner |
|-----|-----------|---------------|
| https://mutlucagri.com/ | `/` | `httpdocs/mutlucagri/` |
| https://eckertpreisser.de/alanya/ | `/alanya/` | `httpdocs/alanya/` |

Beide Seiten zeigen dieselbe Version. Die `.htaccess` auf dem Server bleibt beim Deploy erhalten.
