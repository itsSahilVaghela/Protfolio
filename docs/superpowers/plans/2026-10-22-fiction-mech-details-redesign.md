# Fiction Mech Unified Details Modal & Mobile Video Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Streamline Fiction Mech in portfolio: provide a single "Check in Details" button on the homepage card, remove the standalone `/project/fiction-mech` page, and build a unified, mobile-responsive details modal featuring 2 verified walkthrough videos, complete project overview, industrial use-cases, and engineering technical analysis.

**Architecture:** Update `portfolioData.ts` to curate 2 verified walkthrough videos and remove standalone URL. Unmount `/project/fiction-mech` from `App.tsx` and delete `FictionMechCaseStudy.tsx`. In `Portfolio.tsx`, replace the split button with a single primary "Check in Details" button, update the modal dialog with `aspect-video` (16:9) responsive sizing and touch-friendly padding, and render a comprehensive single-scroll details view with Overview, Uses, Analysis, and Specs.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, shadcn/ui Dialog primitives.

## Global Constraints
- Target Runtimes: Mobile (iOS/Android Safari/Chrome), Tablet, Desktop.
- Video Count: Exactly 2 walkthrough videos for Fiction Mech (PC Studio 4K & Quest 3 MR). Cross-Device Motor walkthrough removed.
- Responsive Aspect Ratio: Video player must use strict `aspect-video` (16:9) to prevent vertical clipping on mobile.
- Role Attribution: Sahil Vaghela as Sole Developer.
- No Invented Features: All technical claims and use cases must align with verified project recordings.

---

### Task 1: Curate Video Data & Remove Standalone URL in `portfolioData.ts`

**Files:**
- Modify: `src/data/portfolioData.ts:170-230`

**Interfaces:**
- Consumes: `ProjectCaseStudy` interface from `src/data/portfolioData.ts`.
- Produces: Updated `fiction-mech` record with 2 videos in `additionalVideos` and `caseStudyUrl` removed.

- [ ] **Step 1: Update `fiction-mech` entry in `src/data/portfolioData.ts`**
  - Remove `caseStudyUrl: "/project/fiction-mech"`.
  - Update `additionalVideos` array to contain exactly 2 items:
    1. `PC Authoring Studio Walkthrough (4K)` (`https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/view?usp=sharing`, previewUrl: `https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/preview`)
    2. `Meta Quest 3 Mixed Reality Walkthrough` (`https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/view?usp=sharing`, previewUrl: `https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/preview`)
  - Remove `Cross-Device Motor Walkthrough`.

- [ ] **Step 2: Run typecheck to verify interface compatibility**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 3: Commit data updates**
  ```bash
  git add src/data/portfolioData.ts
  git commit -m "refactor(data): curate 2 Fiction Mech walkthrough videos and remove standalone URL"
  ```

---

### Task 2: Remove Standalone Case Study Route and Page

**Files:**
- Modify: `src/App.tsx:1-40`
- Delete: `src/pages/FictionMechCaseStudy.tsx`

**Interfaces:**
- Consumes: React Router route definitions.
- Produces: Clean route configuration without `/project/fiction-mech`.

- [ ] **Step 1: Remove route from `src/App.tsx`**
  - Remove `import FictionMechCaseStudy from "./pages/FictionMechCaseStudy";`.
  - Remove `<Route path="/project/fiction-mech" element={<FictionMechCaseStudy />} />`.

- [ ] **Step 2: Delete `src/pages/FictionMechCaseStudy.tsx`**
  - Remove file from filesystem.

- [ ] **Step 3: Run typecheck to verify no dangling imports**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 4: Commit route and page removal**
  ```bash
  git rm src/pages/FictionMechCaseStudy.tsx
  git add src/App.tsx
  git commit -m "refactor(routes): remove standalone Fiction Mech case study page and route"
  ```

---

### Task 3: Redesign First-View Card and Mobile Video Player in `Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx:230-265, 340-470`

**Interfaces:**
- Consumes: `activeCaseStudy`, `activeModalVideoUrl`, `isEmbedIframe`.
- Produces: Single "Check in Details" card button and responsive 16:9 video player with external link fallback.

- [ ] **Step 1: Update Card Action in `Portfolio.tsx`**
  - Replace conditional split button with a single primary button for all projects:
  ```tsx
  <button
    type="button"
    onClick={() => {
      setActiveCaseStudy(project);
      setActiveMediaView(project.videoUrl ? "video" : "schematic");
      setActiveModalVideoUrl(project.videoUrl || null);
    }}
    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider bg-[#4D8DFF] text-[#080B10] font-semibold hover:bg-[#89B2FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
  >
    <span>Check in Details</span>
    <ArrowUpRight className="w-4 h-4 text-[#080B10]" />
  </button>
  ```

- [ ] **Step 2: Update Dialog Container & Video Player for Mobile**
  - Set `DialogContent` classes: `w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#10151D] border border-[#1E2736] text-[#F4F6FA] p-4 sm:p-6 sm:p-8`.
  - Remove banner linking to full case study page.
  - Video wrapper: replace `h-72 sm:h-96 md:h-[420px]` with `relative w-full aspect-video rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl`.
  - Add external link fallback button next to video tabs:
  ```tsx
  {currentVideoUrl && isEmbedIframe(currentVideoUrl) && (
    <a
      href={currentVideoUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono text-[#89B2FF] hover:bg-[#4D8DFF]/10 transition-colors border border-[#4D8DFF]/30"
    >
      <span>Open in Drive</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  )}
  ```

- [ ] **Step 3: Run typecheck**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 4: Commit card button and mobile video player updates**
  ```bash
  git add src/components/Portfolio.tsx
  git commit -m "feat(portfolio): single Check in Details button and mobile-responsive video player"
  ```

---

### Task 4: Implement Comprehensive Unified Details Content in `Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx:500-750`

**Interfaces:**
- Consumes: `activeCaseStudy` data.
- Produces: Complete, single-scroll details view with Overview, Uses, Analysis, and Specs.

- [ ] **Step 1: Write Section Content for `activeCaseStudy.id === "fiction-mech"`**
  - **Overview (Total Idea):**
    - High-level architecture: PC Authoring Studio vs Meta Quest 3 MR & Android Companion.
    - Role & scope: 100% architected and implemented as Sole Developer.
  - **Industrial Uses & Workflows ("Uses"):**
    1. *Assembly & Maintenance Training:* Step-by-step disassembly sequence playback with part tools & attached PDF manuals.
    2. *Engineering Design & Tolerance Review:* Exploded subassembly views and real-time 3-axis $(X, Y, Z)$ internal cross-sections.
    3. *Field-Worker to Remote Supervisor Collaboration:* Headset wearer shares spatial view to Android tablet supervisor with synchronized manipulation and Agora voice.
    4. *Interactive Technical Catalogs:* 1080p turntable video export with Green Screen mode directly on PC.
  - **Technical Analysis & Architecture ("Analyse"):**
    1. *PC Authoring Architecture:* Dynamic file ingestion (FBX/OBJ, PDFs, MP4s), runtime PBR material generator with continuous HSL/alpha sliders, metadata tree serialization.
    2. *Mobile VR Rendering & Optimization:* Standalone Quest 3 Snapdragon XR2 Gen 2 GPU budget. Single-pass fragment discard clipping shader (zero stencil pass overhead) maintaining solid 72+ FPS.
    3. *State Synchronization:* Deterministic command pattern for part selection, expansion, and explosion offsets between Quest 3 OpenXR 6DoF inputs and Android touch gestures.
    4. *Agora RTC Pipeline:* Low-latency voice channels and spectator video streaming integrated without blocking the main Unity thread.
  - **Key Specifications & Metrics:**
    - Developer Scope: Sole Developer (100% Architecture & Delivery)
    - Target Runtimes: PC Windows · Meta Quest 3 · Android
    - Networking: Agora RTC Video/Audio SDK + State Sync
    - Performance: Stable 72+ FPS Standalone · Single-Pass Shader Clip

- [ ] **Step 2: Run typecheck**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 3: Commit unified details content**
  ```bash
  git add src/components/Portfolio.tsx
  git commit -m "feat(portfolio): complete unified details modal with overview, uses, and analysis"
  ```

---

### Task 5: Production Build & Multi-Device Verification

**Files:**
- Build output: `dist/`

- [ ] **Step 1: Run production build**
  Run: `npm run build`
  Expected: Build succeeds with 0 errors.

- [ ] **Step 2: Verify git status and clean working tree**
  Run: `git status`
  Expected: Clean working tree on `main`.

- [ ] **Step 3: Commit build verification**
  ```bash
  git commit --allow-empty -m "build: verify production build passes with unified details modal"
  ```
