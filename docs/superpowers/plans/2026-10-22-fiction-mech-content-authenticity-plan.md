# Fiction Mech Content Authenticity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic AI copy on Fiction Mech portfolio card and detail modal with authentic developer-grounded features (PC authoring studio vs Meta Quest 3 MR and mobile companion viewers).

**Architecture:** Update `portfolioData.ts` with exact card properties; update `Portfolio.tsx` detail modal to render authentic two-part architecture breakdown (PC setup/staging vs Quest 3/mobile spatial inspection) with zero fluff.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide icons, Vite.

## Global Constraints
- Developer Scope: Sole Developer (100% Architecture & Delivery across PC, Quest 3, Android, iOS, shaders & Agora RTC).
- Target Runtimes: PC Windows · Meta Quest 3 · Android · iOS.
- Video Count: Exactly 2 walkthrough videos (PC 4K & Quest 3 MR).
- Mobile Responsiveness: Must maintain `aspect-video` and `w-[95vw]` responsive modal layout.

---

### Task 1: Update Card Properties in `src/data/portfolioData.ts`

**Files:**
- Modify: `src/data/portfolioData.ts:170-225`

**Interfaces:**
- Consumes: `ProjectCaseStudy` interface.
- Produces: Updated Fiction Mech card fields for `title`, `subtitle`, `technologies`, `shortDescription`, `highlights`.

- [ ] **Step 1: Update Fiction Mech record in `portfolioData.ts`**
  Set exact properties:
  - `title`: `"Fiction Mech"`
  - `subtitle`: `"Dual-Component Industrial 3D Model Visualization & Collaborative XR"`
  - `technologies`: `["Unity", "C#", "OpenXR", "Meta Quest 3", "Android", "iOS", "Agora Video SDK", "Backend Integration"]`
  - `shortDescription`: `"Engineered solely as sole developer: A comprehensive industrial 3D visualization and collaboration system featuring a PC project authoring studio and spatial Meta Quest 3 Mixed Reality & mobile inspection viewers with Agora real-time voice and video."`
  - `highlights`:
    - `"Architected and implemented end-to-end as sole developer across PC authoring, Meta Quest 3 MR, and mobile companions."`
    - `"Two-part system architecture: PC application for 3D model ingestion, material design, metadata binding, and cloud publishing."`
    - `"Meta Quest 3 mixed-reality viewer with full-color passthrough, room/tabletop placement, 6DoF & hand tracking."`

- [ ] **Step 2: Run typecheck**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**
  ```bash
  git add src/data/portfolioData.ts
  git commit -m "feat(data): update Fiction Mech card content with authentic developer details"
  ```

---

### Task 2: Implement Authentic Two-Part Architecture in `src/components/Portfolio.tsx` Modal

**Files:**
- Modify: `src/components/Portfolio.tsx:486-860`

**Interfaces:**
- Consumes: `activeCaseStudy.id === "fiction-mech"`.
- Produces: Rephrased, authentic single-scroll modal content:
  - Section 1: Overview & Sole Developer Scope.
  - Section 2: Key Specifications (4 cards).
  - Section 3: Part 1 — PC Authoring Studio (Project Setup & Staging: 6 concrete feature blocks).
  - Section 4: Part 2 — Spatial Viewers (Meta Quest 3 MR, Android & iOS: 6 concrete feature blocks).
  - Section 5: End-to-End Pipeline (4 staged nodes).

- [ ] **Step 1: Update Modal Overview & Specs**
  - Title: `Dual-Component Industrial 3D Model Visualization & Multi-Device XR Platform`
  - Body: Plain, authentic description of PC Studio vs Quest 3 / Android / iOS, built 100% by Sahil Vaghela as sole developer.
  - Specs:
    - Developer Scope: Sole Developer (100% Architecture & Delivery)
    - Target Runtimes: PC Windows · Meta Quest 3 · Android · iOS
    - Networking & Voice: Agora RTC SDK (Real-time sync, audio & casting)
    - VR Performance: 72+ FPS Standalone (Snapdragon XR2 Gen 2)

- [ ] **Step 2: Implement Part 1 — PC Authoring Studio (6 Concrete Blocks)**
  1. *Project Management & 3D Ingestion*: Create/manage projects, FBX/OBJ ingestion, 360° orbit rotation.
  2. *Material Customization & 4 Viewport Modes*: Per-part material assignment; Mesh View, Wireframe View, Edge View, Texture View.
  3. *Part-Level Engineering Metadata Binding*: Name, Dimensions, Tool for opening/fastening, Reference Image, Video Demo, PDF Manual.
  4. *Disassembly & Assembly Sequence Authoring*: Step-by-step sequence creation + expansion (exploded) slider with reset.
  5. *Subsystem Layer Assignment & Device Permissions*: Layer assignment per part + view enable/disable permissions for Quest vs Mobile.
  6. *Media Recording & Cloud Publishing*: Built-in screen recording mode (with turntable/green-screen) + one-click upload to cloud backend.

- [ ] **Step 3: Implement Part 2 — Spatial Viewers (Quest 3 MR, Android & iOS: 6 Concrete Blocks)**
  1. *Dynamic Cloud Project Fetching*: In-app project library downloads bundles directly from cloud backend.
  2. *1:1 Scale Spatial 3D & Individual Part Interaction*: Full-color passthrough surface placement (tabletop/room) on Quest 3 with 6DoF & hand tracking; touch on mobile. Select/pinch any part to view bound metadata (dimensions, tools, photos, videos, PDFs).
  3. *Layer Deck & Real-Time Part Expansion*: Layer-wise subsystem toggles + real-time part expansion with 1-click reset to original state.
  4. *Real-Time 3-Axis Cross-Section*: Dynamic X, Y, Z clipping planes to slice open mechanical assemblies and view internal tolerances.
  5. *Interactive Assembly & Disassembly Training*: Step-by-step procedural training playback teaching proper maintenance steps.
  6. *Agora RTC Screen Casting & Multiplayer Sync*: Cast Quest 3 screen to mobile devices; multiplayer state sync where every part transform and selection syncs live with bidirectional voice chat.

- [ ] **Step 4: Run typecheck**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/Portfolio.tsx
  git commit -m "feat(portfolio): rephrase Fiction Mech modal with authentic PC studio and XR viewer features"
  ```

---

### Task 3: Production Build & End-to-End Verification

**Files:**
- None (verification only).

- [ ] **Step 1: Run TypeScript compiler**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 2: Run Production Build**
  Run: `npm run build`
  Expected: PASS, Vite builds in < 5s.

- [ ] **Step 3: Verify content completeness**
  Check that all 4 viewport modes, 6 metadata types, 6 PC features, 6 viewer features, and mobile layout classes are present.
