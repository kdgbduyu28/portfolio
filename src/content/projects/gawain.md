---
title: Gawain
shortName: Gawain
category: Productivity · Home
platforms: [iOS, Android, Web]
iconImage: ../../assets/projects/gawain-icon.png
device: phone
embed: true
screens:
  - { image: ../../assets/projects/gawain-today.png, caption: Chores that fit before your next meeting, bar: '#f4f5f3' }
  - { image: ../../assets/projects/gawain-chores.png, caption: Due from when you last did it, bar: '#f4f5f3' }
  - { image: ../../assets/projects/gawain-list.png, caption: Shopping list with run-out predictions, bar: '#f4f5f3' }
  - { image: ../../assets/projects/gawain-pantry.png, caption: Pantry that learns how long things last, bar: '#f4f5f3' }
tagline: A chore app for working from home that fits housework into the gaps between your meetings
summary: Chores repeat from the last time you actually did them, not on fixed dates. Gawain reads your calendar, suggests chores that fit before your next meeting, holds the washer reminder until your call ends, and keeps a pantry and grocery list that reminds you when you leave the house. It can sync a household across devices and take events from smart-home buttons and sensors.
year: 2026
status: Live
order: 5
featured: true
accent: '#047857'
live: https://gawain-ccn.pages.dev
repo: https://github.com/kdgbduyu28/Gawain
role: Sole engineer. Product design and development.
stack: [Expo SDK 57, React Native, Expo Router, TypeScript, Zustand, Supabase, PostgreSQL, Supabase Realtime, expo-calendar, expo-location, expo-notifications, Service Worker, Cloudflare Pages Functions, Home Assistant, Vitest, PGlite]
skills: [React Native & Expo, TypeScript, Supabase & PostgreSQL, Database security (RLS), Product design, Testing, Cloudflare]
highlights:
  - Repeats from when you last did it, so doing a chore late moves the next one too, and nothing nags on the wrong day
  - Finds free time between meetings and suggests chores that fit, keeping work-hour breaks short and a buffer before each call
  - "Appliance timers that check your calendar: if the washer finishes during standup, the reminder comes when standup ends"
  - Pantry that learns how long each item lasts from your purchases and warns you before it runs out
  - Leave-home and arrive-at-store reminders through phone geofencing, with location kept on the device
  - Reads your calendar from the phone, or from a Google/Outlook iCal link with repeating meetings, time zones and moved or cancelled meetings
  - Installable web app that works offline, with browser reminders, desktop layout, dark mode and backup files
  - Optional sign-in syncs a household across phones and browsers, and keeps working offline in between
  - "Smart-home triggers: a Home Assistant sensor, an NFC tag or a button can mark a chore done or start the washer timer, and reminders can be spoken on a Sonos or Nest speaker"
stats:
  - { value: '107', label: 'automated tests' }
  - { value: '3', label: 'platforms, one codebase' }
  - { value: '0', label: 'sign-ups needed; sync is optional' }
---

## The problem

I work from home, and chores fill the small gaps in my day: ten minutes before a call, the hour after work. The usual tools get chores wrong.

Calendars and to-do apps repeat on fixed dates. "Clean the fridge every two weeks" really means two weeks after you last cleaned it. If you do it late, the next one should move too. Fixed dates nag you on the wrong day, so you start ignoring them. None of these apps know when you're free, either.

## What I built

**Gawain** (Filipino for "chore" or "task") keeps each chore on its own interval, counted from when you actually did it. The Today screen looks at your meetings and says what fits right now: "20 min before Design review. Take out the trash (5 min)?" During work hours it suggests only short chores. Bigger ones wait until evening.

Appliance timers work the same way. Start the washer and Gawain works out that it finishes during a meeting, so it reminds you a couple of minutes after the meeting ends.

The pantry side tracks what's running low. Mark something Low or Out and it goes on the shopping list. Tick it off when you buy it, and after a few purchases Gawain learns how long each item lasts and warns you before it runs out. On a phone it can remind you when you leave home, and when you walk into a store you've saved it shows only that store's items.

## How it works

- **Scheduling (TypeScript, Vitest):** pure functions for due dates, urgency, free-time gaps and meeting-aware reminders, all unit tested. Gaps are split at work-hour boundaries so a break between meetings gets one quick chore, not a long one.
- **Calendars:** on phones, `expo-calendar` reads busy times from every account on the device, read-only. Anywhere else, you paste a Google or Outlook iCal link. A small parser expands repeating meetings (daily, weekly, "second Tuesday"), applies time zones including Outlook's Windows zone names, and handles skipped, moved and cancelled meetings.
- **Web:** a Cloudflare Pages Function fetches the calendar link for the browser, because calendar sites block cross-site requests. It only talks to known calendar hosts, and the link travels in the request body, so it never shows up in logs. A service worker makes the app open offline, and reminders arrive as browser notifications while the app is open.
- **Location:** `expo-location` geofencing hands the watching to the phone's OS, so the app doesn't run in the background and battery use stays low. A small background task builds the "you're out, 6 items on your list" notification.
- **Local first, sync optional:** everything is stored on the device with Zustand, and the app works fully without an account. Signing in (Supabase) syncs a household across devices. Each device keeps the server's last copy of every row plus its own unsent edits, and merges last-write-wins per row, so it works offline and catches up later. Row-level security keeps each household's rows to its members, and the sync is tested against a real Postgres (PGlite) with several simulated devices.
- **Smart home:** anything that can send a web request (Home Assistant, an iPhone Shortcut on an NFC tag, `curl`) posts "washer finished" or "trash pressed" to the household's secret link. A Pages Function passes it to a Postgres function that only stores a hash of the link's token, and devices pick the event up over Realtime and apply it with the app's own rules: a button press counts as doing the chore, and a washer that finishes mid-meeting reminds you after it.
- **Spoken reminders:** reminders can be announced on a speaker through your own Home Assistant. The address and token stay on the device and are left out of backups.

## Try it

The web app is live. Use it in the phone frame on this page, or open [gawain-ccn.pages.dev](https://gawain-ccn.pages.dev) on your phone and add it to your home screen. The code is on [GitHub](https://github.com/kdgbduyu28/Gawain).
