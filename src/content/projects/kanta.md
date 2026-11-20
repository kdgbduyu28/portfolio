---
title: Kanta
shortName: Kanta
category: Music & Audio · Player
platforms: [Android]
iconImage: ../../assets/projects/kanta-icon.png
device: phone
screens:
  - { image: ../../assets/projects/kanta-home.png, caption: 'Recently played and every source, Spotify to local files', bar: '#08090E', barText: light }
  - { image: ../../assets/projects/kanta-nowplaying.png, caption: Now Playing for whatever app the song lives in, bar: '#08090E', barText: light }
  - { image: ../../assets/projects/kanta-library.png, caption: Playlists that mix songs from different apps, bar: '#08090E', barText: light }
  - { image: ../../assets/projects/kanta-equalizer.png, caption: A 9-band equalizer for music on the phone, bar: '#08090E', barText: light }
tagline: One library, one set of playlists and one queue for Spotify, YouTube Music, Apple Music and the music on your phone
summary: Kanta is a music hub for Android. It doesn't sign in to any music service or stream anything itself. Instead it controls the music apps already on the phone through Android's media controls, the same system the lock screen uses, so you keep full songs and background playback. Music files on the phone play in Kanta's own player, with a real equalizer, crossfade and lossless output.
year: 2026
status: In progress
order: 9
featured: true
accent: '#7c3aed'
repo: https://github.com/kdgbduyu28/Kanta
links:
  - { label: Android APK, url: 'https://github.com/kdgbduyu28/Kanta/releases' }
role: Engineer. Research, product design and development.
stack: [React Native, Expo SDK 57, TypeScript, Expo Router, Zustand, Reanimated, expo-sqlite, Kotlin, Expo Modules API, MediaSessionManager, NotificationListenerService, Media3 (ExoPlayer + MediaSession), DynamicsProcessing, Spotify App Remote SDK, LRCLIB, Vitest, JUnit, GitHub Actions]
skills: [React Native & Expo, Native Android (Kotlin), Testing, Product design, CI/CD & automation]
highlights:
  - Sees and controls whatever plays in Spotify, YouTube Music or Apple Music through Android's media sessions, with no developer accounts or unofficial APIs
  - One queue across apps that starts each song in the right app when the previous one ends, running in a background service with Kanta closed
  - Songs saved by sharing them from any music app, pasting a link, or tapping the heart on Now Playing
  - Music files on the phone play in Kanta's own Media3 player with a 9-band equalizer, presets, crossfade, gapless playback, normalization and balance
  - Audio quality modes up to hi-res, with bit-perfect output to a USB DAC on Android 14 and newer
  - Listening history across all the apps, synced lyrics from LRCLIB, and English and Filipino
  - An optional Spotify App Remote mode that starts and queues Spotify songs without switching apps
stats:
  - { value: '4', label: 'sources in one queue' }
  - { value: '63', label: 'TypeScript and Kotlin tests' }
  - { value: '0', label: 'accounts; everything stays on the phone' }
---

## The problem

Music lives in different apps. Some songs are only on Spotify, some only on YouTube Music, some are files on the phone, and each app has its own library and its own queue. I wanted one place to keep them all and play them in one order.

The obvious ways to build that don't work. Spotify's developer program now limits personal apps to five users and forbids mixing its content with other services. YouTube Music has no playback API at all. Embedding the services' web players gives 30-second previews on a phone and stops when the screen locks.

## What I built

**Kanta** (Filipino for "song") draws the screens and lets the installed apps play the audio. You keep full songs, background play and lock-screen controls, and Kanta never needs your passwords.

You save songs by sharing them from any music app, pasting a link, or tapping the heart while a song plays. Playlists can mix sources, so one list can go from a Spotify song to a YouTube Music song to a FLAC file on the phone. Music files on the phone play in Kanta's own player, where the equalizer, crossfade and lossless settings from the design actually apply.

## How it works

- **Seeing and controlling other apps:** with notification access, a `NotificationListenerService` reads the active media sessions of the three music apps and sends play, pause, skip and seek through `MediaController`. Kanta's screens update from those events.
- **Starting a specific song:** if the app's media session accepts `playFromUri`, Kanta hands the song over directly, which works with the phone locked. If it doesn't, Kanta opens the song's link in that app. When Android blocks opening an app from the background, Kanta shows an "Up next" notification you tap instead.
- **One queue across apps:** a queue engine in Kotlin follows every session and works out when the queued song has finished versus when you skipped it, even when an app titles it differently ("Yellow - Remastered 2021" and "Coldplay - Topic"). It then starts the next song wherever it lives. The queue is saved, so it survives Kanta being closed.
- **Music on the phone:** a Media3 `MediaSessionService` plays the files with its own lock-screen controls. Android's `DynamicsProcessing` effect gives all 9 equalizer bands from the design plus a limiter and left/right balance. A second player handles crossfades, and the quality modes switch the audio output path.
- **One database, two languages:** the TypeScript app owns the SQLite schema; the Kotlin service writes only listening history and the queue to the same file.

## Where it stands

Version 0.1.0 is on [GitHub](https://github.com/kdgbduyu28/Kanta), with an APK you can install from [Releases](https://github.com/kdgbduyu28/Kanta/releases). CI runs the 53 TypeScript tests, type-checking, lint and the 10 Kotlin unit tests on every push, and GitHub Actions builds the APK from each version tag. The app hasn't been tried on a real phone yet. Next is a small test app that checks how each music app responds to being controlled, which will tune how Kanta starts songs and spots the end of one.

Kanta is unofficial and not affiliated with Spotify, Google or Apple.
