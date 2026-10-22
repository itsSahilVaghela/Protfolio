export interface ArchitectureStep {
  stage: string;
  title: string;
  detail: string;
}

export interface ChallengeItem {
  challenge: string;
  solution: string;
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
    | "Team Project — Core Systems Contributor"
    | "Solo & Team Contributions";
  ownershipNote: string;
  diagramType:
    | "archviz-dxf"
    | "mimadim-subsystem"
    | "fiction-mech-xr"
    | "radicon-mr"
    | "webar-uv"
    | "mediapipe-unity"
    | "unity-games";
  /** Optional genuine screenshot or video path when added to public/assets */
  mediaUrl?: string;
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
    roleTitle: "Sole Developer",
    ownershipScope: "Sole Developer",
    ownershipNote:
      "Engineered entirely as sole developer—architected the two-part system separating PC-based project authoring from spatial Meta Quest 3 and mobile companion inspection, including Photon multiplayer state sync/voice and Agora video screencast integration.",
    diagramType: "fiction-mech-xr",
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
    roleTitle: "Sole Developer",
    ownershipScope: "Sole Developer",
    ownershipNote:
      "Engineered independently as sole developer for Radicon Powerbuild: delivered the Android application with Vuforia brochure tracking and markerless floor modes, plus the Meta Quest 3 MR experience with full 3D interaction.",
    diagramType: "radicon-mr",
    mediaUrl:
      "https://lh3.googleusercontent.com/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_",
    additionalImages: [
      {
        label: "Marker Mode (Brochure Tracking)",
        url: "https://drive.google.com/file/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_/view?usp=sharing",
        previewUrl:
          "https://lh3.googleusercontent.com/d/1LVa70qlxKUC-kk-THRGT3JsqH7xQb6n_",
      },
      {
        label: "Markerless Mode (Floor Showroom)",
        url: "https://drive.google.com/file/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay/view?usp=sharing",
        previewUrl:
          "https://lh3.googleusercontent.com/d/1R4VdJlbzkYXP1nBW6MQd8yHBekCdXFay",
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
    title: "FictionArchviz",
    subtitle: "Multiuser Desktop & VR Architectural Visualization Pipeline",
    category: "Architectural Visualization / Real-Time 3D",
    filterGroup: "archviz-unreal",
    technologies: ["Unreal Engine 5", "C++", "DXF", "JSON", "Meta Quest"],
    shortDescription:
      "Developing a multiuser architectural-visualization application for desktop and VR, including floor-plan processing, procedural geometry generation, and real-time interactive visualization.",
    highlights: [
      "Floor-plan processing workflow to extract walls, windows, and doors into separate DXF layers.",
      "C++ procedural roof-mesh generation from DXF/JSON building data with polygon-gap handling and tessellation.",
      "VR see-through/X-ray overlay materials with consistent outline thickness across viewing distances.",
      "Interior-lighting balance using skylights and Unreal lighting channels.",
      "Server-manager subsystem debugging with color-coded on-screen telemetry and multiuser session documentation.",
    ],
    roleTitle: "Unreal Engine C++ & XR Developer",
    ownershipScope: "Team Project — Core Systems Contributor",
    ownershipNote:
      "Developed within the Invisible Fiction engineering team. My personal responsibilities focused on the floor-plan-to-DXF layer extraction workflow, C++ procedural roof geometry generation, VR X-ray material implementation, interior lighting channel setup, and multiuser server-session debugging.",
    diagramType: "archviz-dxf",
    mediaCaption:
      "Technical Pipeline Diagram: Floor-Plan Layer Extraction -> DXF/JSON Parsing -> C++ Roof Tessellation & VR Multiuser Sync. (Replace mediaUrl in portfolioData.ts when approved production captures are available.)",
    caseStudy: {
      overview:
        "FictionArchviz is a real-time multiuser architectural visualization application targeting both desktop workstations and Meta Quest VR headsets in Unreal Engine 5. It transforms 2D architectural floor plans and structured building data into navigable, collaborative 3D environments.",
      problem:
        "Converting architectural floor plans into clean 3D building geometry manually is time-consuming and error-prone—especially when input polygons contain small vertex gaps or complex roof footprints. Additionally, multiuser VR sessions require clear visual feedback for structural inspection and reliable session-state visibility during debugging.",
      responsibilities: [
        "Built a floor-plan processing pipeline that segments walls, windows, and doors from floor-plan images into distinct DXF layers.",
        "Implemented C++ procedural geometry generation that ingests DXF/JSON building data to construct 3D roof meshes.",
        "Handled polygon-gap tolerance and surface tessellation in C++ to produce watertight roof geometry from imperfect input contours.",
        "Developed a VR see-through/X-ray overlay material maintaining consistent outline thickness.",
        "Configured interior lighting balance using Skylight and Unreal Engine lighting channels.",
        "Extended the server-manager subsystem with color-coded on-screen debug output and authored technical documentation for the multiuser session flow.",
      ],
      technicalApproach:
        "Separated structural semantics early in the data pipeline by isolating walls, doors, and windows into dedicated DXF layers before ingesting building footprints into Unreal Engine 5. In C++, parsed DXF/JSON coordinate data, resolved open contour gaps, and tessellated roof polygons into runtime mesh sections. Paired the geometry pipeline with custom VR shaders and subsystem-level network diagnostics.",
      architectureDetails: [
        "2D-to-DXF Layer Segmentation: Automated extraction of architectural elements into clean layer hierarchies (WALLS, DOORS, WINDOWS).",
        "C++ Procedural Roof Generator: Reads parsed DXF/JSON vertex loops, heals small polygon discontinuities, and runs triangulation/tessellation to generate roof meshes.",
        "VR X-Ray Material Pass: Custom Unreal material graph rendering occluded structural elements with stable screen-space/world-space outline readability in VR.",
        "Lighting Channel Isolation: Tuned Skylight and interior light channels so interior rooms receive balanced illumination without washing out exterior surfaces.",
        "Server-Manager Subsystem Diagnostics: Added structured, color-coded on-screen telemetry to trace session discovery, host/client state transitions, and multiuser connectivity.",
      ],
      pipelineSteps: [
        {
          stage: "STAGE 01",
          title: "Floor-Plan Extraction",
          detail: "Isolate walls, windows, and doors into layered DXF vectors",
        },
        {
          stage: "STAGE 02",
          title: "DXF / JSON Ingestion",
          detail: "Parse closed & open building contours with C++ gap healing",
        },
        {
          stage: "STAGE 03",
          title: "C++ Roof Tessellation",
          detail: "Triangulate footprint polygons into procedural UE5 roof meshes",
        },
        {
          stage: "STAGE 04",
          title: "VR Multiuser & Shaders",
          detail: "Apply X-ray overlay materials, lighting channels & session telemetry",
        },
      ],
      challenges: [
        {
          challenge:
            "Source DXF/JSON building contours frequently contained minor vertex gaps or non-manifold edges that broke standard polygon triangulation.",
          solution:
            "Implemented gap-tolerance stitching and contour sanitization in C++ prior to tessellation so roof meshes generate cleanly without manual CAD cleanup.",
        },
        {
          challenge:
            "Diagnosing state desynchronization across desktop and Meta Quest multiuser sessions was slow when relying solely on raw log files.",
          solution:
            "Extended the server-manager subsystem with color-coded on-screen diagnostic output and documented the end-to-end session lifecycle for the team.",
        },
      ],
      outcomes: [
        "Delivered a repeatable floor-plan-to-DXF layer extraction and C++ roof-mesh generation workflow inside Unreal Engine 5.",
        "Improved VR spatial readability through the custom see-through/X-ray material and balanced interior skylight/channel lighting.",
        "Streamlined multiuser session debugging across desktop and Meta Quest with clear on-screen subsystem telemetry and architecture documentation.",
      ],
    },
  },
  {
    id: "mimadim-home-studio",
    priorityRank: 4,
    featuredTier: "primary",
    title: "Mimadim Home Studio / Mimadim",
    subtitle: "Data-Driven Unreal Engine Furniture Customization Architecture",
    category: "VR Furniture Customization",
    filterGroup: "archviz-unreal",
    technologies: ["Unreal Engine", "C++", "Blueprints", "Data Assets", "Subsystems"],
    shortDescription:
      "An interactive furniture-customization experience involving data-driven furniture selection, model replacement, and real-time interior visualization.",
    highlights: [
      "Designed modular furniture Data Assets and a master Data Asset mapping furniture categories to available 3D assets.",
      "Implemented runtime furniture selection and actor/mesh replacement logic.",
      "Preserved exact world/relative transforms (location, rotation, scale) when swapping furniture models.",
      "Refactored customization responsibilities toward a centralized GameInstance subsystem to support scalable selection, replacement, and future material workflows.",
    ],
    roleTitle: "Unreal Engine Systems Developer",
    ownershipScope: "Team Project — Core Systems Contributor",
    ownershipNote:
      "Engineered the data-driven furniture catalog architecture (Data Assets + Master Mapping), model replacement with transform preservation, and the architectural refactor into a dedicated GameInstance subsystem.",
    diagramType: "mimadim-subsystem",
    mediaCaption:
      "Engineering Architecture Diagram: Master Data Asset Registry -> GameInstance Customization Subsystem -> Transform-Preserving Actor Swap.",
    caseStudy: {
      overview:
        "Mimadim Home Studio is an interactive Unreal Engine interior visualization and VR customization application that enables users to inspect, select, and swap furniture models in real time within architectural spaces.",
      problem:
        "Hardcoding furniture references or scattering selection and replacement logic across level Blueprints and individual actor scripts creates tight coupling, makes adding new catalog items tedious, and risks losing placement transforms when swapping models.",
      responsibilities: [
        "Created structured Unreal Data Assets representing individual furniture items and metadata.",
        "Built a Master Data Asset mapping furniture types/categories to their corresponding available furniture assets.",
        "Implemented runtime selection and model-replacement logic that preserves the target object's transform.",
        "Refactored dispersed customization logic toward a dedicated GameInstance subsystem to centralize state and prepare for material customization.",
      ],
      technicalApproach:
        "Adopted a data-driven architecture decoupling catalog content from runtime interaction code. By indexing furniture options through a Master Data Asset and routing selection/replacement calls through a centralized GameInstance subsystem, new furniture variants can be registered without modifying core interaction logic.",
      architectureDetails: [
        "Furniture Data Assets: Encapsulate mesh references, category tags, and item metadata in asset-level structures.",
        "Master Mapping Registry: Maps semantic furniture types (e.g., seating, tables, fixtures) to curated arrays of furniture Data Assets.",
        "Transform-Preserving Replacement: Captures existing actor world/relative transform matrices before spawning or swapping the replacement furniture asset.",
        "GameInstance Subsystem Refactor: Consolidates selection state, active target tracking, replacement execution, and extensibility hooks for material-instance swapping.",
      ],
      pipelineSteps: [
        {
          stage: "DATA LAYER",
          title: "Master Data Asset",
          detail: "Maps furniture categories to modular Furniture Data Assets",
        },
        {
          stage: "SUBSYSTEM",
          title: "GameInstance Subsystem",
          detail: "Centralizes active selection, catalog queries & replacement rules",
        },
        {
          stage: "TRANSFORM",
          title: "State Capture & Swap",
          detail: "Caches position/rotation/scale and instantiates selected model",
        },
        {
          stage: "EXTENSIBILITY",
          title: "Material Workflow Ready",
          detail: "Clean subsystem API prepared for runtime material customization",
        },
      ],
      challenges: [
        {
          challenge:
            "Replacing furniture actors at runtime could reset orientation or offset placement if pivot conventions or parent attachments weren't respected.",
          solution:
            "Explicitly cached and reapplied the target's transform state during replacement so swapped models remain aligned in the room layout.",
        },
        {
          challenge:
            "Keeping customization logic maintainable as new requirements (such as future material customization) were introduced.",
          solution:
            "Refactored responsibilities out of scattered actor/Blueprint scripts into a single GameInstance subsystem with clear interfaces.",
        },
      ],
      outcomes: [
        "Established a clean, data-driven catalog workflow allowing designers and developers to register new furniture assets via Data Assets.",
        "Centralized selection and replacement responsibilities into a maintainable Unreal GameInstance subsystem architecture.",
      ],
    },
  },
  {
    id: "webar-coloring-book",
    priorityRank: 5,
    featuredTier: "primary",
    title: "WebAR Coloring Book",
    subtitle: "Live Webcam Drawing Capture & 2048×2048 GPU Texture Unwarping",
    category: "WebAR / Browser-Based 3D",
    filterGroup: "web3d-ar",
    technologies: ["Three.js", "MindAR", "JavaScript", "GPU texture workflow"],
    shortDescription:
      "A browser-based interactive coloring-book experience that tracks a physical drawing sheet and maps its live colors onto an animated 3D model.",
    highlights: [
      "Optical image tracking of a physical coloring sheet through a device webcam using MindAR.",
      "Live drawing capture from the camera feed as the user colors the physical page.",
      "Perspective texture unwarping to rectify the angled camera view into UV space.",
      "2048 × 2048 texture workflow designed for crisp real-time Three.js rendering.",
      "Dynamic texture application onto an animated 3D model directly in the browser.",
    ],
    roleTitle: "Web 3D & WebAR Developer",
    ownershipScope: "Sole Developer",
    ownershipNote:
      "Designed and implemented the browser-based Three.js + MindAR tracking, perspective texture-unwarping pipeline (2048 × 2048), and animated 3D model integration.",
    diagramType: "webar-uv",
    mediaCaption:
      "WebAR Pipeline Diagram: Webcam Feed & MindAR Pose -> Homography / Perspective Unwarp -> 2048×2048 Dynamic Texture -> Animated Three.js Mesh.",
    caseStudy: {
      overview:
        "WebAR Coloring Book is a zero-install, browser-based augmented reality experience built with Three.js and MindAR. It tracks a physical printed drawing sheet via the user's webcam, extracts the hand-colored artwork in real time, unwarps perspective distortion into a 2048 × 2048 texture, and applies it live onto an animated 3D character.",
      problem:
        "Mapping a physical drawing onto a 3D model in real time inside a mobile or desktop web browser requires solving two technical problems simultaneously: accurately tracking the sheet's 3D pose from an angled camera feed, and rectifying (unwarping) the perspective-skewed camera region into a high-resolution UV texture without stalling the render loop.",
      responsibilities: [
        "Implemented marker/image tracking of the physical drawing sheet using MindAR and Three.js.",
        "Built the live webcam capture and perspective texture-unwarping workflow.",
        "Configured a 2048 × 2048 dynamic texture pipeline to preserve drawing sharpness on the 3D mesh.",
        "Integrated animated 3D model playback in Three.js with real-time material map updates.",
      ],
      technicalApproach:
        "Combined MindAR's image-target tracking matrices with a perspective rectification pass that samples the detected sheet region from the live video stream and projects it into a normalized 2048 × 2048 texture buffer. Bound the resulting dynamic texture to the animated Three.js model's material so colors update live as the user draws.",
      architectureDetails: [
        "Optical Pose Estimation: MindAR tracks feature points on the physical drawing sheet to compute camera-relative transform matrices.",
        "Perspective Texture Unwarping: Maps the 4-corner tracked quad from camera screen space back into flat UV texture coordinates.",
        "2048 × 2048 GPU Texture Workflow: High-resolution texture buffer sized for sharp line and color fidelity while maintaining real-time browser rendering.",
        "Animated 3D Character Integration: Three.js skeletal animation mixer running concurrently with live diffuse map updates.",
      ],
      pipelineSteps: [
        {
          stage: "STEP 01",
          title: "Webcam & MindAR Track",
          detail: "Detect physical sheet corners & pose matrix in video stream",
        },
        {
          stage: "STEP 02",
          title: "Perspective Unwarp",
          detail: "Rectify skewed camera quad into normalized flat UV space",
        },
        {
          stage: "STEP 03",
          title: "2048 × 2048 Texture",
          detail: "Update dynamic GPU texture buffer for crisp color mapping",
        },
        {
          stage: "STEP 04",
          title: "Animated 3D Render",
          detail: "Bind live texture to animated Three.js character mesh",
        },
      ],
      challenges: [
        {
          challenge:
            "Low-resolution capture buffers cause blurry, pixelated seams when mapped across a 3D character's UV islands.",
          solution:
            "Implemented a 2048 × 2048 texture-unwarping workflow tailored for real-time rendering so hand-drawn strokes remain legible on the 3D mesh.",
        },
        {
          challenge:
            "Viewing the paper at steep camera angles introduces perspective foreshortening across the drawing region.",
          solution:
            "Used tracked target coordinates to unwarp the captured region into flat texture space before updating the Three.js material.",
        },
      ],
      outcomes: [
        "Delivered an interactive browser-based WebAR coloring experience requiring no native app installation.",
        "Achieved sharp live texture projection onto an animated 3D model using the 2048 × 2048 unwarping workflow.",
      ],
    },
  },
  {
    id: "motion-controlled-games",
    priorityRank: 6,
    featuredTier: "primary",
    title: "Motion-Controlled Games",
    subtitle: "Alien Runner & Football Cup — MediaPipe Body/Leg Tracking in Unity",
    category: "Game Development / Computer Vision",
    filterGroup: "cv-games",
    technologies: ["Unity", "C#", "MediaPipe", "Python"],
    shortDescription:
      "Interactive games that use body and leg movement tracking to drive gameplay, integrating movement data from MediaPipe into Unity.",
    highlights: [
      "Featured titles: Alien Runner (full-body gesture runner) and Football Cup (leg-tracking soccer game).",
      "Built the movement-tracking pipeline in Python using MediaPipe pose/landmark detection.",
      "Streamed real-time skeletal landmark and movement data into Unity (C#) to drive responsive player actions.",
      "Implemented gameplay mechanics, gesture thresholds, and UI improvements for arcade/PC installations.",
    ],
    roleTitle: "Unity C# & Computer Vision Developer",
    ownershipScope: "Team Project — Core Systems Contributor",
    ownershipNote:
      "Prototyped and integrated the Python MediaPipe movement-recognition pipeline, data streaming into Unity, player movement binding for Alien Runner and Football Cup, and UI updates.",
    diagramType: "mediapipe-unity",
    mediaCaption:
      "Computer Vision Pipeline Diagram: Camera Feed -> Python MediaPipe Pose Landmarks -> Low-Latency Stream -> Unity C# Character Controller.",
    caseStudy: {
      overview:
        "Motion-Controlled Games comprises two interactive PC titles—Alien Runner and Football Cup—developed at Invisible Fiction. Both games replace traditional gamepads with camera-based human movement recognition, translating real-world body gestures and leg kicks into immediate in-game character actions.",
      problem:
        "Controller-free interactive games require reliable pose extraction from a standard camera feed and a low-latency bridge to transfer landmark coordinates from Python's MediaPipe ecosystem into a running Unity C# game loop without jitter or input lag.",
      responsibilities: [
        "Prototyped human-movement recognition in Python using MediaPipe pose and landmark tracking.",
        "Built the data-streaming bridge sending real-time tracking coordinates from Python into Unity.",
        "Integrated body-gesture controls into Alien Runner and leg-movement kicking mechanics into Football Cup.",
        "Implemented responsive gameplay tuning and UI improvements for clear player feedback.",
      ],
      technicalApproach:
        "Extracted normalized body and lower-limb landmarks in Python using MediaPipe, filtered pose transitions into actionable movement states, and transmitted the tracking stream to Unity (C#). Inside Unity, mapped incoming landmark data to character locomotion, lane switching, and kick trajectories.",
      architectureDetails: [
        "MediaPipe Pose Extraction (Python): Captures webcam frames and computes 3D/2D body and leg landmarks in real time.",
        "Python-to-Unity Telemetry Stream: Transfers serialized landmark vectors and gesture triggers into the Unity runtime.",
        "Alien Runner Controller (Unity C#): Maps upper/full-body lean, jump, and gesture states to obstacle-dodging locomotion.",
        "Football Cup Controller (Unity C#): Translates lower-body leg swing and foot vectors into directional soccer kicks and goalkeeper interactions.",
      ],
      pipelineSteps: [
        {
          stage: "CAPTURE",
          title: "Camera Input",
          detail: "Live player video feed captured at interactive frame rates",
        },
        {
          stage: "VISION",
          title: "MediaPipe (Python)",
          detail: "Extract body & leg skeletal landmarks and movement vectors",
        },
        {
          stage: "TRANSPORT",
          title: "Data Bridge",
          detail: "Stream real-time tracking coordinates from Python to Unity",
        },
        {
          stage: "GAMEPLAY",
          title: "Unity C# Controllers",
          detail: "Drive Alien Runner locomotion & Football Cup kick physics",
        },
      ],
      challenges: [
        {
          challenge:
            "Raw webcam pose landmarks exhibit frame-to-frame micro-jitter and varying player body proportions.",
          solution:
            "Normalized movement thresholds and smoothed input transitions in Unity C# so player actions feel deliberate and responsive.",
        },
        {
          challenge:
            "Ensuring players immediately understand how physical movements map to on-screen game state.",
          solution:
            "Updated in-game UI feedback and calibration cues across both Alien Runner and Football Cup.",
        },
      ],
      outcomes: [
        "Successfully evolved the early AI internship MediaPipe prototype into two playable motion-controlled Unity PC games (Alien Runner and Football Cup).",
        "Delivered responsive controller-free gameplay driven by live body and leg movement tracking.",
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
  {
    id: "threejs-browser-prototypes",
    title: "Three.js Browser 3D Prototypes",
    category: "Web 3D / Browser Prototyping",
    role: "Developer",
    technologies: ["Three.js", "JavaScript", "WebGL", "AI-Assisted Workflows"],
    description:
      "Browser-based 3D game and interactive prototypes developed using Three.js and AI-assisted coding workflows.",
    highlights: [
      "Focused on code review, architectural debugging, runtime testing, and refining generated WebGL/Three.js code.",
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
      "Mimadim Home Studio / Mimadim (Unreal Engine): implemented furniture Data Assets, a master mapping Data Asset, and transform-preserving model replacement, refactoring customization responsibilities toward a GameInstance subsystem.",
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
