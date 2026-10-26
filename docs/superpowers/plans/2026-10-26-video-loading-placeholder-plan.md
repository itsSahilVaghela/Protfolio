# Video Loading State & Slow Network Fallback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate blank black screens in the project video modal on slow connections by implementing a project poster backdrop, animated loading indicator, and 6-second slow-network recovery fallback.

**Architecture:** Enhance the modal video container in `src/components/Portfolio.tsx` with a multi-layered presentation: Layer 0 renders a blurred project screenshot poster, Layer 1 mounts the iframe/video with smooth opacity fade-in, and Layer 2 renders an interactive buffering overlay with an automatic 6-second slow-network prompt offering direct links and schematic view.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide icons (`Loader2`, `Play`, `ExternalLink`, `AlertCircle`, `Compass`).

## Global Constraints
- Preserve all existing modal tab switching (`video`, `photo`, `schematic`).
- Never block video playback if network is fast (`onLoad` immediately hides loading overlay).
- Clean TypeScript compilation (`npx tsc --noEmit` with 0 errors).
- Clean production build (`npm run build`).

---

### Task 1: Add Video Loading & Fallback Layers to `Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx` (around lines 80-100 and 515-540)

**Interfaces:**
- Consumes: Spec from `docs/superpowers/specs/2026-10-26-video-loading-placeholder-design.md`
- Produces: Enhanced video container with `isVideoLoading` and `isSlowNetwork` states, poster backdrop, and slow-network recovery UI.

- [ ] **Step 1: Add loading states & timer effect**
  In `Portfolio.tsx`, add:
  ```tsx
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isSlowNetwork, setIsSlowNetwork] = useState<boolean>(false);
  ```
  Add `useEffect` listening to `[currentVideoUrl, activeCaseStudy?.id, activeMediaView]` to:
  - Reset `setIsVideoLoading(true)` and `setIsSlowNetwork(false)`.
  - Start a 6000ms timer that sets `setIsSlowNetwork(true)`.
  - Clean up timer on unmount / change.

- [ ] **Step 2: Construct poster image resolver**
  Helper function to retrieve the best available poster/screenshot for the current project:
  - Check `activeCaseStudy.cardSlides?.[0]?.url` or `activeCaseStudy.mediaUrl`.
  - Format with `import.meta.env.BASE_URL` when relative.

- [ ] **Step 3: Update video container with 3-layer architecture**
  Replace lines 515-533 with:
  - **Layer 0**: Blurred backdrop image or subtle dark grid pattern.
  - **Layer 1**: `iframe` with `onLoad={() => setIsVideoLoading(false)}` and `video` with `onLoadedData={() => setIsVideoLoading(false)}`, styled with `transition-opacity duration-300 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`.
  - **Layer 2**: Loading overlay visible when `isVideoLoading === true`:
    - Centered spinner (`Loader2 className="w-8 h-8 text-[#4D8DFF] animate-spin"`)
    - Text: `"Buffering video walkthrough..."`
    - When `isSlowNetwork === true`, display:
      - Amber badge: `"Slow network detected"`
      - Action: `[Open in New Tab ↗]` linking to `currentVideoUrl`
      - Action: `[Switch to Schematic]` invoking `setActiveMediaView("schematic")`

- [ ] **Step 4: Verify TypeScript compilation**
  Run `npx tsc --noEmit`.

- [ ] **Step 5: Commit changes**
  Commit with message `feat(portfolio): add poster backdrop, loading overlay, and slow network fallback to video player`.

---

### Task 2: Build Verification & Headless Browser Test

**Files:**
- Create/Run: `scratch/test_video_loader.js`

- [ ] **Step 1: Run production build**
  Execute `npm run build` to ensure clean bundle without errors.

- [ ] **Step 2: Run headless browser test**
  Write and run CDP script to:
  - Open Fiction Mech case study modal.
  - Verify poster backdrop exists in video container.
  - Verify loading spinner is present initially.
  - Verify iframe loads and loading overlay cleanly fades.
  - Verify 0 console errors and 0 exceptions.

- [ ] **Step 3: Commit dist build**
  Stage `dist/` and commit with message `chore: update production build with video loading placeholder`.
