# Radicon Powerbuild AR/MR Design Specification

## 1. Overview
Update the **Radicon Powerbuild AR/MR** (`radicon-powerbuild-xr`) case study in Sahil Vaghela's portfolio with authentic developer details, dual Google Drive online image previews (Marker vs Markerless), and concrete feature breakdowns across Android Mobile AR and Meta Quest 3 Mixed Reality.

## 2. Media Strategy (Online Google Drive Assets)
Zero repository bloat; stream media purely online via Google Drive URLs:
- **Marker Mode (Vuforia Brochure Tracking)**:
  - View URL: `https://drive.google.com/file/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_/view?usp=sharing`
  - Embed Preview: `https://drive.google.com/file/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_/preview`
  - Direct Image CDN: `https://lh3.googleusercontent.com/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_`
- **Markerless Mode (Floor/Surface Showroom)**:
  - View URL: `https://drive.google.com/file/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay/view?usp=sharing`
  - Embed Preview: `https://drive.google.com/file/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay/preview`
  - Direct Image CDN: `https://lh3.googleusercontent.com/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay`

## 3. UI Implementation
### 3.1 Front Card
- **Title**: `Radicon Powerbuild AR/MR`
- **Subtitle**: `Mobile AR & Meta Quest 3 Showcase`
- **Badge**: `Sole Developer`
- **Category**: `Industrial AR / Mixed Reality`
- **Thumbnail**: Renders primary marker mode photo directly with hover zoom.
- **Short Description**:
  `"Industrial 3D product visualization platform featuring Vuforia brochure tracking, markerless floor placement, and radial spec HUDs."`
- **Highlights**:
  1. `Dual Tracking Engine: Vuforia brochure marker tracking + markerless ground plane placement.`
  2. `Circular Showroom Carousel: Orbiting product ring with central hero focus and real-time shaft swapping.`
  3. `Radial Engineering HUD: Curved UI exposing product options, industry applications, catalogs, and manuals.`

### 3.2 Modal Media Viewer
- Switcher tabs:
  - `Brochure Target (Marker)`
  - `Floor Placement (Markerless)`
  - `System Schematic`
- Direct link fallback: `Open Drive ↗`.

### 3.3 Modal Structure (Two-Part Architecture)
- **Key Specifications (3 Cards)**:
  1. `Developer Scope`: Sole Developer (100% Architecture & Delivery across Android & Quest 3).
  2. `Target Runtimes`: Android Phone · Meta Quest 3.
  3. `Inspection Modes`: Printed Brochure Marker · Markerless Plane Placement.
- **Part 1: Android Mobile AR**:
  1. `1. Printed Brochure Tracking (Vuforia)`: Locks 3D Series-M gearbox onto printed marketing brochure.
  2. `2. Markerless Floor Placement`: Ground plane detection placing the full product showroom onto physical floors.
  3. `3. Circular Model Carousel`: Orbiting ring displaying full product family with central hero focus.
  4. `4. Real-Time Shaft Swapping`: Swap and inspect output shaft variants on the active gearbox.
  5. `5. Curved Radial Specifications HUD`: Orange arc menu for product options, applications, catalogs, and manuals.
  6. `6. Touch Interaction & Orbit`: Responsive touch orbit, uniform scaling, and angle inspection.
- **Part 2: Meta Quest 3 Mixed Reality**:
  1. `1. Spatial Passthrough Placement`: Tabletop and floor anchoring in full color stereo passthrough.
  2. `2. Free 3D Spatial Interaction`: 6DoF controller and natural hand-tracked rotation and inspection.
  3. `3. Full-Scale 1:1 Examination`: Inspect industrial gearboxes at true physical manufacturing dimensions.
  4. `4. Spatial Radial Navigation HUD`: Floating curved menu for accessing technical documentation.
  5. `5. Cross-Platform Parity`: Seamless feature parity between mobile touch and immersive XR runtimes.
  6. `6. Lightweight Draw-Call Optimization`: Batched CAD geometry and mobile shaders maintaining steady 72 FPS.

## 4. Verification
1. `npx tsc --noEmit` passes with 0 errors.
2. `npm run build` succeeds cleanly.
3. Card renders image cleanly and modal allows switching between Marker and Markerless view.
