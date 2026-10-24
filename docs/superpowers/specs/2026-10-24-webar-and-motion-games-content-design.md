# Design Specification: WebAR Coloring Book & Motion-Controlled AI Games Content Update

- **Date**: 2026-10-24
- **Scope**: Accurate technical positioning, card copy, bento capsules, and deep 9-part case studies for `webar-coloring-book` and `motion-controlled-games` in `src/data/portfolioData.ts`.
- **Status**: Approved by User

---

## 1. Context & Motivation

Previously:
- `motion-controlled-games` was described as using "Unity, C#, MediaPipe, Python" with "Alien Runner & Football Cup".
- In reality, the developer built these systems **solely in Three.js** using browser-native **MediaPipe Pose (33 landmarks)** and browser-side **YOLO11n ONNX AI (`best.onnx` via `onnxruntime-web` WebGPU/WASM)** for clinical safety vest gating, controlling a suite of Three.js games (Endless Runner, Car Traffic Dodge, 3D Flying Game, Shape Catcher, Boat Runner).
- `webar-coloring-book` was described in generic terms without highlighting the 54 physical drawing markers across 6 categories, the 2048×2048 GPU homography unwarp pipeline, rigged FBX animation sync, and Electron kiosk therapy station integration.

This specification documents the authentic technical overhaul for both projects in `src/data/portfolioData.ts`.

---

## 2. Card-Level Data Specifications

### 2.1 WebAR Coloring Book (`webar-coloring-book`)
- **ID**: `webar-coloring-book`
- **Priority Rank**: 5
- **Featured Tier**: `primary`
- **Title**: `WebAR Coloring Book`
- **Subtitle**: `54-Sheet MindAR Optical Tracking & 2048×2048 GPU Texture Unwarping`
- **Category**: `WebAR / In-Browser 3D`
- **Filter Group**: `web3d-ar`
- **Technologies**: `["Three.js", "MindAR", "WebAR", "GLSL / GPU Unwarp", "Electron"]`
- **Short Description**: `Browser-based AR station tracking physical coloring sheets, extracting artwork via GPU homography unwarp, and projecting live colors onto animated 3D characters.`
- **Highlights**:
  - `Optical image tracking across 54 physical drawing sheets and 6 categories using MindAR.`
  - `Real-time 2048×2048 GPU perspective unwarp converting angled camera feed to flat UV space.`
  - `Live dynamic diffuse mapping onto rigged, animated Three.js FBX character models.`
  - `Packaged into Electron kiosk station with Laravel Reverb WebSocket remote therapy controls.`
- **Card Capsules**:
  1. `tag: "Zero-Install WebAR"`, `detail: "Optical tracking for 54 sheets directly in browser via MindAR."`
  2. `tag: "2048² GPU Unwarping"`, `detail: "Homography shader rectifies angled camera drawing into sharp UV maps."`
  3. `tag: "Live Rigged Projection"`, `detail: "Dynamic material pipeline updates animated Three.js meshes at 60 FPS."`
- **Role Title**: `Web 3D & WebAR Developer`
- **Ownership Scope**: `Sole Developer`
- **Ownership Note**: `Designed and engineered the in-browser Three.js + MindAR tracking engine, 2048×2048 GPU homography unwarper, animated FBX character pipeline, and Electron kiosk clinical station.`
- **Diagram Type**: `webar-uv`
- **Media Caption**: `WebAR Pipeline: Camera Stream & MindAR Pose -> GPU Perspective Homography Unwarp -> 2048×2048 Dynamic Texture -> Rigged Three.js Character Mesh.`

### 2.2 Motion-Controlled AI Games (`motion-controlled-games`)
- **ID**: `motion-controlled-games`
- **Priority Rank**: 6
- **Featured Tier**: `primary`
- **Title**: `Motion-Controlled AI Games`
- **Subtitle**: `In-Browser MediaPipe Pose & YOLO11n ONNX Vest Tracking in Three.js`
- **Category**: `Web 3D Games / Computer Vision`
- **Filter Group**: `cv-games`
- **Technologies**: `["Three.js", "MediaPipe Pose", "YOLO11 ONNX", "onnxruntime-web", "WebGPU"]`
- **Short Description**: `Suite of browser-based 3D motion games driven by MediaPipe body tracking and an in-browser YOLO11n ONNX AI model that locks player tracking to clinical safety vests.`
- **Highlights**:
  - `Built complete 3D game suite solely in Three.js: Endless Runner, Car Dodge, Flying Game, Shape Catcher.`
  - `Real-time 33-landmark skeletal tracking at 60 FPS using browser MediaPipe Pose.`
  - `In-browser YOLO11n ONNX inference via onnxruntime-web (WebGPU/WASM) for patient vest gating.`
  - `Solved multi-person clinic interference: auto-crops pose tracking exclusively to vest wearer.`
  - `Zero native game engine runtime: 100% web-native deployment with WebSocket therapist dispatch.`
- **Card Capsules**:
  1. `tag: "Pure Three.js Suite"`, `detail: "5+ motion arcade games built natively in Three.js with zero Unity runtime."`
  2. `tag: "YOLO11n ONNX AI Gate"`, `detail: "Browser WebGPU inference tracks safety vest to isolate patient from crowd."`
  3. `tag: "60 FPS Skeletal Tracking"`, `detail: "MediaPipe 33-landmark pose streaming directly into 3D gameplay loops."`
- **Role Title**: `Lead Web 3D & Computer Vision Developer`
- **Ownership Scope**: `Sole Developer`
- **Ownership Note**: `Engineered the browser-native Three.js game collection, onnxruntime-web YOLO11n vest-isolation model, MediaPipe Pose pipeline, and kinematic gesture recognition.`
- **Diagram Type**: `pose-detection`
- **Media Caption**: `AI Tracking Pipeline: Camera Stream -> YOLO11n ONNX Vest Isolation -> MediaPipe Pose ROI -> Kinematic Gesture Engine -> 60 FPS Three.js Game Loop.`

---

## 3. Case Study & Architecture Modal Specifications

### 3.1 WebAR Coloring Book Case Study
- **Overview**: Zero-install augmented reality therapy station built with Three.js and MindAR. Detects hand-colored physical drawings, extracts color texture in real time via GPU perspective rectification, and maps it live onto animated 3D characters (African Elephant, Jungle Safari animals, etc.) inside browser and Electron kiosk environments.
- **Problem**:
  - Capturing angled, perspective-skewed physical paper from webcam feed without blurring UV texture seams.
  - Maintaining 60 FPS while running optical feature tracking, 2048×2048 dynamic GPU texture updates, and Three.js skeletal animations concurrently.
  - Seamless remote session orchestration (Flutter mobile app <-> Laravel Reverb WebSockets <-> MindAR direct-launch).
- **Responsibilities**:
  - `Implemented multi-target optical tracking for 54 physical drawing sheets across 6 animal/safari categories using MindAR.`
  - `Engineered GPU homography perspective unwarping shader pass to convert skewed camera feeds into flat 2048×2048 textures.`
  - `Built dynamic CanvasTexture pipeline binding live colors to rigged Three.js FBX models running skeletal animation clips.`
  - `Wrapped experience into an Electron clinical kiosk station featuring WebSocket session launch, timer HUDs, and therapist controls.`
- **Technical Approach**:
  - Combined MindAR's 6-DoF image-target tracking matrices with an offscreen WebGL render-target homography unwarper that rectifies the detected 4-point paper quad into a normalized 2048×2048 buffer every frame.
  - Bound the resulting dynamic texture directly to the animated Three.js model's material, keeping brushstrokes crisp across complex mesh topologies with zero UV bleed.
- **Architecture Details**:
  - `Optical Marker Pose (MindAR): 6-DoF tracking matrix estimation matching 54 target sheets across 6 categories in real time.`
  - `GPU Perspective Unwarp (Homography Pass): 4-corner quad rectification converting angled camera paper to flat 2048×2048 UV texture space.`
  - `Dynamic Diffuse Mapping: WebGL offscreen render-target bound as CanvasTexture to Three.js materials without render stalling.`
  - `Skeletal Animation & Kiosk Integration: Concurrent Three.js AnimationMixer execution wrapped in Electron kiosk with WebSocket remote dispatch.`
- **Pipeline Steps**:
  1. `stage: "STEP 01"`, `title: "Webcam & MindAR Track"`, `detail: "Detect physical sheet corners and 6-DoF pose matrix in video feed"`
  2. `stage: "STEP 02"`, `title: "GPU Perspective Unwarp"`, `detail: "Homography shader rectifies skewed quad into normalized UV space"`
  3. `stage: "STEP 03"`, `title: "2048 × 2048 Dynamic Buffer"`, `detail: "High-resolution GPU render-target preserves crisp line art and colors"`
  4. `stage: "STEP 04"`, `title: "Rigged Three.js Animation"`, `detail: "Live texture mapped to animated FBX character running at 60 FPS"`
- **Challenges & Solutions**:
  - `Challenge: Low-resolution camera sampling causes blurry, illegible brushstrokes and visible texture seams on curved 3D meshes.`
    `Solution: Developed a dedicated 2048×2048 GPU render-target unwarper preserving pencil stroke clarity on high-density geometry.`
  - `Challenge: Coloring sheets placed at 45° steep angles introduce heavy trapezoidal perspective distortion.`
    `Solution: Implemented real-time 4-point homography projective matrix math resolving perspective foreshortening each frame.`
  - `Challenge: Clinical pediatric patients cannot navigate complex web browser settings or file menus.`
    `Solution: Built automated WebSocket session dispatch launching directly into active target tracking with automatic countdown HUDs.`
- **Outcomes**:
  - `Delivered zero-install browser and Electron AR station supporting 54 physical coloring sheets across 6 categories.`
  - `Achieved crisp 60 FPS live texture projection onto rigged 3D models with 2048×2048 dynamic GPU unwarping.`

### 3.2 Motion-Controlled AI Games Case Study
- **Overview**: Real-time browser-based 3D motion games built solely with Three.js, MediaPipe Pose, and an in-browser YOLO11n ONNX computer vision model. Tracks full-body skeletal movement to control interactive games (Endless Runner, Car Traffic Dodge, 3D Flying Game, Shape Catcher, Boat Runner) without game controllers or native engine installations.
- **Problem**:
  - In clinical and arcade settings, multiple doctors, therapists, and bystanders stand near the camera, causing single-person pose estimators (like vanilla MediaPipe) to jump erratically between people.
  - Running deep-learning object detection, 33-landmark pose estimation, and a 3D Three.js game loop simultaneously inside a web browser without dropping below 60 FPS.
  - Translating raw, noisy video coordinates into responsive, jitter-free physical game inputs (lane jumps, torso leans, arm reaches).
- **Responsibilities**:
  - `Engineered the complete 3D game suite solely in Three.js (Endless Runner, Car Dodge, 3D Flying, Shape Catcher, Arcade Boat).`
  - `Integrated in-browser YOLO11n ONNX inference via onnxruntime-web with WebGPU/WASM hardware acceleration.`
  - `Built dynamic anatomical ROI cropping isolating the safety vest wearer and feeding clean frames to MediaPipe Pose.`
  - `Developed kinematic motion filters, gesture recognition algorithms, and directional audio cueing systems.`
- **Technical Approach**:
  - Pipeline executes custom-trained YOLO11n ONNX object detection on incoming webcam frames to locate the patient's high-visibility safety vest.
  - Automatically crops the video stream to the vest wearer's full anatomical boundary and feeds only that cropped region to MediaPipe Pose.
  - Remaps detected 33 skeletal landmarks back to global coordinates and computes kinematic steering/jumping vectors to drive Three.js games at 60 FPS.
- **Architecture Details**:
  - `In-Browser YOLO11n ONNX (WebGPU): Custom model (best.onnx) detects patient safety vest box [vx, vy, vw, vh] with NMS filtering.`
  - `Anatomical ROI Crop & Remapping: Offscreen canvas crops video stream to vest wearer, isolating patient and eliminating bystander interference.`
  - `MediaPipe Pose (33 Landmarks): Tracks joints at 60 FPS with velocity clamping and exponential moving average (EMA) smoothing.`
  - `Pure Three.js Game Suite: Procedural tracks, obstacle pooling, dynamic lighting, and threat-based audio cues without any native engine dependency.`
- **Pipeline Steps**:
  1. `stage: "STEP 01"`, `title: "Webcam & YOLO11n AI"`, `detail: "In-browser ONNX model detects clinical safety vest bounding box"`
  2. `stage: "STEP 02"`, `title: "Anatomical ROI Crop"`, `detail: "Video feed cropped exclusively to vest wearer, ignoring bystanders"`
  3. `stage: "STEP 03"`, `title: "MediaPipe 33 Landmarks"`, `detail: "Pose estimator tracks 33 skeletal keypoints on isolated patient ROI"`
  4. `stage: "STEP 04"`, `title: "Native Three.js 60 FPS"`, `detail: "Kinematic gestures drive 3D lane jumps, leans, and item reaches"`
- **Challenges & Solutions**:
  - `Challenge: Multi-person hospital environments cause pose estimators to jump erratically between patient and therapists.`
    `Solution: Layered YOLO11n ONNX vest detection as an exclusive spatial mask before pose estimation, locking tracking to the patient.`
  - `Challenge: Heavy computational load of running ONNX inference, MediaPipe pose, and WebGL 3D rendering in a single browser thread.`
    `Solution: Leveraged WebGPU / WASM SIMD execution in onnxruntime-web, decoupled inference cadences, and used Three.js geometry instancing.`
  - `Challenge: Minor patient tremors or camera sensor jitter caused jarring jumps in avatar position and gameplay controls.`
    `Solution: Implemented kinematic deadzones and low-pass smoothing filters to produce arcade-responsive, clinical-grade input feel.`
- **Outcomes**:
  - `Successfully deployed 100% web-native 3D motion game suite eliminating native engine installs and specialized hardware controllers.`
  - `Maintained steady 60 FPS performance across all 5+ games while running concurrent AI vest detection and skeletal tracking.`

---

## 4. Verification & Testing Plan
- `npx tsc --noEmit` to verify type safety and data schema compliance.
- `npm run build` to verify production bundle generation.
- Headless browser verification checking that both cards render with accurate tags, badges, and that both detail modals open correctly.
