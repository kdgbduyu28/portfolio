---
title: Habulan
shortName: Habulan
category: Games · Action RPG
platforms: [Android, Web]
iconImage: ../../assets/projects/habulan-icon.png
device: phone
embed: true
screens:
  - { image: ../../assets/projects/habulan-combat.jpg, caption: 'Auto-attack, tap skills: Trumpo Whirlwind against a duwende swarm', bar: '#140b0e', barText: light }
  - { image: ../../assets/projects/habulan-field.jpg, caption: 'Roam the field and walk up to a dungeon entrance to inspect it', bar: '#140b0e', barText: light }
  - { image: ../../assets/projects/habulan-inspect.jpg, caption: 'Inspect before you commit: readiness per hero, enemies met, rewards and your record', bar: '#140b0e', barText: light }
  - { image: ../../assets/projects/habulan-title.jpg, caption: 'Three heroes, each with their own story through the same dungeons', bar: '#140b0e', barText: light }
tagline: A portrait dungeon crawler set in Filipino folklore, in short sessions
summary: Habulan ("tag", the street game) is a 3D isometric action RPG for phones and the browser. You roam an open field, walk up to a dungeon, check whether your heroes are ready, and go in when you are. Your hero auto-attacks; you tap skills, dodge and drink potions against duwende, tiyanak and aswang. Three heroes, a Barbarian, a Mage and an Archer, each have their own story and share one bag of Diablo-style loot. Runs take five to ten minutes, with no energy timers or daily logins.
year: 2026
status: Live
order: 3.7
featured: true
accent: '#B3263A'
live: https://habulan.pages.dev
repo: https://github.com/kdgbduyu28/Habulan
links:
  - { label: Android APK, url: 'https://github.com/kdgbduyu28/Habulan/releases' }
role: Sole developer. Game design, programming, writing and release.
stack: [Godot 4.7, GDScript, GL Compatibility renderer, GUT, KayKit low-poly assets, WebAssembly, GitHub Actions, Cloudflare Pages]
skills: [Game development (Godot), Product design, Testing, CI/CD & automation, Cloudflare]
highlights:
  - One Godot project ships to Android (APK built by GitHub Actions on a version tag) and the browser (Cloudflare Pages)
  - Portrait, fixed isometric camera; the walls between the camera and the hero are cut low so the hero is never hidden
  - Multi-touch controls built by hand, so you can steer with one thumb and tap skills with the other
  - All content is data (classes, 9 skills, enemies, dungeons, 12 affixes, 6 legendaries, three stories), so a new class or dungeon is a data change
  - Persistent loot with rarities, random affixes, a shared 60-slot stash and an equip screen with stat previews
  - Boss attacks are telegraphed with a filling red circle you can dodge out of
  - The save is versioned with migrations, and a run interrupted by closing the app is settled as a retreat, loot kept
  - The 40 MB engine ships gzipped and is unzipped in the browser, keeping the web download near 20 MB
stats:
  - { value: '67', label: 'unit tests for the game rules' }
  - { value: '~20 MB', label: 'web download' }
  - { value: '~8 min', label: 'per dungeon run' }
---

## The idea

I like Diablo and Minecraft Dungeons, but not games that need a long-term commitment. Habulan is the short-session version: walk up to a dungeon, see if you're ready, clear it in a few minutes, keep the loot. It's set in Filipino folklore, with the barrio, the sari-sari store and the creatures every lola warned about.

## What I built

**The field.** A barrio at the south end, a river with two bridges, and six dungeon entrances, harder ones further north. Aling Nena's store buys your spare gear, and Lolo Kanor's well refills potions and lets you switch heroes.

**Inspect before you commit.** Each entrance has a card with the recommended level, a ready / risky / dangerous chip for each hero, enemies (silhouettes until you've met them), the boss, the best possible reward and your best time.

**Combat.** Your hero attacks the nearest enemy on their own. You move with a floating stick and tap three skills that unlock at levels 1, 3 and 6 and rank up as you level, plus a dodge roll with brief invulnerability. Duwende swarm, tiyanak lie in wait and pounce, aswang lunge. The two bosses (the Hari ng Duwende and a giant tiyanak) summon, burrow and scream, always with a visible wind-up.

**Three heroes, three stories.** The Barbarian is a former bantay hunting the aswang that took their village. The Mage is a babaylan apprentice chasing a stolen anting-anting. The Archer is a hunter marked by a tikbalang. They walk the same dungeons with different dialogue, a personal side room and their own ending.

## How it works

- **Godot 4, Compatibility renderer:** the same project runs on phones and in WebGL 2. Low-poly KayKit models (CC0) are recoloured at runtime into folklore creatures, and their 90 animations each were trimmed to the 30 the game uses.
- **Rules as plain, tested code:** XP, damage, loot rolls, the stash, the shop and saving are pure GDScript classes with 67 GUT tests. The XP curve is pinned by a test so the first dungeon takes a hero from level 1 to 4 and the second from 4 to 7, with no grinding.
- **Scenes built from data:** rooms, the field and most UI are assembled in code from JSON, which keeps the project small and easy to extend with a gunner class or new dungeons.
- **Shipping:** a tag builds and signs the APK on GitHub Actions and attaches it to a release. The web build goes to Cloudflare Pages, with the engine gzipped under Pages' 25 MB file limit.

## Where it stands

The first playable slice is live: the full field, all three heroes and stories, and the first two dungeons, with the other four sealed. Next are dungeons 3 to 6 with the tikbalang, manananggal and kapre, then a gunner class.
