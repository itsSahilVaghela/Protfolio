# Fiction ArchViz Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Fiction ArchViz (`fiction-archviz`) portfolio entry into a high-impact, authentic case study showcasing 5-6 predefined test environments, full WebSocket multiplayer synchronization between PC Desktop and Meta Quest Standalone VR, procedural tile cutting/alignment, VR 3D floating dock UI, and dynamic room lighting.

**Architecture:** Update `src/data/portfolioData.ts` with accurate metadata, walkthrough video link, and technical breakdown. In `src/components/Portfolio.tsx`, implement a dedicated executive bento grid view for `activeCaseStudy.id === "fiction-archviz"` featuring an overview banner, 4 key specifications, 4 developer core ownership cards, 6 modular platform subsystem cards, and a 4-stage pipeline.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Unreal Engine 5 concepts.

## Global Constraints
- Target Runtimes: Windows PC Desktop (mouse & keyboard) and Meta Quest Standalone Mobile VR.
- Do NOT include PC VR / Meta Link runtime.
- Preserve all existing functionality and styles across other projects (`fiction-mech`, `radicon-powerbuild-xr`, etc.).
- Ensure zero TypeScript compiler errors (`npx tsc --noEmit`) and successful production build (`npm run build`).

---

### Task 1: Update Fiction ArchViz Data in `src/data/portfolioData.ts`

**Files:**
- Modify: `src/data/portfolioData.ts` (lines ~425-515)

**Interfaces:**
- Consumes: ProjectCaseStudy schema in `src/data/portfolioData.ts`
- Produces: Updated `featuredProjects[2]` (`fiction-archviz`) object with complete authentic details and video URL.

- [ ] **Step 1: Update metadata, video links, highlights, and role fields**

Update `featuredProjects[2]` in `src/data/portfolioData.ts`:
```typescript
  {
    id: "fiction-archviz",
    priorityRank: 3,
    featuredTier: "primary",
    title: "Fiction ArchViz",
    subtitle: "Multiuser Desktop & VR Architectural Visualization Platform",
    category: "Architectural Visualization / Real-Time 3D",
    filterGroup: "archviz-unreal",
    technologies: [
      "Unreal Engine 5",
      "C++",
      "WebSocket",
      "Node.js",
      "Meta Quest",
      "LibTess2",
      "DXF / JSON",
    ],
    shortDescription:
      "Multiuser architectural platform for PC Desktop and Meta Quest standalone featuring 5-6 test rooms, real-time WebSocket sync, CAD/DXF ingestion, and dynamic tile/paint customization.",
    highlights: [
      "Multiuser WebSocket Pipeline: Bidirectional real-time event sync connecting PC Desktop and Meta Quest VR via Node.js server.",
      "Procedural Tile Alignment: Live X/Y offset stepping, 90° rotation, wall-cut handling, and Matte/Glossy PBR toggling.",
      "VR 3D Floating Dock: In-world WidgetHolderActor allowing users to grab, reposition, and pin material palettes anywhere in VR space.",
      "Dynamic Room Lighting: Automatic ceiling light fixture generation and scaling based on runtime room bounding boxes.",
    ],
    roleTitle: "Unreal Engine C++ & XR Developer",
    ownershipScope: "Team Project — Core Systems Contributor",
    ownershipNote:
      "Engineered the universal bidirectional WebSocket multiplayer pipeline (PC ↔ Meta Quest via Node.js server), built procedural wall tile cutting, offset & rotation alignment, created the VR 3D floating dock UI (WidgetHolderActor), and implemented dynamic room ceiling lighting auto-scaled to room dimensions.",
    diagramType: "archviz-dxf",
    videoUrl:
      "https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/view?usp=sharing",
    additionalVideos: [
      {
        label: "Multiuser Walkthrough & Material Customization",
        url: "https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/preview",
      },
    ],
    mediaCaption:
      "Walkthrough Video & System Topology: CAD/DXF Parser -> C++ Triangulation -> Multiuser WebSocket Node Server -> PC & Meta Quest Viewers.",
```

- [ ] **Step 2: Update `caseStudy` object inside `fiction-archviz`**

Update `caseStudy` with authentic overview, problem, responsibilities, technical approach, pipeline steps, challenges, and outcomes.

- [ ] **Step 3: Run TypeScript compiler check**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/data/portfolioData.ts
git commit -m "feat(data): update Fiction ArchViz metadata, highlights, and walkthrough video"
```

---

### Task 2: Build Custom Executive Bento Modal in `src/components/Portfolio.tsx`

**Files:**
- Modify: `src/components/Portfolio.tsx`

**Interfaces:**
- Consumes: `activeCaseStudy` where `activeCaseStudy.id === "fiction-archviz"`
- Produces: Executive bento layout with Overview Banner, Key Specs, Core Ownership, Platform Subsystems, and End-to-End Pipeline.

- [ ] **Step 1: Add `activeCaseStudy.id === "fiction-archviz"` block in modal**

Insert a dedicated branch directly following `radicon-powerbuild-xr`:
```tsx
) : activeCaseStudy.id === "fiction-archviz" ? (
  <div className="space-y-6 pt-1 text-left">
    {/* 1. Overview Banner */}
    ...
    {/* 2. Key Specifications Grid (4 Cards) */}
    ...
    {/* 3. Developer Core Ownership (4 Highlight Cards) */}
    ...
    {/* 4. Platform Architecture Subsystems (6 Modular Cards) */}
    ...
    {/* 5. End-to-End Architectural Pipeline (4 Stages) */}
    ...
  </div>
```

- [ ] **Step 2: Populate all sections with crisp, skimmable styling and Lucide icons**

Use dark theme tokens (`#151C27`, `#10151D`, `#0C1017`, `#1E2736`), accent colors (`#4D8DFF`, `#8B6CFF`, `#10B981`, `#F59E0B`), and concise copy under 20 words per description.

- [ ] **Step 3: Run TypeScript compiler check**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/Portfolio.tsx
git commit -m "feat(portfolio): add executive bento case study modal for Fiction ArchViz"
```

---

### Task 3: Production Build & End-to-End Verification

**Files:**
- Modify: `dist/*` (auto-built)

- [ ] **Step 1: Execute production build**

```bash
npm run build
```
Expected: Clean build, zero warnings/errors.

- [ ] **Step 2: Verify git status and commit build output**

```bash
git add dist/
git commit -m "chore(build): update production build with Fiction ArchViz case study"
```
