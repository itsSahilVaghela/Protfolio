# Design Document: Fiction Mech — Complete Project Case Study

- **Date:** 2026-10-21
- **Author:** Sahil Vaghela & Antigravity
- **Topic:** Fiction Mech Complete Engineering Case Study & Portfolio Integration
- **Target Route:** `/project/fiction-mech`
- **Component File:** `src/pages/FictionMechCaseStudy.tsx`
- **Updated Files:** `src/App.tsx`, `src/components/Portfolio.tsx`, `src/data/portfolioData.ts`, `src/components/ProjectTechnicalVisual.tsx`

---

## 1. Executive Summary & Purpose

Fiction Mech is an interactive industrial 3D model visualization, inspection, and multi-device collaboration system developed solely by Sahil Vaghela.

The platform solves a fundamental challenge in industrial maintenance, engineering reviews, and vocational training: traditional 2D technical drawings, physical manuals, and disconnected CAD viewers isolate headset users, field technicians, and remote stakeholders. Fiction Mech bridges this gap through a dual-component architecture:
1. **PC Application (Project Creation & Configuration Studio):** A desktop tool for 3D model ingestion, material customisation, layer assignment, exploded view tuning, technical documentation attachment (PDFs, videos, audio), and backend cloud publishing.
2. **XR & Mobile Viewer Applications (Inspection & Collaboration Runtime):** A multi-platform runtime targeting Meta Quest 3, Android, and iOS for room-scale/tabletop mixed-reality inspection, 6DoF and hand-tracked manipulation, real-time 3-axis shader cross-sectioning, and synchronized multiplayer review with integrated Agora voice and video.

This document specifies the end-to-end architecture and implementation of a dedicated, visually rich 10-section project case study page, alongside updates to the portfolio homepage card, modal dialog, and data structures.

---

## 2. Verified Technical Facts & Media Provenance

Every item in this specification has been verified against the author's actual production builds and recordings:
- **Authorship:** The PC build executable runs directly from `D:\Projects\FictionMech_SahilVaghela\Deliverables\Exe\...` confirming Sahil Vaghela's role as Sole Developer.
- **Walkthrough 1 (PC 4K Walkthrough):** `Copy of FictionMechEdited.MP4` (3840x2160, 25 fps). Showcases project creation, file ingestion, material creation, disassembly slider, PDF/video documentation attachments, turntable recording, green-screen compositing, and cloud publishing.
- **Walkthrough 2 (Quest 3 MR Walkthrough):** `Copy of Jet Engine.mp4` (1280x720, 30 fps). Showcases Meta Quest 3 full-color passthrough, spatial plane floor/table placement, hand tracking with pinch selection, floating component metadata HUD, spatial layer deck, layer visibility filtering, and real-time 3-axis RGB cross-sectioning.
- **Walkthrough 3 (Cross-Device Walkthrough):** `Copy of Motor (2).mp4` (1920x1080, 30 fps). Showcases industrial motor inspection with PC-authored materials, multi-part separation, and bidirectional cross-device control.

---

## 3. Case Study Page Structure (`/project/fiction-mech`)

The page is structured into 10 ordered sections adhering to the portfolio's visual styling (dark slate background `#080B10`, technical grid textures, electric blue `#4D8DFF` and violet `#8B6CFF` accents, JetBrains Mono font tags, and responsive layouts):

### Section 1: Hero
- **Header:** `Fiction Mech — Interactive 3D Model Analysis and Collaborative XR`
- **Sub-header:** Dual-component industrial 3D visualization platform: PC project authoring studio paired with Meta Quest 3 Mixed Reality and mobile companion viewers.
- **Role Badge:** `Sole Developer (All Engineering & Systems Architecture)`
- **Tech Stack Badges:** `Unity (C#)`, `OpenXR`, `Meta Quest 3`, `Android`, `iOS`, `Agora Video SDK`, `Backend Cloud Publishing`
- **Navigation Controls:** Floating back-to-portfolio button (`← Back to Portfolio`), direct links to interactive sections, and video demo triggers.

### Section 2: Project Overview — The Two-Part System
- Comprehensive explanation of the mechanical analysis problem and the distinct responsibilities of the two subsystems.
- Dual visual comparison cards contrasting the **PC Authoring Studio** (authoring, configuring, publishing) against the **XR & Mobile Viewers** (spatial exploration, mixed reality inspection, real-time collaboration).

### Section 3: System Architecture & Workflow Pipeline
- Interactive SVG/Tailwind schematic illustrating the complete end-to-end data pipeline:
  1. `PC Authoring Node`: Asset ingestion (FBX/OBJ, textures, PDFs, MP4s, audio), material configuration, layer hierarchy, disassembly sequence keyframing.
  2. `Backend Cloud Service`: Project bundle serialization, structured metadata storage, and streaming distribution.
  3. `Meta Quest 3 MR Node`: OpenXR runtime, spatial anchoring, hand tracking & 6DoF raycast input, custom shader cross-sectioning.
  4. `Bidirectional Sync Bridge`: Low-latency command replication for model transforms, component selection, and expansion states.
  5. `Agora Comms & Streaming`: Real-time voice channels and view-casting for remote supervision.
  6. `Android Companion Node`: Touch-driven UI, synchronized model inspection, and field monitoring.

### Section 4: Part One — PC Project Authoring Studio
Visual deep dive with verified screenshots:
- **Project Creation & Asset Ingestion:** Project naming, description, and multi-folder asset import (Audio, Images, Info, Models, PDF, Textures, Videos).
- **Material Customization Studio:** Palette selector plus the custom material creator with Hue, Saturation, Luminance, Transparency sliders, Texture map, and Normal map inputs.
- **Part-Level Technical Documentation:** Hierarchical part tree showing the orange info icon (`i`) on components with attached documentation (`sensors.pdf`, `Gear.pdf`, `Bldc3.mp4`, etc.).
- **Exploded View Configuration:** The `Assemble <---> Disassemble` slider defining the spatial offsets for subcomponents.
- **Integrated Turntable Recording:** The in-app `• REC` pipeline rendering 1080p MP4 showcase videos directly to the deliverables folder, plus the Green Screen background toggle for video compositing.
- **Backend Cloud Publishing:** The one-click cloud upload workflow (`"Please wait we're getting things ready for you..."`).

### Section 5: Part Two — Meta Quest 3 & Mobile Inspection Viewers
Visual deep dive with verified screenshots:
- **Room-Scale MR Placement:** Full-color passthrough with surface detection prompt (*"Tap to place the model on the floor..."*) supporting 1:1 scale or tabletop placement.
- **6DoF & Direct Hand Tracking:** Raycast pointing and pinch gestures with cyan outline selection highlighting.
- **Spatial Component HUD:** Floating contextual tooltip with part name, material state, and direct `Expand` and `Reset` controls.
- **Spatial Layer Management:** Floating layer selection deck (`containers`, `plates`, `fins_outside`, `flaps`, `turbine_hull`, `pistons`, `gears`, `screw & bolts`) allowing users to isolate mechanical subsystems.
- **Live 3-Axis Cross-Sectioning:** Dedicated clipping panel with color-coded **X (Red)**, **Y (Green)**, and **Z (Blue)** sliders, RGB 3D axis gizmo, and real-time custom shader clipping plane.

### Section 6: Assembly and Disassembly Sequences
- Technical explanation of user-controlled mechanical separation versus static animations.
- Explains how step-by-step disassembly inspection aids field technicians in identifying component relationships, tolerances, and maintenance tool requirements.

### Section 7: Multiplayer Collaboration & Agora Screen Sharing
- In-depth architectural breakdown of multi-device sessions between Meta Quest 3 and Android companion devices.
- Deterministic state replication protocol avoiding input conflicts during simultaneous manipulation.
- Agora Video SDK integration for low-latency audio communication and live spectator casting.

### Section 8: Technical Implementation & Sole Developer Contributions
- Clarification of Sahil Vaghela's role as Sole Developer.
- Detailed engineering focus:
  - Custom Unity C# scene-state controller coordinating heterogeneous inputs (OpenXR 6DoF vs touch gestures).
  - High-performance shader clipping plane designed to run within the mobile GPU power budget of Meta Quest 3.
  - Runtime asset management avoiding memory fragmentation during large CAD mesh loading.
  - Decoupled network and Agora audio threads to maintain an uncompromised 72+ FPS in VR.

### Section 9: Verified Project Gallery & Interactive Demos
- Multi-tab embedded HD video player:
  - Tab 1: **PC Authoring Studio Walkthrough** (`https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/preview`)
  - Tab 2: **Meta Quest 3 Mixed Reality Walkthrough** (`https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/preview`)
  - Tab 3: **Cross-Device Motor Inspection Walkthrough** (`https://drive.google.com/file/d/17-TV9eok0MBA01NzHE0WI9nd5w9rTDQX/preview`)
- Curated screenshot showcase with full-screen lightbox preview.

### Section 10: Key Takeaways & Impact
- Summary of industrial impact, digital twin capabilities, and future-ready XR architecture.

---

## 4. Portfolio Integration Plan

1. **Routing in `src/App.tsx`:**
   Add route `<Route path="/project/fiction-mech" element={<FictionMechCaseStudy />} />`.
2. **Homepage Update in `src/components/Portfolio.tsx`:**
   - Update the Fiction Mech card badge and description to reflect the Sole Developer role and two-part system.
   - In the modal dialog for Fiction Mech, add a prominent *"Open Full-Page Case Study ↗"* button linking to `/project/fiction-mech`.
   - Update the schematic and video demo tabs in the modal to link to the new verified walkthroughs.
3. **Data Synchronization in `src/data/portfolioData.ts`:**
   - Update `roleTitle: "Sole Developer"` and `ownershipScope: "Sole Developer"`.
   - Update `highlights`, `responsibilities`, `pipelineSteps`, `challenges`, and `outcomes` to match the verified findings.
4. **Asset Deployment in `public/projects/fiction-mech/`:**
   - Curate and copy genuine high-resolution screenshots into `public/projects/fiction-mech/` for use in the gallery and showcase cards.

---

## 5. Verification & Quality Gates

- ESLint: 0 errors
- TypeScript (`tsc --noEmit`): 0 errors
- Vite production build (`npm run build`): Clean build output
- Responsive testing across desktop, tablet, and mobile viewport widths.
