# Radicon Powerbuild AR/MR Implementation Plan

**Goal:** Update `radicon-powerbuild-xr` across card and modal with authentic dual Google Drive image previews (Marker vs Markerless), streamlined copy, and an authentic two-part architecture (Android Mobile AR + Meta Quest 3 Mixed Reality).

**Architecture:** Update `portfolioData.ts` with direct Google Drive image links and authentic feature specs. Update `Portfolio.tsx` with dedicated media switching (Marker vs Markerless vs Schematic) and rich two-part modal content for `radicon-powerbuild-xr`.

---

### Task 1: Update Portfolio Data for Radicon
**Files:** `src/data/portfolioData.ts`
- Add `additionalImages` or configure Drive media URLs for `radicon-powerbuild-xr`.
  - Marker Mode: `https://lh3.googleusercontent.com/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_` (Drive link: `1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_`)
  - Markerless Mode: `https://lh3.googleusercontent.com/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay` (Drive link: `1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay`)
- Update `subtitle` to `"Mobile AR & Meta Quest 3 Showcase"`.
- Update `shortDescription` to `"Industrial 3D product visualization platform featuring Vuforia brochure tracking, markerless floor placement, and radial spec HUDs."`.
- Update 3 highlights to focus on Dual Tracking Engine, Circular Showroom Carousel, and Radial Engineering HUD.
- Update `caseStudy` with authentic overview and two-part structure.
- Run `npx tsc --noEmit` to verify type safety.
- Commit: `feat(data): update Radicon Powerbuild AR/MR with Google Drive media and authentic specs`

### Task 2: Enhance Modal & Media Switcher for Radicon
**Files:** `src/components/Portfolio.tsx`, `src/components/ProjectTechnicalVisual.tsx`
- Ensure the modal media section supports switching between Marker View, Markerless View, and Schematic for Radicon.
- Implement authentic Radicon modal sections:
  - 3 Key Specs (Developer Scope, Target Runtimes, Inspection Modes).
  - Part 1: Android Mobile AR (6 concrete feature blocks).
  - Part 2: Meta Quest 3 Mixed Reality (6 concrete feature blocks).
- Run `npx tsc --noEmit` and `npm run build` to verify 0 errors.
- Commit: `feat(portfolio): integrate Radicon dual-mode media switcher and authentic Android/Quest feature bento`

### Task 3: End-to-End Build & Verification
- Verify build time and bundle output.
- Confirm zero broken links or type errors.
