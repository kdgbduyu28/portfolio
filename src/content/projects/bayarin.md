---
title: Bayarin
shortName: Bayarin
category: Finance · Bills
platforms: [iOS, Android, Web]
iconImage: ../../assets/projects/bayarin-icon.png
device: phone
embed: true
screens:
  - { image: ../../assets/projects/bayarin-home.png, caption: What's due this week and what's left this month, bar: '#f4fbf8' }
  - { image: ../../assets/projects/bayarin-bills.png, caption: 'Every bill, fixed or not', bar: '#f4fbf8' }
  - { image: ../../assets/projects/bayarin-meralco.png, caption: A scanned Meralco bill with kWh history, bar: '#f4fbf8' }
  - { image: ../../assets/projects/bayarin-history.png, caption: Monthly spending by category, bar: '#f4fbf8' }
tagline: Bills and renewals for Filipino households, with bill scanning that reads a Meralco bill for you
summary: Bayarin reminds you before your Meralco, water, internet, rent and credit card bills are due, reads a photo of a bill to record it, and warns you months ahead when your passport, driver's license or car registration is about to expire. Built in Flutter for Android, iOS and the web.
year: 2026
status: Live
order: 6
featured: true
accent: '#00695c'
live: https://bayarin-3q5.pages.dev
role: Sole engineer. Product design and development.
stack: [Flutter 3.35, Dart, Material 3, Riverpod 3, go_router, Google ML Kit, flutter_local_notifications, fl_chart, shared_preferences, Cloudflare Pages]
skills: [Flutter & Dart, Product design, Testing, Cloudflare]
highlights:
  - Reads a photo of a bill on the device (Google ML Kit) and fills in the amount, due date, kWh, billing period and account number, for you to check before saving
  - Bills without a fixed amount (Meralco, water, credit cards) can be entered when they arrive, scanned, or estimated from your last three payments
  - Turns kWh into pesos with Meralco's published rates, read from Presyo's open data
  - Works out LTO registration deadlines from the plate's last two digits
  - Reminders scheduled on the phone, so they fire with the app closed; the web version exports a calendar file instead
  - English and Filipino, dark mode, phone and desktop layouts, backup and restore
stats:
  - { value: '25', label: 'logic and widget tests' }
  - { value: '10+', label: 'billers the scanner knows' }
  - { value: '0', label: 'accounts; data stays on your device' }
---

## The problem

A Filipino household pays a lot of bills, and they don't line up. Meralco, Maynilad, the fiber plan, rent, a credit card or two, SSS. Some are the same every month and some change. Each one has its own due date, and paper bills arrive late or not at all.

Renewals are worse because they're rare. A driver's license or a passport comes up every few years, so nobody remembers until it has already expired. Car registration depends on the last digit of the plate, which few people know by heart.

## What I built

**Bayarin** (Filipino for "bills to pay") has one Due screen: what's overdue, what's due in the next seven days, and how much of this month you've paid. One tap marks a bill paid, with Undo.

For bills that change, you take a photo. Bayarin reads the total, the due date and the kWh, and shows what it found before saving anything. The photo stays with that month's bill. With no photo, it estimates from your recent payments and marks the amount as an estimate.

The Renewals tab tracks passports, licenses, LTO registration, PRC, NBI and insurance, and reminds you as early as each one needs. A passport gets nine months' notice.

## How it works

- **Flutter (Material 3, Riverpod 3, go_router):** one codebase for Android, iOS and the web, with a bottom bar on phones and a side rail on desktop. All the rules (due dates, overdue cycles, month totals, auto-debit) are plain Dart with unit tests.
- **Bill scanning (ML Kit, on device):** bills print labels and amounts in separate columns, which OCR reads as separate blocks. Bayarin rebuilds rows from the text's line boxes before parsing, so "Total Amount Due" ends up next to its number. It's tuned for Meralco, with fallbacks for Maynilad, Manila Water, PLDT, Converge, Globe, SSS, PhilHealth, Pag-IBIG and the major credit cards.
- **Cycles, not dates:** a bill is a first due date plus an interval. Payments attach to a cycle, so a Meralco bill whose printed due date drifts a few days still lands on the right month.
- **Reminders:** scheduled locally on Android and iOS. Browsers can't send reminders with the page closed, so the web version exports an `.ics` file with repeating events and alerts.
- **Electricity estimates:** reads the Meralco and DOE rate data that [Presyo](/projects/presyo) publishes, so the two apps share one data pipeline.

## Try it

The web app is live. Use it in the phone frame on this page and tap "Try with sample data", or open [bayarin-3q5.pages.dev](https://bayarin-3q5.pages.dev). Scanning and phone reminders need the Android or iOS app.
