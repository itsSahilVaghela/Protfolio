# Design Spec: Mobile Video Player UI & Modal Responsiveness

**Date:** 2026-10-27  
**Status:** Approved  
**Author:** Antigravity (AI Assistant) & Sahil Vaghela  
**Component:** `src/components/Portfolio.tsx`  

---

## 1. Problem Statement & Motivation
When browsing the portfolio on mobile devices (viewports < 640px wide, e.g. 360px–414px):
1. **Modal Header Collision:** The close button (`DialogPrimitive.Close`) is positioned `top-4 right-4`, which collides with the top metadata tags (`CASE STUDY 01`, `category`, `ownershipScope`) and the project title because there is no right padding clearance.
2. **Media Switcher Toolbar Breakdown:** The header label (*"Live Production Video Demo"*, ~200px) and the segmented switch buttons (*"Video Demo"*, *"Photo"*, *"Schematic"*, ~230px) sit side-by-side in `flex justify-between`, forcing an awkward, cramped wrap on narrow mobile viewports.
3. **Walkthrough Pill Chaos:** Long video labels (e.g. *"PC Authoring Studio Walkthrough (4K)"*, *"Multiuser Walkthrough & Material Customization"*, *"African Elephant Live Crayon-to-3D WebAR Demo"*) wrap across 3–4 uneven lines of tiny buttons, pushing the *"Open Drive ↗"* button into an orphaned, misplaced row.
4. **Video Container & Loading State Clipping:** On narrow screens, a pure 16:9 aspect ratio (`aspect-video`) calculates to ~185px height. Inside this small box, the loading state overlay (spinner, buffer text, and 6-second slow connection alert box with 2 buttons, >250px total height) gets clipped by `overflow-hidden`, preventing users from reading the notice or tapping fallback buttons.
5. **Mobile Touch & Google Drive Playability:** Embedded Google Drive preview iframes on mobile are hard to tap-to-play due to small iframe controls, iframe sandbox constraints, and browser cookie policies. Mobile visitors require a clear, thumb-friendly quick-action bar to open the video directly in Google Drive or switch instantly to schematics.

---

## 2. Proposed Architecture & Design Decisions

### 2.1 Modal Header & Safe Touch Area
- Add `pr-8 sm:pr-0` to the `DialogHeader` container and `max-w-[calc(100%-2.5rem)]` to the tag strip on mobile to prevent overlapping with the `DialogPrimitive.Close` button.
- Maintain responsive typography: `text-xl sm:text-3xl` for the modal title so titles do not push content excessively down on mobile screens.

### 2.2 Adaptive Media Mode Switcher
- **Mobile (<640px):**
  - Live status indicator sits on its own row with clean icon and pulse dot.
  - Tab buttons become a full-width segmented control with equal flex columns (`flex-1 py-1.5 px-2 text-center`).
  - Simplified mobile labels: `"Video"` (or `"Video Demo"`), `"Photo"`, `"Schematic"`.
- **Desktop (≥640px):**
  - Retain the existing side-by-side layout with full descriptive titles and compact pill grouping.

### 2.3 Horizontal-Swipe Walkthrough Pill Strip
- Wrap walkthrough buttons (`additionalVideos`) in a smooth horizontal scroll container:
  ```tsx
  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
  ```
- Set `whitespace-nowrap flex-shrink-0` on each walkthrough button so labels never awkwardly break onto multi-lines inside a chip.
- Keep the touch target comfortable (`min-h-[32px] px-3 text-[11px] font-mono`).
- Add active glow styling: `bg-[#4D8DFF] text-[#080B10] font-semibold border-[#4D8DFF]` for active walkthrough, and subtle border for inactive ones.

### 2.4 Resilient Video Container & Mobile Loading Overlay
- Set `aspect-video min-h-[220px] sm:min-h-0` on the video player frame to ensure minimum playable and tappable area on small phones.
- In the loading overlay:
  - Mobile-optimized compact spacing (`p-4 sm:p-6`).
  - Concise typography to prevent vertical overflow.
  - Slow network recovery box renders with `flex flex-col sm:flex-row gap-2` and full-width buttons on mobile, ensuring 100% visibility and zero clipping.

### 2.5 Mobile Quick-Action Helper Bar
- Positioned directly below the video container or walkthrough strip on mobile:
  - Primary button: `"Open in Drive / YouTube ↗"` with touch target `h-9 px-3 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 text-[#89B2FF] font-mono text-xs`.
  - Secondary fallback button: `"View Architecture Schematic"` to instantly switch media views without waiting.

---

## 3. Component Details & Diff Plan

### Target File: `src/components/Portfolio.tsx`
1. **Modal Header:**
   - Update `DialogContent` padding: `p-4 sm:p-6 md:p-8`.
   - Update `DialogHeader`: add `pr-8 sm:pr-0`.
2. **Media Switcher Header:**
   - Responsive flex container: `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5`.
   - Responsive tab buttons: `w-full sm:w-auto grid grid-cols-2 sm:flex sm:inline-flex` (or 3-col when photo is present).
3. **Walkthrough Strip:**
   - Switch from `flex-wrap` to `flex items-center overflow-x-auto no-scrollbar gap-2 py-1`.
   - Buttons: `whitespace-nowrap flex-shrink-0`.
4. **Video Frame & Loading Overlay:**
   - Frame: `relative w-full aspect-video min-h-[220px] sm:min-h-0 rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl`.
   - Overlay: `p-4 sm:p-6 overflow-y-auto max-h-full flex flex-col items-center justify-center`.
   - Slow network box: `w-full max-w-sm p-3 mt-3 sm:mt-4 rounded-lg bg-[#151C27] border border-amber-500/30`.
5. **Mobile Quick-Action Bar:**
   - Visible on `<sm`: compact row right beneath video player for high-confidence interaction.

---

## 4. Verification & Testing Criteria
1. **Mobile Breakpoints Testing:**
   - iPhone SE / 375px: Check header close button clearance, horizontal scroll walkthrough pills, video container height (no clipping in loading overlay).
   - iPhone 12/14/15 / 390px-393px: Ensure smooth touch scrolling and responsive button sizing.
   - Android / 412px: Test video playback, Drive link tap, and tab switching.
2. **Desktop Breakpoint Testing (≥768px and ≥1024px):**
   - Confirm zero regression on desktop views: side-by-side header, desktop aspect ratio, schematic visuals.
3. **Build Check:**
   - `npm run build` passes with zero TypeScript/Vite errors.
