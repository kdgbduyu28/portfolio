---
title: Presyo
tagline: What things cost in the Philippines today, from official government data
summary: A price tracker for rice, meat, vegetables, fuel, LPG, electricity, water, fares and exchange rates. A Python pipeline reads the government's PDF and CSV reports twice a day and publishes them as a fast app with no server to run.
year: 2026
status: Live
order: 2
featured: true
demo:
  kind: phone
  url: https://presyo.pages.dev
accent: '#15803d'
screenshot: ../../assets/projects/presyo.png
live: https://presyo.pages.dev
repo: https://github.com/kdgbduyu28/Presyo
role: Data pipeline, app and automation
stack: [Python, uv, PDF parsing, Expo, React Native Web, TypeScript, GitHub Actions, Cloudflare Pages]
skills: [Python data pipelines, React Native & Expo, TypeScript, CI/CD & automation, Cloudflare, Product design]
highlights:
  - Reads 10+ official sources (DA, PSA, DOE, DTI, BSP, Meralco, MWSS, LTFRB), most of them PDFs
  - Prices per wet market, city, brand or province, with history since January 2026
  - Updates itself twice a day with GitHub Actions, then rebuilds and redeploys
  - No backend or database to pay for; the app reads static JSON files
  - Dark mode, saved preferences and a desktop layout as well as a phone layout
stats:
  - { value: '10+', label: 'government sources' }
  - { value: '2×', label: 'automatic updates a day' }
  - { value: '₱0', label: 'server cost' }
---

## The problem

The Philippine government publishes a lot of price data: palengke prices from the Department of Agriculture, pump prices from the DOE, suggested retail prices from the DTI, exchange rates from the BSP. But it comes as PDFs and spreadsheets spread over a dozen websites, in different formats, with many reports a week.

Nobody checks five PDFs before going to the market. So the data exists, but most people never see it.

## What we built

**Presyo** puts it all in one app: pick a city and see today's prices for rice, meat, fish, vegetables, gasoline and diesel by brand, LPG, electricity rates, a Meralco bill estimate by kWh, water rates, jeepney and bus fares, and peso exchange rates.

Each price shows where it came from and when it was last updated, so you can check it against the original report.

## How it works

- **Ingest (Python):** fetches each source, parses the PDFs and CSVs into one normalized format, and keeps the history in the repository. Some sources needed extra care: the BSP site rejects ordinary scripts, so it uses a browser-like TLS client.
- **Build:** turns that history into small JSON files per area and category.
- **App (Expo / React Native for Web):** reads the static files directly, so it loads fast and there is no server to maintain.
- **Automation:** a GitHub Actions workflow runs the whole pipeline twice a day and deploys the result to Cloudflare Pages.

## Try it

The app is live. Use it in the phone frame on this page, or open [presyo.pages.dev](https://presyo.pages.dev) on your phone.
