# Case Study Modal Consolidation Specification

**Date:** 2026-10-23  
**Status:** Approved  
**Scope:** `Fiction Mech`, `Radicon Powerbuild AR/MR`, `Fiction ArchViz` in `src/components/Portfolio.tsx`  
**Problem:** Repetitive content loop (overview banner -> key specs -> overview/problem -> responsibilities list -> bento cards -> pipeline) stated the same facts 4-5 times in different card formats.  
**Solution:** Single-Occurrence 3-Tier Architecture. Every fact stated exactly once.

---

## 1. Unified 3-Tier Architecture

Each project modal will follow this exact clean structure:

### Tier 1: Media Player & Executive Header
- Media container (Walkthrough Video Demo & Architecture Schematic switcher).
- 1-line subtitle explaining what the platform is.
- 3 clean meta badges:
  - `Developer Role & Scope`
  - `Target Runtimes`
  - `Core Tech Stack`

### Tier 2: The Challenge & My Deliverables (Side-by-Side)
- 2-column card grid:
  - **Left Card: The Engineering Challenge** (2-3 concise sentences on real-world client/hardware constraints).
  - **Right Card: What I Personally Built & Delivered** (3-4 crisp checkmarked bullets detailing personal engineering deliverables).

### Tier 3: Core Technical Systems (4 Distinct Bento Cards)
- 4 visual cards detailing concrete engineering subsystems (HLSL shaders, WebSockets, image tracking, procedural tile math, 5 predefined rooms, etc.).
- **Strict Rule:** Each card describes a UNIQUE technical feature not repeated in Tier 2.

---

## 2. Project-Specific Content

### 2.1 Fiction Mech (`fiction-mech`)
- **Header:**
  - Subtitle: `Dual-component industrial 3D model visualization & multi-device XR inspection platform.`
  - Badges: `Sole Developer (100% Architecture)` | `PC Studio · Meta Quest 3 MR · Mobile` | `Unity · OpenXR · Photon PUN · Agora RTC`
- **Challenge:** Industrial CAD models and heavy machinery assemblies cannot be physically transported to clients or field workers. Needs an authoring pipeline that decouples desktop CAD setup from standalone mixed reality inspection and live multiplayer streaming.
- **My Deliverables:**
  - Architected full two-part ecosystem: PC Authoring Studio + Quest 3 MR & mobile touch viewers.
  - Engineered 3D CAD ingestion, assembly sequence authoring, and part metadata binding.
  - Built 1:1 scale room passthrough inspection with 3-axis shader cross-section slicing.
  - Implemented Photon real-time multiplayer state sync, live 2-way voice, and Agora web streaming.
- **4 Technical Systems:**
  1. `PC Authoring Studio:` Ingests CAD models, configures 4 viewport modes (Mesh/Wireframe/Edge/Texture), and publishes cloud asset bundles.
  2. `Quest 3 Mixed Reality Inspection:` 1:1 scale passthrough review with individual part grabbing, hierarchy toggling, and 1-click explosion reset.
  3. `Real-Time 3-Axis Cross-Section Slicing:` Single-pass HLSL discard shader slicing internal mechanical tolerances with zero stencil GPU overhead.
  4. `Multiplayer Collaboration & Webcast:` Synchronized cross-device multi-client room sessions with Photon Voice audio and Agora video streaming to web browsers.

---

### 2.2 Radicon Powerbuild AR/MR (`radicon-powerbuild-xr`)
- **Header:**
  - Subtitle: `Industrial 3D product showcase featuring brochure image tracking and markerless floor placement.`
  - Badges: `Sole Developer (100% Delivery)` | `Android Phone · Meta Quest 3 MR` | `Unity · C# · Vuforia Engine · OpenXR`
- **Challenge:** Heavy industrial gearboxes are impractical and costly to bring to client sales meetings and trade shows. Radicon required a portable mobile & VR tool to demonstrate their complete mechanical lineup and swap configurations in real time.
- **My Deliverables:**
  - Developed native Android touch app and standalone Meta Quest 3 mixed reality APK.
  - Integrated Vuforia Engine dual-vision tracking for both printed brochures and markerless floors.
  - Programmed orbiting 3D carousel showroom with live mechanical shaft swapping on Series-M models.
  - Designed curved radial HUD menu connecting users directly to technical catalogs and manuals.
- **4 Technical Systems:**
  1. `Vuforia Brochure Marker Tracking:` Image-target tracking anchoring live 3D gearbox assemblies directly onto physical printed product brochures.
  2. `Markerless Floor & Tabletop Showroom:` Ground-plane surface detection scaling and placing full-scale gearboxes on real floors in mobile AR and Quest 3 passthrough.
  3. `Circular Product Carousel & Shaft Swapping:` Orbiting 3D product ring with central hero focus and instant live mechanical shaft component replacement.
  4. `Curved Radial Engineering HUD:` Ergonomic curved arc menu providing instant on-device access to technical specifications, PDF catalogs, and installation manuals.

---

### 2.3 Fiction ArchViz (`fiction-archviz`)
- **Header:**
  - Subtitle: `Collaborative architectural visualization platform with real-time WebSocket multiuser synchronization.`
  - Badges: `Core Systems Contributor` | `Windows PC Desktop · Meta Quest Standalone VR` | `Unreal Engine 5 · C++ · WebSocket / Node.js`
- **Challenge:** Design teams and clients need to review interior floor plans and material finishes collaboratively across desktop PCs and standalone VR headsets without latency, state divergence, or tile seam alignment errors.
- **My Deliverables:**
  - Configured and built 5 predefined showcase environments: Living Room, Bathroom, Kitchen, Bed Room, Kids Room.
  - Architected full bidirectional WebSocket multiplayer event bus between PC and Quest VR via Node.js server.
  - Solved procedural wall tile cutting, seam continuity, 4-way offset alignment, and Matte/Glossy PBR finish toggling.
  - Built grabbable in-VR 3D floating dock UI (`WidgetHolderActor`) and automated room ceiling lighting (`DynamicRectLight`).
- **4 Technical Systems:**
  1. `5 Predefined Interactive Showcase Rooms:` Living Room, Bathroom, Kitchen, Bed Room, and Kids Room built to benchmark tile cutting, lighting, and VR mechanics.
  2. `Universal Bidirectional WebSocket Pipeline:` Real-time event relay on Node.js synchronizing all user interactions and material changes between PC and Quest with sub-100ms latency.
  3. `Procedural Wall Tile Engine:` Solved wall-cut seams with 4-way X/Y offset stepping, 90° rotation, 1-click zero reset, and Matte/Glossy PBR swapping across 15+ catalog finishes.
  4. `VR 3D Floating Dock & Dynamic Lights:` Grabbable in-world palette widget (`WidgetHolderActor`) for in-VR material editing paired with `DynamicRectLight` room-bounds ceiling fixtures.

---

## 3. Verification Plan
- Verify `Portfolio.tsx` compiles with zero TypeScript errors (`npx tsc --noEmit`).
- Verify production build succeeds (`npm run build`).
- Ensure no visual or layout regressions on modal open/close.
