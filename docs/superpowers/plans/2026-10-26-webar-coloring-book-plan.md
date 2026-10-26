# WebAR Coloring Book Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the live video demonstration (`WebArPainting.mp4`), poster backdrop asset, and AI-first non-redundant content for WebAR Coloring Book (Card 05).

**Architecture:** Fetch high-resolution video thumbnail into public assets, configure `portfolioData.ts` with videoUrl, mediaUrl, and streamlined Bento fields, align technical visual schematic labels, and verify via production build and headless browser test.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Lucide React, MindAR, Three.js

## Global Constraints
- Target project: `webar-coloring-book` (Card 05)
- Video URL: `https://drive.google.com/file/d/1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6/view?usp=sharing`
- Poster path: `public/projects/webar-coloring-book/webar-elephant-demo.jpg`
- Ownership note: `Sole Developer · Built Solely with AI`
- Must maintain 0 console errors and 0 build failures (`npm run build`)

---

### Task 1: Asset Pipeline (Poster Backdrop & Thumbnail)

**Files:**
- Create: `public/projects/webar-coloring-book/webar-elephant-demo.jpg`
- Scratch: `scratch/copy_webar_asset.js`

**Interfaces:**
- Consumes: Google Drive thumbnail endpoint `https://drive.google.com/thumbnail?id=1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6&sz=w1200`
- Produces: `public/projects/webar-coloring-book/webar-elephant-demo.jpg` (static asset served at `/Protfolio/projects/webar-coloring-book/webar-elephant-demo.jpg`)

- [ ] **Step 1: Create destination directory and fetch asset**

```bash
mkdir -p "public/projects/webar-coloring-book"
node -e "
const fs = require('fs');
const src = 'C:\\\\Users\\\\HP\\\\.gemini\\\\antigravity\\\\brain\\\\36308e5a-6e94-40d1-9e3f-caf9bb041f6f\\\\scratch\\\\webar_thumb.jpg';
const dest = 'public/projects/webar-coloring-book/webar-elephant-demo.jpg';
fs.copyFileSync(src, dest);
console.log('Copied size:', fs.statSync(dest).size);
"
```

- [ ] **Step 2: Verify asset presence and size**

Run: `node -e "const fs = require('fs'); const s = fs.statSync('public/projects/webar-coloring-book/webar-elephant-demo.jpg').size; console.log(s > 10000 ? 'PASS' : 'FAIL');"`
Expected: PASS

- [ ] **Step 3: Commit asset**

```bash
git add public/projects/webar-coloring-book/webar-elephant-demo.jpg
git commit -m "feat(portfolio): add poster image asset for WebAR Coloring Book"
```

---

### Task 2: Data Configuration Update

**Files:**
- Modify: `src/data/portfolioData.ts:725-840`

**Interfaces:**
- Modifies: `featuredProjects.find(p => p.id === 'webar-coloring-book')`
- Sets: `videoUrl`, `additionalVideos`, `mediaUrl`, `additionalImages`, `cardCapsules`, `pipelineSteps`, `challenges`, `outcomes`

- [ ] **Step 1: Update `portfolioData.ts` for `webar-coloring-book`**

```ts
  {
    id: "webar-coloring-book",
    priorityRank: 5,
    featuredTier: "primary",
    title: "WebAR Coloring Book",
    subtitle: "Interactive WebAR Crayon-to-3D Animal Experience with Multilingual Audio",
    category: "WebAR / In-Browser 3D",
    filterGroup: "web3d-ar",
    technologies: [
      "Three.js",
      "MindAR",
      "AI-Assisted",
      "GLSL Shaders",
      "Web Audio API",
    ],
    shortDescription:
      "Interactive WebAR game where physical paper coloring sheets come to life as animated 3D animals in real time. Built solely using AI with Three.js and MindAR, featuring a 60 FPS live texture-sampling engine that wraps crayon strokes onto animated 3D models with multilingual audio feedback.",
    highlights: [
      "Sole Developer: built 100% using AI workflows with Three.js and MindAR.",
      "Live 60 FPS texture-sampling engine projecting crayon strokes onto rigged 3D animal models.",
      "Optical image tracking across 54 physical drawing sheets and 6 animal categories via MindAR.",
      "Integrated multilingual educational audio feedback reinforcing engagement without game controllers.",
    ],
    cardCapsules: [
      {
        tag: "Paper-to-3D WebAR",
        detail:
          "MindAR optical target tracking brings physical coloring pages to life as rigged 3D animal models.",
      },
      {
        tag: "60 FPS Texture Sampling",
        detail:
          "Live GPU texture-sampling engine instantly projects physical crayon strokes and colors onto animated 3D geometry.",
      },
      {
        tag: "Multilingual Audio & AI Dev",
        detail:
          "Built solely using AI workflows, featuring interactive educational audio feedback across multiple languages.",
      },
    ],
    roleTitle: "Lead Web 3D & WebAR Developer",
    ownershipScope: "Sole Developer · Built Solely with AI",
    ownershipNote:
      "Sole Developer — engineered 100% using AI workflows with Three.js and MindAR, building the 60 FPS live texture-sampling engine and multilingual audio feedback.",
    diagramType: "webar-uv",
    mediaUrl: "/projects/webar-coloring-book/webar-elephant-demo.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6/view?usp=sharing",
    additionalVideos: [
      {
        label: "African Elephant Live Crayon-to-3D WebAR Demo",
        url: "https://drive.google.com/file/d/1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6/preview",
      },
    ],
    additionalImages: [
      {
        label: "Live Colored Sheet & 3D Rigged Animal Comparison",
        url: "https://drive.google.com/file/d/1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6/view?usp=sharing",
        previewUrl:
          "/projects/webar-coloring-book/webar-elephant-demo.jpg",
      },
    ],
    mediaCaption:
      "WebAR Pipeline: Physical Coloring Sheet -> MindAR Optical Lock -> 60 FPS GPU Texture Sampling -> Rigged 3D Animal with Audio.",
    caseStudy: {
      overview:
        "An interactive WebAR game where physical paper coloring sheets come to life as animated 3D animals in real time. Built solely using AI with Three.js and MindAR, it features a 60 FPS live texture-sampling engine that instantly wraps the child's physical crayon strokes and colors onto animated 3D models with interactive multilingual audio feedback.",
      problem:
        "Mapping physical drawings onto 3D models in real time presents simultaneous challenges: angled paper causes perspective distortion and texture seam stretching, while optical tracking, live 60 FPS texture extraction, and 3D skeletal animation must execute concurrently in a browser without dropped frames.",
      responsibilities: [
        "Architected and implemented entire application as Sole Developer using AI-accelerated workflows.",
        "Engineered real-time 60 FPS GPU texture-sampling engine projecting crayon colors onto 3D animal meshes.",
        "Integrated multi-target optical tracking for physical coloring sheets across animal categories using MindAR.",
        "Built interactive multilingual audio playback system delivering synchronized educational feedback.",
      ],
      technicalApproach:
        "Combined MindAR 6-DoF optical tracking with an offscreen GPU homography rectification shader unwarping camera angles into a normalized 2048×2048 texture buffer every frame. Bound the live buffer directly to rigged Three.js materials via dynamic CanvasTexture, preserving crayon stroke clarity with zero UV seam bleed.",
      architectureDetails: [
        "Paper-to-3D WebAR: MindAR optical tracking locks onto physical coloring sheets without app installations.",
        "60 FPS Live Texture Sampling: Offscreen GPU homography shader extracts crayon colors into normalized UV space.",
        "Rigged 3D Animal Models: Real-time skeletal animation driven by Three.js AnimationMixer at 60 FPS.",
        "Multilingual Audio Feedback: Web Audio API integration providing spoken animal names and interactive feedback.",
        "AI-Accelerated Engineering: Developed 100% using AI workflows for rapid shader math and 3D logic.",
      ],
      pipelineSteps: [
        {
          stage: "STEP 01",
          title: "Coloring Sheet",
          detail: "Camera captures physical colored paper sheet under natural lighting",
        },
        {
          stage: "STEP 02",
          title: "MindAR Tracking",
          detail: "Detects sheet corners and estimates 6-DoF optical pose matrix",
        },
        {
          stage: "STEP 03",
          title: "60 FPS Sampling",
          detail: "GPU engine unwarps perspective and samples live crayon color buffer",
        },
        {
          stage: "STEP 04",
          title: "Rigged 3D Animal",
          detail: "Dynamic texture wraps onto animated 3D animal with multilingual audio",
        },
      ],
      challenges: [
        {
          challenge:
            "Angled paper orientation introduces severe trapezoidal perspective distortion and UV seam stretching.",
          solution:
            "Implemented a 4-point projective homography rectification shader unwarping camera angles into a normalized 2048×2048 texture space every frame.",
        },
        {
          challenge:
            "Simultaneous 60 FPS camera frame processing, texture extraction, and skeletal 3D animation without CPU render bottlenecks.",
          solution:
            "Decoupled optical tracking cadences from WebGL draw calls and bound offscreen render-target buffers directly to Three.js materials via dynamic CanvasTexture.",
        },
      ],
      outcomes: [
        "Shipped zero-install browser WebAR experience tracking 54 physical coloring sheets across 6 animal categories at 60 FPS.",
        "Integrated interactive multilingual voice feedback reinforcing child engagement without requiring physical game controllers.",
      ],
    },
  },
```

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit data updates**

```bash
git add src/data/portfolioData.ts
git commit -m "feat(portfolio): update WebAR Coloring Book with video link, poster, and AI content"
```

---

### Task 3: Build & Visual Verification

**Files:**
- Modify: `dist/*` (via build)

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build passes in <10s with 0 errors, outputs `dist/`.

- [ ] **Step 2: Commit build artifacts**

```bash
git add dist/
git commit -m "chore: update production bundle with WebAR Coloring Book video and poster"
```

---

### Task 4: Headless Browser Automated Verification

**Files:**
- Create: `scratch/test_webar_modal.js`

- [ ] **Step 1: Write headless test script**

Script opens `http://localhost:8091/Protfolio/`, clicks "VIEW CASE STUDY" on WebAR Coloring Book, and checks:
- Card 05 has `[▶ Video]` badge
- Modal opens successfully
- Video iframe has `src` matching `1bFHd99zuSkAP5dABto3RwKEHENP8JXZ6/preview`
- Poster image has `src` containing `webar-elephant-demo.jpg`
- 3 Bento pillars render ("Paper-to-3D WebAR", "60 FPS Texture Sampling", "Multilingual Audio & AI Dev")
- 4 pipeline stages render
- Zero console exceptions

- [ ] **Step 2: Execute test script**

Run: `node scratch/test_webar_modal.js`
Expected: All checks pass (`hasVideoBadge: true`, `hasDialog: true`, `hasPoster: true`, `hasIframe: true`, `exceptionsCount: 0`).

- [ ] **Step 3: Cleanup and final git status check**

Run: `git status`
Expected: Working tree clean.
