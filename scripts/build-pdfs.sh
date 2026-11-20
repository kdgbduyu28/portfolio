#!/usr/bin/env bash
# Print pdf/resume.html and pdf/portfolio.html to public/resume.pdf and public/portfolio.pdf
# with headless Chrome. Edit the HTML, run this, then ./scripts/release.sh.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

for name in resume portfolio; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=5000 \
    --print-to-pdf="public/${name}.pdf" "file://$PWD/pdf/${name}.html" 2>/dev/null
  echo "public/${name}.pdf"
done
