# Case Study Modal Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the case study modals for `Fiction Mech`, `Radicon`, and `Fiction ArchViz` in `src/components/Portfolio.tsx` into a clean, 3-tier non-repeating structure where every piece of information appears exactly once.

**Architecture:** Refactor `src/components/Portfolio.tsx`:
1. Clean Media & Executive Header (Video/Schematic + 1-line subtitle + 3 meta badges).
2. Context & Deliverables (Side-by-side 2-col: The Challenge vs What I Personally Built & Delivered).
3. Technical Capabilities (4 distinct, high-signal bento cards detailing concrete engineering subsystems).

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React.

## Global Constraints
- Every fact stated EXACTLY ONCE per modal. Zero repetitive text loops.
- Keep descriptions under 16 words per card.
- Verify `npx tsc --noEmit` has 0 errors.
- Verify `npm run build` succeeds cleanly.

---

### Task 1: Refactor Fiction Mech Modal in `src/components/Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx` (`activeCaseStudy.id === "fiction-mech"` section)

- [x] **Step 1: Replace repetitive overview/banner/specs with unified Header, Challenge vs Deliverables, and 4 Technical Cards**
  - Header: Subtitle + 3 meta badges.
  - Challenge & Deliverables: 2-column card with 4 clean checkmarked bullets.
  - 4 Technical Cards: PC Authoring Studio, Quest 3 MR Inspection, 3-Axis Shader Slicing, Multiplayer Collaboration & Webcast.

- [x] **Step 2: Run type check**
```bash
npx tsc --noEmit
```

---

### Task 2: Refactor Radicon Powerbuild Modal in `src/components/Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx` (`activeCaseStudy.id === "radicon-powerbuild-xr"` section)

- [x] **Step 1: Replace repetitive sections with unified Header, Challenge vs Deliverables, and 4 Technical Cards**
  - Header: Subtitle + 3 meta badges.
  - Challenge & Deliverables: 2-column card with 4 clean checkmarked bullets.
  - 4 Technical Cards: Vuforia Brochure Tracking, Markerless Floor Showroom, Circular Carousel & Shaft Swap, Curved Radial HUD.

- [x] **Step 2: Run type check**
```bash
npx tsc --noEmit
```

---

### Task 3: Refactor Fiction ArchViz Modal in `src/components/Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx` (`activeCaseStudy.id === "fiction-archviz"` section)

- [x] **Step 1: Replace repetitive sections with unified Header, Challenge vs Deliverables, and 4 Technical Cards**
  - Header: Subtitle + 3 meta badges.
  - Challenge & Deliverables: 2-column card with 4 clean checkmarked bullets.
  - 4 Technical Cards: 5 Predefined Showcase Rooms, WebSocket Multiuser Pipeline, Procedural Wall Tile Engine, VR Floating Dock & Dynamic Lights.

- [x] **Step 2: Run type check**
```bash
npx tsc --noEmit
```

---

### Task 4: Production Build & Verification

**Files:**
- Verify: `dist/`

- [x] **Step 1: Run production build**
```bash
npm run build
```

- [x] **Step 2: Verify git status and commit**
```bash
git add src/components/Portfolio.tsx dist/
git commit -m "feat(portfolio): consolidate modals into non-repeating 3-tier executive view"
```
