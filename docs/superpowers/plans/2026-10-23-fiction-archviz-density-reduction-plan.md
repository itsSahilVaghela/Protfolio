# Fiction ArchViz Density Reduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate text bulk and visual fatigue in the Fiction ArchViz modal by condensing copy, trimming specs to 3 cards, tightening the 4 core ownership cards to under 15 words, and compacting platform subsystems into a sleek 6-item micro-grid.

**Architecture:** Update `src/components/Portfolio.tsx` in the `activeCaseStudy.id === "fiction-archviz"` section. Keep exact dark theme styling, Lucide icons, and responsive layout.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React.

## Global Constraints
- Target Runtimes: Windows PC Desktop (mouse & keyboard) and Meta Quest Standalone Mobile VR.
- Keep each card description under 15 words.
- Zero TypeScript errors (`npx tsc --noEmit`) and clean build (`npm run build`).

---

### Task 1: Update Fiction ArchViz Modal in `src/components/Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx` (lines ~1480-1860)

**Interfaces:**
- Consumes: `activeCaseStudy` where `activeCaseStudy.id === "fiction-archviz"`
- Produces: Streamlined, skimmable executive bento layout.

- [ ] **Step 1: Condense Overview Banner and Key Specs**
  - Banner body: single punchy sentence.
  - Key Specs: 3 cards (Developer Scope, Target Runtimes, Multiplayer Architecture).

- [ ] **Step 2: Tighten the 4 Core Developer Ownership Cards**
  - Card 1 (WebSocket): "Real-time bidirectional event bus synchronizing PC Desktop and Meta Quest VR."
  - Card 2 (Tile Engine): "Fixed wall-cut seams with 4-way offset, 90° rotation, and Matte/Glossy PBR."
  - Card 3 (VR Dock): "Grabbable in-world palette widget for instant in-VR material configuration."
  - Card 4 (Dynamic Lighting): "Calculates room bounds automatically to scale and position ceiling light fixtures."
  - Limit tags to 2 per card.

- [ ] **Step 3: Compact Platform Subsystems into 6-Item Micro-Grid**
  - Replace 6 bulky multi-paragraph cards with 1 sleek grid panel containing 6 clean items with category labels and concise 1-liners.

- [ ] **Step 4: Run TypeScript check**
```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 5: Run production build**
```bash
npm run build
```
Expected: Clean build.

- [ ] **Step 6: Commit changes**
```bash
git add src/components/Portfolio.tsx dist/
git commit -m "feat(portfolio): streamline Fiction ArchViz modal for 10-second skimmability"
```
