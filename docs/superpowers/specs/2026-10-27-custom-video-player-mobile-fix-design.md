# Design Spec: Custom Direct-Stream Video Player & Mobile Alignment Fix

**Date:** 2026-10-27  
**Status:** Approved  
**Constraint:** Zero side-effects on existing features (desktop layout, schematic view, photo view, project cards, 9-section case study content remain 100% untouched).

---

## 1. Problem Statement

1. **Top Window Line Gap:** The current Google Drive `/preview` iframe renders Google Drive's internal top toolbar (50px), pushing the video down and creating an awkward gap below the window border.
2. **Play/Pause Not Centered:** Google Drive's play button is vertically offset because of the 50px top toolbar.
3. **Broken Mobile Playback Bar:** On mobile portrait screens, Google Drive's responsive iframe collapses the bottom control bar and renders an unstyled white line scrubber (`-[-]-`) across the top of the video.

---

## 2. Solution Architecture

Replace the default Google Drive iframe in `Portfolio.tsx` with a **Custom Native HTML5 Video Player** powered by the direct Google Drive MP4 stream:
`https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`

### Key Properties:
- **CORS & Range Support:** Verified via `curl` that this endpoint returns `HTTP 200/206 Partial Content`, `video/mp4`, `Accept-Ranges: bytes`, and `Access-Control-Allow-Origin: *`.
- **Zero Top Gap:** HTML5 `<video>` element fills the stage starting from pixel `(0,0)`, touching the window line seamlessly.
- **Dead-Center Play/Pause:** Mathematical center overlay (`absolute inset-0 m-auto`) with smooth fade-out on playback.
- **Bottom Playback Bar:** Docked at the bottom of the video player with:
  - Play/Pause button (`Play` / `Pause` from `lucide-react`)
  - Elapsed / Total time display (`00:14 / 03:42`)
  - Touch-friendly progress scrubber bar with filled active track
  - Mute/Unmute audio toggle
  - Fullscreen button calling `requestFullscreen()` on the video container
- **Automatic Fallback:** If `<video>` emits `onError` (e.g. temporary network restriction), automatically switch to the Google Drive iframe player so video playback never fails.

---

## 3. Scope & Non-Goals

- **In Scope:**
  - Video player rendering inside the Case Study modal in `src/components/Portfolio.tsx`
  - Direct stream URL resolution helper
  - Center play/pause HUD and bottom control bar
- **Out of Scope (Zero Changes):**
  - Project cards and filtering in main portfolio list
  - Schematic / Architecture visualization (`ProjectTechnicalVisual`)
  - Photo view (`activeMediaView === "photo"`)
  - 9 Case study narrative sections below the media stage
  - Desktop modal frame on `sm:` (`≥640px`)
