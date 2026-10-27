# Custom Video Player & Mobile Alignment Fix Implementation Plan

> **User Constraint:** Zero side-effects. Do not affect desktop view, schematic view, photo view, project cards, or 9-section case study content.

---

### Proposed Changes

#### Component: `src/components/CustomVideoPlayer.tsx`
Create a dedicated custom video player component:
- **Direct Stream URL Resolution:** Converts Google Drive URLs into direct `video/mp4` streaming endpoint (`https://drive.usercontent.google.com/download?id=...&confirm=t`) which supports byte ranges and CORS.
- **Top Alignment:** Starts at pixel `(0,0)`, touching the window line with no 50px header gap.
- **Centered Play/Pause HUD:** Mathematical center (`inset-0 m-auto`) with glowing pulse animation on pause.
- **Bottom Playback Bar:**
  - Play/Pause toggle
  - Touch-friendly progress track and seeker
  - Formatted time display (`mm:ss / mm:ss`)
  - Volume/Mute button
  - Native Fullscreen button using `requestFullscreen()`
- **Resilient Fallback:** If `<video>` encounters an error, automatically renders the Google Drive iframe player.

#### Integration: `src/components/Portfolio.tsx`
- Import and render `CustomVideoPlayer` in place of the raw iframe/video container.
- Keep all surrounding components, cards, schematics, and case study narrative untouched.

---

### Verification Plan

1. **Build Check:** Run `npm run build` to confirm clean TypeScript and JSX compilation.
2. **Visual Check:** Verify video touches top border, play button is dead center, and scrubber sits at bottom.
3. **Commit & Push:** Commit with Conventional Commits and push to `origin/main`.
