import { useState, useEffect } from "react";
import { ProjectCaseStudy } from "@/data/portfolioData";

interface ProjectTechnicalVisualProps {
  project: ProjectCaseStudy;
  variant?: "card" | "modal";
  forceSchematic?: boolean;
}

const ProjectCardSlideshow = ({
  slides,
  heightClass,
  projectTitle,
}: {
  slides: { url: string; label: string }[];
  heightClass: string;
  projectTitle: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [slides.length]);

  const resolveSrc = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `${import.meta.env.BASE_URL}${
          url.startsWith("/") ? url.slice(1) : url
        }`;

  return (
    <div
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] group`}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={resolveSrc(slide.url)}
              alt={`${projectTitle} — ${slide.label}`}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/90 via-transparent to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Dynamic current slide label badge */}
      <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-2 px-2.5 py-1 rounded bg-[#10151D]/90 border border-[#1E2736] font-mono text-[10px] shadow-lg backdrop-blur-sm transition-all duration-300">
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-500 ${
            currentIndex === 0 ? "bg-[#4D8DFF]" : "bg-[#A855F7]"
          }`}
        />
        <span className="text-[#F4F6FA] font-medium tracking-wide">
          {slides[currentIndex]?.label}
        </span>
      </div>

      {/* Progress pill dots */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#080B10]/85 border border-[#1E2736] backdrop-blur-sm">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex
                ? "w-4 bg-[#4D8DFF]"
                : "w-1.5 bg-[#4B5563] hover:bg-[#9CA3AF]"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const ProjectTechnicalVisual = ({
  project,
  variant = "card",
  forceSchematic = false,
}: ProjectTechnicalVisualProps) => {
  const heightClass =
    variant === "modal"
      ? "h-60 sm:h-72"
      : "h-48 sm:h-52";

  if (project.cardSlides && project.cardSlides.length > 0 && variant === "card") {
    return (
      <ProjectCardSlideshow
        slides={project.cardSlides}
        heightClass={heightClass}
        projectTitle={project.title}
      />
    );
  }

  if (project.mediaUrl && !forceSchematic) {
    const mediaSrc =
      project.mediaUrl.startsWith("http://") || project.mediaUrl.startsWith("https://")
        ? project.mediaUrl
        : `${import.meta.env.BASE_URL}${
            project.mediaUrl.startsWith("/") ? project.mediaUrl.slice(1) : project.mediaUrl
          }`;

    return (
      <div
        className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736]`}
      >
        <img
          src={mediaSrc}
          alt={`${project.title} — ${project.category}`}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-[#080B10] bg-tech-grid border border-[#1E2736] flex items-center justify-center p-4 select-none`}
      role="img"
      aria-label={`Technical architecture diagram for ${project.title}`}
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(77, 141, 255, 0.10) 0%, rgba(139, 108, 255, 0.04) 45%, rgba(8, 11, 16, 0) 80%)",
        }}
      />

      {/* Top-left Technical Header Tag */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10151D]/90 border border-[#1E2736]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF]" />
        <span className="font-mono text-[10px] tracking-wider uppercase text-[#A4ADBB]">
          {project.diagramType === "fiction-mech-xr" && "PC Studio ↔ Cloud ↔ XR Viewers"}
          {project.diagramType === "radicon-mr" && "Brochure Vuforia → Quest 3 MR"}
          {project.diagramType === "archviz-dxf" && "DXF Roof Tessellation"}
          {project.diagramType === "mimadim-subsystem" && "UE Subsystem Architecture"}
          {project.diagramType === "webar-uv" && "WebAR UV Processing"}
          {(project.diagramType === "pose-detection" || project.diagramType === "mediapipe-unity") && "YOLO ONNX → MediaPipe → Three.js"}
          {project.diagramType === "unity-games" && "Modular C# Systems"}
        </span>
      </div>

      {/* SVG Schematics per project */}
      {project.diagramType === "archviz-dxf" && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left: 2D DXF Floor Plan Layers */}
          <g transform="translate(18, 36)">
            <rect
              x="0"
              y="0"
              width="112"
              height="135"
              rx="6"
              fill="#10151D"
              stroke="#1E2736"
              strokeWidth="1.2"
            />
            <text x="10" y="17" fill="#778294" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              DXF_FLOORPLAN
            </text>
            {/* Outer wall contour */}
            <path
              d="M16 30 H96 V86 H62 V118 H16 Z"
              stroke="#4D8DFF"
              strokeWidth="1.8"
              fill="rgba(77,141,255,0.06)"
            />
            {/* Interior partitions */}
            <line x1="54" y1="30" x2="54" y2="86" stroke="#4D8DFF" strokeWidth="1.2" />
            <line x1="16" y1="74" x2="54" y2="74" stroke="#4D8DFF" strokeWidth="1.2" />
            {/* Extracted Windows/Doors markers */}
            <rect x="28" y="28" width="16" height="4" fill="#38BDF8" />
            <rect x="68" y="28" width="18" height="4" fill="#38BDF8" />
            <path d="M26 118 A12 12 0 0 1 38 106" stroke="#8B6CFF" strokeWidth="1.3" strokeDasharray="2 2" />
            <text x="16" y="130" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              WALLS · DOORS · WIN
            </text>
          </g>

          {/* Connector Arrow */}
          <g transform="translate(136, 94)">
            <line x1="0" y1="10" x2="36" y2="10" stroke="#4D8DFF" strokeWidth="1.4" strokeDasharray="3 3" />
            <polygon points="36,6 44,10 36,14" fill="#4D8DFF" />
            <text x="2" y="2" fill="#8B6CFF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              C++ Mesh
            </text>
          </g>

          {/* Right: 3D Procedural Roof Mesh & X-Ray Pass */}
          <g transform="translate(188, 28)">
            <rect
              x="0"
              y="0"
              width="214"
              height="152"
              rx="6"
              fill="#10151D"
              stroke="#1E2736"
              strokeWidth="1.2"
            />
            <text x="12" y="17" fill="#778294" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              UE5 C++ ROOF TESSELLATION + VR X-RAY
            </text>

            {/* Isometric Building Wireframe */}
            <polygon
              points="46,96 112,72 176,94 146,118 112,106 78,122"
              fill="rgba(77,141,255,0.08)"
              stroke="#4D8DFF"
              strokeWidth="1.3"
            />
            <line x1="46" y1="96" x2="46" y2="124" stroke="#4D8DFF" strokeWidth="1.2" />
            <line x1="78" y1="122" x2="78" y2="144" stroke="#4D8DFF" strokeWidth="1.2" />
            <line x1="146" y1="118" x2="146" y2="140" stroke="#4D8DFF" strokeWidth="1.2" />
            <line x1="176" y1="94" x2="176" y2="120" stroke="#4D8DFF" strokeWidth="1.2" />
            <polyline
              points="46,124 78,144 112,130 146,140 176,120"
              stroke="#4D8DFF"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Procedural Tessellated Roof Ridge & Triangles */}
            <polygon
              points="46,96 112,72 110,44"
              fill="rgba(139,108,255,0.16)"
              stroke="#8B6CFF"
              strokeWidth="1.4"
            />
            <polygon
              points="112,72 176,94 142,54 110,44"
              fill="rgba(139,108,255,0.12)"
              stroke="#8B6CFF"
              strokeWidth="1.4"
            />
            <polygon
              points="46,96 110,44 82,68 78,122"
              fill="rgba(139,108,255,0.20)"
              stroke="#8B6CFF"
              strokeWidth="1.4"
            />
            <line x1="110" y1="44" x2="146" y2="118" stroke="#8B6CFF" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="110" cy="44" r="3" fill="#4D8DFF" />
            <circle cx="142" cy="54" r="3" fill="#4D8DFF" />
            <circle cx="82" cy="68" r="3" fill="#8B6CFF" />
          </g>
        </svg>
      )}

      {project.diagramType === "mimadim-subsystem" && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left: Master Data Asset */}
          <g transform="translate(16, 40)">
            <rect x="0" y="0" width="114" height="130" rx="6" fill="#10151D" stroke="#4D8DFF" strokeOpacity="0.5" />
            <text x="10" y="18" fill="#4D8DFF" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              UDataAsset Registry
            </text>
            <rect x="10" y="28" width="94" height="24" rx="4" fill="#151C27" stroke="#1E2736" />
            <text x="16" y="43" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Type: Bed_Assets[]
            </text>
            <rect x="10" y="58" width="94" height="24" rx="4" fill="#151C27" stroke="#1E2736" />
            <text x="16" y="73" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Type: Parquet_Floors[]
            </text>
            <rect x="10" y="88" width="94" height="24" rx="4" fill="#151C27" stroke="#1E2736" />
            <text x="16" y="103" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Type: Wallpaper_Sets[]
            </text>
          </g>

          {/* Center: GameInstance Subsystem */}
          <g transform="translate(154, 48)">
            <rect x="0" y="0" width="112" height="114" rx="6" fill="#151C27" stroke="#8B6CFF" strokeWidth="1.4" />
            <text x="10" y="18" fill="#8B6CFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              UGameInstanceSubsystem
            </text>
            <line x1="10" y1="25" x2="102" y2="25" stroke="#1E2736" />
            <text x="10" y="42" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              + SelectActor()
            </text>
            <text x="10" y="58" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              + CacheTransform()
            </text>
            <text x="10" y="74" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              + ReplaceModel()
            </text>
            <text x="10" y="92" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              + MaterialHook()
            </text>
          </g>

          {/* Right: Transform-Preserving Actor Swap */}
          <g transform="translate(290, 40)">
            <rect x="0" y="0" width="114" height="130" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="10" y="18" fill="#778294" fontSize="8" fontFamily="JetBrains Mono, monospace">
              TRANSFORM PRESERVED
            </text>
            {/* 3D Axis Gizmo + Swapped Mesh */}
            <polygon
              points="57,46 92,64 57,82 22,64"
              fill="rgba(77,141,255,0.12)"
              stroke="#4D8DFF"
              strokeWidth="1.3"
            />
            <polygon
              points="22,64 57,82 57,108 22,90"
              fill="rgba(139,108,255,0.14)"
              stroke="#8B6CFF"
              strokeWidth="1.3"
            />
            <polygon
              points="92,64 57,82 57,108 92,90"
              fill="rgba(77,141,255,0.18)"
              stroke="#4D8DFF"
              strokeWidth="1.3"
            />
            <line x1="57" y1="82" x2="57" y2="34" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="12" y="122" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Pos · Rot · Scale = OK
            </text>
          </g>

          <line x1="130" y1="105" x2="154" y2="105" stroke="#4D8DFF" strokeWidth="1.5" />
          <line x1="266" y1="105" x2="290" y2="105" stroke="#8B6CFF" strokeWidth="1.5" />
        </svg>
      )}

      {project.diagramType === "fiction-mech-xr" && (
        <svg
          viewBox="0 0 420 200"
          className="w-full h-full max-h-[200px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Node 1: PC Authoring Studio */}
          <g transform="translate(18, 40)">
            <rect
              x="0"
              y="0"
              width="108"
              height="124"
              rx="10"
              fill="#10151D"
              stroke="#4D8DFF"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
            <text x="14" y="24" fill="#4D8DFF" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              PC Studio
            </text>
            <text x="14" y="38" fill="#778294" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              CAD Ingestion
            </text>
            {/* Minimalist Desktop Monitor Icon */}
            <rect x="22" y="48" width="64" height="42" rx="4" fill="#151C27" stroke="#4D8DFF" strokeWidth="1" />
            <polygon points="54,58 72,68 54,78 36,68" stroke="#38BDF8" strokeWidth="1.2" fill="rgba(56,189,248,0.15)" />
            <line x1="54" y1="90" x2="54" y2="98" stroke="#4D8DFF" strokeWidth="1.5" />
            <line x1="42" y1="98" x2="66" y2="98" stroke="#4D8DFF" strokeWidth="1.5" />
            <text x="54" y="112" fill="#89B2FF" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              4 Viewport Modes
            </text>
          </g>

          {/* Node 2: Cloud Sync Bridge */}
          <g transform="translate(156, 40)">
            <rect
              x="0"
              y="0"
              width="108"
              height="124"
              rx="10"
              fill="#151C27"
              stroke="#8B6CFF"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
            <text x="14" y="24" fill="#F4F6FA" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Cloud Sync
            </text>
            <text x="14" y="38" fill="#778294" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Photon &amp; Agora
            </text>
            {/* Clean Cloud & Sync Hub Icon */}
            <circle cx="54" cy="70" r="20" stroke="#8B6CFF" strokeWidth="1" strokeDasharray="3 3" fill="rgba(139,108,255,0.08)" />
            <circle cx="54" cy="70" r="10" fill="#8B6CFF" fillOpacity="0.25" stroke="#B8A1FF" strokeWidth="1.2" />
            <polygon points="54,64 60,70 54,76 48,70" fill="#38BDF8" />
            <text x="54" y="112" fill="#B8A1FF" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              State &amp; Screencast
            </text>
          </g>

          {/* Node 3: Quest 3 MR & Mobile */}
          <g transform="translate(294, 40)">
            <rect
              x="0"
              y="0"
              width="108"
              height="124"
              rx="10"
              fill="#10151D"
              stroke="#4D8DFF"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
            <text x="14" y="24" fill="#4D8DFF" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Quest 3 MR
            </text>
            <text x="14" y="38" fill="#778294" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              1:1 Passthrough
            </text>
            {/* Minimalist VR Headset Icon */}
            <rect x="22" y="52" width="64" height="34" rx="8" fill="#151C27" stroke="#4D8DFF" strokeWidth="1" />
            <circle cx="42" cy="69" r="6" stroke="#8B6CFF" strokeWidth="1.2" fill="none" />
            <circle cx="66" cy="69" r="6" stroke="#8B6CFF" strokeWidth="1.2" fill="none" />
            <text x="54" y="112" fill="#89B2FF" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              3-Axis Cross-Section
            </text>
          </g>

          {/* Pipeline Connector 1 (PC -> Cloud) */}
          <line x1="126" y1="102" x2="156" y2="102" stroke="#4D8DFF" strokeWidth="1.5" />
          <polygon points="156,99 160,102 156,105" fill="#4D8DFF" />

          {/* Pipeline Connector 2 (Cloud <-> XR) */}
          <line x1="264" y1="102" x2="294" y2="102" stroke="#8B6CFF" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="294,99 298,102 294,105" fill="#8B6CFF" />
          <polygon points="268,99 264,102 268,105" fill="#8B6CFF" />
        </svg>
      )}

      {project.diagramType === "radicon-mr" && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left: Printed Brochure & Vuforia Target */}
          <g transform="translate(18, 44)">
            <rect x="0" y="0" width="110" height="122" rx="6" fill="#10151D" stroke="#1E2736" strokeWidth="1.2" />
            <text x="10" y="18" fill="#778294" fontSize="8" fontFamily="JetBrains Mono, monospace">
              VUFORIA IMAGE TARGET
            </text>
            <rect x="18" y="32" width="74" height="60" rx="4" fill="#151C27" stroke="#4D8DFF" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="55" cy="62" r="16" stroke="#8B6CFF" strokeWidth="1.3" />
            <path d="M47 62 H63 M55 54 V70" stroke="#38BDF8" strokeWidth="1.2" />
            <text x="12" y="108" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Brochure Tracking
            </text>
          </g>

          {/* Center: Meta Quest 3 MR Passthrough & Anchoring */}
          <g transform="translate(154, 40)">
            <rect x="0" y="0" width="112" height="130" rx="8" fill="#151C27" stroke="#8B6CFF" strokeWidth="1.3" />
            <text x="10" y="19" fill="#8B6CFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              QUEST 3 PASSTHROUGH
            </text>
            <circle cx="56" cy="64" r="26" fill="rgba(77,141,255,0.08)" stroke="#4D8DFF" strokeDasharray="4 2" />
            <polygon points="56,44 76,56 76,80 56,92 36,80 36,56" stroke="#8B6CFF" strokeWidth="1.4" fill="rgba(139,108,255,0.15)" />
            <text x="12" y="110" fill="#38BDF8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Spatial Anchoring
            </text>
            <text x="12" y="122" fill="#A4ADBB" fontSize="7" fontFamily="JetBrains Mono, monospace">
              Floor &amp; Table Alignment
            </text>
          </g>

          {/* Right: 3D Gearbox Model Inspection */}
          <g transform="translate(292, 44)">
            <rect x="0" y="0" width="110" height="122" rx="6" fill="#10151D" stroke="#4D8DFF" strokeWidth="1.2" />
            <text x="10" y="18" fill="#4D8DFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              RADICON GEARBOX 3D
            </text>
            <circle cx="55" cy="60" r="22" stroke="#4D8DFF" strokeWidth="1.4" strokeDasharray="5 3" />
            <circle cx="55" cy="60" r="10" fill="rgba(77,141,255,0.2)" stroke="#8B6CFF" strokeWidth="1.4" />
            <line x1="55" y1="38" x2="55" y2="44" stroke="#4D8DFF" strokeWidth="2" />
            <line x1="55" y1="76" x2="55" y2="82" stroke="#4D8DFF" strokeWidth="2" />
            <line x1="33" y1="60" x2="39" y2="60" stroke="#4D8DFF" strokeWidth="2" />
            <line x1="71" y1="60" x2="77" y2="60" stroke="#4D8DFF" strokeWidth="2" />
            <text x="10" y="102" fill="#F4F6FA" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              1:1 Scale &amp; Dissection
            </text>
            <text x="10" y="114" fill="#778294" fontSize="7" fontFamily="JetBrains Mono, monospace">
              Stable 72 FPS Mobile XR
            </text>
          </g>

          {/* Connecting Flow Lines */}
          <line x1="128" y1="102" x2="154" y2="102" stroke="#4D8DFF" strokeWidth="1.5" />
          <line x1="266" y1="102" x2="292" y2="102" stroke="#8B6CFF" strokeWidth="1.5" />
        </svg>
      )}

      {project.diagramType === "webar-uv" && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Step 1: Skewed Physical Sheet (MindAR Tracked) */}
          <g transform="translate(16, 44)">
            <rect x="0" y="0" width="112" height="122" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="10" y="17" fill="#778294" fontSize="8" fontFamily="JetBrains Mono, monospace">
              MINDAR WEBCAM TRACK
            </text>
            <polygon
              points="28,38 88,32 98,96 16,104"
              fill="rgba(77,141,255,0.1)"
              stroke="#4D8DFF"
              strokeWidth="1.5"
            />
            {/* Corner tracking markers */}
            <circle cx="28" cy="38" r="3" fill="#38BDF8" />
            <circle cx="88" cy="32" r="3" fill="#38BDF8" />
            <circle cx="98" cy="96" r="3" fill="#38BDF8" />
            <circle cx="16" cy="104" r="3" fill="#38BDF8" />
          </g>

          {/* Step 2: Unwarped 2048x2048 UV Texture */}
          <g transform="translate(154, 44)">
            <rect x="0" y="0" width="112" height="122" rx="6" fill="#151C27" stroke="#8B6CFF" strokeWidth="1.3" />
            <text x="10" y="17" fill="#8B6CFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              2048×2048 UV MAP
            </text>
            <rect
              x="22"
              y="28"
              width="68"
              height="68"
              fill="rgba(139,108,255,0.12)"
              stroke="#8B6CFF"
              strokeWidth="1.4"
            />
            <line x1="22" y1="50" x2="90" y2="50" stroke="#8B6CFF" strokeOpacity="0.35" />
            <line x1="22" y1="74" x2="90" y2="74" stroke="#8B6CFF" strokeOpacity="0.35" />
            <line x1="45" y1="28" x2="45" y2="96" stroke="#8B6CFF" strokeOpacity="0.35" />
            <line x1="68" y1="28" x2="68" y2="96" stroke="#8B6CFF" strokeOpacity="0.35" />
            <text x="16" y="112" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Homography Unwarp
            </text>
          </g>

          {/* Step 3: Animated 3D Model in Three.js */}
          <g transform="translate(292, 44)">
            <rect x="0" y="0" width="112" height="122" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="10" y="17" fill="#4D8DFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              THREE.JS 3D MODEL
            </text>
            <polygon
              points="56,30 88,54 74,94 38,94 24,54"
              fill="rgba(77,141,255,0.16)"
              stroke="#4D8DFF"
              strokeWidth="1.4"
            />
            <polyline points="24,54 56,66 88,54" stroke="#8B6CFF" strokeWidth="1.2" />
            <line x1="56" y1="30" x2="56" y2="94" stroke="#8B6CFF" strokeWidth="1.2" />
            <text x="14" y="112" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Live Textured Mesh
            </text>
          </g>

          <line x1="128" y1="105" x2="154" y2="105" stroke="#4D8DFF" strokeWidth="1.5" />
          <line x1="266" y1="105" x2="292" y2="105" stroke="#8B6CFF" strokeWidth="1.5" />
        </svg>
      )}

      {(project.diagramType === "pose-detection" || project.diagramType === "mediapipe-unity") && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Step 1: Camera & YOLO11n Vest Isolation */}
          <g transform="translate(14, 38)">
            <rect x="0" y="0" width="116" height="132" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="8" y="17" fill="#4D8DFF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              YOLO11 ONNX (WEBGPU)
            </text>
            <rect x="15" y="28" width="86" height="80" rx="4" fill="#080B10" stroke="#1E2736" strokeDasharray="3 2" />
            <rect x="33" y="44" width="50" height="46" rx="3" fill="rgba(77,141,255,0.15)" stroke="#22C55E" strokeWidth="1.6" />
            <text x="36" y="40" fill="#22C55E" fontSize="7" fontFamily="JetBrains Mono, monospace">
              VEST: 0.94
            </text>
            <text x="8" y="122" fill="#778294" fontSize="7" fontFamily="JetBrains Mono, monospace">
              Patient ROI Isolation
            </text>
          </g>

          {/* Flow Line 1 */}
          <line x1="130" y1="104" x2="150" y2="104" stroke="#4D8DFF" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Step 2: MediaPipe 33-Landmark Pose on Cropped ROI */}
          <g transform="translate(150, 38)">
            <rect x="0" y="0" width="116" height="132" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="8" y="17" fill="#8B6CFF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              MEDIAPIPE POSE (60FPS)
            </text>
            {/* Skeletal wireframe */}
            <circle cx="58" cy="36" r="6" stroke="#38BDF8" strokeWidth="1.4" />
            <line x1="58" y1="42" x2="58" y2="76" stroke="#8B6CFF" strokeWidth="1.6" />
            <line x1="34" y1="52" x2="82" y2="52" stroke="#8B6CFF" strokeWidth="1.6" />
            <line x1="34" y1="52" x2="26" y2="70" stroke="#4D8DFF" strokeWidth="1.4" />
            <line x1="82" y1="52" x2="90" y2="40" stroke="#4D8DFF" strokeWidth="1.4" />
            <line x1="58" y1="76" x2="44" y2="104" stroke="#8B6CFF" strokeWidth="1.6" />
            <line x1="58" y1="76" x2="74" y2="100" stroke="#38BDF8" strokeWidth="1.6" />
            <circle cx="34" cy="52" r="2.5" fill="#4D8DFF" />
            <circle cx="82" cy="52" r="2.5" fill="#4D8DFF" />
            <circle cx="58" cy="76" r="2.5" fill="#8B6CFF" />
            <circle cx="44" cy="104" r="2.5" fill="#4D8DFF" />
            <circle cx="74" cy="100" r="3" fill="#38BDF8" />
            <text x="8" y="122" fill="#778294" fontSize="7" fontFamily="JetBrains Mono, monospace">
              33 Landmark Vectors
            </text>
          </g>

          {/* Flow Line 2 */}
          <line x1="266" y1="104" x2="286" y2="104" stroke="#8B6CFF" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Step 3: Pure Three.js 3D Games */}
          <g transform="translate(286, 38)">
            <rect x="0" y="0" width="118" height="132" rx="6" fill="#151C27" stroke="#4D8DFF" strokeWidth="1.2" />
            <text x="8" y="17" fill="#4D8DFF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              THREE.JS 3D GAMES
            </text>
            <rect x="8" y="28" width="102" height="38" rx="4" fill="#10151D" stroke="#1E2736" />
            <text x="14" y="44" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Endless Runner
            </text>
            <text x="14" y="56" fill="#A4ADBB" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              Lane Jump &amp; Dodge
            </text>

            <rect x="8" y="70" width="102" height="38" rx="4" fill="#10151D" stroke="#1E2736" />
            <text x="14" y="86" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Car Traffic Dodge
            </text>
            <text x="14" y="98" fill="#A4ADBB" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              Lean Steering @ 60FPS
            </text>
            <text x="8" y="122" fill="#22C55E" fontSize="7" fontFamily="JetBrains Mono, monospace">
              100% In-Browser 3D
            </text>
          </g>
        </svg>
      )}

      {project.diagramType === "unity-games" && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(18, 44)">
            <rect x="0" y="0" width="118" height="120" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="10" y="20" fill="#4D8DFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              TURBO TRAIL
            </text>
            <path
              d="M18 92 Q 56 36, 98 76"
              stroke="#4D8DFF"
              strokeWidth="2.2"
              fill="none"
            />
            <circle cx="88" cy="68" r="7" fill="#8B6CFF" />
            <text x="10" y="108" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Dynamic Trail Shield
            </text>
          </g>

          <g transform="translate(151, 44)">
            <rect x="0" y="0" width="118" height="120" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="10" y="20" fill="#8B6CFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              CUPPING MUFFINS
            </text>
            <rect x="36" y="68" width="46" height="24" rx="4" stroke="#8B6CFF" strokeWidth="1.5" fill="rgba(139,108,255,0.12)" />
            <circle cx="48" cy="46" r="4.5" fill="#4D8DFF" />
            <circle cx="70" cy="38" r="4.5" fill="#38BDF8" />
            <text x="10" y="108" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Multi-Theme Systems
            </text>
          </g>

          <g transform="translate(284, 44)">
            <rect x="0" y="0" width="118" height="120" rx="6" fill="#151C27" stroke="#4D8DFF" strokeOpacity="0.6" />
            <text x="10" y="20" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace">
              CATCH THE OBJECT
            </text>
            <text x="10" y="34" fill="#F4F6FA" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Role: Sole Developer
            </text>
            <path d="M34 74 H84 L76 92 H42 Z" stroke="#4D8DFF" strokeWidth="1.5" fill="rgba(77,141,255,0.15)" />
            <circle cx="59" cy="52" r="5" fill="#38BDF8" />
            <text x="10" y="108" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Full Solo Production
            </text>
          </g>
        </svg>
      )}
    </div>
  );
};
