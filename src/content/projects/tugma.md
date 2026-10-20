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
summary: Tugma talks to speakers directly over the home network. It makes Sonos stereo pairs from two different models, uses any Sonos speaker as a soundbar's surrounds, controls DLNA and Google Cast speakers from any brand, and adds a per-device EQ for Bluetooth headphones. Native Kotlin and Jetpack Compose, GPL-3.0.
year: 2026
status: In progress
order: 7
featured: true
accent: '#0f5e54'
repo: https://github.com/kdgbduyu28/Tugma
role: Sole engineer. Protocol research, design and development.
stack: [Kotlin, Jetpack Compose, Coroutines & Flow, OkHttp, UPnP / SOAP, SSDP, mDNS (NsdManager), CASTV2 + protobuf, Bluetooth RFCOMM, DynamicsProcessing, JUnit, Gradle]
skills: [Native Android (Kotlin), Testing, Product design]
highlights:
  - Stereo pairs from two different Sonos models, and any speaker as a soundbar's surrounds or sub, which the Sonos app doesn't allow
  - Volume and playback for any brand's DLNA speaker and for Google Cast speakers, displays and groups
  - Google Cast spoken directly (CASTV2 over TLS with hand-written protobuf frames), limited to private-network addresses
  - Every speaker-bonding write is planned, shown and confirmed before it's sent, with a snapshot saved for undo
  - 10-band EQ with a profile per output that switches when your headphones connect, plus AutoEQ import
  - Protocol code is plain Kotlin with no Android dependencies, tested against fake households and a desktop CLI
stats:
  - { value: '3', label: 'protocols: UPnP, Cast, Bluetooth' }
  - { value: '80', label: 'protocol and EQ tests' }
  - { value: 'GPL-3', label: 'open source' }
---

## The problem

Sonos only lets you stereo-pair two speakers of the same model, and only certain models can be a soundbar's surrounds. Their speakers can do more than that; the app just doesn't offer it. Other brands have the same problem: each has its own app, and none of them talks to the others.

I have speakers from several brands at home and wanted one app that controls all of them, including what the official apps won't do.

## What I built

**Tugma** (Filipino for "match") finds every speaker on the Wi-Fi and groups them by brand. For Sonos it can bond a One with an Era 100 as a stereo pair, or add any speaker to a soundbar as a surround or sub. For other brands it gives you volume, mute and playback over the standards they already speak: UPnP/DLNA and Google Cast.

There's also a Headphones tab for Bluetooth: a 10-band EQ with a separate profile for each pair of headphones, which switches by itself when they connect. It can import headphone corrections from the AutoEQ project. Next to it, I'm porting the open-source OpenSCQ30 protocol so Soundcore headphones' own settings (noise cancelling, their built-in EQ) work too.

## How it works

- **Modules:** separate Gradle modules for the shared models, UPnP, Sonos, Cast, EQ and Bluetooth. The protocol modules are plain Kotlin/JVM, so they're unit tested without an emulator and also power a desktop CLI.
- **Sonos (UPnP/SOAP):** SSDP discovery, the zone topology parsed from `ZoneGroupState`, and bonding through `AddBondedZones` and `AddHTSatellite`. I checked every call against the open-source SoCo and pair-sonos projects, which caught two easy mistakes: pairs use `AddBondedZones`, not the older `CreateStereoPair`, and the surround argument is `ChannelMapSet`, not the name the topology shows.
- **Safety:** a bonding change is a plan you see first. It runs only after you confirm, and Tugma saves the topology beforehand so you can undo. Volume and playback skip the confirmation because they can't break a pair.
- **Google Cast:** mDNS discovery with `NsdManager`, then CASTV2 over TLS: length-prefixed protobuf frames I encode by hand, plus the JSON receiver and media namespaces.
- **EQ:** Android's `DynamicsProcessing` on the global mix where the phone allows it, and on each music app's audio session, kept running by a foreground service. AutoEQ parametric filters are evaluated as biquads and sampled onto the EQ's bands.
- **Lint as a safety net:** Android lint runs each phase. It has already caught calls to APIs that only exist on newer Android versions, which would have crashed older phones.

## Where it stands

Phases 0–7 are on GitHub: Sonos pairing and home theater, DLNA, Google Cast and the EQ. The protocol code is tested against fake households and real topology captures from SoCo's test suite. Next: the Soundcore port, testing with real speakers through the CLI, then Xiaomi earbuds.

Tugma is unofficial and not affiliated with Sonos, Google or any speaker maker.
