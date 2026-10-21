# Fiction Mech Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a comprehensive, authentic 10-section project case study page for Fiction Mech at `/project/fiction-mech`, update the portfolio homepage card and modal dialog, and synchronize verified technical data.

**Architecture:** A dedicated, full-bleed case study component (`src/pages/FictionMechCaseStudy.tsx`) mounted in React Router at `/project/fiction-mech`, utilizing genuine screenshots extracted from 4K and 1080p production video recordings, an interactive multi-video switcher, technical architecture schematics, and deep links from the homepage project card and modal dialog in `src/components/Portfolio.tsx`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, React Router DOM, Vite.

## Global Constraints

- Role must be represented accurately as **Sole Developer**.
- Clear architectural separation between **Part One: PC Authoring Application** and **Part Two: Meta Quest 3 & Mobile Inspection Viewers**.
- Strict adherence to the 10-section order: Hero, Project Overview, System Architecture, PC Project Authoring, XR and Mobile Viewer, Assembly and Disassembly, Multiplayer and Screen Sharing, Technical Implementation, Project Gallery, Key Takeaways.
- Use genuine media extracted from video walkthroughs.
- Zero broken links, zero TypeScript compiler errors, clean Vite build.
- Preserve base path `/Protfolio` deployment configuration.

---

### Task 1: Curate and Deploy Verified Project Assets

**Files:**
- Create/Populate: `public/projects/fiction-mech/`
  - `pc-01-new-project.jpg`
  - `pc-02-import-3d-model.jpg`
  - `pc-03-material-palette.jpg`
  - `pc-04-custom-material-editor.jpg`
  - `pc-05-pdf-technical-docs.jpg`
  - `pc-06-video-reference-docs.jpg`
  - `pc-07-exploded-assembly-slider.jpg`
  - `pc-08-video-recording-green-screen.jpg`
  - `pc-09-backend-publish.jpg`
  - `quest-01-mr-room-placement.jpg`
  - `quest-02-tabletop-placement.jpg`
  - `quest-03-exploded-part-inspection.jpg`
  - `quest-04-part-metadata-hud.jpg`
  - `quest-05-spatial-layers-panel.jpg`
  - `quest-06-layer-visibility-filter.jpg`
  - `quest-07-cross-section-clipping.jpg`
  - `motor-01-mr-inspection.jpg`

- [ ] **Step 1: Write asset curation script in Python**
Generate properly named, high-resolution JPEG assets from the downloaded walkthrough recordings.

- [ ] **Step 2: Run script and verify files exist**
Run: `python -c "import os; print(len(os.listdir('public/projects/fiction-mech')))"`
Expected: 17+ curated image files.

- [ ] **Step 3: Commit assets**
```bash
git add public/projects/fiction-mech/
git commit -m "feat(assets): add genuine screenshots for Fiction Mech PC and Quest applications"
```

---

### Task 2: Update Portfolio Data (`src/data/portfolioData.ts`)

**Files:**
- Modify: `src/data/portfolioData.ts:168-254`

**Interfaces:**
- Updates `featuredProjects[0]` (`id: "fiction-mech"`) with:
  - `roleTitle: "Sole Developer"`
  - `ownershipScope: "Sole Developer"`
  - Updated `overview`, `problem`, `responsibilities`, `technicalApproach`, `architectureDetails`, `pipelineSteps`, `challenges`, `outcomes`
  - Add `caseStudyUrl: "/project/fiction-mech"`

- [ ] **Step 1: Edit `src/data/portfolioData.ts`**
Update Fiction Mech entry with verified data and sole developer scope.

- [ ] **Step 2: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/data/portfolioData.ts
git commit -m "feat(data): update Fiction Mech case study data with verified sole developer role"
```

---

### Task 3: Update Technical Schematic Visual (`src/components/ProjectTechnicalVisual.tsx`)

**Files:**
- Modify: `src/components/ProjectTechnicalVisual.tsx:262-340`

**Interfaces:**
- Enhance SVG diagram for `fiction-mech-xr` to illustrate the 3-node pipeline:
  - Node 1: PC Project Authoring Studio (FBX/OBJ, Materials, Layers, PDF/Video Docs)
  - Node 2: Backend Cloud Publishing & Delivery Bridge
  - Node 3: Meta Quest 3 Mixed Reality Viewer & Mobile Companion (6DoF, Passthrough, Hand Tracking, Agora Voice/Video)

- [ ] **Step 1: Edit SVG schematic in `src/components/ProjectTechnicalVisual.tsx`**
Refine the diagram to clearly depict the two-part system with PC authoring and Quest/Mobile runtime.

- [ ] **Step 2: Verify build**
Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/components/ProjectTechnicalVisual.tsx
git commit -m "feat(visual): update Fiction Mech technical SVG schematic with two-part system"
```

---

### Task 4: Build Standalone Case Study Page (`src/pages/FictionMechCaseStudy.tsx`)

**Files:**
- Create: `src/pages/FictionMechCaseStudy.tsx`

**Structure (10 Ordered Sections):**
1. **Hero Section:** Title, subtitle, Sole Developer badge, tech badges, sticky navigation with "← Back to Portfolio" and jump links.
2. **Project Overview:** High-level problem, solution, and dual-card comparison of PC Authoring Studio vs XR/Mobile Viewers.
3. **System Architecture:** Interactive visual pipeline and data-flow cards.
4. **PC Project Authoring Showcase:** 6-card grid with genuine screenshots (Project creation, Material customizer, PDF/video metadata, exploded view slider, turntable recorder & green screen, backend publishing).
5. **XR & Mobile Viewer Showcase:** 6-card grid with genuine screenshots (MR Passthrough room placement, tabletop 1:1 scale, 6DoF & hand tracking, component tooltip HUD, spatial layer deck, 3-axis RGB cross-sectioning).
6. **Assembly and Disassembly Sequences:** Technical explanation of mechanical disassembly, training applications, and user scrubbing.
7. **Multiplayer and Screen Sharing:** Detailed breakdown of bidirectional state sync and Agora Video SDK streaming.
8. **Technical Implementation:** Sole developer engineering highlights (Unity C#, OpenXR, mobile shader optimization, state synchronization).
9. **Project Gallery & Video Demos:** Interactive 3-tab embedded HD video player (PC Authoring, Quest MR, Motor sync) plus high-res screenshot lightbox.
10. **Key Takeaways:** Business and technical impact summary, with a CTA to contact or view resume.

- [ ] **Step 1: Write `src/pages/FictionMechCaseStudy.tsx`**
Implement the component with responsive styling, accessible semantic tags, and smooth animations.

- [ ] **Step 2: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/pages/FictionMechCaseStudy.tsx
git commit -m "feat(pages): add complete 10-section Fiction Mech case study page"
```

---

### Task 5: Mount Route in `src/App.tsx` and Add Scroll Restoration

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `src/App.tsx`**
Add `<Route path="/project/fiction-mech" element={<FictionMechCaseStudy />} />` and wrap with a `ScrollToTop` helper so navigating to the case study scrolls to the top of the page.

- [ ] **Step 2: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/App.tsx
git commit -m "feat(routing): mount Fiction Mech case study route in React Router"
```

---

### Task 6: Connect Homepage Card and Modal (`src/components/Portfolio.tsx`)

**Files:**
- Modify: `src/components/Portfolio.tsx`

- [ ] **Step 1: Update `Portfolio.tsx`**
- On the Fiction Mech project card: Add a "Full Case Study ↗" button linking to `/project/fiction-mech`.
- In the case study modal dialog for Fiction Mech: Add a prominent header action "Open Dedicated Project Page ↗" pointing to `/project/fiction-mech`.
- Support switching between video walkthroughs and technical schematic in the modal.

- [ ] **Step 2: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/components/Portfolio.tsx
git commit -m "feat(portfolio): link homepage card and modal to full Fiction Mech case study page"
```

---

### Task 7: Production Build & Quality Verification

**Files:**
- Verify: Full codebase

- [ ] **Step 1: Run linter**
Run: `npm run lint` or `npx eslint src`
Expected: 0 errors.

- [ ] **Step 2: Run TypeScript check**
Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Run production build**
Run: `npm run build`
Expected: Clean build into `dist/`.

- [ ] **Step 4: Final verification and summary**
Review the build output and summarize all changes and verified assets for the user.
