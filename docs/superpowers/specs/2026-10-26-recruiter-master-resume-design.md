# Recruiter-Magnet Master 1-Page Resume Design Spec

**Date:** 2026-10-26  
**Status:** Approved by User  
**Topic:** 10/10 ATS-Optimized, High-Impact 1-Page Resume for Software Engineering, Game Development, and Spatial Computing / XR Roles.

---

## 1. Objectives & Executive Strategy

- **Target Persona:** Dual-threat candidate who qualifies for both competitive **Software Engineer** roles (C++, C#, Python, algorithms, subsystems, CAD/data pipelines) and specialized **Game / XR Developer** roles (Unreal Engine 5, Unity, Meta Quest 3, Three.js, spatial computing).
- **Format:** Strict **1-page high-density format** engineered for the 6-to-8 second recruiter screening window.
- **Formulation:** Google X-Y-Z achievement formula (*"Accomplished [X] measured by [Y] by doing [Z]"*) using authoritative engineering verbs and quantifiable impact.
- **ATS Compliance:** Clean single-column layout, standard section headers (`SUMMARY`, `TECHNICAL SKILLS`, `PROFESSIONAL EXPERIENCE`, `KEY TECHNICAL PROJECTS`, `EDUCATION`), high-frequency keyword density, zero tables/graphics that break ATS parsing.
- **Artifacts Delivered:**
  1. Production-ready Markdown source file (`Sahil_Vaghela_Resume_1Page.md`).
  2. Standalone, pixel-perfect, printable HTML document (`Sahil_Vaghela_Resume_1Page.html`) styled for exact 1-page standard Letter / A4 PDF export with modern typography and dark/light print styling.
  3. Direct link integration to portfolio codebase.

---

## 2. Content & Structural Architecture

### 2.1 Header & Contact
- **Name:** SAHIL VAGHELA
- **Headline:** Game & Software Developer — Real-Time 3D, Systems & XR
- **Location & Contact:** Kheda, Gujarat, India | +91 63519 55141 | sahil.vaghela.dev@gmail.com
- **Online Profiles:**
  - Portfolio: `https://itssahilvaghela.github.io/Protfolio/`
  - LinkedIn: `https://www.linkedin.com/in/sahil-vaghela-ba4822250`

### 2.2 Professional Summary
Two-sentence dense statement highlighting:
- Computer Engineering background (9.11 CGPA).
- Game & Software Developer with 3+ years architecting high-performance real-time 3D, game-engine systems, procedural geometry pipelines, and cross-platform applications across C++, C#, and Python.
- Proven delivery of production Unreal Engine 5 subsystems, Meta Quest 3 / OpenXR spatial computing, and low-latency computer vision tracking.

### 2.3 Technical Skills Matrix (Categorized for ATS)
- **Programming Languages:** C++, C#, Python, JavaScript / TypeScript, C, SQL
- **Engines & 3D Systems:** Unreal Engine 5 (C++, Subsystems, Blueprints), Unity (C#, URP), Three.js, WebGL, OpenXR
- **Software Engineering:** Procedural Mesh Generation, Data-Driven Design, Subsystem Architecture, CAD (DXF/JSON) Parsing, Memory Optimization, REST APIs, Git/GitHub
- **XR, CV & Networking:** Meta Quest 3, Mixed Reality (Passthrough), MediaPipe (Pose Tracking), OpenCV, ARCore, Agora Real-Time Audio/Video SDK, WebSockets / UDP
- **Tools & Platforms:** Visual Studio, Rider, CMake, Blender, Figma, Windows, Linux, Agentic AI Tooling

### 2.4 Professional Experience (Invisible Fiction, Gujarat, India)

#### Software & Game Developer *(Promoted: AI Intern → Jr. Unity Developer → Unity & Unreal Developer)* | Feb 2023 – Present
1. **Automated CAD-to-3D Pipeline:** Architected in UE5 (C++), parsing multi-layer DXF/JSON blueprints to procedurally generate 3D architectural meshes, roofs, and walls with runtime polygon triangulation and gap resolution, eliminating manual 3D modeling turnaround.
2. **Modular Customization Architecture:** Engineered using UE5 C++ Subsystems and Data Assets, enabling seamless swapping of furniture/finishes while guaranteeing transform persistence and zero memory leaks across room transitions.
3. **Fiction Mech (Sole Developer):** Spearheaded end-to-end development of a cross-platform XR industrial application on Meta Quest 3 (OpenXR) with bidirectional low-latency control and real-time audio/video streaming to companion Android devices via Agora SDK.
4. **Shaders & VR Optimization:** Authored custom HLSL/Shader Graph see-through X-ray materials and optimized UE5 lighting channels and draw-calls to achieve target 72+ FPS performance on standalone VR headsets.

#### Junior Unity & XR Developer | May 2023 – Feb 2026
1. **Computer Vision Gameplay:** Built low-latency pipelines by streaming real-time MediaPipe skeletal landmarks (33 body points) into Unity via UDP sockets, powering motion-controlled commercial games at 30+ FPS.
2. **Commercial Gameplay Engineering:** Engineered gameplay mechanics, physics controllers, and responsive UI systems across multiple mobile/PC titles (*Turbo Trail*, *Cupping Muffins*, *Catch the Object*), shipping client-branded adaptations on tight schedules.
3. **Enterprise AR Solutions:** Deployed tracking applications on Microsoft HoloLens and mobile using Vuforia and ARCore, implementing QR-code localization and spatial anchoring for industrial machinery inspection.

#### Artificial Intelligence Intern | Feb 2023 – May 2023
1. **Pose Recognition Prototyping:** Prototyped real-time human pose estimation pipelines in Python using OpenCV and MediaPipe, establishing the core network IPC communication layer that was subsequently productized into live motion-controlled games.

### 2.5 Key Technical Projects
1. **WebAR 3D Interactive & GPU Texture Unwarping Engine** `[Three.js • MindAR • WebGL • GLSL]`
   - Engineered an in-browser WebAR application that tracks physical coloring pages via webcam and maps live hand-colored textures onto animated 3D character models in real-time.
   - Implemented a high-performance 2048 × 2048 UV texture extraction and unwarping pipeline running entirely client-side at 60 FPS without server overhead.
2. **FictionArchviz Multiuser CAD-to-VR Engine** `[Unreal Engine 5 • C++ • OpenXR • DXF]`
   - Created a synchronized architectural visualization system supporting simultaneous PC and Meta Quest VR clients, featuring runtime DXF/JSON wall/roof polygon triangulation and spatial voice communication.
3. **Motion-Controlled Computer Vision Games** `[Unity • C# • MediaPipe • Python • UDP]`
   - Developed gesture- and pose-controlled interactive games (*Alien Runner*, *Football Cup*), converting 30 FPS webcam video feeds into 33-point skeletal coordinate streams over UDP to control game physics without wearables.

### 2.6 Education & Academic Achievements
- **Degree:** Bachelor of Engineering (B.E.) in Computer Engineering (Graduated: 2023)
- **Institution:** Ipcowala Institute of Engineering and Technology, Gujarat, India
- **Academic Standing:** **CGPA: 9.11 / 10.0** (First Class with Distinction)
- **Relevant Coursework:** Data Structures & Algorithms, Object-Oriented Programming, Computer Graphics, Database Management Systems, Operating Systems, Computer Networks
- **Languages:** English (Professional), Hindi, Gujarati

---

## 3. Formatting & Deliverable Specifications

1. **Markdown Document:** Clean, portable, copy-paste ready for job application portals and ATS text fields.
2. **Printable HTML Document:**
   - Standard 8.5" x 11" (Letter) or A4 print stylesheet (`@page { size: letter; margin: 0.45in; }`).
   - Clean, professional typography (Inter or modern sans-serif with monospace accents for keywords).
   - High visual contrast, subtle horizontal dividers, zero overflow beyond exactly 1 page when printed / exported to PDF.
3. **Storage Location:** Workspace root for easy access:
   - `Sahil_Vaghela_Resume_1Page.md`
   - `Sahil_Vaghela_Resume_1Page.html`

---

## 4. Verification Checklist
- [x] Zero fluff or duplicate project descriptions.
- [x] Every bullet contains strong active verbs and measurable engineering complexity.
- [x] Strictly engineered to fit 1 single printed page.
- [x] Accurate contact information, LinkedIn link, and portfolio link.
- [x] Verified 100% valid HTML/CSS print output.
