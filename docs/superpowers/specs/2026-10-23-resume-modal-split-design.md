# Resume Modal Split 40/60 Design Spec

**Date:** 2026-10-23  
**Status:** Approved by User  
**Topic:** Resume Viewer Modal with 40% Profile / Contact Sidebar (Left) and 60% High-Resolution Resume Image Viewer (Right).

---

## 1. Overview & Objectives

Replace the generic PDF embed with an executive two-column modal:
- **Left Column (40% width)**: About Myself & Direct Contact details (Phone, Email, LinkedIn, Core Specialization, and Download / Message CTAs).
- **Right Column (60% width)**: Primary focus area displaying high-resolution (300 DPI) rendered resume images with interactive Page 1 / Page 2 switcher and zoom controls.

---

## 2. Layout & Grid Architecture

```
┌──────────────────────────────────────┬─────────────────────────────────────────────────┐
│  LEFT COLUMN (40% Width)             │  RIGHT COLUMN (60% Width): MAIN RESUME FOCUS    │
│  ABOUT MYSELF & DIRECT CONTACT       │  HIGH-RES RESUME IMAGE VIEWER                   │
│                                      │                                                 │
│  👤 Sahil Vaghela                    │  [ Page 1: Experience ]  [ Page 2: Projects ]    │
│     Real-Time 3D & XR Developer      │  ┌───────────────────────────────────────────┐  │
│     Status: Available for Hire       │  │                                           │  │
│                                      │  │                                           │  │
│  📌 Professional Summary             │  │   High-Res Rendered Image                 │  │
│     Real-time engine developer       │  │   (300 DPI, 1786 x 2526 px)               │  │
│     specializing in Unreal Engine 5  │  │   Zero browser PDF toolbar hitches        │  │
│     (C++), Unity (C#), and OpenXR.   │  │   Instant rendering                       │  │
│                                      │  │                                           │  │
│  📞 Direct Contact                   │  │                                           │  │
│     • Phone: +91 6351955141 [Copy]   │  │                                           │  │
│     • Email: sahil.vaghela.dev@gmail  │  │                                           │  │
│     • Secondary: sahilvaghela03@...  │  │                                           │  │
│     • LinkedIn: /in/sahil-vaghela    │  │                                           │  │
│                                      │  │                                           │  │
│  📥 Actions                          │  │                                           │  │
│     [ Download PDF Resume ]          │  │                                           │  │
│     [ Send Message / Inquire ]       │  │                                           │  │
└──────────────────────────────────────┴──┴───────────────────────────────────────────┘──┘
```

---

## 3. Component Breakdown

### 3.1 Modal Container (`Dialog` & `DialogContent`)
- **Dimensions**: `w-[96vw] max-w-7xl h-[92vh] max-h-[94vh]` with option to toggle full viewport (`w-screen h-screen`).
- **Styling**: `#0C1017` dark background, `#1E2736` borders, rounded-2xl corners, backdrop blur.
- **Responsive Layout**:
  - `lg:grid lg:grid-cols-12`:
    - Left Column: `lg:col-span-5 xl:col-span-4` (~40%).
    - Right Column: `lg:col-span-7 xl:col-span-8` (~60%).
  - Mobile / Tablet (`< lg`): Vertical stack, with tabs or collapsible sections.

### 3.2 Left Column: About Myself & Direct Contact (40%)
- **Profile Header**:
  - Avatar / terminal badge icon (`>_` or profile picture).
  - Name: **Sahil Vaghela**.
  - Headline: **Real-Time 3D & XR Developer**.
  - Availability pill: `Open to Remote & Relocation`.
- **Bio & Core Capabilities**:
  - Concise 3-bullet capability summary:
    - High-performance C++ systems in Unreal Engine 5.
    - Standalone XR (Meta Quest 3, OpenXR) & Unity cross-platform applications.
    - Procedural CAD generation, WebSocket multiuser sync & WebAR.
- **Contact Cards (Interactive)**:
  - Phone: `+91 6351955141` with 1-click **Copy** and **Call** (`tel:`) buttons.
  - Primary Email: `sahil.vaghela.dev@gmail.com` with 1-click **Copy** and **Mailto** buttons.
  - Secondary Email: `sahilvaghela03@gmail.com`.
  - LinkedIn: Verified badge link opening `https://www.linkedin.com/in/sahil-vaghela-ba4822250`.
- **Primary CTAs**:
  - `Download Official PDF` button (`Sahil_Vaghela_Resume.pdf`).
  - `Send a Message` button (scrolls to `#contact` and closes modal).

### 3.3 Right Column: High-Res Resume Image Viewer (60%)
- **Page Controller Bar**:
  - Switcher tabs: `Page 1: Experience & Systems` / `Page 2: Projects & Education`.
  - Zoom & Fit buttons (`Zoom In`, `Fit Width`).
  - External link button: `Open PDF in New Tab`.
- **Image Display Container**:
  - Scrollable viewport with dark contrast background (`#080B10`).
  - Renders `public/resume-page-1.png` and `public/resume-page-2.png` (high-res 1786x2526 px).
  - Subtle drop shadow simulating physical paper in a dark studio.

---

## 4. Verification & Testing
- Visual check: 40/60 split alignment on desktop (`lg:`).
- Copy buttons: clicking Phone or Email copies to clipboard and displays brief toast / check icon.
- Download button: downloads `Sahil_Vaghela_Resume.pdf`.
- Page switcher: toggles between Page 1 and Page 2 instantaneously.
- Mobile responsiveness: stacks cleanly on small screens.
- Type safety: `npx tsc --noEmit` returns 0 errors.
- Build safety: `npm run build` succeeds cleanly.
