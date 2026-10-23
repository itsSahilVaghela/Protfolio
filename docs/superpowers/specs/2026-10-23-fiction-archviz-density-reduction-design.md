# Fiction ArchViz Density Reduction Spec

**Date:** 2026-10-23  
**Status:** In Review  
**Project:** Fiction ArchViz (`fiction-archviz`)  
**Context:** Modal density and text bulk elimination for 10-second recruiter skimming.

---

## 1. Objective

Eliminate wall-of-text fatigue in the Fiction ArchViz case study modal in `src/components/Portfolio.tsx`:
- Cut modal height and visual bulk by ~50%.
- Trim long paragraphs down to single crisp sentences under 15 words.
- Reduce Key Specs from 4 to 3 clean cards.
- Focus primary visual weight on developer's 4 core achievements (WebSocket sync, tile cutting/alignment, VR dock, auto-lighting).
- Compact the 6 bulky platform subsystem cards into a sleek 6-item micro-grid.

---

## 2. Component Structure (`src/components/Portfolio.tsx`)

### 2.1 Overview Banner
- Badges: `ENTERPRISE ARCHITECTURAL PLATFORM · CORE SYSTEMS CONTRIBUTOR` and `5–6 Predefined Test Environments · PC & Quest Standalone`.
- Headline: `Collaborative Architectural Visualization with Real-Time WebSocket Multiuser Sync`.
- Description: `Architectural platform in Unreal Engine 5 transforming 2D CAD floor plans into interactive 3D spaces with live bidirectional sync between PC Desktop and Meta Quest standalone VR.` (Single sentence).
- 5 Compact tech pills: `Unreal Engine 5`, `WebSocket / Node.js`, `Meta Quest Standalone`, `Procedural Tile Engine`, `C++ LibTess2`.

### 2.2 Key Specifications Grid (3 Cards)
1. **Developer Scope:** `Core Contributor` | Multiplayer, tile engine, VR dock UI, dynamic lights.
2. **Target Runtimes:** `PC & Quest Standalone` | Windows desktop workstation & mobile 6DoF VR.
3. **Multiplayer Architecture:** `WebSocket Relay` | Bidirectional Node.js bus with sub-100ms sync.

### 2.3 Developer Core Ownership (4 Highlight Cards)
Each card has a colored icon, clear title, subtitle, single crisp description under 15 words, and 2 concise tags:
1. **WebSocket Multiuser Pipeline:**
   - Subtitle: `Node.js Event Bus (PC ↔ VR)`
   - Description: `Real-time bidirectional event bus synchronizing PC Desktop and Meta Quest VR.`
   - Tags: `WebSocket Node Server`, `PC ↔ VR Parity`
2. **Procedural Tile Engine:**
   - Subtitle: `Seam Math & 15+ Finish PBR`
   - Description: `Fixed wall-cut seams with 4-way offset, 90° rotation, and Matte/Glossy PBR.`
   - Tags: `Tile Cut Seam Math`, `Matte / Glossy PBR`
3. **VR 3D Floating Dock:**
   - Subtitle: `Grabbable UI & Locomotion`
   - Description: `Grabbable in-world palette widget for instant in-VR material configuration.`
   - Tags: `WidgetHolderActor`, `Dual Locomotion`
4. **Dynamic Room Lighting:**
   - Subtitle: `Bounding Box Sizing & Placement`
   - Description: `Calculates room bounds automatically to scale and position ceiling light fixtures.`
   - Tags: `DynamicRectLight`, `Auto-Scaled Bounds`

### 2.4 Platform Architecture Subsystems (Compact Micro-Grid)
Replaces 6 bulky cards with a single sleek 6-item grid panel:
- `CAD / DXF Ingestion (LibTess2 / earcut)`
- `Parametric Boolean Cutters (Doors & Windows)`
- `Grout Joint Widths (Millimeter UI Sliders)`
- `Solid Wall Paint & Linear Gradients`
- `Surface Copy / Paste Presets`
- `Runtime Localization Subsystem`

### 2.5 4-Stage End-to-End Pipeline
Keeps the 4 clean stage cards:
- Stage 01: `CAD / DXF Ingestion`
- Stage 02: `C++ Mesh Triangulation`
- Stage 03: `Customization & Lighting`
- Stage 04: `Multiuser WebSocket Sync`

---

## 3. Verification
- `npx tsc --noEmit` passes with 0 errors.
- `npm run build` succeeds cleanly.
