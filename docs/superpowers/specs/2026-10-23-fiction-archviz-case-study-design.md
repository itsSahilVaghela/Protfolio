# Fiction ArchViz Case Study Redesign Spec

**Date:** 2026-10-23  
**Status:** In Review  
**Project:** Fiction ArchViz (`fiction-archviz`)  
**Context:** Unreal Engine 5 Multiuser Desktop & VR Architectural Visualization Platform

---

## 1. Overview & Objectives

Update `fiction-archviz` across `src/data/portfolioData.ts` and `src/components/Portfolio.tsx` with authentic project data:
1. Reflect 5–6 predefined interactive test environments with full PC and Meta Quest VR runtimes.
2. Prominently showcase the developer's core contributions:
   - Complete bidirectional WebSocket multiplayer architecture (PC Desktop ↔ Meta Quest VR via custom Node.js server).
   - Procedural tile cutting on walls, seam alignment, X/Y stepping, 90° rotation, and Matte/Glossy PBR toggling.
   - VR 3D floating dock system (`WidgetHolderActor`) and spatial controls.
   - Dynamic room ceiling lighting automatically sizing to room dimensions (`DynamicRectLight`).
3. Embed authentic production video walkthrough (`1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v`) with video/schematic switcher.
4. Construct an executive bento modal case study mirroring the high-polish design of Fiction Mech and Radicon.

---

## 2. Data Model Changes (`src/data/portfolioData.ts`)

### 2.1 Project Card Fields
- **ID:** `fiction-archviz`
- **Priority Rank:** `3`
- **Featured Tier:** `primary`
- **Title:** `Fiction ArchViz`
- **Subtitle:** `Multiuser Desktop & VR Architectural Visualization Platform`
- **Category:** `Architectural Visualization / Real-Time 3D`
- **Filter Group:** `archviz-unreal`
- **Technologies:** `["Unreal Engine 5", "C++", "WebSocket", "Node.js", "Meta Quest", "LibTess2", "DXF / JSON"]`
- **Role Title:** `Unreal Engine C++ & XR Developer`
- **Ownership Scope:** `Team Project — Core Systems Contributor`
- **Ownership Note:** `Engineered the universal bidirectional WebSocket multiplayer pipeline (PC ↔ Meta Quest via Node.js server), built procedural wall tile cutting, offset & rotation alignment, created the VR 3D floating dock UI (WidgetHolderActor), and implemented dynamic room ceiling lighting auto-scaled to room dimensions.`
- **Short Description:** `Multiuser architectural platform for PC and Meta Quest featuring 5-6 test rooms, real-time WebSocket sync, CAD/DXF ingestion, and dynamic tile/paint customization.`
- **Highlights:**
  1. `Multiuser WebSocket Pipeline: Bidirectional real-time event sync connecting PC Desktop and Meta Quest VR via Node.js server.`
  2. `Procedural Tile Alignment: Live X/Y offset stepping, 90° rotation, wall-cut handling, and Matte/Glossy PBR toggling.`
  3. `VR 3D Floating Dock: In-world WidgetHolderActor allowing users to grab, reposition, and pin material palettes anywhere in VR space.`
  4. `Dynamic Room Lighting: Automatic ceiling light fixture generation and scaling based on runtime room bounding boxes.`
- **Video Configuration:**
  - `videoUrl`: `https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/view?usp=sharing`
  - `additionalVideos`:
    - Label: `Multiuser Architectural Walkthrough & Material Customization`
    - URL: `https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/view?usp=sharing`
    - Preview URL: `https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/preview`
- **Diagram Type:** `archviz-dxf`
- **Media Caption:** `Walkthrough Video & System Topology: CAD/DXF Parser -> C++ Triangulation -> Multiuser WebSocket Node Server -> PC & Meta Quest Viewers.`

### 2.2 Case Study Details (`caseStudy`)
- **Overview:** Summarizes the platform, 5-6 test environments, cross-device sync, and interactive customization.
- **Problem:** Highlights challenges of converting 2D CAD into navigable spaces with real-time multi-client material and lighting consistency.
- **Responsibilities:** Documents developer's exact technical deliverables (WebSocket event bus, tile cutting/alignment math, VR dock, dynamic lighting).
- **Technical Approach:** Architecture of WebSocket event serialization, procedural tile mesh cutting, and UE5 subsystem integration.
- **Pipeline Steps (4 Stages):**
  - Stage 1: `CAD / DXF Ingestion & Parsing` (DxfJsonReaderActor + LibTess2 / earcut triangulation)
  - Stage 2: `Procedural Geometry & Cutters` (Wall generation, dynamic door/window boolean voids)
  - Stage 3: `Customization & Auto-Lighting` (Tile alignment, grout physics, paint/gradients, DynamicRectLight)
  - Stage 4: `Multiuser WebSocket Synchronization` (Bidirectional PC ↔ Quest event streaming via Node.js)
- **Challenges & Outcomes:** Accurate to real technical problems solved.

---

## 3. UI Modal Architecture (`src/components/Portfolio.tsx`)

When `activeCaseStudy.id === "fiction-archviz"`, render a custom executive case study layout:

### 3.1 Overview Banner
- Gradient container with badge: `ENTERPRISE ARCHITECTURAL PLATFORM · CORE SYSTEMS CONTRIBUTOR`.
- Right badge: `5–6 Predefined Test Environments · Desktop PC, PC VR & Meta Quest`.
- Headline: `Collaborative Architectural Visualization with Real-Time WebSocket Multiuser Sync`.
- Description of platform and summary of developer's ownership.
- Key tech pill tags: `Unreal Engine 5`, `C++`, `WebSocket (Node.js)`, `Meta Quest 3 / Link`, `LibTess2 / earcut`, `DXF / JSON`.

### 3.2 Key Specifications Grid (4 Cards)
1. **Developer Scope:** `Core Systems Contributor` (Multiplayer, Tile Cutting, VR UI, Lighting).
2. **Target Runtimes:** `Windows PC · PC VR · Meta Quest Standalone` (Desktop mouse/keyboard + 6DoF VR).
3. **Multiplayer Architecture:** `WebSocket Node Server` (Bidirectional real-time event pipeline).
4. **Procedural Geometry:** `DXF / JSON + LibTess2` (C++ triangulation & dynamic boolean void cutters).

### 3.3 Developer Core Ownership Section (4 Highlight Cards)
1. **Universal Bidirectional WebSocket Pipeline:**
   - Custom Node.js relay server synchronizing all client interactions.
   - Any event fired on PC Desktop (tile pick, color tint, camera move) reflects instantly on Meta Quest VR and vice versa.
2. **Procedural Tile Cutting & Alignment Engine:**
   - Solved wall tile cut-offs and seam continuity between adjacent walls/floors.
   - 4-way X/Y offset stepping (`Btn_XPlus`, `Btn_XMinus`, etc.), 90° rotation, 1-click reset, and Matte/Glossy PBR toggling across 15+ catalog finishes.
3. **VR 3D Floating Dock & Spatial Navigation:**
   - Built `WidgetHolderActor` allowing VR users to grab, reposition, or pin menus in 3D world space.
   - Dual locomotion (smooth walk vs point teleport) and top-down dollhouse view (`TopDownCameraActor`).
4. **Dynamic Room Ceiling Lighting:**
   - Engineered `DynamicRectLight` actor calculating bounding box of current room to scale and position ceiling light fixtures automatically.

### 3.4 Platform Subsystems Bento (6 Modular Cards)
1. **Grout Customization:** Independent XY joint width sliders, live millimeter readouts, and `WBP_ColorPicker`.
2. **Wall Paint & Color Gradients:** Solid PBR paint, HSV/RGB color wheel, two-sided wall separation (`TwoSideWallActor`), and vertical/horizontal color gradients (`GradientActor`).
3. **CAD / DXF Procedural Engine:** DXF/JSON parser (`DxfJsonReaderActor`) driving C++ LibTess2/earcut triangulation.
4. **Parametric Boolean Openings:** Dynamic void cutters for parametric doors and windows (`DoorBooleanCutterActor`, `WindowBooleanCutterActor`).
5. **Copy & Paste Material Presets:** 1-click transfer of active tile, grout, and paint configurations across any surface.
6. **Runtime Localization Subsystem:** Instant UI language switching on the fly without level reloads (`SS_LocalizationManagerSubSystem`).

### 3.5 End-to-End Pipeline
- 4 staged sequence cards showing CAD extraction -> procedural geometry -> customization -> multiplayer sync.

---

## 4. Verification & Testing Plan
- `npx tsc --noEmit` verifies type correctness.
- `npm run build` ensures asset bundling and clean production distribution.
- Test modal video player loads Google Drive embed properly with fallback link.
- Verify toggle between Walkthrough Video and System Architecture Schematic.
