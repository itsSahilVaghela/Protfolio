export interface ArchitectureStep {
  stage: string;
  title: string;
  detail: string;
}

export interface ChallengeItem {
  challenge: string;
  solution: string;
}

export interface ProjectCardCapsule {
  tag: string;
  detail: string;
}

export interface ProjectCaseStudy {
  id: string;
  priorityRank: number;
  featuredTier: "lead" | "primary" | "secondary";
  title: string;
  subtitle?: string;
  category: string;
  filterGroup: "archviz-unreal" | "xr-multiuser" | "web3d-ar" | "cv-games";
  technologies: string[];
  shortDescription: string;
  highlights: string[];
  roleTitle: string;
  ownershipScope:
    | "Main Project — Sole Lead with 1 Junior"
    | "Sole Developer (Worked Alone)"
    | "Sole Developer"
    | "Sole Developer (AI-Assisted)"
    | "Sole Developer · Built Solely with AI"
    | "Team Project — Core Systems Contributor"
    | "Solo & Team Contributions";
  ownershipNote: string;
  diagramType:
    | "archviz-dxf"
    | "mimadim-subsystem"
    | "fiction-mech-xr"
    | "radicon-mr"
    | "webar-uv"
    | "pose-detection"
    | "mediapipe-unity"
    | "unity-games";
  /** Optional genuine screenshot or video path when added to public/assets */
  mediaUrl?: string;
  cardSlides?: {
    url: string;
    label: string;
  }[];
  cardCapsules?: ProjectCardCapsule[];
  videoUrl?: string;
  mediaCaption: string;
  caseStudyUrl?: string;
  additionalVideos?: { label: string; url: string; previewUrl?: string }[];
  additionalImages?: { label: string; url: string; previewUrl?: string }[];
  links?: {
    liveDemo?: string;
    video?: string;
  };
  caseStudy: {
    overview: string;
    problem: string;
    responsibilities: string[];
    technicalApproach: string;
    architectureDetails: string[];
    pipelineSteps: ArchitectureStep[];
    challenges: ChallengeItem[];
    outcomes: string[];
  };
}

export interface AdditionalWorkItem {
  id: string;
  title: string;
  category: string;
  role: string;
  technologies: string[];
  description: string;
  highlights: string[];
  videoUrl?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    note?: string;
    tier?: "core" | "working" | "foundational";
  }[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const profileData = {
  name: "Sahil Vaghela",
  title: "Real-Time 3D & XR Software Developer",
  experienceYears: "3+ Years",
  location: "Gujarat, India",
  primaryEmail: "vaghelasahil1104@gmail.com",
  secondaryEmail: "sahilvaghela.if2@gmail.com",
  phone: "+91 63519 55141",
  phoneHref: "tel:+916351955141",
  linkedinUrl: "https://www.linkedin.com/in/sahil-vaghela-ba4822250",
  portfolioUrl: "https://itssahilvaghela.github.io/Protfolio/",
  resumeFileName: "Sahil_Vaghela_Resume.pdf",
  hero: {
    eyebrow: "REAL-TIME 3D · GAME DEVELOPMENT · XR · AI-AUGMENTED SYSTEMS",
    heading: "Building Interactive Worlds, Game Engines & AI-Driven Systems.",
    introduction:
      "I'm Sahil Vaghela, a software developer with 3+ years architecting interactive systems across Unity, Unreal Engine 5, and spatial computing (Meta Quest 3 / OpenXR). I leverage cutting-edge AI environments (Antigravity, Gemini, Claude, ChatGPT, Codex) to accelerate shader development, procedural pipelines, and real-time architectures.",
    primaryCta: "Explore Featured Projects",
    secondaryCta: "Get In Touch",
    techLabels: [
      "Unity (C#)",
      "Unreal Engine 5 (C++)",
      "Meta Quest 3 (OpenXR)",
      "Three.js & WebGL",
      "Antigravity & Gemini",
      "Claude & OpenAI Codex",
    ],
  },
  about: {
    paragraphs: [
      "I'm a software developer with 3+ years of professional experience building games and interactive real-time 3D applications. My work spans Unity, Unreal Engine, XR development, procedural geometry, networking, and browser-based 3D experiences.",
      "I enjoy solving engineering challenges, building maintainable systems, and turning complex technical requirements into practical interactive experiences.",
    ],
    highlights: [
      {
        title: "Real-Time 3D Development",
        detail: "Interactive visualization, materials, lighting workflows, and spatial interfaces.",
      },
      {
        title: "Game-Engine Programming",
        detail: "Production gameplay, tooling, and runtime systems in Unity (C#) and Unreal Engine 5 (C++/Blueprints).",
      },
      {
        title: "XR & Multiuser Applications",
        detail: "Meta Quest 3, OpenXR, HoloLens, and synchronized cross-device sessions.",
      },
      {
        title: "Procedural Geometry & Data-Driven Systems",
        detail: "DXF/JSON floor-plan parsing, C++ mesh generation, Data Assets, and GameInstance subsystems.",
      },
      {
        title: "Cross-Platform Interactive Experiences",
        detail: "Desktop, VR headsets, Android devices, MediaPipe computer vision, and browser-based Three.js/WebAR.",
      },
    ],
    education: [
      {
        degree: "B.E. in Computer Engineering",
        institution: "Ipcowala Institute of Engineering and Technology",
        year: "2023",
        credential: "CGPA: 9.11",
      },
      {
        degree: "Higher Secondary Certificate (HSC)",
        institution: "Sagar International School",
        year: "2019",
        credential: "69.9%",
      },
      {
        degree: "Secondary School Certificate (SSC)",
        institution: "Sarvajanik High School",
        year: "2017",
        credential: "84.6%",
      },
    ],
  },
};

export const featuredProjects: ProjectCaseStudy[] = [
  {
    id: "fiction-mech",
    priorityRank: 1,
    featuredTier: "primary",
    title: "Fiction Mech",
    subtitle: "Meta Quest 3 MR & PC Studio",
    category: "Industrial 3D Visualization / XR",
    filterGroup: "xr-multiuser",
    technologies: [
      "Unity",
      "C#",
      "OpenXR",
      "Meta Quest 3",
      "Android",
      "iOS",
      "Photon PUN & Voice",
      "Agora Video SDK",
      "Backend Integration",
    ],
    shortDescription:
      "Interactive 3D CAD visualization and maintenance platform for PC and Quest 3 MR.",
    highlights: [
      "PC Authoring Studio: Ingests 3D models, configures 4 viewport modes, and binds part metadata & assembly sequences.",
      "Quest 3 MR Inspection: 1:1 scale passthrough examination, individual part interaction, and 3-axis internal cross-section slicing.",
      "Multiplayer Collaboration: Real-time cross-device session synchronization between VR headset and mobile with live two-way audio.",
    ],
    cardCapsules: [
      {
        tag: "Dual-Runtime Architecture",
        detail:
          "PC CAD Authoring Studio coupled with standalone Meta Quest 3 MR Passthrough.",
      },
      {
        tag: "Spatial Interaction & Shaders",
        detail:
          "1:1 hand tracking, exploded assembly slider, and real-time 3-axis GPU shader slicer.",
      },
      {
        tag: "Cross-Platform Sync",
        detail:
          "Photon multiplayer state & two-way live voice sync, plus Agora webcast to web browsers.",
      },
    ],
    roleTitle: "Sole Developer",
    ownershipScope: "Sole Developer",
    ownershipNote:
      "Engineered entirely as sole developer—architected the two-part system separating PC-based project authoring from spatial Meta Quest 3 and mobile companion inspection, including Photon multiplayer state sync/voice and Agora video screencast integration.",
    diagramType: "fiction-mech-xr",
    cardSlides: [
      {
        url: "/projects/fiction-mech/fiction-mech-pc.jpg",
        label: "PC Authoring Studio",
      },
      {
        url: "/projects/fiction-mech/fiction-mech-meta.jpg",
        label: "Meta Quest 3 MR",
      },
    ],
    videoUrl:
      "https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/view?usp=sharing",
    additionalVideos: [
      {
        label: "PC Authoring Studio Walkthrough (4K)",
        url: "https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/preview",
      },
      {
        label: "Meta Quest 3 Mixed Reality Walkthrough",
        url: "https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/preview",
      },
      {
        label: "Agora Web Screencast Walkthrough",
        url: "https://drive.google.com/file/d/1sBM3JkAlQuS77N_92jaN3d9fE7kj2blM/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1sBM3JkAlQuS77N_92jaN3d9fE7kj2blM/preview",
      },
    ],
    mediaCaption:
      "System Topology: PC Authoring Studio <-> Cloud Backend <-> Meta Quest 3 MR & Mobile (Photon Sync/Voice) + Agora Web Screencast.",
    caseStudy: {
      overview:
        "Fiction Mech is an interactive industrial 3D model visualization, mechanical analysis, and cross-device collaboration platform developed entirely by Sahil Vaghela as sole developer. The system is divided into two core components: a PC application for project creation, 3D model preparation, material customization, metadata binding, and cloud publishing; and spatial viewer applications for Meta Quest 3, Android, and iOS for 1:1 room-scale inspection, hand-tracked assembly manipulation, real-time 3-axis cross-sectioning, and synchronized multiplayer collaboration.",
      problem:
        "In industrial engineering, maintenance training, and equipment design reviews, participants are hindered by static 2D manuals and disconnected CAD viewers. Headset wearers are typically isolated from supervisors using mobile or tablet devices, preventing synchronized review. Organizations need an end-to-end system where engineering teams can author interactive 3D model configurations on PC and deploy them seamlessly to spatial MR headsets and mobile companion devices with live interaction sync and voice communication.",
      responsibilities: [
        "Architected the complete dual-component application structure as sole developer from initial design through deployment.",
        "Engineered the PC project creation tool: 3D model ingestion, material customizer (Hue/Sat/Lum/Alpha, texture & normal maps), exploded view slider, and metadata attachment (PDFs, videos, audio).",
        "Configured OpenXR spatial interaction pipelines on Meta Quest 3: Passthrough floor/tabletop surface detection, 6DoF controller laser raycasting, direct hand tracking with pinch gestures, and cyan outline part highlights.",
        "Programmed a custom real-time 3-axis (X/Y/Z) shader clipping plane for interactive cross-section inspection on Quest 3's mobile GPU.",
        "Implemented bidirectional state synchronization so part selection, expansion, and transforms made on Meta Quest 3 or Android companion devices reflect symmetrically in real time.",
        "Integrated Agora Video SDK for synchronized voice communication and low-latency spectator video casting during multi-device sessions.",
      ],
      technicalApproach:
        "Separated project authoring from spatial inspection through a structured cloud pipeline. On PC, 3D assets and technical documentation are configured into structured project packages and published to the backend. The runtime viewer downloads projects on demand and loads them into a unified scene-state controller in Unity C#. The controller bridges OpenXR 6DoF spatial inputs and mobile touch inputs, running deterministic state replication alongside Agora Video SDK channels for synchronized voice and video.",
      architectureDetails: [
        "Two-Part Architecture: Decoupled PC project configuration and asset staging from runtime XR/mobile model inspection.",
        "PC Model & Material Customization: Real-time material creation engine supporting PBR textures, normal maps, and HSL/transparency adjustments with instant viewport feedback.",
        "Part-Level Technical Ingestion: Dynamic metadata binding connecting individual 3D subcomponents to technical PDFs, MP4 maintenance recordings, dimensions, and disassembly tool specifications.",
        "OpenXR & Mixed Reality Passthrough: Native Meta Quest 3 Passthrough placement with 6DoF controller manipulation and natural hand-tracking pinch interactions.",
        "3-Axis Real-Time Shader Cross-Section: Color-coded X (Red), Y (Green), Z (Blue) clipping plane controls with 3D axis gizmo running efficiently within standalone mobile VR render budgets.",
        "Bidirectional Command Sync: Shared-authority state replication ensuring Quest 3 and Android companion devices can mutually drive model inspection states without race conditions.",
        "Agora Video SDK Integration: Embedded low-latency audio/voice channels and view broadcasting directly within the collaborative session.",
      ],
      pipelineSteps: [
        {
          stage: "PC AUTHORING NODE",
          title: "Project Creation & Staging",
          detail: "3D model ingestion, custom material design, PDF/video metadata binding & sequence tuning",
        },
        {
          stage: "BACKEND CLOUD",
          title: "Publishing & Distribution",
          detail: "Packaging project manifests and streaming assets to Quest 3 & mobile viewers",
        },
        {
          stage: "QUEST 3 MR NODE",
          title: "OpenXR Spatial Inspection",
          detail: "Room-scale passthrough, hand tracking, 3-axis shader cross-sectioning & component HUD",
        },
        {
          stage: "SYNC & AGORA COMMS",
          title: "Bidirectional Multiplayer",
          detail: "Real-time state replication & Agora voice/video stream between Quest 3 and Android",
        },
      ],
      challenges: [
        {
          challenge:
            "Maintaining responsive 72+ FPS VR performance on standalone Meta Quest 3 while running real-time 3-axis cross-section clipping, network state synchronization, and active Agora communication streams.",
          solution:
            "Implemented an optimized single-pass clipping plane shader that discards fragments without expensive stencil passes, minimized update-loop memory allocations, and isolated Agora networking callbacks onto asynchronous threads outside the frame-critical render pipeline.",
        },
        {
          challenge:
            "Preventing race conditions and input contention when a Meta Quest 3 user (using 6DoF/hand tracking) and an Android user (using touch gestures) manipulate the same assembly simultaneously.",
          solution:
            "Built a deterministic interaction authority bridge with explicit component-level ownership handoffs, ensuring synchronized transforms, exploded view states, and layer visibility across all connected endpoints.",
        },
      ],
      outcomes: [
        "Sole developer delivery of a production-grade industrial 3D visualization platform connecting PC authoring with Meta Quest 3, Android, and iOS runtimes.",
        "Successfully unified CAD model geometry with part-level technical documentation, live 3-axis cross-section clipping, and multi-device Agora collaboration.",
      ],
    },
  },
  {
    id: "radicon-powerbuild-xr",
    priorityRank: 2,
    featuredTier: "primary",
    title: "Radicon Powerbuild AR/MR",
    subtitle: "Mobile AR & Meta Quest 3 Showcase",
    category: "Industrial AR / Mixed Reality",
    filterGroup: "xr-multiuser",
    technologies: [
      "Unity",
      "C#",
      "Vuforia Engine",
      "Meta Quest 3",
      "OpenXR",
      "Android AR",
    ],
    shortDescription:
      "Industrial 3D product visualization platform featuring Vuforia brochure tracking, markerless floor placement, and radial spec HUDs.",
    highlights: [
      "Dual Tracking Engine: Vuforia brochure marker tracking + markerless ground plane placement.",
      "Circular Showroom Carousel: Orbiting product ring with central hero focus and real-time shaft swapping.",
      "Radial Engineering HUD: Curved UI exposing product options, industry applications, catalogs, and manuals.",
    ],
    cardCapsules: [
      {
        tag: "Dual-Vision Tracking",
        detail:
          "Vuforia printed brochure tracking combined with markerless ground-plane showroom.",
      },
      {
        tag: "3D Catalog & Shaft Customizer",
        detail:
          "Orbiting circular gearbox carousel with real-time live mechanical shaft swapping.",
      },
      {
        tag: "Radial Engineering HUD",
        detail:
          "Curved in-world radial arc UI providing instant access to specs, manuals, and catalogs.",
      },
    ],
    roleTitle: "Sole Developer",
    ownershipScope: "Sole Developer",
    ownershipNote:
      "Engineered independently as sole developer for Radicon Powerbuild: delivered the Android application with Vuforia brochure tracking and markerless floor modes, plus the Meta Quest 3 MR experience with full 3D interaction.",
    diagramType: "radicon-mr",
    cardSlides: [
      {
        url: "/projects/radicon/radicon-marker-brochure.jpg",
        label: "Brochure Marker Tracking",
      },
      {
        url: "/projects/radicon/radicon-markerless-floor.jpg",
        label: "Markerless Floor Showroom",
      },
    ],
    mediaUrl: "/projects/radicon/radicon-marker-brochure.jpg",
    additionalImages: [
      {
        label: "Marker Mode (Brochure Tracking)",
        url: "https://drive.google.com/file/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_/view?usp=sharing",
        previewUrl: "/projects/radicon/radicon-marker-brochure.jpg",
      },
      {
        label: "Markerless Mode (Floor Showroom)",
        url: "https://drive.google.com/file/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay/view?usp=sharing",
        previewUrl: "/projects/radicon/radicon-markerless-floor.jpg",
      },
    ],
    mediaCaption:
      "Live Production Capture: Vuforia printed brochure tracking vs markerless floor placement with circular product carousel and curved radial HUD.",
    caseStudy: {
      overview:
        "Radicon Powerbuild AR/MR is an industrial 3D product visualization and marketing platform developed solely by Sahil Vaghela. Delivered across Android mobile and Meta Quest 3, it offers dual inspection modes: Vuforia marker tracking that brings printed product brochures to life with 3D gearbox assemblies, and markerless ground-plane tracking for tabletop and full-scale factory floor placement. The experience features an orbiting circular product carousel, dynamic shaft configuration, and an interactive curved radial HUD connecting users directly to technical catalogs, application domains, and installation manuals.",
      problem:
        "Industrial gearboxes are heavy, expensive to ship, and impossible to bring into typical sales meetings, trade-show booths, or client offices. Radicon Powerbuild needed a portable, high-impact visualization tool where sales teams and engineers could demonstrate their complete gearbox line-up, swap mechanical configurations in real time, and access technical specifications on-device without physical equipment.",
      responsibilities: [
        "Architected and engineered the entire application as sole developer in Unity (C#) for Android and Meta Quest 3.",
        "Integrated Vuforia Engine image-target tracking to recognize printed brochure covers and accurately anchor 3D assemblies.",
        "Built markerless surface detection algorithms to place and scale models on floors and tabletops in real-world environments.",
        "Programmed the circular 3D carousel system arranging product models in an orbit around the brand center with smooth focus transitions.",
        "Engineered the dynamic shaft configuration system allowing live component swapping on the active Series-M model.",
        "Designed and implemented the custom curved radial HUD menu providing instant navigation through catalogs, applications, and manuals.",
      ],
      technicalApproach:
        "Engineered a unified Unity C# architecture deployed to both Android phones and standalone Meta Quest 3 headsets. On Android, Vuforia handles dual-pipeline computer vision: switching between high-contrast brochure feature tracking and markerless plane tracking. On Quest 3, OpenXR and Passthrough provide 1:1 room-scale surface anchoring with 6DoF hand and controller interaction. Gearbox CAD meshes were decimated, batched, and shaded with lightweight mobile PBR shaders to maintain steady framerates.",
      architectureDetails: [
        "Dual Vision Pipeline: Seamless toggle between Vuforia brochure target tracking and markerless plane detection.",
        "Circular Carousel Engine: Algorithmic radial positioning of secondary product models orbiting a central brand logo with smooth hero-focus lerping.",
        "Modular Component Swapping: Runtime shaft attachment system switching mechanical output configurations on active assemblies.",
        "Curved Radial HUD: Custom canvas shaders and spherical coordinate layout presenting product options, applications, and documentation.",
        "Meta Quest 3 Passthrough MR: Native OpenXR stereoscopic passthrough surface placement with 6DoF free interaction.",
        "CAD Decimation & Batching: Industrial manufacturing meshes optimized for mobile GPU fill-rate limits without visual fidelity loss.",
      ],
      pipelineSteps: [
        {
          stage: "VISION & TRACKING",
          title: "Dual Tracking Modes",
          detail: "Vuforia printed brochure image tracking or markerless surface detection",
        },
        {
          stage: "CAROUSEL STAGE",
          title: "Circular Showroom",
          detail: "Orbiting ring of product models with centered hero focus",
        },
        {
          stage: "CONFIGURATION",
          title: "Shaft & Option Swap",
          detail: "Interactive mechanical swapping of shaft types on active model",
        },
        {
          stage: "SPECIFICATIONS HUD",
          title: "Curved Radial Navigation",
          detail: "On-device access to catalogs, installation manuals, and applications",
        },
      ],
      challenges: [
        {
          challenge:
            "Maintaining stable 3D model tracking over printed brochure paper under varying ambient trade-show lighting and camera angles.",
          solution:
            "Configured high-contrast feature descriptors in Vuforia and implemented extended tracking to sustain model stability even when the brochure target temporarily left the camera frame.",
        },
        {
          challenge:
            "Displaying an entire circular showroom of multiple high-detail gearbox models simultaneously on mobile Android hardware without frame drops.",
          solution:
            "Applied aggressive polygon reduction, shared material atlasing, and LOD instances for the orbiting secondary models while reserving high-resolution textures for the active central hero model.",
        },
      ],
      outcomes: [
        "Delivered a production-ready marketing and sales tool empowering Radicon Powerbuild representatives to showcase industrial gearboxes anywhere.",
        "Seamlessly combined physical print collateral with digital 3D visualization, circular catalog browsing, and live shaft customization.",
      ],
    },
  },
  {
    id: "fiction-archviz",
    priorityRank: 3,
    featuredTier: "primary",
    title: "Fiction ArchViz",
    subtitle: "Multiuser Desktop & VR Architectural Visualization Platform",
    category: "Architectural Visualization / Real-Time 3D",
    filterGroup: "archviz-unreal",
    technologies: [
      "Unreal Engine 5",
      "C++",
      "WebSocket",
      "Node.js",
      "Meta Quest",
      "LibTess2",
      "DXF / JSON",
    ],
    shortDescription:
      "Multiuser architectural platform for PC Desktop and Meta Quest standalone featuring 5 predefined rooms (Living Room, Bathroom, Kitchen, Bed Room, Kids Room), real-time WebSocket sync, and dynamic tile/paint customization.",
    highlights: [
      "5 Predefined Interactive Rooms: Built and configured 5 showcase spaces (Living Room, Bathroom, Kitchen, Bed Room, Kids Room) to benchmark tile cutting, lighting, and VR mechanics.",
      "Multiuser WebSocket Pipeline: Bidirectional real-time event sync connecting PC Desktop and Meta Quest VR via Node.js server.",
      "Procedural Tile Alignment: Live X/Y offset stepping, 90° rotation, wall-cut handling, and Matte/Glossy PBR toggling.",
      "VR 3D Floating Dock & Dynamic Lights: In-world WidgetHolderActor UI palettes and room-bounds scaled DynamicRectLight fixtures.",
    ],
    cardCapsules: [
      {
        tag: "5 Predefined Showcase Rooms",
        detail:
          "Living Room, Bathroom, Kitchen, Bed Room, and Kids Room built for feature benchmarking.",
      },
      {
        tag: "WebSocket Multiuser Pipeline",
        detail:
          "Bidirectional real-time event bus connecting PC Desktop and Meta Quest standalone VR.",
      },
      {
        tag: "Procedural Tile Engine & Lights",
        detail:
          "Fixed wall-cut seams with 4-way offset/rotation and room-bounds auto-scaling lights.",
      },
    ],
    roleTitle: "Unreal Engine C++ & XR Developer",
    ownershipScope: "Team Project — Core Systems Contributor",
    ownershipNote:
      "Built and configured 5 predefined interactive showcase rooms (Living Room, Bathroom, Kitchen, Bed Room, Kids Room). Engineered the universal bidirectional WebSocket multiplayer pipeline (PC ↔ Meta Quest via Node.js server), built procedural wall tile cutting, offset & rotation alignment, created the VR 3D floating dock UI (WidgetHolderActor), and implemented dynamic ceiling lighting auto-scaled to room dimensions.",
    diagramType: "archviz-dxf",
    mediaUrl: "/projects/fiction-archviz/fiction-archviz-front.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/view?usp=sharing",
    additionalVideos: [
      {
        label: "Multiuser Walkthrough & Material Customization",
        url: "https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1LYbiSj1UK-4k4Fbe6XtMdoeAK6xFTh5v/preview",
      },
    ],
    mediaCaption:
      "Walkthrough Video & System Topology: CAD/DXF Parser -> C++ Triangulation -> Multiuser WebSocket Node Server -> PC & Meta Quest Viewers.",
    caseStudy: {
      overview:
        "Fiction ArchViz is a real-time collaborative architectural visualization platform in Unreal Engine 5 deployed across Windows PC desktop and Meta Quest standalone VR. Featuring 5 predefined interactive showcase environments (Living Room, Bathroom, Kitchen, Bed Room, Kids Room), the platform transforms CAD/DXF floor plans into 3D spaces with bidirectional WebSocket state synchronization, live tile alignment, grout customization, and dynamic room lighting.",
      problem:
        "Architectural clients and design teams need to review interior layouts and material finishes collaboratively across different hardware—desktop workstations and standalone VR headsets. Synchronizing live material swaps, camera positions, and custom tile cuts bidirectionally without latency or state divergence required a unified event pipeline, while procedural wall tiles required sub-millimeter seam alignment across adjacent walls and floors.",
      responsibilities: [
        "Configured and built 5 predefined interactive showcase environments (Living Room, Bathroom, Kitchen, Bed Room, Kids Room) to stress-test materials, lighting, and VR navigation.",
        "Architected and implemented the entire bidirectional WebSocket multiplayer pipeline connecting PC Desktop and Meta Quest VR through a dedicated Node.js server.",
        "Engineered procedural tile cutting on walls, solving cut-off seams, 4-way X/Y offset stepping, 90° pattern rotation, and Matte/Glossy PBR toggling.",
        "Built the VR 3D floating dock system (WidgetHolderActor) allowing headset users to grab, position, and pin material control palettes in world space.",
        "Developed the DynamicRectLight actor that automatically calculates room bounding boxes to scale and position ceiling lights for photorealistic illumination.",
        "Integrated dual locomotion systems (smooth walk vs point teleport) and top-down isometric dollhouse camera navigation (TopDownCameraActor).",
        "Collaborated on CAD/DXF 2D-to-3D ingestion using DxfJsonReaderActor and C++ triangulation (LibTess2 / earcut).",
      ],
      technicalApproach:
        "Engineered a lightweight WebSocket event relay running on Node.js that serializes UI actions and material state into low-overhead JSON packets, reflecting changes bidirectionally between desktop and standalone Quest clients. On the rendering side, procedural tile UV math handles dynamic offsets and rotation with real-time grout joint geometry. Dynamic ceiling lighting scales automatically to room bounds, while the VR floating dock widget holder maintains spatial ergonomics.",
      architectureDetails: [
        "Bidirectional WebSocket Pipeline: Custom Node.js relay synchronizing user interactions, material states, and camera events across PC and Meta Quest in real time.",
        "Procedural Tile Alignment Engine: 4-way X/Y offset buttons, 90° rotation, 1-click zero reset, and Matte/Glossy finish switching across 15+ catalog materials.",
        "VR 3D Floating Dock (WidgetHolderActor): Grabbable, positionable 3D palette interface enabling seamless in-VR material inspection and editing.",
        "Dynamic Room Lighting (DynamicRectLight): Runtime room boundary detection scaling ceiling rectangular lights for balanced photorealistic lighting.",
        "CAD & Boolean Cutting Engine: DXF/JSON ingestion (DxfJsonReaderActor) with LibTess2/earcut triangulation and dynamic door/window boolean void cutters.",
        "Grout & Wall Paint Systems: Millimeter joint width sliders, live color pickers, two-sided wall separation, and vertical/horizontal color gradients.",
      ],
      pipelineSteps: [
        {
          stage: "STAGE 01",
          title: "CAD / DXF Ingestion",
          detail: "Parse 2D floor plans from DXF & JSON via DxfJsonReaderActor",
        },
        {
          stage: "STAGE 02",
          title: "C++ Mesh Triangulation",
          detail: "Generate procedural floor/ceiling meshes using LibTess2 & earcut",
        },
        {
          stage: "STAGE 03",
          title: "Customization & Lighting",
          detail: "Tile offset alignment, grout joint physics & DynamicRectLight",
        },
        {
          stage: "STAGE 04",
          title: "Multiuser WebSocket Sync",
          detail: "Bidirectional event pipeline syncing PC Desktop & Meta Quest VR",
        },
      ],
      challenges: [
        {
          challenge:
            "Ensuring tile patterns and grout lines align seamlessly across adjoining walls and floor corners without visual seam distortion.",
          solution:
            "Engineered procedural tile offset stepping along X and Y axes with 90° rotation and a copy/paste setup transferring alignment data across surfaces.",
        },
        {
          challenge:
            "Maintaining instantaneous state synchronization between mouse-driven desktop clients and 6DoF standalone Meta Quest headsets.",
          solution:
            "Built a universal event bus over WebSockets to a Node.js server, standardizing all user actions into lightweight payloads that execute symmetrically on both runtimes.",
        },
      ],
      outcomes: [
        "Delivered a robust collaborative architectural platform with 5-6 test rooms operating simultaneously across desktop PC and Meta Quest standalone VR.",
        "Empowered design teams to test 15+ tile finishes, grout widths, solid paints, and linear gradients in real-time synchronized sessions.",
        "Streamlined VR usability with grabbable 3D floating dock palettes and automated room ceiling illumination.",
      ],
    },
  },
  {
    id: "mimadim-home-studio",
    priorityRank: 4,
    featuredTier: "primary",
    title: "Mimadim Home Studio / Mimadim",
    subtitle: "High-Fidelity PC Interior & Furniture Customization Architecture",
    category: "PC Architectural Visualization / Real-Time 3D",
    filterGroup: "archviz-unreal",
    technologies: [
      "Unreal Engine 5",
      "C++",
      "Blueprints",
      "Data Assets",
      "PC High Graphics",
      "Lumen / PBR",
    ],
    shortDescription:
      "High-fidelity PC interior customization platform featuring predefined rooms to swap beds, floor parquet, wallpaper, and curtains in real time.",
    highlights: [
      "Predefined Showcase Rooms: Interactive architectural environments engineered for high-end PC to evaluate furniture layouts and finishes in real time.",
      "Interior Customization: Dynamic, transform-safe swapping of bed models, floor parquet, wallpaper textures, and curtains.",
      "Data-Driven Catalog: Modular Unreal Data Assets and Master Registry mapping item variants to photorealistic 3D assets and PBR materials.",
      "GameInstance Subsystem: Centralized C++ state manager driving selection, transform caching, and high-fidelity runtime actor replacement.",
    ],
    cardCapsules: [
      {
        tag: "Predefined Showcase Rooms",
        detail:
          "Interactive room environments configured for testing furniture layouts, spatial ergonomics, and lighting.",
      },
      {
        tag: "Interior Customization",
        detail:
          "Real-time swapping of beds, floor parquet, wallpapers, and curtains with photorealistic PBR materials.",
      },
      {
        tag: "High-Fidelity PC Graphics",
        detail:
          "Engineered specifically for PC hardware with advanced lighting, reflections, and transform-safe actor swaps.",
      },
    ],
    roleTitle: "Unreal Engine Systems Developer",
    ownershipScope: "Team Project — Core Systems Contributor",
    ownershipNote:
      "Engineered the data-driven interior customization architecture (Data Assets + Master Registry) across predefined rooms for PC, implementing transform-preserving model/material swaps (beds, parquet, wallpapers, curtains) inside a centralized GameInstance subsystem.",
    diagramType: "mimadim-subsystem",
    mediaUrl: "/projects/mimadim/mimadim-front.png",
    videoUrl:
      "https://drive.google.com/file/d/1J_URl718RMfafZvh78GFI7URtq6CQTWK/view?usp=sharing",
    additionalVideos: [
      {
        label: "PC Customization & Predefined Rooms Walkthrough",
        url: "https://drive.google.com/file/d/1J_URl718RMfafZvh78GFI7URtq6CQTWK/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1J_URl718RMfafZvh78GFI7URtq6CQTWK/preview",
      },
    ],
    additionalImages: [
      {
        label: "High-Fidelity PC Interior Showcase",
        url: "https://drive.google.com/file/d/18Dp5uU_V9fgVYKDu9ZnVGFEazYsqvo_s/view?usp=sharing",
        previewUrl: "/projects/mimadim/mimadim-front.png",
      },
    ],
    mediaCaption:
      "PC Video Demo & Architecture Diagram: Predefined Rooms -> Master Data Asset Registry -> GameInstance Subsystem -> Transform-Preserving Swapper.",
    caseStudy: {
      overview:
        "Mimadim Home Studio is a high-fidelity Unreal Engine interior visualization and furniture customization platform built specifically for high-end PC performance. The application places users inside predefined architectural rooms where they can dynamically test and swap furniture and surface finishes—including bed models, floor parquet, wallpapers, and curtains—under photorealistic real-time lighting.",
      problem:
        "Hardcoding furniture references or scattering mesh and material replacement logic across disparate level Blueprints leads to tight coupling, high memory overhead, and orientation reset bugs during runtime swaps. The system needed a centralized, scalable architecture that delivers photorealistic PC graphics without performance drops or placement misalignment.",
      responsibilities: [
        "Built structured Unreal Data Assets representing individual furniture items, floor parquet patterns, wallpaper textures, and curtain styles.",
        "Designed a Master Data Asset registry mapping customization categories to available 3D assets across predefined showcase rooms.",
        "Implemented runtime selection and model-replacement logic that strictly preserves the target object's world/relative transform matrices.",
        "Engineered dynamic material and mesh swapping for beds, floor parquet, wallpaper sets, and curtains under photorealistic PC lighting.",
        "Refactored customization logic into a dedicated GameInstance Subsystem to decouple room level scripts from the asset catalog.",
      ],
      technicalApproach:
        "Adopted a data-driven architecture optimized for PC desktop fidelity. By decoupling catalog content into modular Data Assets and routing all room customization calls through a centralized GameInstance Subsystem, the platform enables instantaneous swapping of beds, parquet flooring, wallpapers, and curtains while maintaining photorealistic PBR shaders, dynamic lighting, and precise geometric transforms.",
      architectureDetails: [
        "Predefined Architectural Rooms: Tailored high-fidelity PC environments configured with photorealistic lighting, reflections, and camera perspectives for furniture evaluation.",
        "Customization Data Assets: Modular asset records encapsulating mesh references, PBR material instances, and metadata for beds, parquet, wallpapers, and curtains.",
        "Master Mapping Registry: Centralized lookup tables mapping room categories and surface types to available 3D assets and material sets.",
        "Transform-Safe Actor Swap: Caches world transform matrices before replacement to guarantee zero positional drift or pivot misalignment.",
        "GameInstance Customization Subsystem: Central engine managing active room state, catalog queries, undo/redo states, and dynamic runtime material instantiation.",
      ],
      pipelineSteps: [
        {
          stage: "DATA ASSET",
          title: "Master Registry",
          detail: "Indexes beds, parquet, wallpapers & curtains by room category",
        },
        {
          stage: "SUBSYSTEM",
          title: "GameInstance Hub",
          detail: "Centralizes catalog queries, active room state & swap handlers",
        },
        {
          stage: "TRANSFORM",
          title: "Transform-Safe Swap",
          detail: "Caches translation, rotation & scale matrices for seamless replacement",
        },
        {
          stage: "PC FIDELITY",
          title: "Photorealistic Render",
          detail: "High-end PC lighting, PBR materials & real-time reflection evaluation",
        },
      ],
      challenges: [
        {
          challenge:
            "Swapping complex furniture actors and surface materials at runtime caused transform drift and hitches under high-fidelity PC rendering settings.",
          solution:
            "Implemented a matrix-caching swap routine in the GameInstance Subsystem with asynchronous asset preloading to ensure instantaneous, pixel-perfect replacements.",
        },
        {
          challenge:
            "Expanding customization across multiple categories (beds, floors, walls, curtains) threatened to clutter room level Blueprints with duplicate logic.",
          solution:
            "Architected a centralized GameInstance Subsystem with a Master Data Asset registry, allowing any predefined room to query and apply customizations via a unified API.",
        },
      ],
      outcomes: [
        "Delivered a responsive high-fidelity PC interior customization platform allowing instant swaps of beds, parquet, wallpaper, and curtains.",
        "Established a clean, data-driven catalog workflow enabling zero-code addition of new room furnishings and material variants.",
        "Centralized selection and replacement responsibilities into a maintainable Unreal GameInstance subsystem architecture.",
      ],
    },
  },
  {
    id: "webar-coloring-book",
    priorityRank: 5,
    featuredTier: "primary",
    title: "WebAR Coloring Book",
    subtitle:
      "Interactive WebAR Crayon-to-3D Animal Experience with Multilingual Audio",
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
  {
    id: "motion-controlled-games",
    priorityRank: 6,
    featuredTier: "primary",
    title: "Motion-Controlled AI Games",
    subtitle: "15 Games Built with Three.js, Electron, MediaPipe & ONNX Person Tracking",
    category: "Web 3D Games / Computer Vision",
    filterGroup: "cv-games",
    technologies: [
      "Three.js",
      "Electron",
      "MediaPipe",
      "ONNX",
      "AI-Assisted",
    ],
    shortDescription:
      "Suite of 15 motion-controlled 3D games built using AI with Three.js and Electron, powered by MediaPipe body tracking and an ONNX model to isolate and track a particular person from many.",
    highlights: [
      "Sole Developer: built 15 motion-controlled games using AI with Three.js, Electron, and MediaPipe.",
      "Integrated ONNX model to isolate and track a particular person out of multiple people in view.",
      "Real-time MediaPipe skeletal tracking driving controller-free full-body gameplay.",
      "Packaged across browser and desktop environments with Electron.",
    ],
    cardCapsules: [
      {
        tag: "15 Motion Games",
        detail:
          "Arcade, flight, runner, and sports 3D titles built natively in Three.js.",
      },
      {
        tag: "ONNX Person Isolation",
        detail:
          "Neural network isolates and tracks a particular player from background crowds.",
      },
      {
        tag: "MediaPipe & Electron",
        detail:
          "Real-time 33-landmark body tracking packaged for cross-platform desktop and web.",
      },
    ],
    roleTitle: "Lead 3D & Computer Vision Developer",
    ownershipScope: "Sole Developer",
    ownershipNote:
      "Sole Developer — engineered 15 motion-controlled games using AI with Three.js, Electron, and MediaPipe, deploying an ONNX model to track a particular person from many.",
    diagramType: "pose-detection",
    mediaUrl: "/projects/motion-controlled-games/motion-therapy-station.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1Z7hl1SHNpafOahSAn2vqE2LnkRvDL8Z0/view?usp=sharing",
    additionalVideos: [
      {
        label: "Motion AI Gameplay Demo",
        url: "https://drive.google.com/file/d/1Z7hl1SHNpafOahSAn2vqE2LnkRvDL8Z0/view?usp=sharing",
        previewUrl:
          "https://drive.google.com/file/d/1Z7hl1SHNpafOahSAn2vqE2LnkRvDL8Z0/preview",
      },
    ],
    additionalImages: [
      {
        label: "Interactive Motion Therapy Station",
        url: "https://drive.google.com/file/d/1Z7hl1SHNpafOahSAn2vqE2LnkRvDL8Z0/view?usp=sharing",
        previewUrl:
          "/projects/motion-controlled-games/motion-therapy-station.jpg",
      },
    ],
    mediaCaption:
      "Pipeline: Camera Feed -> ONNX Person Isolation -> MediaPipe Pose Tracking -> 60 FPS Three.js Game Loop.",
    caseStudy: {
      overview:
        "A suite of 15 interactive 3D motion games developed using AI assistance. The platform tracks player body motion in real time via MediaPipe Pose, while an ONNX model isolates and tracks a particular person from multi-person environments without physical controllers.",
      problem:
        "When multiple people appear in front of the camera, standard pose tracking jumps erratically between different individuals. The requirement was to isolate and track a specific person from a crowd while running 15 interactive 3D games smoothly in real time.",
      responsibilities: [
        "Built all 15 motion games as sole developer using AI assistance across Three.js and Electron.",
        "Integrated ONNX model to isolate and continuously track a particular person from many in the scene.",
        "Implemented real-time body tracking using MediaPipe.",
        "Engineered 3D mechanics and visual loops in Three.js and packaged desktop runtime with Electron.",
        "Mapped body movements and gestures directly to gameplay controls.",
      ],
      technicalApproach:
        "Utilized an ONNX model to detect and track a particular target person when multiple people are present in the camera frame. The isolated player stream is processed by MediaPipe to track body keypoints, driving real-time interaction across 15 3D games in Three.js and Electron.",
      architectureDetails: [
        "15 Games Suite: 15 interactive 3D motion games developed in Three.js.",
        "ONNX Person Tracking: Isolates and tracks a particular person from many.",
        "MediaPipe Tracking: Real-time body tracking driving controller-free gameplay.",
        "Electron & Web Delivery: Packaged for standalone desktop and browser execution.",
        "AI-Assisted Workflow: Rapid prototyping and game development using AI tools.",
      ],
      pipelineSteps: [
        {
          stage: "STEP 01",
          title: "Camera Feed",
          detail: "60 FPS video capture from standard webcam input",
        },
        {
          stage: "STEP 02",
          title: "ONNX Isolation",
          detail: "Isolates target person bounding box and filters crowd interference",
        },
        {
          stage: "STEP 03",
          title: "MediaPipe Tracking",
          detail: "Extracts 33 body landmarks on isolated player region",
        },
        {
          stage: "STEP 04",
          title: "Three.js Engine",
          detail: "Translates motion vectors into gameplay across 15 games",
        },
      ],
      challenges: [
        {
          challenge:
            "Crowded multi-person environments cause pose estimators to jump between different individuals.",
          solution:
            "Gated pose tracking behind an ONNX person isolation model, ensuring tracking stays locked exclusively to the target player.",
        },
        {
          challenge:
            "Running computer vision models, pose estimation, and 3D rendering simultaneously with high responsiveness.",
          solution:
            "Optimized inference cadences and decoupled Three.js render loops to maintain stable 60 FPS performance.",
        },
      ],
      outcomes: [
        "Shipped 15 distinct 3D motion games running at 60 FPS across Three.js and Electron.",
        "Eliminated external hardware controllers by tracking player movement directly through standard camera feeds.",
      ],
    },
  },
  {
    id: "unity-game-development",
    priorityRank: 7,
    featuredTier: "secondary",
    title: "Unity Game Development",
    subtitle: "Turbo Trail, Cupping Muffins, Catch the Object & Themed Variants",
    category: "Game Development",
    filterGroup: "cv-games",
    technologies: ["Unity", "C#"],
    shortDescription:
      "In-house PC and mobile Unity/C# games including Turbo Trail, Cupping Muffins, Catch the Object, and themed adaptations—covering gameplay implementation, system adaptation, and UI updates.",
    highlights: [
      "Catch the Object (Sole Developer): Complete solo development of a casual arcade game from concept to release.",
      "Turbo Trail (Sub Developer): High-speed mobile game where players draw dynamic rubber trails that act as both pathway and shield.",
      "Cupping Muffins (Sub Developer): Ingredient-collection arcade game; reworked gameplay systems to support new food themes.",
      "Adapted existing game architectures into themed variants and implemented UI improvements across titles.",
    ],
    cardCapsules: [
      {
        tag: "Solo & Studio Releases",
        detail:
          "Catch the Object (Sole Developer end-to-end), Turbo Trail, and Cupping Muffins.",
      },
      {
        tag: "Modular Gameplay C#",
        detail:
          "Dynamic trail physics, procedural item spawning, and decoupled game state loops.",
      },
      {
        tag: "Themed Studio Reskinning",
        detail:
          "Architectural theme adaptation enabling rapid gameplay reskinning across releases.",
      },
    ],
    roleTitle: "Unity C# Game Developer",
    ownershipScope: "Solo & Team Contributions",
    ownershipNote:
      "Sole Developer on Catch the Object (end-to-end implementation). Sub Developer / Team Contributor on Turbo Trail, Cupping Muffins, and themed game variants.",
    diagramType: "unity-games",
    mediaCaption:
      "Gameplay Systems Overview: Core Unity C# Loop -> Modular Mechanics & Physics -> Theme Adaptation & Responsive UI.",
    caseStudy: {
      overview:
        "A collection of in-house mobile and casual games built in Unity (C#) at Invisible Fiction, spanning solo-developed casual titles and collaborative mobile arcade games adapted across multiple themed releases.",
      problem:
        "Fast-paced studio game production requires reusable C# gameplay loops, clean UI state management, and modular asset/theme hooks so existing game mechanics can be rapidly reskinned or adapted into new themed variants without rewriting core logic.",
      responsibilities: [
        "Catch the Object (Sole Developer): Designed and programmed the complete game loop, spawning system, scoring rules, and UI from scratch.",
        "Turbo Trail (Team Contributor): Contributed to gameplay mechanics and UI for a high-speed mobile game featuring dynamic drawn rubber trails.",
        "Cupping Muffins (Team Contributor): Updated gameplay mechanics, obstacle/ingredient logic, and reworked systems for new food themes.",
        "Implemented UI polish, menu flows, and responsive layout updates across multiple Unity projects.",
      ],
      technicalApproach:
        "Structured gameplay controllers, object spawners, collision handlers, and UI managers in modular C# scripts within Unity. Decoupled visual theme assets and scoring parameters from core movement/collision logic to streamline themed variant production.",
      architectureDetails: [
        "Catch the Object (Solo Architecture): Self-contained C# game loop managing basket input, weighted item spawning, score/penalty evaluation, and game-over states.",
        "Turbo Trail Mechanics: Dynamic trail-drawing interaction serving simultaneously as player pathway and obstacle shield.",
        "Cupping Muffins Theme Adaptation: Refactored collectible and obstacle definitions to support multiple culinary themes and updated UI screens.",
      ],
      pipelineSteps: [
        {
          stage: "INPUT & PHYSICS",
          title: "Player Controllers",
          detail: "Touch trail drawing, basket movement & collision detection",
        },
        {
          stage: "GAME LOOP",
          title: "Spawners & Scoring",
          detail: "Configurable obstacle/collectible waves and rule evaluation",
        },
        {
          stage: "ADAPTATION",
          title: "Themed Variants",
          detail: "Modular content replacement for multi-theme game releases",
        },
        {
          stage: "INTERFACE",
          title: "UI Systems",
          detail: "HUD feedback, menus, and cross-resolution mobile scaling",
        },
      ],
      challenges: [
        {
          challenge:
            "Adapting existing games into new themed variants quickly without introducing regressions in core gameplay feel.",
          solution:
            "Separated theme-specific visuals and UI elements from core C# movement and scoring scripts.",
        },
      ],
      outcomes: [
        "Shipped Catch the Object independently as sole developer from concept to release.",
        "Delivered gameplay updates, themed variants, and UI improvements across Turbo Trail and Cupping Muffins.",
      ],
    },
  },
];

export const additionalProjects: AdditionalWorkItem[] = [
  {
    id: "alien-runner-body-tracking",
    title: "Alien Runner: Computer Vision Body Tracking",
    category: "AI & Motion Gaming (Internship)",
    role: "CV & Tracking Developer (Team of 2)",
    technologies: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Unity",
      "C#",
      "Socket Telemetry",
    ],
    description:
      "Two-person internship project at Invisible Fiction. Teammate developed the Unity 3D endless runner (Alien Runner), while I built the Python computer-vision body tracking module using OpenCV and MediaPipe. Streamed real-time movement telemetry to Unity to trigger in-game player events: move left, move right, jump, and duck/swipe down.",
    highlights: [
      "Team of 2 developers: owned full Python computer-vision and pose-tracking pipeline while teammate developed Unity endless runner game.",
      "Extracted 33 skeletal landmarks in real time from live camera feeds using MediaPipe and OpenCV.",
      "Engineered low-latency data bridge streaming player movement telemetry from Python into Unity runtime.",
      "Mapped live physical movements to in-game actions: lateral lane shifting (left/right), jumping, and downward ducking/swiping.",
    ],
  },
  {
    id: "ar-qr-hololens",
    title: "QR-Triggered AR Model Visualization",
    category: "Enterprise AR (HoloLens & Mobile)",
    role: "Sole Developer",
    technologies: ["Unity", "C#", "HoloLens", "ARCore", "Vuforia"],
    description:
      "An AR application that detects QR markers to anchor and visualize 3D engineering models across HoloLens and mobile AR devices.",
    highlights: [
      "Marker-driven spatial alignment and model visualization using ARCore and Vuforia tooling.",
    ],
  },
];

export const skillCategories: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    subtitle: "Core languages for real-time engines, systems, and web tooling",
    items: [
      { name: "C#", tier: "core" },
      { name: "C++", tier: "core" },
      { name: "Python", tier: "working" },
      { name: "JavaScript", tier: "working" },
      { name: "C", note: "Basic", tier: "foundational" },
      { name: "Java", note: "Basic", tier: "foundational" },
    ],
  },
  {
    id: "engines-rendering",
    title: "Game Engines and Rendering",
    subtitle: "Real-time 3D pipelines, shaders, materials, and lighting",
    items: [
      { name: "Unity", tier: "core" },
      { name: "Unreal Engine 5", tier: "core" },
      { name: "Unity URP", tier: "working" },
      { name: "Shader Graph", tier: "working" },
      { name: "Unreal Materials & Lighting", tier: "working" },
      { name: "Unreal Blueprints", tier: "core" },
    ],
  },
  {
    id: "xr-cv",
    title: "XR and Computer Vision",
    subtitle: "Headsets, spatial tracking, and vision-driven interaction",
    items: [
      { name: "OpenXR", tier: "core" },
      { name: "Meta Quest 3", tier: "core" },
      { name: "ARCore", tier: "working" },
      { name: "Vuforia", tier: "working" },
      { name: "HoloLens", tier: "working" },
      { name: "MediaPipe", tier: "core" },
      { name: "OpenCV", tier: "working" },
    ],
  },
  {
    id: "web-3d",
    title: "Web 3D",
    subtitle: "Browser-native 3D rendering and optical WebAR workflows",
    items: [
      { name: "Three.js", tier: "core" },
      { name: "MindAR", tier: "working" },
      { name: "Browser-Based 3D Experiences", tier: "core" },
      { name: "Image-Tracking Workflows", tier: "working" },
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    subtitle: "Architecture, geometry pipelines, and production workflows",
    items: [
      { name: "Subsystem Architecture", tier: "core" },
      { name: "Data-Driven Design", tier: "core" },
      { name: "Procedural Geometry", tier: "core" },
      { name: "DXF/JSON Processing", tier: "core" },
      { name: "REST API Integration", tier: "working" },
      { name: "Git / Version Control", tier: "core" },
      { name: "Debugging & Refactoring", tier: "core" },
    ],
  },
  {
    id: "ai-engineering",
    title: "AI Engineering & Agentic Tooling",
    subtitle: "Accelerated development, multimodal reasoning, and workflow orchestration",
    items: [
      { name: "Google Antigravity", tier: "core" },
      { name: "Google Gemini", tier: "core" },
      { name: "Anthropic Claude", tier: "core" },
      { name: "OpenAI ChatGPT & Codex", tier: "core" },
      { name: "Model Context Protocol (MCP)", tier: "working" },
      { name: "AI-Driven Procedural Generation", tier: "core" },
    ],
  },
  {
    id: "networking-integration",
    title: "Networking and Integration",
    subtitle: "Cross-device synchronization and real-time communication",
    items: [
      { name: "Agora Video SDK", tier: "core" },
      { name: "UDP", tier: "working" },
      { name: "WebSocket Concepts", tier: "working" },
      { name: "Multiuser Sessions", tier: "core" },
    ],
  },
];

export const experienceTimeline: ExperienceItem[] = [
  {
    title: "Unreal & Unity Game Developer",
    company: "Invisible Fiction",
    period: "February 2026 – Present",
    current: true,
    summary:
      "Developing multiuser architectural visualization, procedural geometry pipelines, and data-driven Unreal Engine systems alongside cross-device Unity XR applications.",
    highlights: [
      "FictionArchviz (Unreal Engine 5, C++): developing a desktop and Meta Quest multiuser architectural-visualization application.",
      "Built a floor-plan processing pipeline that extracts walls, windows, and doors into separate DXF layers, and implemented C++ procedural roof-mesh generation from DXF/JSON building data with polygon-gap handling and tessellation.",
      "Developed a VR see-through/X-ray overlay material with consistent outline thickness, balanced interior lighting with skylights and lighting channels, and extended the server-manager subsystem with color-coded debug output and session documentation.",
      "Mimadim Home Studio / Mimadim (Unreal Engine 5, C++): engineered high-fidelity PC interior customization in predefined rooms (swapping beds, floor parquet, wallpaper, and curtains) using modular Data Assets and a transform-safe GameInstance subsystem.",
      "Fiction Mech (Unity, OpenXR, Meta Quest 3): developed a 3D visualization application as sole developer featuring multiplayer and two-way control/communication between Quest 3 and Android via Agora Video SDK.",
      "Three.js: developed browser-based 3D game prototypes using AI-assisted coding workflows—reviewing, debugging, testing, and refining generated code.",
    ],
    technologies: [
      "Unreal Engine 5",
      "C++",
      "Blueprints",
      "Unity",
      "C#",
      "DXF/JSON",
      "OpenXR",
      "Meta Quest 3",
      "Agora Video SDK",
      "Three.js",
    ],
  },
  {
    title: "Junior Unity Game Developer",
    company: "Invisible Fiction",
    period: "May 2023 – February 2026",
    current: false,
    summary:
      "Built and maintained in-house Unity/C# games, computer-vision motion-controlled experiences, and enterprise AR/VR applications.",
    highlights: [
      "Developed and updated in-house Unity/C# games including Turbo Trail, Cupping Muffins, and Catch the Object (sole developer), adapting systems into themed variants and improving UI.",
      "Integrated MediaPipe body and leg movement tracking into Alien Runner and Football Cup, streaming real-time tracking data into Unity to drive gameplay.",
      "Worked on a QR-triggered AR 3D model visualization application for HoloLens and mobile using ARCore and Vuforia tooling.",
      "Contributed to Fiction Mech for Meta Quest 3, including OpenXR interaction and cross-device communication workflows.",
    ],
    technologies: [
      "Unity",
      "C#",
      "MediaPipe",
      "OpenXR",
      "Meta Quest 3",
      "ARCore",
      "Vuforia",
      "HoloLens",
    ],
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Invisible Fiction",
    period: "February 2023 – May 2023",
    current: false,
    summary:
      "Prototyped computer-vision human-movement recognition pipelines in Python and connected real-time tracking data to Unity gameplay.",
    highlights: [
      "Prototyped human-movement recognition in Python using MediaPipe to capture body landmarks from live camera feeds.",
      "Transferred real-time tracking data into a Unity game environment to control player actions.",
      "Collaborated with cross-functional development teammates on daily engineering tasks and prototype testing.",
    ],
    technologies: ["Python", "MediaPipe", "Unity", "C#"],
  },
];
