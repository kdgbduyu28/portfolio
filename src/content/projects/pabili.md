---
title: Pabili
tagline: A pretend shopping app with the features people love about Shopee and Lazada
summary: A complete shopping app (browse, cart, vouchers, checkout, order tracking) plus the games and social features that keep people coming back. Everything is pretend; no real payments are taken.
year: 2026
status: Live
order: 3
featured: true
demo:
  kind: phone
  url: https://pabili.pages.dev
accent: '#f43f5e'
screenshot: ../../assets/projects/pabili.png
live: https://pabili.pages.dev
repo: https://github.com/kdgbduyu28/Pabili
role: Product design and development
stack: [Expo, React Native, Expo Router, TypeScript, Zustand, EAS, Cloudflare Pages]
skills: [React Native & Expo, TypeScript, Product design, Testing, Cloudflare]
highlights:
  - Full shopping flow, from search and categories to cart, vouchers, checkout and order tracking
  - Engagement features modelled on the big apps (daily coins, spin the wheel, Slash It, group buys, live selling, a virtual garden)
  - Shop pages, chat with sellers, ratings with photos, likes and following
  - Yearly "Wrapped" summary and achievements
  - Dark mode, Filipino/English toggle and local phone notifications
  - Installable as a web app, with EAS profiles ready for Android and iOS builds
stats:
  - { value: '30+', label: 'screens' }
  - { value: '2', label: 'languages' }
  - { value: '3', label: 'platforms: web, Android, iOS' }
---

## Why build it

Shopee and Lazada are some of the most-used apps in the Philippines, and much of what makes them work isn't the shopping. It's the coins, the flash deals and the games. Pabili is a study of those patterns: how much product and UI work goes into an app that people open every day.

## What we built

A shopping app with real depth:

- **Shopping:** home feed, categories, search, product pages, shops, cart, vouchers, address book, checkout and order tracking through to unboxing and rating.
- **Engagement:** daily coin check-in, spin the wheel, Slash It (invite friends to cut a price), group buys, mega sales, a virtual garden and a shake-to-win game.
- **Social:** chat with sellers, a feed, following shops, likes and a yearly "Wrapped" recap.
- **Polish:** dark mode, Filipino/English, haptics and sounds, notifications for parcel arrivals and restocks, and an installable web app.

## How it works

Pabili is one **Expo / React Native** codebase that runs on the web, Android and iOS. Navigation uses **Expo Router**, state lives in a **Zustand** store saved on the device, and the catalogue is generated data, so nothing ships and nothing is charged.

The web build is deployed to Cloudflare Pages. EAS build profiles are set up for an installable Android APK and store builds.

## Try it

The app is live. Use it in the phone frame on this page, or open [pabili.pages.dev](https://pabili.pages.dev) on your phone and add it to your home screen.
