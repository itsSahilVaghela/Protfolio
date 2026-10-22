# Design Spec: Fiction Mech Unified Details Modal & Mobile Video Fix

**Date:** 2026-10-22  
**Status:** Approved  
**Author:** Sahil Vaghela (via Antigravity AI)  
**Target:** `src/components/Portfolio.tsx`, `src/App.tsx`, `src/data/portfolioData.ts`, `src/pages/FictionMechCaseStudy.tsx`

---

## 1. Problem Statement & User Goals
1. **Homepage Card Clutter:** Homepage card previously featured split buttons ("Full Study" and "Quick Specs"). User requested: "in projects list put proper info in fist view card than we will give only one option check in details."
2. **Remove Standalone Page:** User requested: "also i dont like full study page remove it. we will give only one option to see details where we will give total idea of project with videos. but not to long but with proper detailed like including uses and analyse."
3. **Video Curation:** Remove "Cross-Device Motor Walkthrough". Restrict video player to exactly 2 verified walkthroughs:
   - Part 1: PC Authoring Studio Walkthrough (4K)
   - Part 2: Meta Quest 3 Mixed Reality Walkthrough
4. **Mobile Video Player Regression:** On mobile screens, fixed height (`h-72`) and iframe container broke video controls and aspect ratio. Must be replaced with a fluid `aspect-video` (16:9) responsive wrapper, mobile-optimized padding (`p-4 sm:p-6`), and safe external links.

---

## 2. Architecture & Component Changes

```
Homepage (Portfolio.tsx)
  │
  ├── First-View Card (01 Fiction Mech)
  │     ├── Role Badge: "Main Project · Sole Developer"
  │     ├── High-Signal Overview: PC Studio + Quest 3 MR & Android
  │     ├── 3 Key Capability Bullets
  │     ├── Tech Stack Badges
  │     └── SINGLE Action Button: "Check in Details ↗"
  │
  └── Unified Details Dialog (<DialogContent>)
        ├── Responsive Sizing: w-[95vw] sm:max-w-4xl max-h-[90vh]
        ├── Header: Title, Category, Sole Developer Badge, Stack Pills
        │
        ├── Responsive Video Section
        │     ├── Video Switcher Bar (2 Videos Only + Schematic Toggle)
        │     │     ├── [PC Studio (4K)]
        │     │     ├── [Quest 3 MR]
        │     │     └── [Schematic]
        │     ├── 16:9 Responsive Embed (aspect-video w-full rounded-xl)
        │     └── Direct Drive Fallback Link
        │
        ├── Section 1: Total Project Overview (PC Authoring vs Quest 3 MR)
        │
        ├── Section 2: Industrial Uses & Workflows ("Uses")
        │     ├── Maintenance & Assembly Training (Disassembly sequence playback)
        │     ├── Engineering Design & Tolerance Review (Exploded view & 3-axis cutaways)
        │     ├── Field-Worker to Supervisor Collaboration (Agora audio & view casting)
        │     └── Technical Catalog Production (Turntable MP4 1080p + Green Screen)
        │
        ├── Section 3: Technical Analysis & Architecture ("Analyse")
        │     ├── PC CAD Staging Engine (FBX/OBJ, PBR HSL shader editor, PDF metadata binding)
        │     ├── Standalone VR GPU Optimization (Single-pass shader clipping at 72+ FPS)
        │     ├── Bidirectional State Synchronization (Deterministic OpenXR 6DoF & Touch RPCs)
        │     └── Agora RTC Voice & Screen Pipeline (Thread-isolated audio/video streams)
        │
        └── Section 4: Key Specifications & Metrics
              └── 4 Metric Cards (Sole Dev | PC · Quest 3 · Android | Agora RTC | 72+ FPS)
```

---

## 3. Detailed Component Specifications

### 3.1 First-View Project Card (`src/components/Portfolio.tsx`)
- **Single Action:** Remove `Full Study` link. Render single full-width button:
  ```tsx
  <button
    type="button"
    onClick={() => {
      setActiveCaseStudy(project);
      setActiveMediaView(project.videoUrl ? "video" : "schematic");
      setActiveModalVideoUrl(project.videoUrl || null);
    }}
    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider bg-[#4D8DFF] text-[#080B10] font-semibold hover:bg-[#89B2FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
  >
    <span>Check in Details</span>
    <ArrowUpRight className="w-4 h-4 text-[#080B10]" />
  </button>
  ```
- **Card Content:**
  - Priority & Role: `★ 01 // Industrial 3D Visualization / XR` | `Main Project · Sole Developer`
  - Title: `Fiction Mech`
  - Subtitle: `Dual-Component Industrial 3D Model Visualization & Collaborative XR`
  - Short Description: High-impact synthesis of PC Authoring Studio + Meta Quest 3 MR & Android Companion.
  - Highlights:
    - *Dual-Component Pipeline:* PC CAD preparation & PBR material customizer $\rightarrow$ Cloud Backend $\rightarrow$ Meta Quest 3 MR & Android runtime.
    - *Spatial Mechanical Analysis:* OpenXR 6DoF, hand-tracking pinch, and real-time 3-axis single-pass shader clipping at 72+ FPS.
    - *Real-Time Cross-Device Collaboration:* Bidirectional interaction sync & low-latency voice via Agora RTC SDK.
  - Technologies: `Unity`, `C#`, `OpenXR`, `Meta Quest 3`, `Android`, `Agora Video SDK`, `Backend Integration`.

### 3.2 Mobile-Responsive Video Player
- **Container:**
  ```tsx
  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl">
    {isEmbedIframe(currentVideoUrl) ? (
      <iframe
        src={getEmbedVideoUrl(currentVideoUrl)!}
        title={`${activeCaseStudy.title} Video Demo`}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    ) : (
      <video
        src={currentVideoUrl || undefined}
        controls
        playsInline
        className="w-full h-full object-contain bg-black"
      />
    )}
  </div>
  ```
- **Two Videos Only in Data (`src/data/portfolioData.ts`):**
  1. `PC Authoring Studio Walkthrough (4K)`
  2. `Meta Quest 3 Mixed Reality Walkthrough`
  *(Remove `Cross-Device Motor Walkthrough`).*
- **Direct Link Button:** Provide external link button next to video tabs for mobile users whose browsers block iframe third-party cookies:
  ```tsx
  <a
    href={currentVideoUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#89B2FF] hover:underline"
  >
    <span>Open External</span>
    <ExternalLink className="w-3 h-3" />
  </a>
  ```

### 3.3 Unified Details Modal Content
- **Dialog Sizing:** `w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#10151D] border border-[#1E2736] text-[#F4F6FA] p-4 sm:p-6 sm:p-8`.
- **Structured Content Blocks:**
  1. **Top Video Player & Switcher**: Responsive 16:9 player with 2 video buttons + schematic button.
  2. **Project Overview**:
     - Explains what Fiction Mech is, solving CAD inspection and collaboration barriers.
     - Delineates PC Authoring Studio (staging) from Quest 3 MR / Android (runtime inspection).
  3. **Industrial Uses & Practical Workflows ("Uses")**:
     - *Assembly & Maintenance Training*: Step-by-step disassembly sequence playback with part tools & attached PDF manuals.
     - *Engineering Design & Tolerance Review*: Exploded subassembly views and real-time 3-axis $(X, Y, Z)$ internal cross-sections.
     - *Field-Worker to Supervisor Collaboration*: Headset wearer shares spatial view to Android tablet supervisor with synchronized manipulation and Agora voice.
     - *Interactive Technical Catalogs*: 1080p turntable video export with Green Screen mode directly on PC.
  4. **Technical Analysis & Architecture ("Analyse")**:
     - *PC Authoring Architecture*: Dynamic file ingestion (FBX/OBJ, PDFs, MP4s), runtime PBR material generator with continuous HSL/alpha sliders, metadata tree serialization.
     - *Mobile VR Rendering & Optimization*: Standalone Quest 3 Snapdragon XR2 Gen 2 GPU budget. Single-pass fragment discard clipping shader (zero stencil pass overhead) maintaining solid 72+ FPS.
     - *State Synchronization*: Deterministic command pattern for part selection, expansion, and explosion offsets between Quest 3 OpenXR 6DoF inputs and Android touch gestures.
     - *Agora RTC Pipeline*: Low-latency voice channels and spectator video streaming integrated without blocking the main Unity thread.
  5. **Key Specs & Metrics**:
     - 4 Cards: Sole Developer | PC · Quest 3 · Android | Agora RTC SDK | 72+ FPS Standalone.

### 3.4 Cleanup & Removal of Standalone Route
- Remove `/project/fiction-mech` route from `src/App.tsx`.
- Delete `src/pages/FictionMechCaseStudy.tsx`.
- Remove `caseStudyUrl` references pointing to `/project/fiction-mech`.

---

## 4. Verification & Testing
1. **Desktop & Mobile Responsiveness:**
   - Test modal dialog at 360px, 390px, 768px, and 1280px widths.
   - Verify video player retains 16:9 aspect ratio without vertical cropping or horizontal scroll.
2. **Type Safety & Build:**
   - Run `npx tsc --noEmit` -> 0 errors.
   - Run `npm run build` -> production bundle succeeds.
3. **Interaction Check:**
   - Clicking "Check in Details" opens the unified modal with both videos, overview, uses, analysis, and specs.
   - No dead links or 404 routes.
