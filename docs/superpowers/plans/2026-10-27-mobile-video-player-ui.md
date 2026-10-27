# Mobile Video Player UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the project modal video player in `Portfolio.tsx` for mobile viewports, resolving layout collisions, cramped buttons, clipped loading overlays, and providing smooth touch interactions.

**Architecture:** Update `src/components/Portfolio.tsx` with mobile-first responsive Tailwind classes (`sm:` breakpoints): safe-area padded modal headers, full-width segmented media tabs, horizontal-scroll walkthrough pill carousel, resilient min-height video container with unclipped loading states, and a mobile thumb-friendly quick-action bar.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Radix UI Dialog, Vite.

## Global Constraints
- Desktop layout (≥640px) must remain 100% pixel-perfect and preserved without regression.
- No new third-party dependencies.
- Pass TypeScript compilation and `npm run build` with zero errors.

---

### Task 1: Modal Dialog Header & Safe Spacing

**Files:**
- Modify: `src/components/Portfolio.tsx:413-437`

**Interfaces:**
- Consumes: `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` from `@/components/ui/dialog`
- Produces: Safe padding preventing overlap with `DialogPrimitive.Close` on screens < 640px.

- [ ] **Step 1: Update DialogContent and DialogHeader classes**
In `src/components/Portfolio.tsx`, update `DialogContent` to `w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#10151D] border border-[#1E2736] text-[#F4F6FA] p-4 sm:p-6 md:p-8`.
Add `pr-8 sm:pr-0` to `DialogHeader` and `max-w-[calc(100%-2.5rem)] sm:max-w-none` on the top tag pill wrapper.
Ensure `DialogTitle` uses `text-xl sm:text-3xl font-bold text-[#F4F6FA]`.

- [ ] **Step 2: Verify TypeScript & build**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit Task 1**
```bash
git add src/components/Portfolio.tsx
git commit -m "fix(portfolio): add mobile header clearance and responsive typography"
```

---

### Task 2: Responsive Media Switcher & Horizontal Walkthrough Pills

**Files:**
- Modify: `src/components/Portfolio.tsx:440-542` and `Portfolio.tsx:705-742`

**Interfaces:**
- Consumes: `activeMediaView`, `setActiveMediaView`, `activeCaseStudy.additionalVideos`, `currentVideoUrl`, `setActiveModalVideoUrl`
- Produces: Responsive segmented control for media view and horizontal swipe carousel for walkthrough videos.

- [ ] **Step 1: Refactor media view switcher toolbar**
Change the media view switcher wrapper from `flex flex-wrap items-center justify-between gap-2` to:
`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5`
Change the segmented button container to:
`w-full sm:w-auto grid grid-cols-3 sm:flex sm:inline-flex items-center gap-1 p-1 rounded-lg bg-[#0C1017] border border-[#1E2736]`
Ensure buttons have `justify-center py-1.5 px-2 text-xs font-mono`.

- [ ] **Step 2: Refactor walkthrough additionalVideos and additionalImages pill strip**
Change walkthrough pills wrapper from `flex flex-wrap items-center gap-1.5 pt-1` to:
`flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-1 px-1`
Add `whitespace-nowrap flex-shrink-0 min-h-[30px] flex items-center` to all walkthrough buttons.
Also apply the same horizontal scroll pattern to `additionalImages` (lines 710-742).

- [ ] **Step 3: Verify TypeScript & build**
Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit Task 2**
```bash
git add src/components/Portfolio.tsx
git commit -m "feat(portfolio): add mobile segmented media tabs and scrollable walkthrough carousel"
```

---

### Task 3: Resilient Video Player Container, Mobile Loading Overlay & Quick-Action Bar

**Files:**
- Modify: `src/components/Portfolio.tsx:544-640`

**Interfaces:**
- Consumes: `isVideoLoading`, `isSlowNetwork`, `currentVideoUrl`, `isEmbedIframe`, `getEmbedVideoUrl`
- Produces: Unclipped video container with `min-h-[220px] sm:min-h-0`, mobile-optimized loading card, and dedicated mobile quick-action bar.

- [ ] **Step 1: Update video container height and loading overlay**
Set video container class to:
`relative w-full aspect-video min-h-[220px] sm:min-h-0 rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl`
Update loading overlay padding to `p-4 sm:p-6 overflow-y-auto max-h-full` so it never overflows.
Adjust slow connection recovery box to be compact on mobile with `w-full max-w-sm p-3 mt-2 sm:mt-4 rounded-lg bg-[#151C27] border border-amber-500/30`.

- [ ] **Step 2: Add mobile quick-action bar below video**
Right below the video container, add a mobile-only quick-action bar (`sm:hidden flex items-center gap-2 pt-2`):
- "Open in Drive / YouTube ↗" button if `currentVideoUrl` is external/embed.
- "View Schematic" button to immediately toggle schematic blueprint.

- [ ] **Step 3: Verify build**
Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit Task 3**
```bash
git add src/components/Portfolio.tsx
git commit -m "feat(portfolio): add unclipped mobile video loading overlay and quick-action bar"
```

---

### Task 4: Push to Remote Repository & Final Verification

**Files:**
- Check git status and remote `origin/main`

- [ ] **Step 1: Check git log & working tree**
Run: `git status`
Expected: Clean working tree

- [ ] **Step 2: Push changes to GitHub repository**
Run: `git push origin main`
Expected: Successfully pushed to `https://github.com/itsSahilVaghela/Protfolio.git`

- [ ] **Step 3: Verify on phone/remote**
Notify user that changes are deployed and available on GitHub/Vercel/live host.
