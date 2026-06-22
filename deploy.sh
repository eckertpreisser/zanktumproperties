#!/usr/bin/env bash
#
# deploy.sh — EINZIGE, KORREKTE Methode, die Webseite zu veröffentlichen.
#
# Baut die aktuelle Version aus DIESEM Projekt frisch und lädt sie an die
# richtigen Stellen auf dem Server hoch:
#
#   * mutlucagri.com                 -> Build mit Base-Pfad "/"
#   * zanktum.com                    -> Build mit Base-Pfad "/" (gleicher Build wie mutlucagri)
#   * eckertpreisser.de/alanya/      -> Build mit Base-Pfad "/alanya/"
#
# Wichtig: NIEMALS einfach einen alten dist-Ordner per FTP hochladen — dadurch
# kam immer wieder die alte Version (ohne Grundrisse) live. Stattdessen immer
# dieses Skript benutzen:  ./deploy.sh
#
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

# --- Server-Zugang (liegt AUSSERHALB des Repos, enthält das Passwort) ---
CRED="$HOME/.config/eckert-server/credentials.env"
if [[ ! -f "$CRED" ]]; then
  echo "FEHLER: Zugangsdaten nicht gefunden: $CRED" >&2
  exit 1
fi
set -a; source "$CRED"; set +a
export SSHPASS="$ECKERT_SERVER_PASSWORD"
PORT="${ECKERT_SERVER_PORT:-22}"
RSH="sshpass -e ssh -o StrictHostKeyChecking=no -p $PORT"
REMOTE="$ECKERT_SERVER_USER@$ECKERT_SERVER_HOST"
DOCROOT="/var/www/vhosts/eckertpreisser.de/httpdocs"

echo "==> 1/4  Build für mutlucagri.com (Base /)"
VITE_BASE_PATH=/ npx vite build --outDir dist_mutlucagri

echo "==> 2/4  Build für eckertpreisser.de/alanya/ (Base /alanya/)"
VITE_BASE_PATH=/alanya/ npx vite build --outDir dist_alanya

# .htaccess auf dem Server bleibt erhalten (--exclude). Sie ist pro Ordner
# korrekt konfiguriert (RewriteBase /mutlucagri/ bzw. /alanya/).
RSYNC_OPTS=(-rz --delete --exclude='.htaccess' --exclude='.DS_Store')

echo "==> 3/5  Upload -> mutlucagri.com"
rsync "${RSYNC_OPTS[@]}" -e "$RSH" dist_mutlucagri/ "$REMOTE:$DOCROOT/mutlucagri/"

echo "==> 4/5  Upload -> zanktum.com (gleicher Base-/-Build wie mutlucagri)"
rsync "${RSYNC_OPTS[@]}" -e "$RSH" dist_mutlucagri/ "$REMOTE:$DOCROOT/zanktum/"

echo "==> 5/5  Upload -> eckertpreisser.de/alanya/"
rsync "${RSYNC_OPTS[@]}" --exclude='vite.svg' -e "$RSH" dist_alanya/ "$REMOTE:$DOCROOT/alanya/"

echo
echo "FERTIG. Live prüfen:"
echo "  https://mutlucagri.com/"
echo "  https://zanktum.com/"
echo "  https://eckertpreisser.de/alanya/"
