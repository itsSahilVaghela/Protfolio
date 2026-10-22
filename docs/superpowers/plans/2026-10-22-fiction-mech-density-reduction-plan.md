# Fiction Mech Density Reduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform dense narrative prose in Fiction Mech project card and detail modal into an executive, highly skimmable bento layout with 5-second readability.

**Architecture:** Update `portfolioData.ts` to concise 1-sentence description and 3 tight capability pills; refactor `Portfolio.tsx` modal to replace multi-line paragraphs with 1-line punchy summaries and visual badge arrays.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide icons, Vite.

## Global Constraints
- Must retain all 12 authentic features (6 PC Studio + 6 Spatial Viewers).
- No paragraph longer than 18 words in feature cards.
- Layout must remain responsive (`w-[95vw] sm:max-w-4xl`, aspect-video).

---

### Task 1: Streamline Card in `src/data/portfolioData.ts`

**Files:**
- Modify: `src/data/portfolioData.ts:180-205`

**Interfaces:**
- Consumes: `ProjectCaseStudy` interface.
- Produces: Ultra-lightweight card fields for Fiction Mech.

- [ ] **Step 1: Update `portfolioData.ts`**
  ```ts
  shortDescription:
    "Industrial 3D digital twin platform connecting a PC authoring studio with Meta Quest 3 MR and mobile companion viewers.",
  highlights: [
    "PC Studio: CAD ingestion, 4 viewport modes & metadata authoring",
    "Quest 3 MR: 1:1 spatial passthrough & 3-axis shader cross-section",
    "Agora Sync: Real-time multi-device replication & two-way voice",
  ],
  ```

- [ ] **Step 2: Run typecheck**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**
  ```bash
  git add src/data/portfolioData.ts
  git commit -m "feat(data): condense Fiction Mech card to 5-second skimmable copy"
  ```

---

### Task 2: Refactor Detail Modal in `src/components/Portfolio.tsx` into Skimmable Bento Grid

**Files:**
- Modify: `src/components/Portfolio.tsx:610-860`

**Interfaces:**
- Consumes: `activeCaseStudy.id === "fiction-mech"` in modal.
- Produces: Crisp, non-dense cards for Part 1 (6 modules) and Part 2 (6 capabilities).

- [ ] **Step 1: Refactor Part 1 (PC Studio: 6 Modules)**
  Each card format:
  - Header with icon, title, and module category pill.
  - 1 crisp summary line (< 18 words).
  - 3-4 feature tags in `flex flex-wrap gap-1.5`.

- [ ] **Step 2: Refactor Part 2 (Spatial Viewers: 6 Capabilities)**
  Each card format:
  - Header with icon, title, and runtime badge.
  - 1 crisp summary line (< 18 words).
  - 3-4 feature tags in `flex flex-wrap gap-1.5`.

- [ ] **Step 3: Run typecheck and build**
  Run: `npx tsc --noEmit` and `npm run build`
  Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/Portfolio.tsx
  git commit -m "feat(portfolio): convert Fiction Mech modal to executive skimmable bento grid"
  ```

---

### Task 3: Build Verification & Skimmability Audit

**Files:**
- None (verification only).

- [ ] **Step 1: Run TypeScript compiler**
  Run: `npx tsc --noEmit`
  Expected: PASS with 0 errors.

- [ ] **Step 2: Run Production Build**
  Run: `npm run build`
  Expected: PASS in < 5s.

- [ ] **Step 3: Skimmability Audit**
  Verify card height reduction and confirm zero paragraphs exceed 18 words.
