---
title: Presyo
tagline: What things cost in the Philippines today, from official government data
summary: A price tracker for rice, meat, vegetables, fuel, LPG, electricity, water, fares and exchange rates. A Python pipeline reads the government's PDF and CSV reports twice a day and publishes them as a fast app with no server to run.
year: 2026
status: Live
order: 3
featured: true
demo:
  kind: phone
  url: https://presyo.pages.dev
accent: '#15803d'
screenshot: ../../assets/projects/presyo.png
live: https://presyo.pages.dev
repo: https://github.com/kdgbduyu28/Presyo
role: Sole engineer. Data pipeline, app and automation.
stack: [Python, uv, httpx, pdfplumber, shapely, pytest, Expo, React Native Web, TypeScript, Zustand, GitHub Actions, Cloudflare Pages]
skills: [Python data pipelines, React Native & Expo, TypeScript, CI/CD & automation, Cloudflare, Product design]
highlights:
  - 11 sources (DA, PSA, DOE, DTI, BSP, Meralco, MWSS, LTFRB), 9 of them fetched automatically, most as PDFs
  - 1,736 PSGC places and 39 geocoded wet markets, matched from messy place names like "Sta. Cruz" or "City of Cebu"
  - Updates itself twice a day with GitHub Actions, then rebuilds and redeploys
  - "No backend: everything is precomputed, and the app picks the nearest place on the device"
  - Each source runs on its own, so one government site being down doesn't stop the update
  - Dark mode, saved preferences and a desktop layout as well as a phone layout
stats:
  - { value: '11', label: 'data sources' }
  - { value: '1,736', label: 'places mapped' }
  - { value: '2×', label: 'automatic updates a day' }
---

## The problem

The Philippine government publishes a lot of price data: palengke prices from the Department of Agriculture, pump prices from the DOE, suggested retail prices from the DTI, exchange rates from the BSP. But it comes as PDFs and spreadsheets spread over a dozen websites, in different formats, with many reports a week.

Nobody checks five PDFs before going to the market. So the data exists, but most people never see it.

## What I built

**Presyo** puts it all in one app: pick a city and see today's prices for rice, meat, fish, vegetables, gasoline and diesel by brand, LPG, electricity rates, a Meralco bill estimate by kWh, water rates, jeepney and bus fares, and peso exchange rates.

Each price shows where it came from and when it was last updated, so you can check it against the original report.

## How it works

- **Ingest (Python, uv, httpx, pdfplumber):** fetches each source and parses the PDFs and CSVs into one normalized format, keeping the history in the repository. DA and DOE tables differ by region and change format, so each source has its own parser with pytest tests. The BSP site rejects ordinary scripts, so it uses a browser-like TLS client.
- **Places (shapely):** reports write "Sta. Cruz", "City of Cebu" or "Taguig". A normalizer folds abbreviations and city prefixes and matches them against 1,736 PSGC places, with centroids computed from boundary polygons.
- **Build:** precomputes small JSON files per source and place, with headline items and sparklines, so the app never filters large files.
- **App (Expo / React Native):** resolves the nearest place on the device and fetches one small file per source. Hosting is static, so there is no server to run.
- **Automation:** GitHub Actions runs test → fetch → commit → build → deploy at 12:00 and 20:00 Manila time. Failures are logged as warnings and the build still ships with the data that did arrive.

## Try it

The app is live. Use it in the phone frame on this page, or open [presyo.pages.dev](https://presyo.pages.dev) on your phone.
