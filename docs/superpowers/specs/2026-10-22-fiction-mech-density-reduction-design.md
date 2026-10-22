# Fiction Mech Density Reduction & Scannability Design Spec

**Date:** 2026-10-22  
**Author:** Sahil Vaghela  
**Status:** Approved by User  
**Topic:** Eliminate text density on project card and detail modal, transforming dense narrative copy into executive, skimmable capability blocks.

---

## 1. Problem Statement
The Fiction Mech card and modal currently contain heavy narrative paragraphs. Recruiters, engineering managers, and clients scan portfolios in 5 to 15 seconds. Dense blocks of prose cause cognitive overload and get skipped.

---

## 2. Front Card Redesign (`src/data/portfolioData.ts`)

- **Title**: `Fiction Mech`
- **Subtitle**: `PC Authoring Studio & Multi-Device XR Platform`
- **Description**:
  > "Industrial 3D digital twin platform connecting a PC authoring studio with Meta Quest 3 MR and mobile companion viewers."
- **Key Highlights** (3 scannable capability lines):
  1. `PC Studio: CAD ingestion, 4 viewport modes & metadata authoring`
  2. `Quest 3 MR: 1:1 spatial passthrough & 3-axis shader cross-section`
  3. `Agora Sync: Real-time multi-device replication & two-way voice`
- **Impact**: Reduces card vertical height by ~35%, eliminates truncated text, and delivers instant comprehension.

---

## 3. Detail Modal Redesign (`src/components/Portfolio.tsx`)

Convert the 12 feature blocks (6 PC Studio + 6 Spatial Viewers) from long narrative paragraphs into high-contrast, skimmable executive blocks:

### 3.1 Part 1: PC Authoring Studio (6 Skimmable Modules)
1. **Project Management & 3D Ingestion**:
   - Summary: Dynamic FBX/OBJ multi-model loader with interactive 360° turntable inspection.
   - Tags: `FBX / OBJ Importer` · `360° Orbit Review` · `Multi-Model Staging`
2. **Material Customization & 4 Viewports**:
   - Summary: Assign custom PBR materials across 4 instant viewport rendering modes.
   - Tags: `Mesh View` · `Wireframe View` · `Edge View` · `Texture View`
3. **Part-Level Engineering Metadata**:
   - Summary: Bind physical specs, operational tools, and documentation directly to sub-components.
   - Tags: `Dimensions & Specs` · `Required Tooling` · `PDFs & Video Demos`
4. **Assembly & Disassembly Sequencing**:
   - Summary: Author step-by-step procedural maintenance timelines with continuous explosion slider.
   - Tags: `Step Sequencing` · `Exploded View Slider` · `Disassembly Timelines`
5. **Subsystem Layers & View Permissions**:
   - Summary: Group parts into functional layers and set target view permissions per platform.
   - Tags: `Subsystem Layer Deck` · `Quest 3 Permissions` · `Mobile View Filters`
6. **Media Recording & Cloud Publishing**:
   - Summary: Capture 1080p turntable demos with chroma green screen and publish packages to backend.
   - Tags: `Chroma Key Green Screen` · `1080p Video Rec` · `Cloud Package Export`

### 3.2 Part 2: Spatial Viewers (Quest 3 MR, Android & iOS: 6 Skimmable Capabilities)
1. **Dynamic Cloud Project Fetching**:
   - Summary: Connects to cloud backend to download and cache authored project bundles on demand.
   - Tags: `Cloud Manifest Sync` · `On-Demand Asset Fetch` · `Local Caching`
2. **1:1 Spatial 3D & Part Interaction**:
   - Summary: Room-scale/tabletop passthrough with 6DoF, hand tracking, and part metadata HUDs.
   - Tags: `Color Passthrough` · `6DoF & Hand Tracking` · `Part Metadata HUD`
3. **Layer Deck & Expanded Subassembly**:
   - Summary: Filter subsystem layers live, expand parts with smooth slider, and reset in 1-click.
   - Tags: `Subsystem Filtering` · `Real-Time Part Expansion` · `1-Touch Instant Reset`
4. **Real-Time 3-Axis Cross-Section**:
   - Summary: Interactive 3D RGB gizmo slicing internal tolerances with zero stencil GPU overhead.
   - Tags: `3-Axis RGB Cutting` · `Single-Pass Fragment Clip` · `Internal Inspection`
5. **Interactive Procedural Training**:
   - Summary: Step-by-step SOP playback teaching technicians maintenance sequences authored on PC.
   - Tags: `Interactive SOP Guidance` · `Assembly Playback` · `Safety Step Verification`
6. **Agora RTC Screen Casting & Multiplayer**:
   - Summary: Stream headset view to mobile tablets with bidirectional state sync and live voice chat.
   - Tags: `Agora Screen Casting` · `Bi-Directional State Sync` · `Two-Way Spatial Audio`

---

## 4. Verification Criteria
- `npx tsc --noEmit` passes with 0 errors.
- `npm run build` passes with 0 errors.
- Skimmability verified: Any card or modal block can be read and understood in under 5 seconds.
