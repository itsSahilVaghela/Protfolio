import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Layers,
  Wrench,
  Play,
  Monitor,
  Glasses,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Sliders,
  Scissors,
  Users,
  Radio,
  FileText,
  Video,
  Box,
  Palette,
  Eye,
  Maximize2,
  X,
  Compass,
} from "lucide-react";
import { featuredProjects } from "@/data/portfolioData";
import { ProjectTechnicalVisual } from "@/components/ProjectTechnicalVisual";

interface VideoTab {
  id: "pc" | "quest" | "motor";
  title: string;
  badge: string;
  embedUrl: string;
  driveUrl: string;
  description: string;
}

const videoDemos: VideoTab[] = [
  {
    id: "pc",
    title: "Part One: PC Authoring Studio Walkthrough (4K)",
    badge: "PC AUTHORING TOOL",
    embedUrl: "https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/preview",
    driveUrl: "https://drive.google.com/file/d/1-Nq5PV4sZDEReHngLBV7VVP1WOyfX2Wo/view?usp=sharing",
    description:
      "Recorded directly from the author's PC build. Demonstrates project creation, 3D model ingestion, custom material generation with HSL sliders, exploded assembly setup, attaching PDF/video documentation, in-app video recording, and cloud publishing.",
  },
  {
    id: "quest",
    title: "Part Two: Meta Quest 3 Mixed Reality Walkthrough",
    badge: "QUEST 3 MR VIEWER",
    embedUrl: "https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/preview",
    driveUrl: "https://drive.google.com/file/d/1vMSK6kcbKgBzB4DkubT5pr6DlWdDVDp0/view?usp=sharing",
    description:
      "Recorded inside Meta Quest 3 in full-color passthrough mixed reality. Demonstrates room placement, tabletop inspection of a jet engine assembly, hand-tracking pinch interactions, floating part metadata, spatial layer decks, and live 3-axis shader cross-sectioning.",
  },
  {
    id: "motor",
    title: "Cross-Device Motor Inspection & Synchronization",
    badge: "MULTI-DEVICE COLLAB",
    embedUrl: "https://drive.google.com/file/d/17-TV9eok0MBA01NzHE0WI9nd5w9rTDQX/preview",
    driveUrl: "https://drive.google.com/file/d/17-TV9eok0MBA01NzHE0WI9nd5w9rTDQX/view?usp=drive_link",
    description:
      "Demonstrates mixed-reality industrial motor inspection with PC-authored custom materials, individual component separation, and multi-device interaction state synchronization.",
  },
];

interface ScreenshotItem {
  id: string;
  filename: string;
  title: string;
  category: "pc" | "quest" | "motor";
  caption: string;
  tags: string[];
}

const galleryScreenshots: ScreenshotItem[] = [
  {
    id: "pc-01",
    filename: "pc-01-new-project.jpg",
    title: "Project Creation & Initialization",
    category: "pc",
    caption:
      "Project creation wizard in the PC authoring studio allowing project naming, descriptions, and dataset initialization.",
    tags: ["PC Studio", "Project Setup", "Workflow"],
  },
  {
    id: "pc-02",
    filename: "pc-02-import-3d-model.jpg",
    title: "Multi-Format 3D Asset Ingestion",
    category: "pc",
    caption:
      "Windows native file explorer integration for importing 3D models (FBX/OBJ), textures, audio, and technical documentation folders.",
    tags: ["PC Studio", "Asset Ingestion", "CAD Prep"],
  },
  {
    id: "pc-03",
    filename: "pc-03-material-palette.jpg",
    title: "Material Palette & Scene Hierarchy",
    category: "pc",
    caption:
      "Interactive material library (Copper, Gold, RoseGold, Silver, Red, Purple) and component tree mapping the entire mechanical assembly.",
    tags: ["PC Studio", "PBR Materials", "Hierarchy Tree"],
  },
  {
    id: "pc-04",
    filename: "pc-04-custom-material-editor.jpg",
    title: "Real-Time Material Studio",
    category: "pc",
    caption:
      "Custom shader material designer with continuous Hue, Saturation, Luminance, Transparency sliders, Texture maps, and Normal maps.",
    tags: ["PC Studio", "Shader Design", "Custom Materials"],
  },
  {
    id: "pc-05",
    filename: "pc-05-pdf-technical-docs.jpg",
    title: "Part-Level Technical PDF Attachment",
    category: "pc",
    caption:
      "Attaching manufacturer manuals ('sensors.pdf') to individual 3D subcomponents with built-in document preview.",
    tags: ["PC Studio", "Technical Docs", "PDF Binding"],
  },
  {
    id: "pc-06",
    filename: "pc-06-video-reference-docs.jpg",
    title: "Reference Video Ingestion & Indicators",
    category: "pc",
    caption:
      "Maintenance video playback ('Bldc3.mp4') directly in the properties panel, with orange info icons ('i') flagging documented parts in the tree.",
    tags: ["PC Studio", "Video Manuals", "Metadata Indicators"],
  },
  {
    id: "pc-07",
    filename: "pc-07-exploded-assembly-slider.jpg",
    title: "Assembly & Disassembly Slider Setup",
    category: "pc",
    caption:
      "Continuous 'Assemble <---> Disassemble' slider configuring spatial explosion offsets and sequential maintenance order.",
    tags: ["PC Studio", "Exploded View", "Assembly Config"],
  },
  {
    id: "pc-08",
    filename: "pc-08-video-recording-green-screen.jpg",
    title: "In-App 1080p Recording & Green Screen",
    category: "pc",
    caption:
      "Integrated '• REC' presentation capture exporting 1080p MP4 videos directly to local project deliverables, plus Green Screen compositing toggle.",
    tags: ["PC Studio", "Video Capture", "Green Screen"],
  },
  {
    id: "pc-09",
    filename: "pc-09-backend-publish.jpg",
    title: "One-Click Backend Cloud Publishing",
    category: "pc",
    caption:
      "Serialization and packaging workflow uploading configured projects to the cloud backend for retrieval on Meta Quest 3 and mobile.",
    tags: ["PC Studio", "Cloud Publish", "Asset Pipeline"],
  },
  {
    id: "quest-01",
    filename: "quest-01-mr-room-placement.jpg",
    title: "Meta Quest 3 Passthrough Spatial Placement",
    category: "quest",
    caption:
      "Full-color stereo passthrough with spatial plane detection prompt ('Tap to place the model on the floor...') for room-scale positioning.",
    tags: ["Quest 3", "Mixed Reality", "Spatial Anchoring"],
  },
  {
    id: "quest-02",
    filename: "quest-02-tabletop-placement.jpg",
    title: "Tabletop Inspection & Laser Raycast",
    category: "quest",
    caption:
      "Jet engine mechanical assembly anchored to a physical conference table with 6DoF controller laser pointer raycast and selection outline.",
    tags: ["Quest 3", "OpenXR 6DoF", "Tabletop Mode"],
  },
  {
    id: "quest-03",
    filename: "quest-03-exploded-part-inspection.jpg",
    title: "Exploded Subassembly Isolation in MR",
    category: "quest",
    caption:
      "Disassembled turbine and casing components separated in 3D coordinate space for detailed internal tolerance inspection.",
    tags: ["Quest 3", "Exploded View", "Component Isolation"],
  },
  {
    id: "quest-04",
    filename: "quest-04-part-metadata-hud.jpg",
    title: "Contextual Component Metadata HUD",
    category: "quest",
    caption:
      "Floating spatial tooltip displaying component name ('grid'), material state ('NoMat'), and quick-action 'Expand' and 'Reset' controls.",
    tags: ["Quest 3", "Spatial UI", "Part Metadata"],
  },
  {
    id: "quest-05",
    filename: "quest-05-spatial-layers-panel.jpg",
    title: "Spatial Layer Management Deck",
    category: "quest",
    caption:
      "Floating spatial layer selector (containers, plates, fins_outside, flaps, turbine_hull, pistons) operated via hand-tracking raycast.",
    tags: ["Quest 3", "Layer Hierarchy", "Hand Tracking"],
  },
  {
    id: "quest-06",
    filename: "quest-06-layer-visibility-filter.jpg",
    title: "Subsystem Visibility Filtering",
    category: "quest",
    caption:
      "Subsystem isolation filter allowing inspectors to view specific component groups: default, outparts, gears, screws & bolts.",
    tags: ["Quest 3", "Visibility Filter", "Subsystems"],
  },
  {
    id: "quest-07",
    filename: "quest-07-cross-section-clipping.jpg",
    title: "3-Axis Real-Time Shader Cross-Section",
    category: "quest",
    caption:
      "Dedicated clipping panel with independent X (Red), Y (Green), and Z (Blue) sliders, RGB 3D axis gizmo, and real-time custom shader clipping plane.",
    tags: ["Quest 3", "Shader Clipping", "Cross-Section"],
  },
  {
    id: "motor-01",
    filename: "motor-01-mr-inspection.jpg",
    title: "Industrial Motor MR Inspection",
    category: "motor",
    caption:
      "Full assembly inspection of an industrial gearbox motor rendered with PC-configured custom materials in Meta Quest 3 passthrough.",
    tags: ["Multi-Device", "Motor Assembly", "Material Sync"],
  },
];

export const FictionMechCaseStudy = () => {
  const [activeVideoTab, setActiveVideoTab] = useState<"pc" | "quest" | "motor">("pc");
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<"all" | "pc" | "quest" | "motor">("all");
  const [lightboxImage, setLightboxImage] = useState<ScreenshotItem | null>(null);

  const fictionMechData = featuredProjects.find((p) => p.id === "fiction-mech") || featuredProjects[0];
  const activeVideo = videoDemos.find((v) => v.id === activeVideoTab) || videoDemos[0];

  const filteredScreenshots =
    selectedGalleryCategory === "all"
      ? galleryScreenshots
      : galleryScreenshots.filter((s) => s.category === selectedGalleryCategory);

  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F4F6FA] selection:bg-[#4D8DFF]/30 selection:text-[#F4F6FA]">
      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-[#0B1018]/90 backdrop-blur-md border-b border-[#1E2736] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#A4ADBB] hover:text-[#4D8DFF] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Featured Projects</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10151D] border border-[#1E2736] text-[11px] font-mono text-[#4D8DFF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF] animate-pulse" />
              CASE STUDY 01 // MAIN PROJECT
            </span>

            <a
              href="#gallery"
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#151C27] hover:bg-[#1E2736] text-[#F4F6FA] border border-[#1E2736] transition-colors"
            >
              Video Demos
            </a>

            <a
              href="#architecture"
              className="hidden md:inline-flex px-3 py-1.5 rounded-lg text-xs font-mono bg-[#4D8DFF] text-[#080B10] font-semibold hover:bg-[#689FFF] transition-colors"
            >
              System Architecture
            </a>
          </div>
        </div>
      </header>

      <main className="space-y-24 pb-28">
        {/* =========================================================================
            SECTION 1: HERO
        ========================================================================= */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1E2736] overflow-hidden">
          {/* Subtle Ambient Background Grids */}
          <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(77, 141, 255, 0.15) 0%, rgba(139, 108, 255, 0.05) 50%, rgba(8, 11, 16, 0) 80%)",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4D8DFF]/15 text-[#4D8DFF] border border-[#4D8DFF]/30 text-xs font-mono">
                  <Wrench className="w-3.5 h-3.5" />
                  SOLE DEVELOPER · END-TO-END LEAD
                </span>
                <span className="px-3 py-1 rounded-full bg-[#151C27] text-[#A4ADBB] border border-[#1E2736] text-xs font-mono">
                  INDUSTRIAL 3D VISUALIZATION &amp; XR
                </span>
                <span className="px-3 py-1 rounded-full bg-[#8B6CFF]/15 text-[#F4F6FA] border border-[#8B6CFF]/30 text-xs font-mono">
                  META QUEST 3 · ANDROID · PC
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F4F6FA] leading-[1.08]">
                Fiction Mech —{" "}
                <span className="text-gradient">
                  Interactive 3D Model Analysis &amp; Collaborative XR
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#A4ADBB] leading-relaxed max-w-3xl">
                A production multi-platform 3D visualization, mechanical analysis, and collaboration ecosystem.
                Designed with a strict two-component architecture: a high-fidelity **PC Project Authoring Studio**
                for CAD ingestion and material/metadata configuration, paired with **Meta Quest 3 Mixed Reality**
                and mobile companion viewers with real-time Agora audio/video synchronization.
              </p>

              {/* Technologies Chips */}
              <div className="pt-2">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#778294] mb-3">
                  CORE TECHNOLOGIES &amp; PROTOCOLS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Unity (C#)",
                    "OpenXR 6DoF",
                    "Meta Quest 3 Passthrough",
                    "Hand Tracking & Gestures",
                    "Android & iOS Runtimes",
                    "Agora Video SDK",
                    "Custom Shader Clipping",
                    "Backend Cloud Publishing",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#10151D] text-[#C1CDDC] border border-[#1E2736]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#overview"
                  className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#689FFF] transition-colors shadow-lg shadow-[#4D8DFF]/20"
                >
                  Explore Two-Part Architecture ↓
                </a>
                <a
                  href="#gallery"
                  className="px-5 py-2.5 rounded-lg text-xs font-mono bg-[#151C27] hover:bg-[#1E2736] text-[#F4F6FA] border border-[#1E2736] transition-colors inline-flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#4D8DFF]" />
                  Watch Walkthrough Videos
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: PROJECT OVERVIEW — THE TWO-PART SYSTEM
        ========================================================================= */}
        <section id="overview" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Layers className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                02 // SYSTEM OVERVIEW
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
              Purpose &amp; The Two-Part Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
              Industrial maintenance reviews, technical training, and equipment diagnostics are frequently hindered
              by static 2D paper manuals and isolated CAD desktop viewers. Headset operators are isolated from field
              technicians and supervisors on mobile devices. Fiction Mech solves this through a decoupled architecture
              that cleanly divides project preparation on PC from interactive spatial analysis on viewer devices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Part One Card: PC Studio */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1017] border border-[#4D8DFF]/30 hover:border-[#4D8DFF]/60 transition-colors space-y-5 relative group">
              <div className="w-12 h-12 rounded-xl bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF]">
                <Monitor className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#4D8DFF] uppercase tracking-wider">
                  PART ONE // AUTHORING &amp; CONFIGURATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F4F6FA] mt-1">
                  PC Project Authoring Application
                </h3>
              </div>

              <p className="text-sm text-[#A4ADBB] leading-relaxed">
                Acts as the technical staging engine. Engineers ingest CAD geometries, define component hierarchies,
                design custom PBR materials, attach part-specific technical documentation (PDFs, videos, audio),
                configure assembly/disassembly separation vectors, and publish the compiled package to cloud storage.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs font-mono text-[#C1CDDC]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                  <span>3D model ingestion (FBX/OBJ) &amp; component hierarchy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                  <span>Custom material studio with real-time HSL/Alpha sliders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                  <span>Part-level technical manual (PDF) &amp; video binding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                  <span>Interactive assembly/disassembly sequence configuration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                  <span>Built-in 1080p turntable video capture &amp; Green Screen</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                  <span>One-click backend publishing &amp; cloud staging</span>
                </li>
              </ul>
            </div>

            {/* Part Two Card: XR & Mobile Viewers */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1017] border border-[#8B6CFF]/30 hover:border-[#8B6CFF]/60 transition-colors space-y-5 relative group">
              <div className="w-12 h-12 rounded-xl bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF]">
                <Glasses className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#8B6CFF] uppercase tracking-wider">
                  PART TWO // SPATIAL RUNTIME &amp; COLLABORATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F4F6FA] mt-1">
                  Meta Quest 3 &amp; Mobile Viewers
                </h3>
              </div>

              <p className="text-sm text-[#A4ADBB] leading-relaxed">
                Connects field operators and supervisors in mixed reality and on mobile devices. Downloads published
                projects for room-scale passthrough exploration, 6DoF &amp; hand-tracked part expansion, real-time
                3-axis shader cross-section cuts, and bidirectional state synchronization over Agora audio and video.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs font-mono text-[#C1CDDC]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />
                  <span>Meta Quest 3 full-color passthrough surface placement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />
                  <span>OpenXR 6DoF raycast &amp; hand tracking pinch interaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />
                  <span>Floating contextual component HUD with Expand/Reset</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />
                  <span>Real-time 3-axis (X/Y/Z) RGB shader cross-section slicing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />
                  <span>Bidirectional Quest 3 ↔ Android state synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6CFF] flex-shrink-0" />
                  <span>Low-latency Agora Video SDK voice channels &amp; screencast</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: SYSTEM ARCHITECTURE
        ========================================================================= */}
        <section id="architecture" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Compass className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                03 // PIPELINE ARCHITECTURE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
              System Topology &amp; Data Pipeline
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
              How project data transitions from CAD authoring on PC, packages across cloud storage, and synchronizes
              between spatial Quest 3 headsets and companion mobile devices during live collaborative inspection sessions.
            </p>
          </div>

          <div className="space-y-6">
            <ProjectTechnicalVisual project={fictionMechData} variant="modal" />

            {/* 4-Step Pipeline Breakdown Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fictionMechData.caseStudy.pipelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2736] space-y-2 hover:border-[#4D8DFF]/40 transition-colors"
                >
                  <span className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wider block">
                    STAGE 0{idx + 1} // {step.stage}
                  </span>
                  <h3 className="text-sm font-semibold text-[#F4F6FA]">{step.title}</h3>
                  <p className="text-xs text-[#A4ADBB] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PART ONE — PC PROJECT AUTHORING SHOWCASE
        ========================================================================= */}
        <section id="pc-authoring" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Monitor className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                04 // PART ONE SHOWCASE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
              PC Project Authoring &amp; Configuration Studio
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
              Genuine UI captures from the PC authoring application. Every project begins by ingesting CAD geometry,
              tuning PBR material properties, binding technical documentation to individual parts, and staging
              sequences before publishing to the viewer applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                file: "pc-01-new-project.jpg",
                title: "Project Creation & Initialization",
                desc: "Title, description, and workspace creation staging the model ingestion workflow.",
              },
              {
                file: "pc-02-import-3d-model.jpg",
                title: "3D Asset & Media Ingestion",
                desc: "Windows file explorer ingestion for FBX/OBJ models, textures, audio, and technical PDFs.",
              },
              {
                file: "pc-03-material-palette.jpg",
                title: "Material Palette & Hierarchy",
                desc: "Palette assignment (Copper, Gold, Silver, etc.) and comprehensive scene component tree.",
              },
              {
                file: "pc-04-custom-material-editor.jpg",
                title: "Custom Shader Material Studio",
                desc: "Continuous Hue, Saturation, Luminance, Transparency sliders with texture & normal map slots.",
              },
              {
                file: "pc-05-pdf-technical-docs.jpg",
                title: "Part-Level PDF Documentation",
                desc: "Binding technical manuals ('sensors.pdf') directly to individual 3D subcomponents.",
              },
              {
                file: "pc-06-video-reference-docs.jpg",
                title: "Reference Video Ingestion",
                desc: "Video playback in properties panel with orange info icons ('i') highlighting parts with documentation.",
              },
              {
                file: "pc-07-exploded-assembly-slider.jpg",
                title: "Assembly & Disassembly Slider",
                desc: "Continuous slider tuning the spatial separation vectors for mechanical maintenance reviews.",
              },
              {
                file: "pc-08-video-recording-green-screen.jpg",
                title: "Turntable Recording & Green Screen",
                desc: "In-app 1080p MP4 recording pipeline storing files to deliverables, with chroma key toggle.",
              },
              {
                file: "pc-09-backend-publish.jpg",
                title: "Cloud Backend Publishing",
                desc: "Serialization and cloud packaging delivering configured models directly to Quest 3 & mobile.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setLightboxImage({
                    id: `pc-${idx}`,
                    filename: card.file,
                    title: card.title,
                    category: "pc",
                    caption: card.desc,
                    tags: ["PC Studio"],
                  })
                }
                className="group cursor-pointer rounded-xl bg-[#0C1017] border border-[#1E2736] overflow-hidden hover:border-[#4D8DFF]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-[#080B10]">
                    <img
                      src={`${baseUrl}projects/fiction-mech/${card.file}`}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1017] via-transparent opacity-60" />
                    <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#080B10]/80 text-[#A4ADBB] group-hover:text-[#4D8DFF] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-semibold text-[#F4F6FA] group-hover:text-[#4D8DFF] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#A4ADBB] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <div className="px-4 pb-3 pt-1">
                  <span className="text-[10px] font-mono text-[#778294] uppercase tracking-wider">
                    VERIFIED PC APPLICATION BUILD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: PART TWO — XR & MOBILE VIEWER SHOWCASE
        ========================================================================= */}
        <section id="xr-viewer" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Glasses className="w-3.5 h-3.5 text-[#8B6CFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                05 // PART TWO SHOWCASE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
              Meta Quest 3 Mixed Reality &amp; Mobile Viewers
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
              Authentic captures inside the Meta Quest 3 headset. Powered by OpenXR and full-color passthrough,
              inspectors place assemblies onto physical factory floors or conference tables, manipulate parts via hand
              tracking, toggle subsystem layer decks, and slice assemblies with real-time 3-axis shader clipping planes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                file: "quest-01-mr-room-placement.jpg",
                title: "Passthrough Spatial Placement",
                desc: "Full-color stereo passthrough prompting room placement for 1:1 scale or tabletop study.",
              },
              {
                file: "quest-02-tabletop-placement.jpg",
                title: "Tabletop Inspection & Raycasting",
                desc: "Anchored jet engine assembly with cyan outline selection highlighting and 6DoF raycast.",
              },
              {
                file: "quest-03-exploded-part-inspection.jpg",
                title: "Exploded Subassembly Separation",
                desc: "Disassembled turbine stages floating in spatial coordinates for internal tolerance examination.",
              },
              {
                file: "quest-04-part-metadata-hud.jpg",
                title: "Floating Contextual Part HUD",
                desc: "Spatial tooltip displaying component name ('grid'), material state, and Expand/Reset buttons.",
              },
              {
                file: "quest-05-spatial-layers-panel.jpg",
                title: "Spatial Layer Management Deck",
                desc: "Floating deck isolating containers, plates, fins_outside, flaps, turbine_hull, and pistons.",
              },
              {
                file: "quest-06-layer-visibility-filter.jpg",
                title: "Subsystem Visibility Filter",
                desc: "Filtering subsystem visibility: default, outparts, gears, and screws & bolts.",
              },
              {
                file: "quest-07-cross-section-clipping.jpg",
                title: "3-Axis Real-Time Shader Cross-Section",
                desc: "Color-coded X (Red), Y (Green), Z (Blue) sliders with 3D axis gizmo and live clipping plane.",
              },
              {
                file: "motor-01-mr-inspection.jpg",
                title: "Industrial Motor MR Assembly",
                desc: "Gearbox motor rendered with PC-authored custom materials in Meta Quest 3 passthrough.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setLightboxImage({
                    id: `quest-${idx}`,
                    filename: card.file,
                    title: card.title,
                    category: "quest",
                    caption: card.desc,
                    tags: ["Quest 3 MR"],
                  })
                }
                className="group cursor-pointer rounded-xl bg-[#0C1017] border border-[#1E2736] overflow-hidden hover:border-[#8B6CFF]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-[#080B10]">
                    <img
                      src={`${baseUrl}projects/fiction-mech/${card.file}`}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1017] via-transparent opacity-60" />
                    <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#080B10]/80 text-[#A4ADBB] group-hover:text-[#8B6CFF] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="text-sm font-semibold text-[#F4F6FA] group-hover:text-[#8B6CFF] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#A4ADBB] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <div className="px-4 pb-3 pt-1">
                  <span className="text-[10px] font-mono text-[#778294] uppercase tracking-wider">
                    VERIFIED QUEST 3 MR SESSION
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: ASSEMBLY AND DISASSEMBLY SEQUENCES
        ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0C1017] border border-[#1E2736] space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Sliders className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                06 // MECHANICAL SEQUENCES
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F6FA]">
              Configured Assembly &amp; Disassembly Sequences
            </h2>

            <p className="text-sm sm:text-base text-[#A4ADBB] leading-relaxed max-w-3xl">
              Rather than relying on pre-rendered, non-interactive animation videos, Fiction Mech provides
              user-scrubbed mechanical separation. In the PC application, users configure the order and spatial
              translation paths for each component. In the XR and mobile viewers, inspectors dynamically expand,
              disassemble, and reassemble assemblies to understand how parts fit together.
            </p>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2">
                <span className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wider">
                  TRAINING UTILITY
                </span>
                <h3 className="text-sm font-semibold text-[#F4F6FA]">Maintenance Operator Training</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Apprentices examine the exact step-by-step disassembly sequence of high-tolerance assemblies
                  without risking expensive physical equipment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2">
                <span className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wider">
                  TOOL IDENTIFICATION
                </span>
                <h3 className="text-sm font-semibold text-[#F4F6FA]">Disassembly Tool Binding</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Every sequence step links to the required disassembly wrench, torque spec, or opening tool
                  configured in the component metadata.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2">
                <span className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wider">
                  SPATIAL EXPLOSION
                </span>
                <h3 className="text-sm font-semibold text-[#F4F6FA]">Configured Component Vectors</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Parts expand along configured directional vectors, maintaining clear visual separation while
                  preserving geometric alignment to parent assemblies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: MULTIPLAYER COLLABORATION & AGORA SCREEN SHARING
        ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0C1017] border border-[#8B6CFF]/30 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Users className="w-3.5 h-3.5 text-[#8B6CFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                07 // COLLABORATIVE SESSIONS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F6FA]">
              Real-Time Multi-Device Collaboration &amp; Agora Streaming
            </h2>

            <p className="text-sm sm:text-base text-[#A4ADBB] leading-relaxed max-w-3xl">
              Fiction Mech connects heterogeneous devices—including Meta Quest 3 headsets and Android companion
              tablets—into a shared interactive session. Supported user interactions are synchronized across endpoints
              in real time, eliminating the isolation of single-user VR sessions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#4D8DFF]">
                  <Radio className="w-4 h-4" />
                  <span>BIDIRECTIONAL STATE SYNCHRONIZATION</span>
                </div>
                <h3 className="text-base font-semibold text-[#F4F6FA]">Two-Way Interaction Replication</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  When a Meta Quest 3 operator selects a part, triggers an exploded view, or adjusts visibility layers,
                  the changes reflect immediately on the Android companion tablet. Symmetrically, a supervisor on
                  Android can select components or toggle views to guide the headset wearer.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8B6CFF]">
                  <Video className="w-4 h-4" />
                  <span>AGORA VIDEO SDK STREAMING</span>
                </div>
                <h3 className="text-base font-semibold text-[#F4F6FA]">Voice Channels &amp; Screen Casting</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Embedded Agora Video SDK channels provide real-time, low-latency audio communication between headset
                  wearers and remote stakeholders, along with live screen-casting capability to stream the operator’s
                  first-person spatial view to remote review sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: TECHNICAL IMPLEMENTATION & SOLE DEVELOPER CONTRIBUTIONS
        ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Cpu className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                08 // ENGINEERING CONTRIBUTIONS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
              Technical Implementation &amp; Sole Developer Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
              Every system in Fiction Mech was designed and built solely by Sahil Vaghela. Below are the core
              engineering solutions that enabled stable mobile XR performance, multi-device networking, and data-driven
              visualization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0C1017] border border-[#1E2736] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4D8DFF]">
                <ShieldCheck className="w-4 h-4" />
                <span>CROSS-PLATFORM ARCHITECTURE</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F6FA]">Decoupled Authoring vs Runtime Pipeline</h3>
              <p className="text-xs sm:text-sm text-[#A4ADBB] leading-relaxed">
                Rather than burdening mobile VR headsets with heavyweight CAD processing, the PC authoring studio
                handles model normalization, hierarchy optimization, and metadata packaging. The Quest 3 and mobile
                viewers consume pre-packaged, serialized project bundles for instant, stutter-free loading.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1017] border border-[#1E2736] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8B6CFF]">
                <Scissors className="w-4 h-4" />
                <span>SHADER ENGINEERING</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F6FA]">Single-Pass 3-Axis Shader Cross-Section</h3>
              <p className="text-xs sm:text-sm text-[#A4ADBB] leading-relaxed">
                Standard multi-pass stencil clipping techniques cause severe GPU fillrate spikes on standalone mobile
                VR chipsets. Engineered an optimized single-pass fragment discarding shader that evaluates plane
                equations for X, Y, and Z clipping in world coordinates, maintaining a solid 72+ FPS on Meta Quest 3.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1017] border border-[#1E2736] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4D8DFF]">
                <Radio className="w-4 h-4" />
                <span>STATE REPLICATION</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F6FA]">Heterogeneous Input Synchronization</h3>
              <p className="text-xs sm:text-sm text-[#A4ADBB] leading-relaxed">
                Bridged OpenXR 6DoF spatial controller raycasts, hand-tracking pinch gestures, and mobile touch events
                into an authoritative scene-state manager. Prevents command collisions during concurrent manipulation
                through explicit component-level interaction leasing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1017] border border-[#1E2736] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8B6CFF]">
                <Video className="w-4 h-4" />
                <span>AUDIO / VIDEO INTEGRATION</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F6FA]">Asynchronous Agora Video SDK Threading</h3>
              <p className="text-xs sm:text-sm text-[#A4ADBB] leading-relaxed">
                Integrated real-time Agora audio channels and video stream broadcasting while isolating media buffers
                and network callbacks from Unity's main rendering loop. Eliminates VR frame drops and micro-stutters
                during high-bandwidth collaboration.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PROJECT GALLERY & VERIFIED VIDEO DEMOS
        ========================================================================= */}
        <section id="gallery" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736]">
              <Play className="w-3.5 h-3.5 fill-[#4D8DFF] text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                09 // GENUINE PROJECT MEDIA
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
              Production Walkthrough Demos &amp; Media Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
              Genuine recordings from PC application authoring, Meta Quest 3 Mixed Reality passthrough, and
              multi-device synchronization sessions. Switch between recordings below to inspect each workflow.
            </p>
          </div>

          {/* Video Switcher Tabs */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0C1017] border border-[#1E2736] max-w-2xl">
              {videoDemos.map((demo) => {
                const active = activeVideoTab === demo.id;
                return (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => setActiveVideoTab(demo.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${
                      active
                        ? "bg-[#4D8DFF] text-[#080B10] font-semibold shadow-sm"
                        : "text-[#A4ADBB] hover:text-[#F4F6FA] hover:bg-[#151C27]"
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{demo.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Embedded Player */}
            <div className="space-y-3">
              <div className="relative w-full h-80 sm:h-[480px] md:h-[580px] rounded-2xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-[#0C1017] border border-[#1E2736]">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[#F4F6FA]">{activeVideo.title}</h3>
                  <p className="text-xs text-[#A4ADBB] max-w-2xl">{activeVideo.description}</p>
                </div>
                <a
                  href={activeVideo.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#151C27] text-[#4D8DFF] border border-[#1E2736] hover:bg-[#1E2736] transition-colors flex-shrink-0"
                >
                  <span>Open in Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Screenshot Gallery Filter Bar */}
          <div className="mt-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#F4F6FA]">Verified High-Resolution Screenshots</h3>
                <p className="text-xs text-[#778294]">
                  Click any screenshot to expand full-screen with technical metadata annotations
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#0C1017] border border-[#1E2736]">
                {[
                  { id: "all", label: `All (${galleryScreenshots.length})` },
                  { id: "pc", label: "PC Studio (9)" },
                  { id: "quest", label: "Quest 3 MR (7)" },
                  { id: "motor", label: "Motor Sync (1)" },
                ].map((cat) => {
                  const active = selectedGalleryCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedGalleryCategory(cat.id as any)}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        active
                          ? "bg-[#4D8DFF] text-[#080B10] font-semibold"
                          : "text-[#A4ADBB] hover:text-[#F4F6FA]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Screenshots Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredScreenshots.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className="group cursor-pointer rounded-xl bg-[#0C1017] border border-[#1E2736] overflow-hidden hover:border-[#4D8DFF]/60 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#080B10]">
                    <img
                      src={`${baseUrl}projects/fiction-mech/${item.filename}`}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1017] via-transparent opacity-50" />
                    <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#080B10]/80 text-[#A4ADBB] group-hover:text-[#4D8DFF] transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-semibold text-[#F4F6FA] truncate group-hover:text-[#4D8DFF] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#A4ADBB] line-clamp-2 leading-snug">
                      {item.caption}
                    </p>
                  </div>

                  <div className="px-3 pb-2.5 pt-1 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#151C27] text-[#778294] border border-[#1E2736]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: KEY TAKEAWAYS & IMPACT
        ========================================================================= */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#10151D] to-[#0C1017] border border-[#4D8DFF]/30 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151C27] border border-[#1E2736]">
                <Sparkles className="w-3.5 h-3.5 text-[#4D8DFF]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                  10 // KEY TAKEAWAYS
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F6FA]">
                Summary of Capabilities &amp; Engineering Value
              </h2>
              <p className="text-sm sm:text-base text-[#A4ADBB] max-w-3xl leading-relaxed">
                Fiction Mech demonstrates how spatial computing bridges the physical-digital divide for complex
                industrial machinery. By cleanly separating project staging from multi-device runtime inspection,
                it provides an extensible foundation for modern digital twin and collaborative maintenance workflows.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#151C27]/80 border border-[#1E2736] space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF]">
                  <Monitor className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#F4F6FA]">Separation of Concerns</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Heavy authoring tasks (geometry ingestion, PBR materials, sequence definition) remain on desktop PC,
                  allowing the mobile Quest 3 viewer to run lightweight and responsive at a solid 72+ FPS.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#151C27]/80 border border-[#1E2736] space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF]">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#F4F6FA]">Live Documentation Context</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Transforms the 3D model from a passive mesh into an interactive digital twin by attaching technical
                  PDFs, reference videos, opening tools, and layer hierarchies to individual components.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#151C27]/80 border border-[#1E2736] space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF]">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#F4F6FA]">True Cross-Device Collaboration</h3>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Bridges headset wearers and tablet users into a synchronized session with low-latency Agora voice and
                  screencasting, making remote industrial reviews practical in real-world scenarios.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#1E2736] flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#A4ADBB] hover:text-[#4D8DFF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Featured Portfolio Projects</span>
              </Link>

              <div className="flex items-center gap-3">
                <a
                  href={`${baseUrl}Sahil_Vaghela_Resume.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-mono bg-[#151C27] hover:bg-[#1E2736] text-[#F4F6FA] border border-[#1E2736] transition-colors"
                >
                  View Sahil's Resume (PDF)
                </a>
                <Link
                  to="/#contact"
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#689FFF] transition-colors"
                >
                  Contact Sahil
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal for Full-Resolution Screenshot Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#0C1017] border border-[#1E2736] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#1E2736] bg-[#10151D]">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-[#F4F6FA]">{lightboxImage.title}</h3>
                <p className="text-xs font-mono text-[#778294] uppercase tracking-wider">
                  {lightboxImage.category === "pc"
                    ? "PC Authoring Studio Capture"
                    : lightboxImage.category === "quest"
                    ? "Meta Quest 3 Mixed Reality Passthrough"
                    : "Motor Assembly Inspection"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-lg bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-[#080B10] flex items-center justify-center p-2">
              <img
                src={`${baseUrl}projects/fiction-mech/${lightboxImage.filename}`}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-4 border-t border-[#1E2736] bg-[#10151D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs text-[#A4ADBB] max-w-2xl">{lightboxImage.caption}</p>
              <div className="flex flex-wrap gap-1">
                {lightboxImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151C27] text-[#4D8DFF] border border-[#1E2736]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FictionMechCaseStudy;
