import { ProjectCaseStudy } from "@/data/portfolioData";

interface ProjectTechnicalVisualProps {
  project: ProjectCaseStudy;
  variant?: "card" | "modal";
}

export const ProjectTechnicalVisual = ({
  project,
  variant = "card",
}: ProjectTechnicalVisualProps) => {
  const heightClass =
    variant === "modal"
      ? "h-60 sm:h-72"
      : "h-48 sm:h-52";

  if (project.mediaUrl) {
    return (
      <div
        className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736]`}
      >
        <img
          src={project.mediaUrl}
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
          {project.diagramType === "fiction-mech-xr" && "QUEST 3 <-> ANDROID XR SYNC"}
          {project.diagramType === "radicon-mr" && "BROCHURE VUFORIA -> QUEST 3 MR"}
          {project.diagramType === "archviz-dxf" && "DXF / C++ ROOF TESSELLATION"}
          {project.diagramType === "mimadim-subsystem" && "UE DATA ASSET -> SUBSYSTEM"}
          {project.diagramType === "webar-uv" && "2048×2048 WEBAR UV UNWARP"}
          {project.diagramType === "mediapipe-unity" && "MEDIAPIPE -> UNITY C# STREAM"}
          {project.diagramType === "unity-games" && "MODULAR C# GAMEPLAY SYSTEMS"}
        </span>
      </div>

      {/* Bottom-right Honest Badge */}
      <div className="absolute bottom-2.5 right-3 z-10 px-2 py-0.5 rounded bg-[#10151D]/85 border border-[#1E2736] font-mono text-[10px] text-[#778294]">
        System Schematic
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
              Type: Sofa_Assets[]
            </text>
            <rect x="10" y="58" width="94" height="24" rx="4" fill="#151C27" stroke="#1E2736" />
            <text x="16" y="73" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Type: Table_Assets[]
            </text>
            <rect x="10" y="88" width="94" height="24" rx="4" fill="#151C27" stroke="#1E2736" />
            <text x="16" y="103" fill="#F4F6FA" fontSize="8" fontFamily="JetBrains Mono, monospace">
              Type: Lamp_Assets[]
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
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Node: Meta Quest 3 */}
          <g transform="translate(18, 46)">
            <rect x="0" y="0" width="110" height="118" rx="8" fill="#10151D" stroke="#4D8DFF" strokeWidth="1.3" />
            <text x="12" y="20" fill="#4D8DFF" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              META QUEST 3
            </text>
            <text x="12" y="34" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Unity + OpenXR 6DoF
            </text>
            <rect x="18" y="48" width="74" height="36" rx="14" fill="#151C27" stroke="#4D8DFF" />
            <circle cx="40" cy="66" r="7" stroke="#8B6CFF" strokeWidth="1.3" />
            <circle cx="70" cy="66" r="7" stroke="#8B6CFF" strokeWidth="1.3" />
            <text x="12" y="104" fill="#778294" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              VR Spatial Control
            </text>
          </g>

          {/* Center Bridge: Two-Way Sync + Agora SDK */}
          <g transform="translate(152, 38)">
            <rect x="0" y="0" width="116" height="134" rx="8" fill="#151C27" stroke="#8B6CFF" strokeWidth="1.3" />
            <text x="12" y="19" fill="#F4F6FA" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              SHARED 3D STATE
            </text>
            <circle cx="58" cy="66" r="24" fill="rgba(77,141,255,0.1)" stroke="#4D8DFF" strokeDasharray="4 2" />
            <polygon
              points="58,48 74,58 74,74 58,84 42,74 42,58"
              stroke="#8B6CFF"
              strokeWidth="1.5"
              fill="rgba(139,108,255,0.18)"
            />
            <text x="14" y="108" fill="#38BDF8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Agora Video/Voice
            </text>
            <text x="14" y="121" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              2-Way Transform Sync
            </text>
          </g>

          {/* Right Node: Android Device */}
          <g transform="translate(292, 46)">
            <rect x="0" y="0" width="110" height="118" rx="8" fill="#10151D" stroke="#4D8DFF" strokeWidth="1.3" />
            <text x="12" y="20" fill="#4D8DFF" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              ANDROID CLIENT
            </text>
            <text x="12" y="34" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Touch Control &amp; View
            </text>
            <rect x="24" y="46" width="62" height="40" rx="5" fill="#151C27" stroke="#8B6CFF" />
            <polygon points="55,54 66,66 55,78 44,66" fill="rgba(77,141,255,0.3)" stroke="#4D8DFF" />
            <text x="12" y="104" fill="#778294" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Remote Manipulation
            </text>
          </g>

          {/* Bidirectional Arrows */}
          <line x1="128" y1="92" x2="152" y2="92" stroke="#4D8DFF" strokeWidth="1.6" />
          <line x1="128" y1="112" x2="152" y2="112" stroke="#8B6CFF" strokeWidth="1.6" strokeDasharray="3 2" />
          <line x1="268" y1="92" x2="292" y2="92" stroke="#4D8DFF" strokeWidth="1.6" />
          <line x1="268" y1="112" x2="292" y2="112" stroke="#8B6CFF" strokeWidth="1.6" strokeDasharray="3 2" />
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

      {project.diagramType === "mediapipe-unity" && (
        <svg
          viewBox="0 0 420 210"
          className="w-full h-full max-h-[210px] relative z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left: MediaPipe Pose Landmarks */}
          <g transform="translate(20, 38)">
            <rect x="0" y="0" width="146" height="134" rx="6" fill="#10151D" stroke="#1E2736" />
            <text x="12" y="18" fill="#4D8DFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              PYTHON MEDIAPIPE POSE
            </text>
            {/* Skeletal nodes */}
            <circle cx="73" cy="36" r="6" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="73" y1="42" x2="73" y2="78" stroke="#4D8DFF" strokeWidth="1.6" />
            <line x1="46" y1="54" x2="100" y2="54" stroke="#4D8DFF" strokeWidth="1.6" />
            <line x1="46" y1="54" x2="36" y2="74" stroke="#8B6CFF" strokeWidth="1.5" />
            <line x1="100" y1="54" x2="110" y2="40" stroke="#8B6CFF" strokeWidth="1.5" />
            <line x1="73" y1="78" x2="54" y2="112" stroke="#4D8DFF" strokeWidth="1.6" />
            <line x1="73" y1="78" x2="96" y2="106" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="46" cy="54" r="3" fill="#4D8DFF" />
            <circle cx="100" cy="54" r="3" fill="#4D8DFF" />
            <circle cx="73" cy="78" r="3" fill="#8B6CFF" />
            <circle cx="54" cy="112" r="3" fill="#4D8DFF" />
            <circle cx="96" cy="106" r="3.5" fill="#38BDF8" />
          </g>

          {/* Stream Arrow */}
          <g transform="translate(174, 92)">
            <line x1="0" y1="12" x2="64" y2="12" stroke="#4D8DFF" strokeWidth="1.6" strokeDasharray="4 3" />
            <polygon points="64,8 72,12 64,16" fill="#4D8DFF" />
            <text x="6" y="4" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Landmark Stream
            </text>
          </g>

          {/* Right: Unity Gameplay Controllers */}
          <g transform="translate(254, 38)">
            <rect x="0" y="0" width="146" height="134" rx="6" fill="#151C27" stroke="#8B6CFF" strokeWidth="1.3" />
            <text x="12" y="18" fill="#8B6CFF" fontSize="8" fontFamily="JetBrains Mono, monospace">
              UNITY C# CONTROLLERS
            </text>
            <rect x="12" y="30" width="122" height="42" rx="5" fill="#10151D" stroke="#1E2736" />
            <text x="20" y="47" fill="#F4F6FA" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              Alien Runner
            </text>
            <text x="20" y="61" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Full-Body Gesture Input
            </text>

            <rect x="12" y="80" width="122" height="42" rx="5" fill="#10151D" stroke="#1E2736" />
            <text x="20" y="97" fill="#F4F6FA" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
              Football Cup
            </text>
            <text x="20" y="111" fill="#A4ADBB" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              Leg-Tracking Kick Vector
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
