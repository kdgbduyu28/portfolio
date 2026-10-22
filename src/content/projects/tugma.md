---
title: Tugma
shortName: Tugma
category: Music & Audio · Speakers
platforms: [Android]
glyph: speakers
device: phone
screens:
  - { mock: tugma-speakers, caption: 'Every speaker on the network, any brand' }
  - { mock: tugma-pair, caption: A stereo pair from two different Sonos models }
  - { mock: tugma-eq, caption: Phone-side EQ with a profile per headphone }
tagline: An open-source Android app that pairs speakers the official apps won't
summary: Tugma talks to speakers directly over the home network. It makes Sonos stereo pairs from two different models, uses any Sonos speaker as a soundbar's surrounds, controls Linkplay (WiiM, Arylic, Audio Pro), DLNA and Google Cast speakers from any brand, and reaches into Soundcore and Redmi earbuds' own settings. Native Kotlin and Jetpack Compose, GPL-3.0.
year: 2026
status: In progress
order: 7
featured: true
accent: '#0f5e54'
repo: https://github.com/kdgbduyu28/Tugma
links:
  - { label: Android APK, url: 'https://github.com/kdgbduyu28/Tugma/releases' }
role: Sole engineer. Protocol research, design and development.
stack: [Kotlin, Jetpack Compose, Coroutines & Flow, OkHttp, UPnP / SOAP, UPnP GENA events, SSDP, mDNS (NsdManager), CASTV2 + protobuf, Linkplay HTTP API, Bluetooth RFCOMM, BLE GATT, DynamicsProcessing, JUnit, Gradle, GitHub Actions]
skills: [Native Android (Kotlin), Testing, CI/CD & automation, Product design]
highlights:
  - Stereo pairs from two different Sonos models, and any speaker as a soundbar's surrounds or sub, which the Sonos app doesn't allow
  - "Sonos beyond pairing: multiroom groups, scenes with reminders, favorites, the queue, line-in and TV inputs, alarms and sleep timers"
  - Volume and playback for any brand's DLNA speaker, Linkplay speakers (groups, stereo pairs, presets) and Google Cast speakers, displays and groups
  - Live now-playing and volume from UPnP event subscriptions, falling back to slow polling when a speaker won't send events
  - Google Cast spoken directly (CASTV2 over TLS with hand-written protobuf frames), limited to private-network addresses
  - Every speaker-bonding write is planned, shown and confirmed before it's sent, with a snapshot saved for undo
  - 10-band EQ with a profile per output that switches when your headphones connect, plus AutoEQ import
  - Soundcore and Redmi Buds settings (noise cancelling, the earbuds' own EQ, battery) ported from OpenSCQ30 and Gadgetbridge, including Redmi's challenge-response handshake
  - "A protocol lab for unknown devices: raw RFCOMM, BLE and USB explorers and Bluetooth log import with automatic framing analysis"
  - "Everyday controls: a home-screen widget, a lock-screen remote that takes the volume buttons, a volume mixer across brands, and backup and restore"
  - Protocol code is plain Kotlin with no Android dependencies, tested against fake households and a desktop CLI
stats:
  - { value: '6', label: 'brands and protocols, from Sonos to Redmi' }
  - { value: '168', label: 'protocol, EQ and Bluetooth tests' }
  - { value: 'GPL-3', label: 'open source' }
---

## The problem

Sonos only lets you stereo-pair two speakers of the same model, and only certain models can be a soundbar's surrounds. Their speakers can do more than that; the app just doesn't offer it. Other brands have the same problem: each has its own app, and none of them talks to the others.

I have speakers from several brands at home and wanted one app that controls all of them, including what the official apps won't do.

## What I built

**Tugma** (Filipino for "match") finds every speaker on the Wi-Fi and groups them by brand. For Sonos it can bond a One with an Era 100 as a stereo pair, or add any speaker to a soundbar as a surround or sub. For other brands it gives you volume, mute and playback over the standards they already speak: UPnP/DLNA and Google Cast.

Beyond pairing, Tugma covers what you'd use the official app for every day: Sonos groups, scenes, favorites, alarms and the queue; Linkplay speakers from WiiM, Arylic and Audio Pro, including stereo pairs across models; a volume mixer for every speaker in the house; and a home-screen widget and lock-screen remote.

There's also a Headphones tab for Bluetooth: a 10-band EQ with a separate profile for each pair of headphones, which switches by itself when they connect. It can import headphone corrections from the AutoEQ project. Soundcore headphones (ported from OpenSCQ30) and Redmi Buds (ported from Gadgetbridge) get their own settings: noise cancelling, the earbuds' built-in EQ and battery.

## How it works

- **Modules:** separate Gradle modules for the shared models, UPnP, Sonos, Cast, EQ and Bluetooth. The protocol modules are plain Kotlin/JVM, so they're unit tested without an emulator and also power a desktop CLI.
- **Sonos (UPnP/SOAP):** SSDP discovery, the zone topology parsed from `ZoneGroupState`, and bonding through `AddBondedZones` and `AddHTSatellite`. I checked every call against the open-source SoCo and pair-sonos projects, which caught two easy mistakes: pairs use `AddBondedZones`, not the older `CreateStereoPair`, and the surround argument is `ChannelMapSet`, not the name the topology shows.
- **Safety:** a bonding change is a plan you see first. It runs only after you confirm, and Tugma saves the topology beforehand so you can undo. Volume and playback skip the confirmation because they can't break a pair.
- **Google Cast:** mDNS discovery with `NsdManager`, then CASTV2 over TLS: length-prefixed protobuf frames I encode by hand, plus the JSON receiver and media namespaces.
- **EQ:** Android's `DynamicsProcessing` on the global mix where the phone allows it, and on each music app's audio session, kept running by a foreground service. AutoEQ parametric filters are evaluated as biquads and sampled onto the EQ's bands.
- **Linkplay:** the `httpapi.asp` command API (HTTPS on WiiM), with a planner for multiroom groups and left/right channels, the same plan-then-confirm flow as Sonos.
- **Earbuds:** Bluetooth RFCOMM sessions with framing and checksums for Soundcore, and Redmi's authenticated protocol including its challenge-response handshake. The Redmi files keep Gadgetbridge's AGPL-3.0 licence.
- **Lint as a safety net:** Android lint runs each phase. It has already caught calls to APIs that only exist on newer Android versions, which would have crashed older phones.

## Where it stands

Phases 0–48 are on GitHub, with CI running the tests and lint on every push, and a debug-signed APK you can install from [Releases](https://github.com/kdgbduyu28/Tugma/releases). The protocol code is tested against fake households and real topology captures from SoCo's test suite, but the app hasn't been tried on real speakers yet. That's next, starting with the CLI's read-only checks and dry runs.

Tugma is unofficial and not affiliated with Sonos, Google or any speaker maker.
