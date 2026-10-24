# WebAR Coloring Book & Motion-Controlled AI Games Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul `webar-coloring-book` and `motion-controlled-games` in `src/data/portfolioData.ts` with authentic 100% Three.js, MediaPipe Pose, YOLO11n ONNX, and GPU texture unwarp content based on actual project architecture.

**Architecture:** Update the single source of truth data object in `src/data/portfolioData.ts` for both projects, replacing legacy Unity/Python placeholders with genuine browser-native WebAR and AI computer vision pipeline specifications, card capsules, and deep 9-part case study sections.

**Tech Stack:** TypeScript, React 18, Vite, Three.js, MediaPipe Pose, YOLO11n ONNX (`onnxruntime-web`), MindAR.

## Global Constraints
- Preserve all existing TypeScript interfaces in `src/data/portfolioData.ts` (`ProjectItem`, `CaseStudyData`, `CardCapsule`, `PipelineStep`, etc.).
- Maintain exact project IDs (`webar-coloring-book` and `motion-controlled-games`).
- Zero build errors (`npx tsc --noEmit` and `npm run build` must pass cleanly).
- Follow concise, high-signal, recruiter-friendly tone with exact engineering metrics.

---

### Task 1: Overhaul WebAR Coloring Book Data (`webar-coloring-book`)

**Files:**
- Modify: `src/data/portfolioData.ts` (around lines 722-825)

**Interfaces:**
- Consumes: Spec section 2.1 and 3.1 from `docs/superpowers/specs/2026-10-24-webar-and-motion-games-content-design.md`
- Produces: Updated `webar-coloring-book` entry in `portfolioProjects`

- [ ] **Step 1: Update card metadata, technologies, and bento capsules**
  Update `subtitle`, `technologies`, `shortDescription`, `highlights`, `cardCapsules`, `roleTitle`, `ownershipScope`, `ownershipNote`, and `mediaCaption` for `webar-coloring-book`:
  - `subtitle`: `"54-Sheet MindAR Optical Tracking & 2048×2048 GPU Texture Unwarping"`
  - `technologies`: `["Three.js", "MindAR", "WebAR", "GLSL / GPU Unwarp", "Electron"]`
  - `shortDescription`: `"Browser-based AR station tracking physical coloring sheets, extracting artwork via GPU homography unwarp, and projecting live colors onto animated 3D characters."`
  - 4 bullet highlights as specified in design doc.
  - 3 card capsules (`Zero-Install WebAR`, `2048² GPU Unwarping`, `Live Rigged Projection`).

- [ ] **Step 2: Update 9-part Case Study sections**
  Update `caseStudy` object for `webar-coloring-book`:
  - `overview`, `problem`, `responsibilities`, `technicalApproach`, `architectureDetails`, `pipelineSteps`, `challenges`, `outcomes` matching design doc section 3.1 verbatim.

- [ ] **Step 3: Verify TypeScript compilation**
  Run `npx tsc --noEmit` to verify 0 syntax or type errors.

- [ ] **Step 4: Commit changes**
  Commit with message `feat(data): update WebAR Coloring Book with 54-sheet tracking and GPU unwarp architecture`.

---

### Task 2: Overhaul Motion-Controlled AI Games Data (`motion-controlled-games`)

**Files:**
- Modify: `src/data/portfolioData.ts` (around lines 826-940)

**Interfaces:**
- Consumes: Spec section 2.2 and 3.2 from `docs/superpowers/specs/2026-10-24-webar-and-motion-games-content-design.md`
- Produces: Updated `motion-controlled-games` entry in `portfolioProjects` (100% Three.js + MediaPipe + ONNX WebGPU)

- [ ] **Step 1: Replace legacy Unity copy with Three.js & in-browser AI card metadata**
  Update `title`, `subtitle`, `category`, `technologies`, `shortDescription`, `highlights`, `cardCapsules`, `roleTitle`, `ownershipScope`, `ownershipNote`, and `mediaCaption`:
  - `title`: `"Motion-Controlled AI Games"`
  - `subtitle`: `"In-Browser MediaPipe Pose & YOLO11n ONNX Vest Tracking in Three.js"`
  - `category`: `"Web 3D Games / Computer Vision"`
  - `technologies`: `["Three.js", "MediaPipe Pose", "YOLO11 ONNX", "onnxruntime-web", "WebGPU"]`
  - `shortDescription`: `"Suite of browser-based 3D motion games driven by MediaPipe body tracking and an in-browser YOLO11n ONNX AI model that locks player tracking to clinical safety vests."`
  - 5 bullet highlights detailing Endless Runner, Car Dodge, Flying Game, Shape Catcher, 33-landmark 60 FPS pose, and YOLO11n vest gating.
  - 3 card capsules (`Pure Three.js Suite`, `YOLO11n ONNX AI Gate`, `60 FPS Skeletal Tracking`).

- [ ] **Step 2: Update 9-part Case Study with clinical vest gating and Three.js architecture**
  Update `caseStudy` object for `motion-controlled-games`:
  - `overview`, `problem`, `responsibilities`, `technicalApproach`, `architectureDetails`, `pipelineSteps`, `challenges`, `outcomes` matching design doc section 3.2 verbatim.

- [ ] **Step 3: Verify TypeScript compilation**
  Run `npx tsc --noEmit` to verify 0 syntax or type errors.

- [ ] **Step 4: Commit changes**
  Commit with message `feat(data): replace legacy Unity text with 100% Three.js, MediaPipe, and YOLO11 ONNX AI pipeline`.

---

### Task 3: Build Verification & Browser Integration Check

**Files:**
- Modify/Run: `scratch/test_projects_data.js`

- [ ] **Step 1: Run TypeScript check and production build**
  Run `npx tsc --noEmit` and `npm run build` to confirm clean compilation and asset bundling.

- [ ] **Step 2: Run headless browser validation**
  Run automated Edge script verifying:
  - Both cards render with updated titles, subtitles, and capsules.
  - Clicking "Check in Details" on both projects opens their respective modals with full 9-part case studies and 4-step pipeline diagrams intact.

- [ ] **Step 3: Commit dist build**
  Stage `dist/` and any remaining files and commit with `chore: update production build with revised project data`.
