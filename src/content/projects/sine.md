---
title: Sine
shortName: Sine
category: Entertainment · Video player
platforms: [Android TV]
glyph: play
device: tv
screens:
  - { mock: sine-home, caption: Every source on one home screen }
  - { mock: sine-player, caption: 'Dolby Vision, Atmos passthrough and PGS subtitles in one file' }
tagline: A video player for Android TV that plays Dolby Vision remuxes, passes Atmos through and reads every kind of subtitle
summary: Sine replaces switching between Nova, VLC, MX Player and Kodi on a TV. It plays local, USB, SMB, NFS, SFTP, WebDAV, DLNA, Jellyfin, Emby and Plex sources, keeps Dolby Vision and lossless audio intact where the TV allows, and falls back to a second engine when the first can't play a file. Native Kotlin on Media3, FFmpeg and libmpv.
year: 2026
status: In progress
order: 8
featured: true
accent: '#b45309'
repo: https://github.com/kdgbduyu28/Sine
role: Sole engineer. Design and development.
stack: [Kotlin, Compose for TV, Media3 (ExoPlayer), FFmpeg, libmpv, smbj, JSch, OkHttp, Jellyfin / Emby / Plex APIs, OpenSubtitles API, JUnit, Gradle]
skills: [Native Android (Kotlin), Testing, Product design]
highlights:
  - Dolby Vision plays natively where the TV's chip supports the profile, and drops to the HDR10 base layer automatically where it doesn't
  - Sends Dolby Digital, Atmos, TrueHD and DTS bitstreams to the receiver when the HDMI chain accepts them, and decodes them when it doesn't
  - A second engine (libmpv) behind the same player interface takes over when Media3 can't play a file, with the same subtitles, tracks and resume
  - Ten kinds of source, from SMB shares to Jellyfin, Emby and Plex, with resume points written back to the server
  - Switches the TV's refresh rate to match the film (23.976, 24, 25, 50 Hz) and waits while HDMI re-syncs
  - Works as the external player for Jellyfin, Plex, Emby and file managers, using the MX Player and VLC conventions
stats:
  - { value: '2', label: 'playback engines' }
  - { value: '10', label: 'kinds of source' }
  - { value: '50+', label: 'unit tests' }
---

## The problem

Android TV boxes are good hardware held back by their players. One app handles Dolby Vision but not the NAS. Another reads the NAS but downmixes Atmos to stereo. A third has the subtitles right but stutters because the TV is at 60 Hz and the film is at 24. So you end up switching apps by file.

## What I built

**Sine** is one player for all of it. It browses local storage, USB drives, SMB, NFS, SFTP, WebDAV and DLNA, and Jellyfin, Emby and Plex libraries. Pick a file and it plays with the best picture and sound the TV and receiver can take, and tells you when it had to step down.

A "What this TV can play" screen lists the Dolby Vision profiles, HDR formats, display modes, decoders and passthrough formats the device reports, so you know before pressing play.

## How it works

- **Media3 first:** ExoPlayer on the TV's hardware decoders, with Jellyfin's FFmpeg build for audio formats the TV can't decode. Dolby Vision profiles 7 and 8 fall back to their HDR10 base layer when the chip can't decode them. Profile 5 has no base layer, so Sine says so instead of showing wrong colours.
- **mpv as the fallback:** libmpv runs behind Media3's `Player` interface through `SimpleBasePlayer`, so the player screen, track lists, subtitle delay and resume work the same on both. Sine switches by itself when Media3 reports an unsupported container or codec.
- **One proxy for every source:** each source has its own Media3 data source, and a small localhost proxy with range requests lets mpv read all of them the same way.
- **Media servers:** Jellyfin, Emby and Plex over their HTTP APIs, with direct play, the server's subtitles, and progress written back so you can finish on your phone. Plex signs in with a plex.tv link code.
- **Subtitles:** embedded PGS, VobSub, SRT, ASS and WebVTT, sidecar files found by name, and OpenSubtitles search by file hash with your own API key.

## Where it stands

Phases 1 and 2 are on GitHub. Phases 3 to 12 are written and being compiled and tested before they go up: music, photos and a library screensaver, offline downloads, subtitle auto-sync, profiles with age limits, Trakt sync, Kodi `.nfo` metadata, Wake-on-LAN for a sleeping NAS and HDR tone-mapping for TVs without HDR. Sine hasn't been released yet; the next step is testing on real TVs and boxes.
