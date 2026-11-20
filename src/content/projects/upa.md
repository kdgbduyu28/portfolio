---
title: Upa
shortName: Upa
category: Real estate · Data & booking
platforms: [Web]
iconImage: ../../assets/projects/upa-icon.png
device: browser
screens:
  - { image: ../../assets/projects/upa-stays.png, caption: 'Stay search with typo-tolerant text, filters and a map' }
  - { image: ../../assets/projects/upa-market.png, caption: 'Merkado: median rents, yield and trends from daily scraped listings' }
  - { image: ../../assets/projects/upa-stay.png, caption: 'A stay with its live availability calendar and night-by-night price' }
  - { image: ../../assets/projects/upa-hood.png, caption: 'Under the hood: the SQL behind each feature, some runnable live' }
tagline: What rent really costs in the Philippines, and stays you can book, with PostgreSQL doing the hard parts
summary: Upa ("rent" in Filipino) is a PostgreSQL showcase. One half is market data. A polite daily scraper collects thousands of public rental and sale listings, and Postgres turns them into medians, neighbourhood breakdowns, gross yields and an "Is this rent fair?" check. The other half is a booking site with demo hosts and stays. The database itself rules out double bookings, decides who sees which bookings and finds stays by typo-tolerant text and distance.
year: 2026
status: Live
order: 3.5
featured: true
accent: '#A63F24'
live: https://upa-ph.pages.dev
repo: https://github.com/kdgbduyu28/Upa
role: Sole engineer. Database design, scraper, app and automation.
stack: [PostgreSQL 17, PostGIS, pg_trgm, pg_cron, Supabase (Auth, Realtime, Storage), Expo, React Native Web, TypeScript, Leaflet, Node.js, cheerio, PGlite, Vitest, GitHub Actions, Cloudflare Pages]
skills: [PostgreSQL & database design, Supabase & PostgreSQL, Database security (RLS), Search & retrieval, Web apps & PWAs, React Native & Expo, React & TypeScript, Testing, CI/CD & automation, Cloudflare]
highlights:
  - 'Double bookings are impossible: an exclusion constraint on date ranges rejects overlapping nights, even when two guests book at once'
  - Row-level security decides what each person sees; guests see their trips, hosts see bookings on their own stays
  - Search tolerates typos and missing accents ("makatii pool", "Paranaque") with full-text search plus trigram word similarity
  - Radius search and nearest-first sorting with PostGIS and a GiST index, plus "search this map area"
  - Market statistics from percentiles, GROUPING SETS and window functions in a materialized view refreshed after every scrape
  - '"Is this rent fair?" ranks a rent among comparable listings with a hypothetical-set aggregate'
  - The scraper sends a page of listings as JSON, and one MERGE … RETURNING statement inserts, updates and writes price history
  - Host dashboard updates live over Realtime; pg_cron completes stays, adds partitions and resets the demo nightly
stats:
  - { value: '5,000+', label: 'listings across 14 cities' }
  - { value: '51', label: 'SQL and scraper tests' }
  - { value: '0', label: 'double bookings possible' }
---

## The idea

I wanted a project whose impressive parts live in the database, not in app code. Rentals were a good fit. Bookings need rules that must hold even under concurrency. Search needs geography and fuzzy text. And "what does rent cost here?" is a statistics question over messy real data.

## What I built

**Merkado** (market) reads Dot Property's public listings once a day: condos, houses, apartments and townhouses, for rent and for sale, in 14 cities. It sorts newest first and rotates through deeper pages day by day, one request every three seconds, honouring robots.txt. Reposts of the same unit by different agents are grouped with trigram similarity so they count once. The site shows medians, the middle half of prices, ₱/m², neighbourhood breakdowns, gross rental yield, short-stay versus long-lease income using AirDNA figures, and the BSP's national price index. Individual scraped listings are never shown, only aggregates.

**Stays** is a booking site with 148 demo stays across 18 cities. Guests search by text, map area, dates, guests, price and amenities, see a night-by-night price that includes seasonal rates, and request or instantly book. Hosts confirm requests on a dashboard that updates live, block dates and set holiday pricing.

## How it works

- **No double bookings:** bookings hold a `daterange`. An `EXCLUDE USING gist (stay_id WITH =, during WITH &&)` constraint rejects any overlapping live booking. A host's blocked dates are rows in the same table, so they block guests too.
- **Permissions in the database:** the browser talks to Postgres through Supabase, so row-level security policies decide who reads which bookings, drafts and reviews. Writes go through SQL functions that check the rules.
- **Search:** a weighted `tsvector` generated column plus `pg_trgm` word similarity, with each query word matched separately. The fuzzy threshold was tuned from measured scores so "baguoi" finds Baguio but "pool" doesn't match "power".
- **Market stats:** a materialized view counts each listing in every month its first-seen to last-seen range overlaps, at the price it had then. Price history is partitioned by month.
- **Tests without Docker:** 51 tests run every migration in PGlite (Postgres compiled to WebAssembly) with PostGIS, covering constraints, policies, search, statistics and the scraper's parser against saved pages.

## Where it stands

Live at [upa-ph.pages.dev](https://upa-ph.pages.dev), with real market data from the first scrapes. Try it with the "Try as a guest" and "Try as a host" buttons on the sign-in page. A native Android app from the same Expo codebase is next.
