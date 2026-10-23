# Front Project Cards: Engineering Bento Capsules Design Spec

**Date:** 2026-10-23  
**Status:** In Review  
**Component:** `src/components/Portfolio.tsx` & `src/data/portfolioData.ts`  
**Target:** Transform project front cards from dense paragraph text into high-impact, skimmable Engineering Bento Capsules while preserving 100% of deep engineering detail in the case study modal.

---

## 1. Problem & Objectives
- **Problem:** Project cards on the front page currently show a narrative paragraph (`shortDescription`) followed by standard bullet points (`highlights`). Recruiters skip paragraphs and scan for technical capabilities in 3–5 seconds. Plain bullet points feel like an unformatted resume list.
- **Solution:** 
  1. Replace the narrative paragraph and plain bullets with **3 structured "Engineering Bento Capsules"** per card.
  2. Each capsule features a colored accent dot, a monospace category badge (`ARCHITECTURE`, `INTERACTION`, `MULTIUSER`), and a single crisp sentence.
  3. Ensure the case study modal remains the source of truth for full in-depth exploration (videos, schematics, key specs, architecture bento, execution pipeline).

---

## 2. Data Contract (`src/data/portfolioData.ts`)

Add optional `cardCapsules` field to `ProjectCaseStudy`:
```typescript
export interface ProjectCardCapsule {
  tag: string;
  detail: string;
}

export interface ProjectCaseStudy {
  ...
  cardCapsules?: ProjectCardCapsule[];
  ...
}
```

If `cardCapsules` is present on a project, the card renders the capsules. For any project where `cardCapsules` is not explicitly provided, a fallback parser converts `highlights` into capsules by splitting on `:` or using default tags.

### 2.1 Capsules for Primary Projects

#### 1. Fiction Mech (`fiction-mech`)
- Capsule 1: `tag: "Dual-Runtime Architecture"`, `detail: "PC CAD Authoring Studio coupled with standalone Meta Quest 3 MR Passthrough."`
- Capsule 2: `tag: "Spatial Interaction & Shaders"`, `detail: "1:1 hand tracking, exploded assembly slider, and real-time 3-axis GPU shader slicer."`
- Capsule 3: `tag: "Cross-Platform Sync"`, `detail: "Photon multiplayer state & two-way live voice sync, plus Agora webcast to web browsers."`

#### 2. Radicon Powerbuild AR/MR (`radicon-powerbuild-xr`)
- Capsule 1: `tag: "Dual-Vision Tracking Engine"`, `detail: "Vuforia printed brochure tracking combined with markerless ground-plane showroom."`
- Capsule 2: `tag: "3D Catalog & Shaft Customizer"`, `detail: "Orbiting circular gearbox carousel with real-time live mechanical shaft swapping."`
- Capsule 3: `tag: "Radial Engineering HUD"`, `detail: "Curved in-world radial arc UI providing instant access to specs, manuals, and catalogs."`

#### 3. Fiction ArchViz (`fiction-archviz`)
- Capsule 1: `tag: "5 Predefined Showcase Rooms"`, `detail: "Living Room, Bathroom, Kitchen, Bed Room, and Kids Room built for feature benchmarking."`
- Capsule 2: `tag: "WebSocket Multiuser Pipeline"`, `detail: "Bidirectional real-time event bus connecting PC Desktop and Meta Quest standalone VR."`
- Capsule 3: `tag: "Procedural Tile Engine & Lights"`, `detail: "Fixed wall-cut seams with 4-way offset/rotation and room-bounds auto-scaling lights."`

#### 4. Mimadim Home Studio (`mimadim-home-studio`)
- Capsule 1: `tag: "Data-Driven UE Subsystem"`, `detail: "Modular architecture separating configuration data from runtime 3D rendering actors."`
- Capsule 2: `tag: "Parametric Furniture Customizer"`, `detail: "Dynamic material swapping, dimensional scaling, and modular component attachment."`
- Capsule 3: `tag: "Production UI System"`, `detail: "Data-asset driven catalog browser with reactive property binding and preset persistence."`

#### 5. WebAR Real-Time UV Mapping (`webar-coloring-book`)
- Capsule 1: `tag: "Browser-Native WebAR"`, `detail: "Marker tracking and 3D projection directly in mobile browsers with zero app installation."`
- Capsule 2: `tag: "Real-Time UV Texture Projection"`, `detail: "Live camera capture projected onto 3D character mesh UVs dynamically via Three.js."`
- Capsule 3: `tag: "WebGL Performance Tuning"`, `detail: "Optimized mobile canvas render loop maintaining steady 60 FPS across low-end mobile devices."`

#### 6. Motion-Controlled Games (`motion-controlled-games`)
- Capsule 1: `tag: "Computer Vision Pipeline"`, `detail: "Python MediaPipe hand & pose tracking streaming landmark coordinates to Unity via sockets."`
- Capsule 2: `tag: "Sub-16ms Input Latency"`, `detail: "Zero-lag gesture classification driving real-time 3D physics and gameplay mechanics."`
- Capsule 3: `tag: "Production Deployments"`, `detail: "Deployed across interactive trade-show booths, experiential exhibitions, and arcade kiosks."`

#### 7. Unity Commercial & Prototype Games (`unity-game-development`)
- Capsule 1: `tag: "Modular C# Architecture"`, `detail: "ScriptableObject-driven event systems, component decouplers, and clean game state managers."`
- Capsule 2: `tag: "Mechanics & Physics Systems"`, `detail: "Custom player locomotion controllers, trajectory prediction, and reactive combat feedback."`
- Capsule 3: `tag: "Cross-Platform Publishing"`, `detail: "Optimized draw calls, texture atlasing, and memory management across Mobile and PC."`

---

## 3. UI Styling & Visual Architecture (`src/components/Portfolio.tsx`)

In `src/components/Portfolio.tsx`, replace lines 225-245:
```tsx
{/* Engineering Bento Capsules (Point-Wise Overview) */}
<div className="space-y-2 mb-5">
  {displayCapsules.map((capsule, i) => (
    <div
      key={i}
      className="p-2.5 rounded-xl bg-[#10151D]/80 border border-[#1E2736]/80 hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-center space-y-0.5 group/capsule"
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            i === 0
              ? "bg-[#4D8DFF]"
              : i === 1
                ? "bg-[#8B6CFF]"
                : "bg-emerald-400"
          }`}
        />
        <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#89B2FF]">
          {capsule.tag}
        </span>
      </div>
      <p className="text-xs text-[#CBD5E1] leading-relaxed pl-3 font-normal">
        {capsule.detail}
      </p>
    </div>
  ))}
</div>
```

---

## 4. Verification & Testing
1. `npx tsc --noEmit` verifies type soundness.
2. `npm run build` verifies Vite asset bundling.
3. Verify all project cards render with equal visual cadence and responsive padding.
4. Verify clicking "Check in Details" opens the complete, deep case study modal untouched.
