---
title: Lipad
shortName: Lipad
category: Travel · Flight search
platforms: [Web]
iconImage: ../../assets/projects/lipad-icon.png
device: browser
screens:
  - { image: ../../assets/projects/lipad-home.png, caption: 'Flight search, the budget planner and the cheapest fares from your home airport' }
  - { image: ../../assets/projects/lipad-trip.png, caption: 'Trips that fit a ₱30,000 budget: round-trip flights, daily costs, dates and weather' }
  - { image: ../../assets/projects/lipad-book.png, caption: 'Book on the airline, Trip.com or Aviasales; Lipad never takes payment' }
  - { image: ../../assets/projects/lipad-calendar.png, caption: 'Price calendar: the cheapest fare for each day of the month' }
tagline: Cheap flights from the Philippines, and trips that fit your budget
summary: Lipad ("to fly" in Filipino) is a flight search and price-compare site in the spirit of Skyscanner, built only on free public APIs. On top of the search is a trip budget planner. You give it your budget, dates, who's going and where you fly from, and it ranks destinations by how much money you'd have left, with round-trip flights, daily spending, the weather for those dates and the exchange rate.
year: 2026
status: Live
order: 3.6
featured: true
accent: '#0369A1'
live: https://lipad.pages.dev
repo: https://github.com/kdgbduyu28/Lipad
role: Sole engineer. Product design, API layer, app and deployment.
stack: [Expo SDK 57, React Native Web, Expo Router (static rendering), TypeScript, Zustand, Cloudflare Pages Functions, Cache API, Travelpayouts Data API, Open-Meteo, Frankfurter, Vitest]
skills: [React Native & Expo, React & TypeScript, Web apps & PWAs, Cloudflare, Product design, Testing]
highlights:
  - Search one-way or round trip by exact date or "any day this month", then sort by cheapest, fastest or fewest stops and filter by airline
  - The trip planner ranks destinations by money left over, then re-checks real round-trip fares for the top eight and re-ranks
  - Long-weekend picker built from Philippine holidays joined with weekends
  - Book opens the airline's own site first, then Trip.com, then Aviasales as a fallback, like Skyscanner
  - Cloudflare Pages Functions keep the API token server-side and cache answers at the edge for two hours
  - Every price shows how old it is, and group totals for kids and infants are labeled estimates
  - 40 route pages such as /flights/mnl-tyo are pre-rendered with their own titles so search engines can index them
  - English and Filipino, light and dark mode, phone to desktop
stats:
  - { value: '3,700+', label: 'airports and cities searchable' }
  - { value: '40', label: 'pre-rendered route pages' }
  - { value: '₱0', label: 'API cost: free public data only' }
---

## The idea

Skyscanner and CheapOair started by showing prices and sending people to the airline to buy. I wanted the same thing for Filipino travelers, built entirely on free data, plus the question people actually ask first: "where can I go with ₱20,000?"

## What I built

**Flight search** works like a meta-search site. Pick from and to (a search box over 3,700+ airports and cities, with local names like Boracay, Siargao and Clark), dates or a whole month, and travelers. Results show the airline, stops, travel time and how long ago the price was seen. A price calendar colours each day of a month from cheap to pricey.

**Book** never sells a ticket. It opens the airline's own website first, then Trip.com, then Aviasales, each showing its own final price.

**The trip planner** is a seven-step setup: from, budget, a month or a Philippine long weekend, who's going, local or abroad, nights, and tipid, sakto or sulit style. It takes the cheapest fare to each destination, adds daily spending for that style, and ranks the trips that fit by money left. Then it checks real round-trip fares for the top eight and re-ranks. Each card shows the cheapest dates, the weather on those dates (forecast if soon, last year's if far off) and the exchange rate.

## How it works

- **Free APIs only:** fares from the Travelpayouts Aviasales Data API, airports and airlines from their free data files, weather from Open-Meteo, exchange rates from Frankfurter (ECB). Daily spending is a hand-written table, labeled as an estimate.
- **Token stays on the server:** the app only talks to Cloudflare Pages Functions, which call the fare API, validate input and cache answers at the edge for two hours.
- **Honest prices:** fares are what travelers found recently, so every price says how old it is. Kids count at the adult fare and infants at 10%, labeled as an estimate. Without an API token the whole site runs on clearly labeled sample prices.
- **Search engines:** Expo Router's static rendering pre-builds 40 route pages with their own titles and descriptions, and live prices load on the page.

## Where it stands

Live at [lipad.pages.dev](https://lipad.pages.dev), currently on labeled sample prices until the fare API account is connected. Price alerts and an Android app from the same codebase are next.
