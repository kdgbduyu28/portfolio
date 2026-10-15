---
title: Clinic Platform
tagline: One system for many clinics, with apps for patients, doctors, assistants and admins
summary: A multi-clinic booking and records platform. Patients book and fill in intake forms; doctors work from a day calendar, dental chart and visit notes; admins run their own clinic. Every clinic's data is kept apart by the database itself.
year: 2026
status: Live
order: 1
featured: true
demo:
  kind: clinic-mock
accent: '#0f766e'
role: Design, front end, database and deployment
stack: [React Native for Web, Expo Router, TypeScript, Supabase, PostgreSQL, Row Level Security, Cloudflare Pages, Turnstile, Vitest]
skills: [React Native & Expo, TypeScript, Supabase & PostgreSQL, Database security (RLS), Product design, Testing, Cloudflare]
highlights:
  - Four apps (patient, doctor, assistant, admin) built from one shared code package
  - Many clinics on one database, kept apart by Row Level Security rather than separate servers
  - Month, week and day calendar with rescheduling and a live status board for the waiting room
  - Tooth-by-tooth dental chart, private clinical notes and printable statements
  - Patients fill in their intake form on a clinic tablet, which locks behind a staff PIN when handed back
  - CSV import and export, audit log, and a Privacy Policy written for the Data Privacy Act (RA 10173)
  - Rebuilt from Flutter to React Native, with every screen ported and 184 automated tests
stats:
  - { value: '4', label: 'apps from one codebase' }
  - { value: '184', label: 'automated tests' }
  - { value: '30+', label: 'database migrations' }
---

## The problem

Small clinics in the Philippines often run on paper logbooks, Messenger and a spreadsheet. Patients can't see open slots, assistants re-type the same details at every visit, and a doctor's notes sit in a folder only one person can find.

Off-the-shelf clinic software is priced for hospitals. A small clinic needs something cheaper that still keeps patient data properly separated and private.

## What we built

One platform with four web apps, each made for one person's job:

- **Patient app:** book or reschedule visits, fill in the intake form (including a parent or guardian for minors), add visits to a phone calendar, and see past visits.
- **Doctor app:** a day, week or month calendar, the patient's history, a tooth-by-tooth dental chart and private visit notes that only clinicians can read.
- **Assistant app:** a front-desk status board (waiting, in the chair, done), walk-in booking and recording missed visits.
- **Admin app:** clinic settings, branches, staff invites and codes, billing, CSV import and export, and an audit log of who changed what.

## How it works

There is no custom server. The apps talk straight to **Supabase** (Postgres plus sign-in), and every rule about who can see what is written into the database as **Row Level Security** policies. A doctor at one clinic cannot read another clinic's patients even if the app has a bug, because the database refuses the query.

Each clinic is just a row in a `clinics` table, so adding a new clinic means adding data, not releasing a new version. A person can be a patient at one clinic and on staff at another, with one login.

The front end started in Flutter. We rebuilt it in **React Native for Web with Expo Router** so the four apps could share one TypeScript package of screens, data access and components. The rebuild ported every screen and added 184 tests, and all four apps deploy to Cloudflare Pages with a single script.

## Privacy

Patient data is sensitive, so the screenshots on this page use **made-up patients and appointments only**. The platform includes a Privacy Policy and Terms written for the Philippine Data Privacy Act (RA 10173), sign-up consent, Cloudflare Turnstile against bots, and an audit trail.
