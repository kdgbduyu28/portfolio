#!/usr/bin/env bash
# Build the site and deploy it to Cloudflare Pages (https://<project>.pages.dev).
#   ./scripts/release.sh              build + deploy
#   ./scripts/release.sh --no-deploy  build only
# Pages Functions in functions/ (the contact form) are deployed with it.
set -euo pipefail

PROJECT="${PAGES_PROJECT:-tim-borja}"
# Pinned to a major so a new wrangler cannot change the deploy under us.
WRANGLER=(npx --yes wrangler@4)
# Without this, wrangler can stop to ask about usage metrics and hang.
export WRANGLER_SEND_METRICS=false

cd "$(dirname "${BASH_SOURCE[0]}")/.."

npm run build

if [[ "${1:-}" == "--no-deploy" ]]; then
  echo "Built into dist/ (not deployed)."
  exit 0
fi

# First deploy only: create the Pages project if it doesn't exist yet.
if ! "${WRANGLER[@]}" pages project list </dev/null 2>/dev/null | grep -q "\b${PROJECT}\b"; then
  "${WRANGLER[@]}" pages project create "$PROJECT" --production-branch main </dev/null
fi

"${WRANGLER[@]}" pages deploy dist --project-name "$PROJECT" --branch main --commit-dirty=true </dev/null
echo "Live at https://${PROJECT}.pages.dev"
