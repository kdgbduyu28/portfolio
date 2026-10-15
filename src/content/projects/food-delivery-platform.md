---
title: Campus Food-Ordering Platform
tagline: Four native apps, two web portals and a full serverless backend, live on the App Store and Google Play
summary: A campus marketplace connecting customers, merchants and riders, covering discovery, split-tender checkout, dispatch, live tracking and settlement, plus an internal admin layer for onboarding, financial policy and oversight. I designed, built, released and operate every part of it.
year: 2022
status: In production
order: 1
featured: true
demo:
  kind: layers
  rows:
    - label: Clients
      items:
        - { name: Customer, note: Flutter · iOS/Android }
        - { name: Rider, note: Flutter · iOS/Android }
        - { name: Merchant, note: Flutter · mobile + web }
        - { name: Admin, note: web · internal iOS }
    - label: API & identity
      items:
        - { name: API Gateway, note: REST }
        - { name: AppSync, note: GraphQL · real-time }
        - { name: Cognito + IAM, note: custom auth challenges }
    - label: Services
      emphasis: true
      items:
        - { name: AWS Lambda · Node.js, note: 'dozens of services: payments, orders, dispatch, ads, messaging, identity' }
    - label: Data & events
      items:
        - { name: DynamoDB, note: GSIs · conditional writes }
        - { name: EventBridge, note: schedules · sweeps }
        - { name: Step Functions, note: SNS · SQS · SES }
        - { name: S3 · CloudWatch, note: storage · alerts }
    - label: External
      items:
        - { name: Stripe Connect, note: + 2 meal-plan processors }
        - { name: Twilio · FCM, note: masked calls · push }
        - { name: Google Maps, note: tiered cache }
        - { name: Slack, note: alerts }
accent: '#c2410c'
links:
  - { label: App Store, url: 'https://apps.apple.com/us/developer/https-www-byppo-com/id1755669272' }
  - { label: Google Play, url: 'https://play.google.com/store/apps/developer?id=Byppo+Technologies,+LLC' }
role: Sole engineer. Clients, serverless backend, payments and settlement, release pipeline.
stack: [Flutter, Dart, Node.js, AWS Lambda, API Gateway, AppSync GraphQL, DynamoDB, Cognito, Step Functions, EventBridge, Stripe Connect, Twilio, Firebase, Google Maps, fastlane]
skills: [Flutter & Dart, Node.js & GraphQL, AWS serverless, Payments (Stripe Connect), App Store & Play releases, CI/CD & automation, Testing, Product design]
highlights:
  - 9 campuses, 15,000+ orders and 219 merchants in production
  - Customer, rider and merchant apps on iOS and Android, plus merchant and admin web portals
  - Split-tender checkout across meal plans, declining balance and cards, summed in integer cents
  - Found and eliminated a production double-charge caused by retries regenerating the idempotency key
  - Traced about 4 million promotion reads a day to a client loop and fixed it server-side, with no app release
  - One command ships all four apps to TestFlight, the App Store and Google Play
stats:
  - { value: '9', label: 'campuses in production' }
  - { value: '15,000+', label: 'orders processed' }
  - { value: '219', label: 'merchants onboarded' }
---

## The system

A campus marketplace with four products:

- **Customer app (iOS, Android):** discovery and maps, cart, promotions, split-tender checkout, live tracking, chat and rewards.
- **Rider app (iOS, Android):** job offers with accept-rate scoring, navigation, proof of delivery, masked calling and earnings.
- **Merchant app and portal (iOS, Android, web):** order queue, menu and inventory, hours, promotions, store ads and payouts.
- **Admin portal (web, internal iOS):** vendor onboarding, financial policy, delivery oversight, rider suspension, ads and analytics.

The backend is the largest part of the project and entirely mine: I designed the data model, wrote every service, and run them in production on AWS Lambda behind API Gateway and AppSync GraphQL.

## Selected engineering

- **Split-tender correctness.** One checkout can draw on a meal plan, declining balance and a card. Fees are summed in integer cents, so the processor, the ledger and reconciliation agree to the penny.
- **A double-charge from retries.** Retries were regenerating the idempotency key, which caused a double-charge in production. I traced and eliminated it.
- **Two riders, one order, the wrong card.** Simultaneous rider deposits let a penalty hit the wrong card. A conditional-write lock now allows one hold per order, penalties charge only the cancelling rider, and suspension is enforced server-side on every clock-in, deposit and accept.
- **Server-driven checkout.** Per-merchant policy decides what checkout shows: tax, tips, meal-plan coverage and second-tender rules. Missing settings default to enabled, so merchants need no migration and pricing stays on the server.
- **Live tracking on unreliable Wi-Fi.** Subscription sockets could stay open but silent. A watchdog repairs them, and polling and push fallbacks keep tracking live.
- **Cloud cost.** A tiered DynamoDB cache holds geocodes for 30 days and routes for 6 hours, inside Google's caching terms. A spike of about 4 million promotion reads a day was traced to an app loop and fixed server-side.

## Shipping safely

Releases go out roughly weekly. Unreleased features sit behind **release locks that fail closed**: a global setting, an environment allow-list and a per-campus switch, so a feature stays off unless every one says on. Stripe dispute handling (67 unit tests) and server-side rider auto-accept (38 unit tests) are built this way and piloting before launch.

An audit log of who changed which account or setting used to full-scan a ~64k-item table. It now reads from a sparse DynamoDB index that holds only audit-worthy rows.

## About this page

The apps are live on the App Store and Google Play. The client's code is private, so this page describes the system rather than linking to source. The full write-up is in the [technical portfolio PDF](/portfolio.pdf).
