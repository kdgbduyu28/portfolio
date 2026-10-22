---
title: D-Touch Health Platform
shortName: D-Touch
category: Medical · Clinic management
platforms: [Web, Android]
glyph: tooth
device: tablet
screens:
  - { mock: clinic-day, caption: Doctor's day and dental chart }
  - { mock: clinic-patient, caption: Patient booking, device: phone }
  - { mock: clinic-board, caption: Front-desk status board }
tagline: Clinic management SaaS for many independent clinics, with every authorization rule enforced in PostgreSQL
summary: Four React Native apps (patient, doctor, front desk, admin), on the web and as Android builds, on one Supabase Postgres backend, serving any number of clinics. There is no custom application server; tenant isolation, roles and privacy all live in the database. D-Touch Dental is the first clinic, running on test data ahead of launch.
year: 2024
status: Pre-launch
order: 2
featured: true
accent: '#0f766e'
repo: https://github.com/kdgbduyu28/health-platform-fe
links:
  - { label: Backend repo, url: 'https://github.com/kdgbduyu28/health-platform-be' }
  - { label: Android APKs, url: 'https://github.com/kdgbduyu28/health-platform-fe/releases' }
role: Sole engineer. Product, front end, database and deployment.
stack: [React Native for Web, Expo Router, React 19, TypeScript, TanStack Query, Supabase, PostgreSQL 17, Row Level Security, PL/pgSQL, Deno Edge Functions, Web Push, Cloudflare Pages, Turnstile, Vitest, GitHub Actions]
skills: [React Native & Expo, TypeScript, Supabase & PostgreSQL, Database security (RLS), Product design, Testing, CI/CD & automation, Cloudflare]
highlights:
  - 77 Row Level Security policies across 28 tables; tables deny by default
  - 660+ database checks verify tenant isolation and every role's access
  - Exclusion constraints make double-booking impossible for any doctor or patient chart
  - CSV imports you can preview with a real dry run, then undo as a batch
  - An audit log written by database triggers, so no client can skip it
  - Consent recorded per Privacy Policy version and per clinic, under the Data Privacy Act (RA 10173)
  - Rewritten from Flutter to React Native for Web, about 30,600 lines and 78 routes, with 187 Vitest tests
  - The same code builds Android APKs of all four apps, which GitHub Actions publishes as one release per version
stats:
  - { value: '77', label: 'RLS policies' }
  - { value: '660+', label: 'database checks' }
  - { value: '187', label: 'Vitest tests' }
---

## What it is

Small clinics in the Philippines often run on paper logbooks, Messenger and a spreadsheet. This platform gives each clinic four apps, one for each person's job, built for landscape tablets and desktops:

- **Patient:** book and reschedule, a four-step intake form a guardian can complete, visit history, and a private calendar feed.
- **Doctor:** day, week and month views, tooth charting (FDI or Universal), clinician-only notes and patient handover.
- **Front desk:** a drag-and-drop status board from confirmed to arrived, in consultation and completed, plus walk-ins and recall lists.
- **Admin:** staff invite codes with approval, billing with GCash, QR Ph, bank transfer or cash, an expense ledger, CSV import and export, and the audit log.

It started as one dental practice with three hard-coded clinic identities. It is now multi-tenant: clinics are data rows, the clinic type switches dental features on per vertical, and each clinic has its own public page.

## The database is the backend

There is no custom application server and no role logic in client queries. The apps talk to PostgREST and Supabase Auth, and **PostgreSQL enforces every rule**: 77 Row Level Security policies, 100+ PL/pgSQL functions and 50+ triggers, checked by 660+ database tests.

- **A role that leaked across tenants.** Roles used to live on the global user profile, so one clinic's admin could promote a person at another clinic. Roles now sit on each clinic membership, a trigger restricts branch-locked admins, and a guard keeps every clinic's last full admin.
- **Overlap rules that respect privacy.** Scheduling clashes are checked per patient chart, not per person. A person-wide rule would let one clinic discover that the same patient has a booking at another.
- **Notifications sent from the database.** One SQL function writes the inbox row, checks mutes, and calls a Deno Edge Function through `pg_net` for Web Push. `pg_cron` sends reminders.
- **Integrity by construction.** Time-range exclusion constraints stop double-booking, composite foreign keys keep each appointment inside its own clinic, and walk-ins run in one transaction, so a lost slot race leaves no orphan chart.

## Privacy

The platform is **pre-launch and runs on test data**. The picture on this page is a drawn mock-up with made-up patients and visits; no real patient information appears on this site.

Sign-up records which version of the Privacy Policy and Terms each person was shown. Consent to process health information is collected separately, per clinic, as the National Privacy Commission recommends.
