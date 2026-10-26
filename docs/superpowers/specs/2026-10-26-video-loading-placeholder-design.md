# Design Specification: Video Loading State, Poster Backdrop & Slow Network Fallback

- **Date**: 2026-10-26
- **Scope**: Video player panel in project case-study modal (`src/components/Portfolio.tsx`).
- **Status**: Approved by User

---

## 1. Problem Statement

When users open project case studies on slower internet connections (or when external video hosts like Google Drive / YouTube take several seconds to initialize their embed player), the video container displays a completely blank pitch-black rectangle (`bg-[#080B10]`). This creates confusion, making users wonder if a video actually exists, if the link is broken, or if the portfolio has frozen.

---

## 2. Technical Design & Architecture

### 2.1 State Management in `Portfolio.tsx`
- `isVideoLoading`: `boolean` flag. Initializes to `true` whenever `currentVideoUrl` changes or a case study is opened. Set to `false` when `iframe.onLoad` or `video.onLoadedData` fires.
- `isSlowNetwork`: `boolean` flag. Controlled via a 6000ms `setTimeout`. If loading hasn't completed within 6 seconds, `isSlowNetwork` flips to `true` to surface alternative direct-link actions.

### 2.2 Visual Layering (Z-Index Architecture)

```
┌────────────────────────────────────────────────────────┐
│ Layer 2: Loading Overlay & Slow-Net Action Bar (z-20)   │
│   - Radar spinner + "Connecting video stream..."       │
│   - Amber warning pill + [Open Drive ↗] (after 6s)     │
├────────────────────────────────────────────────────────┤
│ Layer 1: Active Player (Iframe or HTML5 Video) (z-10)  │
│   - Opacity 0 while loading -> Fades to 100 on load    │
├────────────────────────────────────────────────────────┤
│ Layer 0: Poster Backdrop (z-0)                         │
│   - Blurred screenshot / project schematic             │
│   - Prevents blank pitch-black box on slow network     │
└────────────────────────────────────────────────────────┘
```

1. **Layer 0 — Poster Backdrop**:
   - Resolves genuine project thumbnail (`cardSlides[0]?.url` or `mediaUrl` or dark brand gradient with grid).
   - Applied with subtle blur (`blur-sm opacity-35 scale-105 transition-opacity`).
   - Ensures visual continuity and immediate feedback that this container holds real project media.

2. **Layer 1 — Video Player (`iframe` / `<video>`)**:
   - `iframe` with `onLoad={() => setIsVideoLoading(false)}`.
   - `video` with `onLoadedData={() => setIsVideoLoading(false)}`.
   - Smooth CSS opacity transition (`opacity-0` until loaded, then `opacity-100 duration-300`).

3. **Layer 2 — Interactive Loading State & Slow-Network Recovery**:
   - Mounted while `isVideoLoading === true`.
   - Animated radar ring + spinner + pulse indicator.
   - Text indicator: `"Buffering video walkthrough..."`.
   - **Timeout Trigger (6s)**:
     - If loading exceeds 6 seconds:
     - Displays amber indicator: `"Slow network detected · External stream buffering"`.
     - Direct CTA: `"Open in Drive ↗"` or `"Watch in New Tab ↗"` to allow bypassing slow browser iframe sandboxing.
     - Secondary CTA: `"View Schematic"` button switching to lightweight SVG technical architecture diagram.

---

## 3. Verification & Testing Plan
- `npx tsc --noEmit` to verify 0 TypeScript type errors.
- `npm run build` to verify production bundle generation.
- Browser CDP test with simulated network delay / inspection verifying:
  - Poster backdrop renders immediately upon opening modal with video view.
  - Loading spinner and status text appear.
  - Once iframe triggers `onLoad`, loader overlay transitions out cleanly.
  - Direct open link is accessible.
