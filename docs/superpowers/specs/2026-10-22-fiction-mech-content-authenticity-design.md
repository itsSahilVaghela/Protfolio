# Fiction Mech Content Authenticity & Developer-Grounded Redesign Spec

**Date:** 2026-10-22  
**Author:** Sahil Vaghela  
**Status:** Approved by User  
**Topic:** Replace generic AI copy on Fiction Mech card and modal with authentic developer-grounded features.

---

## 1. Objectives

1. Update the **Fiction Mech project card** in the main portfolio list with exact developer-specified copy.
2. Replace generic, boilerplate phrasing in the **Fiction Mech detail modal** with authentic, concrete engineering features reflecting the actual two-part architecture built solely by Sahil Vaghela:
   - **Part 1: PC Authoring Studio** (project creation, 3D model ingestion, 4 viewport modes, material design, metadata binding, assembly sequencing, layer permissions, screen recording, and cloud publishing).
   - **Part 2: Meta Quest 3 Mixed Reality & Mobile Companion Viewers (Android / iOS)** (cloud download, 1:1 spatial interaction, part-level metadata HUDs, layer deck, expanded view with reset, 3-axis cross-section clipping, guided assembly training, Agora screen casting, and multiplayer state sync with voice).
3. Ensure zero fluff, high technical fidelity, and seamless responsiveness across desktop and mobile.

---

## 2. Card Content Specification (`src/data/portfolioData.ts`)

- **Title**: `Fiction Mech`
- **Subtitle**: `Dual-Component Industrial 3D Model Visualization & Collaborative XR`
- **Technologies**: `["Unity", "C#", "OpenXR", "Meta Quest 3", "Android", "iOS", "Agora Video SDK", "Backend Integration"]`
- **Short Description**:
  > "Engineered solely as sole developer: A comprehensive industrial 3D visualization and collaboration system featuring a PC project authoring studio and spatial Meta Quest 3 Mixed Reality & mobile inspection viewers with Agora real-time voice and video."
- **Key Highlights** (3 items on card):
  1. "Architected and implemented end-to-end as sole developer across PC authoring, Meta Quest 3 MR, and mobile companions."
  2. "Two-part system architecture: PC application for 3D model ingestion, material design, metadata binding, and cloud publishing."
  3. "Meta Quest 3 mixed-reality viewer with full-color passthrough, room/tabletop placement, 6DoF & hand tracking."

---

## 3. Detail Modal Content Specification (`src/components/Portfolio.tsx`)

### 3.1 Overview Banner (System Scope & Sole Developer Role)
- **Badge**: `ARCHITECTURAL OVERVIEW · SOLE DEVELOPER (100% ARCHITECTURE & DELIVERY)`
- **Headline**: `Dual-Component Industrial 3D Model Visualization & Multi-Device XR Platform`
- **Authentic Description**:
  Fiction Mech is an industrial 3D model analysis and multi-device collaboration ecosystem conceived, architected, and built entirely by Sahil Vaghela as sole developer. The platform decouples heavy project setup from runtime spatial inspection:
  - **PC Authoring Studio**: Ingests CAD/3D models, configures materials and display modes, authors step-by-step assembly sequences, binds rich part documentation (dimensions, tools, manuals, videos), manages layer permissions, and publishes projects to the backend.
  - **Spatial Viewers (Meta Quest 3, Android & iOS)**: Downloads projects from the backend for 1:1 room/tabletop passthrough inspection, individual part manipulation, 3-axis cross-sectioning, guided maintenance playback, and Agora RTC multi-device synchronization with live voice chat.

### 3.2 Part 1: PC Authoring Studio (Project Setup & Staging)
Structured into 6 authentic feature blocks:
1. **Project Management & 3D Ingestion**:
   - Create and organize multi-model projects.
   - Dynamic 3D model loading (FBX / OBJ) with 360° turntable orbit review.
2. **Material Customization & 4 Viewport Modes**:
   - Assign distinct materials, colors, and textures to individual sub-components.
   - Switchable viewport rendering modes: **Mesh View**, **Wireframe View**, **Edge View**, and **Texture View**.
3. **Part-Level Engineering Metadata Binding**:
   - Attach rich operational data to each part: Part Name, Physical Dimensions, Disassembly/Assembly Tool required, Reference Photo, Demonstration Video clip, and Reference PDF Manual.
4. **Assembly & Disassembly Sequence Authoring**:
   - Define exact step-by-step assembly and disassembly timelines.
   - Author expanded subassembly views (explosion slider) with reset controls.
5. **Subsystem Layer Assignment & Device Permissions**:
   - Assign parts to discrete layers for isolated subsystem visualization.
   - Configure view permissions: enable or disable specific parts or views for Meta Quest 3 versus mobile (Android / iOS).
6. **Media Recording & Cloud Publishing**:
   - In-engine recording mode (with turntable & chroma key green screen) to generate demonstration videos and marketing assets.
   - One-click cloud package serialization and upload to backend storage.

### 3.3 Part 2: Spatial Viewers (Meta Quest 3 MR, Android & iOS)
Structured into 6 authentic feature blocks:
1. **Dynamic Cloud Project Fetching**:
   - In-app project library directly connects to cloud backend, downloading authored project bundles on demand.
2. **1:1 Scale Spatial 3D & Individual Part Interaction**:
   - Full-color stereo passthrough surface anchoring (room-scale / tabletop) on Meta Quest 3 with 6DoF controllers and natural hand tracking; responsive touch interaction on Android & iOS.
   - Tap or pinch any individual sub-part to open its attached metadata HUD (dimensions, required tools, reference photos, PDF schematics, and instructional video clips).
3. **Layer Deck & Expanded Subassembly View**:
   - Filter and isolate subsystem layers on the fly.
   - Expand all model parts in 3D space with continuous slider, plus one-touch reset back to default assembled state.
4. **Real-Time 3-Axis Cross-Section Slicing**:
   - Dynamic X, Y, and Z clipping planes to cut open enclosed mechanical assemblies and inspect internal tolerances and nested parts in real time.
5. **Interactive Assembly & Disassembly Training**:
   - Step-by-step procedural training playback teaching technicians the precise assembly sequence authored on PC.
6. **Agora RTC Screen Casting & Multiplayer Sync**:
   - Cast Meta Quest 3 spatial perspective directly to Android and iOS mobile devices using Agora SDK.
   - Cross-device multiplayer: multiple users connect in real time. Any change made on any device (part selection, expansion, movement) synchronizes across all clients with bidirectional audio voice chat.

### 3.4 Key Specifications Cards
- **Developer Scope**: Sole Developer (100% Architecture & Delivery across PC, Quest 3, Android, iOS, shaders & Agora RTC).
- **Target Runtimes**: PC Windows · Meta Quest 3 · Android · iOS.
- **Networking & Voice**: Agora RTC SDK (Real-time state sync, screen casting, and two-way voice).
- **VR Performance**: 72+ FPS Standalone (Single-pass fragment discard clipping shader on Snapdragon XR2 Gen 2).

---

## 4. Verification Criteria

1. Type safety: `npx tsc --noEmit` passes with 0 errors.
2. Build verification: `npm run build` succeeds cleanly.
3. Content review: Verify that all 4 PC viewport modes (Mesh, Wire, Edge, Texture), part metadata (tools, dimensions, PDFs, videos), layer permissions, expanded view with reset, 3-axis cross-section, Agora screen casting, and multiplayer sync are cleanly represented with zero AI fluff.
