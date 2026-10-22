import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Wrench,
  GitBranch,
  FileCode2,
  Sparkles,
  Play,
  Monitor,
  Glasses,
  Users,
  Radio,
} from "lucide-react";
import {
  featuredProjects,
  additionalProjects,
  ProjectCaseStudy,
} from "@/data/portfolioData";
import { ProjectTechnicalVisual } from "@/components/ProjectTechnicalVisual";

const filterCategories = [
  { id: "all", label: "All Featured (7)" },
  { id: "xr-multiuser", label: "XR & Multiuser (2)" },
  { id: "archviz-unreal", label: "Unreal & Archviz (2)" },
  { id: "web3d-ar", label: "WebAR & Three.js (1)" },
  { id: "cv-games", label: "CV & Unity Games (2)" },
];

const getEmbedVideoUrl = (url?: string): string | null => {
  if (!url) return null;
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0`;
  }
  return url;
};

const isEmbedIframe = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.includes("drive.google.com") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
};

export const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeCaseStudy, setActiveCaseStudy] =
    useState<ProjectCaseStudy | null>(null);
  const [activeMediaView, setActiveMediaView] = useState<"video" | "schematic">(
    "video"
  );
  const [activeModalVideoUrl, setActiveModalVideoUrl] = useState<string | null>(null);

  const currentVideoUrl = activeCaseStudy
    ? activeModalVideoUrl || activeCaseStudy.videoUrl
    : undefined;

  const visibleProjects =
    selectedFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.filterGroup === selectedFilter);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 border-b border-[#1E2736]"
    >
      {/* Legacy anchor compatibility */}
      <div id="portfolio" className="absolute -top-20" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736] mb-4">
                <Layers className="w-3.5 h-3.5 text-[#4D8DFF]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                  ENGINEERING CASE STUDIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F6FA]">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-[#A4ADBB] text-base sm:text-lg mt-3 max-w-2xl">
                Real-time 3D applications, cross-device XR platforms, procedural geometry systems, and game mechanics. Inspect any project to explore architecture, responsibilities, and technical outcomes.
              </p>
            </div>

            {/* Filter Bar */}
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects by technical domain"
            >
              {filterCategories.map((cat) => {
                const active = selectedFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedFilter(cat.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] ${
                      active
                        ? "bg-[#4D8DFF] text-[#080B10] font-semibold"
                        : "bg-[#10151D] text-[#A4ADBB] border border-[#1E2736] hover:bg-[#151C27] hover:text-[#F4F6FA]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Uniform Projects Grid (All Projects Share the Exact Same Card Representation) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => {
              const isMainProject = project.id === "fiction-mech";
              const isWorkedAlone =
                project.ownershipScope === "Sole Developer (Worked Alone)" ||
                project.id === "radicon-powerbuild-xr";

              return (
                <article
                  key={project.id}
                  className={`surface-card surface-card-interactive rounded-2xl p-6 flex flex-col justify-between group relative transition-all duration-300 ${
                    isMainProject
                      ? "border-[#4D8DFF]/60 ring-1 ring-[#4D8DFF]/30 shadow-[0_0_32px_-12px_rgba(77,141,255,0.35)] bg-gradient-to-b from-[#151C27] to-[#10151D]"
                      : ""
                  }`}
                >
                  <div>
                    {/* Consistent Thumbnail / System Schematic across all cards */}
                    <div className="mb-5">
                      <ProjectTechnicalVisual project={project} />
                    </div>

                    {/* Category & Ownership Scope */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold text-[#4D8DFF] flex items-center gap-1.5">
                        {isMainProject && <span className="text-amber-400">★</span>}
                        0{project.priorityRank} // {project.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {project.videoUrl && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#4D8DFF]/15 text-[#89B2FF] border border-[#4D8DFF]/30">
                            <Play className="w-2.5 h-2.5 fill-[#89B2FF]" />
                            Video
                          </span>
                        )}
                        <span
                          className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${
                            isMainProject
                              ? "bg-[#4D8DFF]/15 text-[#89B2FF] border-[#4D8DFF]/40 font-semibold"
                              : isWorkedAlone
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                : "bg-[#151C27] text-[#A4ADBB] border-[#1E2736]"
                          }`}
                        >
                          {isMainProject
                            ? "Main Project · Sole Developer"
                            : isWorkedAlone
                              ? "Worked Alone"
                              : project.ownershipScope === "Sole Developer"
                                ? "Sole Developer"
                                : project.ownershipScope === "Solo & Team Contributions"
                                  ? "Solo & Team"
                                  : "Team Contributor"}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#F4F6FA] mb-1 group-hover:text-[#4D8DFF] transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    {project.subtitle && (
                      <p className="text-xs font-mono text-[#778294] mb-3 line-clamp-1">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-[#A4ADBB] leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Key Highlights */}
                    <ul className="space-y-1.5 mb-5">
                      {project.highlights.slice(0, 3).map((hl, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#A4ADBB]"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isMainProject ? "bg-[#4D8DFF]" : "bg-[#8B6CFF]"
                            }`}
                          />
                          <span className="line-clamp-2">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer: Tech Tags + Case Study Trigger */}
                  <div className="pt-4 border-t border-[#1E2736] space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#080B10] text-[#A4ADBB] border border-[#1E2736]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveCaseStudy(project);
                        setActiveMediaView(project.videoUrl ? "video" : "schematic");
                        setActiveModalVideoUrl(project.videoUrl || null);
                      }}
                      className={`w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] ${
                        isMainProject
                          ? "bg-[#4D8DFF] text-[#080B10] font-semibold hover:bg-[#89B2FF]"
                          : "bg-[#151C27] text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/50 hover:bg-[#1E2736]"
                      }`}
                    >
                      <span>Check in Details</span>
                      <ArrowUpRight
                        className={`w-4 h-4 ${
                          isMainProject ? "text-[#080B10]" : "text-[#4D8DFF]"
                        }`}
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Secondary Archive: Additional XR, Client & Prototype Projects */}
          <div className="mt-16 pt-12 border-t border-[#1E2736]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#F4F6FA]">
                  Additional XR, Client &amp; Browser 3D Work
                </h3>
                <p className="text-sm text-[#778294]">
                  Earlier AR/MR client deliveries and browser-based 3D prototypes
                </p>
              </div>
              <span className="font-mono text-xs text-[#778294]">
                ARCHIVE // {additionalProjects.length} PROJECTS
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {additionalProjects.map((item) => (
                <div
                  key={item.id}
                  className="surface-card rounded-xl p-5 flex flex-col justify-between bg-[#0C1017]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-[#8B6CFF]">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#151C27] text-[#A4ADBB] border border-[#1E2736]">
                        {item.role}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-[#F4F6FA] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#A4ADBB] leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1E2736]/80">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#10151D] text-[#778294] border border-[#1E2736]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 9-Section Engineering Case Study Modal */}
      <Dialog
        open={!!activeCaseStudy}
        onOpenChange={(open) => !open && setActiveCaseStudy(null)}
      >
        <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#10151D] border border-[#1E2736] text-[#F4F6FA] p-4 sm:p-6 sm:p-8">
          {activeCaseStudy && (
            <>
              <DialogHeader className="space-y-3 border-b border-[#1E2736] pb-5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#4D8DFF]/15 text-[#4D8DFF] border border-[#4D8DFF]/30">
                    CASE STUDY 0{activeCaseStudy.priorityRank}
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#151C27] text-[#A4ADBB] border border-[#1E2736]">
                    {activeCaseStudy.category}
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#8B6CFF]/15 text-[#F4F6FA] border border-[#8B6CFF]/30">
                    {activeCaseStudy.ownershipScope}
                  </span>
                </div>

                <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#F4F6FA]">
                  {activeCaseStudy.title}
                </DialogTitle>

                <DialogDescription className="text-sm text-[#A4ADBB]">
                  {activeCaseStudy.subtitle || activeCaseStudy.shortDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 pt-4 text-left">
                {/* Visual / Technical Architecture Schematic / Demo Video */}
                <div className="space-y-3">
                  {activeCaseStudy.videoUrl ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5 fill-[#4D8DFF]" />
                            {activeMediaView === "video"
                              ? "Live Production Video Demo"
                              : "System Architecture Schematic"}
                          </h4>
                        </div>
                        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0C1017] border border-[#1E2736]">
                          <button
                            type="button"
                            onClick={() => setActiveMediaView("video")}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors ${
                              activeMediaView === "video"
                                ? "bg-[#4D8DFF] text-[#080B10] font-semibold shadow-sm"
                                : "text-[#A4ADBB] hover:text-[#F4F6FA]"
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Video Demo</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveMediaView("schematic")}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                              activeMediaView === "schematic"
                                ? "bg-[#4D8DFF] text-[#080B10] font-semibold shadow-sm"
                                : "text-[#A4ADBB] hover:text-[#F4F6FA]"
                            }`}
                          >
                            <span>Schematic</span>
                          </button>
                        </div>
                      </div>

                      {activeCaseStudy.additionalVideos &&
                        activeCaseStudy.additionalVideos.length > 0 &&
                        activeMediaView === "video" && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] font-mono text-[#778294] uppercase tracking-wider mr-1">
                              Walkthrough:
                            </span>
                            {activeCaseStudy.additionalVideos.map((vid, idx) => {
                              const isSelected =
                                currentVideoUrl === vid.url;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setActiveModalVideoUrl(vid.url)}
                                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                                    isSelected
                                      ? "bg-[#4D8DFF] text-[#080B10] font-semibold border-[#4D8DFF]"
                                      : "bg-[#0C1017] text-[#A4ADBB] border-[#1E2736] hover:text-[#F4F6FA] hover:border-[#4D8DFF]/40"
                                  }`}
                                >
                                  {vid.label}
                                </button>
                              );
                            })}
                            {currentVideoUrl && isEmbedIframe(currentVideoUrl) && (
                              <a
                                href={currentVideoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono text-[#89B2FF] hover:bg-[#4D8DFF]/10 transition-colors border border-[#4D8DFF]/30 ml-auto"
                              >
                                <span>Open Drive ↗</span>
                              </a>
                            )}
                          </div>
                        )}

                      {activeMediaView === "video" ? (
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
                              src={currentVideoUrl}
                              controls
                              playsInline
                              className="w-full h-full object-contain bg-black"
                            />
                          )}
                        </div>
                      ) : (
                        <ProjectTechnicalVisual
                          project={activeCaseStudy}
                          variant="modal"
                        />
                      )}

                      <p className="text-xs font-mono text-[#778294]">
                        {activeMediaView === "video"
                          ? activeCaseStudy.additionalVideos?.find(
                              (v) =>
                                v.url === currentVideoUrl
                            )?.label
                            ? `Displaying: ${
                                activeCaseStudy.additionalVideos.find(
                                  (v) =>
                                    v.url === currentVideoUrl
                                )?.label
                              } demo walkthrough.`
                            : "Interactive recording from Meta Quest 3 and Android cross-device production session."
                          : activeCaseStudy.mediaCaption}
                      </p>
                    </div>
                  ) : (
                    <>
                      <ProjectTechnicalVisual
                        project={activeCaseStudy}
                        variant="modal"
                      />
                      <p className="text-xs font-mono text-[#778294]">
                        {activeCaseStudy.mediaCaption}
                      </p>
                    </>
                  )}
                </div>

                {activeCaseStudy.id === "fiction-mech" ? (
                  <div className="space-y-6 pt-1 text-left">
                    {/* 1. High-Signal System Overview & Sole Developer Attribution */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#151C27] via-[#10151D] to-[#0C1017] border border-[#1E2736] space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4D8DFF]/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4D8DFF]" />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#89B2FF]">
                            ARCHITECTURAL OVERVIEW · SOLE DEVELOPER
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#778294] px-2.5 py-0.5 rounded bg-[#080B10] border border-[#1E2736]">
                          100% Architecture &amp; Delivery
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#F4F6FA] tracking-tight">
                          Dual-Component Industrial 3D Visualization &amp; Multi-Device XR Collaboration
                        </h4>
                        <p className="text-xs sm:text-sm text-[#A4ADBB] mt-2 leading-relaxed">
                          Fiction Mech is a comprehensive industrial 3D model visualization, mechanical analysis, and cross-device collaboration platform engineered 100% by Sahil Vaghela as sole developer. The ecosystem bridges CAD preparation and runtime spatial inspection: engineering teams ingest CAD models and author rich metadata in the PC Windows Studio, then deploy seamlessly to standalone Meta Quest 3 headsets (featuring 1:1 room/tabletop passthrough, 6DoF hand tracking, and 3-axis shader cross-sectioning) and Android companion devices with bidirectional real-time state synchronization and Agora low-latency voice/video streaming.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1E2736]/60">
                        <span className="text-[11px] font-mono text-[#778294]">Core System Pillars:</span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#89B2FF] border border-[#1E2736]">
                          PC Windows Studio
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#B8A1FF] border border-[#1E2736]">
                          Meta Quest 3 MR (OpenXR)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-emerald-400 border border-[#1E2736]">
                          Android Companion Touch
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-amber-400 border border-[#1E2736]">
                          Agora RTC Networking
                        </span>
                      </div>
                    </div>

                    {/* 2. Key Specifications Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Developer Scope</div>
                          <div className="text-sm sm:text-base font-bold text-[#4D8DFF]">Sole Developer</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">100% Architecture &amp; Delivery</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          CAD ingestion, C# systems, HLSL shaders, state replication &amp; Agora RTC.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Target Runtimes</div>
                          <div className="text-sm sm:text-base font-bold text-[#F4F6FA]">PC · Quest 3 · Android</div>
                          <div className="text-xs font-medium text-[#89B2FF] mt-0.5">Cross-Device Ecosystem</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Native Windows authoring, standalone OpenXR APK, and touch mobile client.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Networking &amp; Voice</div>
                          <div className="text-sm sm:text-base font-bold text-emerald-400">Agora RTC SDK</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Sub-100ms Sync &amp; Voice</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Deterministic command replication + low-latency spatial audio &amp; spectator casting.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">VR Performance</div>
                          <div className="text-sm sm:text-base font-bold text-amber-400">72+ FPS Standalone</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Snapdragon XR2 Gen 2</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Single-pass fragment discard clipping shader eliminating stencil fill-rate overhead.
                        </div>
                      </div>
                    </div>

                    {/* 3. Industrial Uses & Practical Workflows */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-[#4D8DFF]" />
                          <span>Industrial Uses &amp; Practical Workflows</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#778294] px-2 py-0.5 rounded bg-[#10151D] border border-[#1E2736]">
                          4 Production Scenarios
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3.5">
                        {/* Use 1 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                <Wrench className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  1. Assembly &amp; Maintenance Training
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">SOP Guidance &amp; Step Sequencing</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                              Interactive SOP
                            </span>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Interactive step-by-step disassembly sequence playback with continuous timeline scrubbing. Trainees inspect mechanical hierarchy in 1:1 true scale, pull up attached component PDF schematics (such as <code className="text-[#89B2FF]">sensors.pdf</code>), and review embedded video demonstrations directly in spatial context before touching physical machinery.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Exploded View Slider</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Attached PDF Schematics</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Step Playback</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Disassembly Guidance</span>
                          </div>
                        </div>

                        {/* Use 2 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                                <Layers className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  2. Engineering Design &amp; Tolerance Review
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">3-Axis Dynamic Cross-Section</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#B8A1FF] border border-[#1E2736]">
                              CAD Validation
                            </span>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Real-time 3-axis (X, Y, Z) internal cross-section clipping allows multi-disciplinary engineering teams to inspect internal clearances, fluid channels, and nested tolerances without expensive physical sectioning. Subsystem layer toggles isolate containers, plates, fins, flaps, turbine hulls, and pistons with interactive 3D RGB gizmos.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">3-Axis RGB Cutting</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">3D Coordinate Gizmo</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Subsystem Layer Deck</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Tolerance Verification</span>
                          </div>
                        </div>

                        {/* Use 3 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                <Users className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  3. Field-Worker to Remote Supervisor Collaboration
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">Spatial XR to Mobile Tablet Sync</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-emerald-400 border border-[#1E2736]">
                              Agora RTC
                            </span>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Synchronized multi-device collaboration. A frontline technician wearing Meta Quest 3 in the field shares their real-time spatial perspective and model state with an offsite supervisor using an Android tablet. Both users manipulate exploded views, highlight parts with cyan outlines, and converse over low-latency Agora voice channels.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Bidirectional State Sync</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Low-Latency Agora Audio</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Spectator Streaming</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Shared Part Highlights</span>
                          </div>
                        </div>

                        {/* Use 4 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                <Play className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  4. Interactive Technical Catalogs &amp; Media Export
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">Automated Turntable &amp; Green Screen</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-amber-400 border border-[#1E2736]">
                              1080p MP4 Rec
                            </span>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            The PC Authoring Studio provides an automated 360° turntable presentation mode with integrated Green Screen (Chroma Key) backdrop and built-in 1080p MP4 recording. Marketing and sales teams generate high-resolution product demonstration videos and interactive Web/XR manifests directly from engineering CAD models without external DCC suites.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">360° Turntable Mode</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Chroma Key Green Screen</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">1080p MP4 Recorder</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">Cloud Package Export</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Technical Analysis & System Architecture */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF] flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#8B6CFF]" />
                          <span>Technical Analysis &amp; System Architecture</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#778294] px-2 py-0.5 rounded bg-[#10151D] border border-[#1E2736]">
                          Deep-Dive Implementation
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3.5">
                        {/* Analysis 1 */}
                        <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                <Monitor className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  1. PC CAD Ingestion &amp; PBR Shader Generator
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">Windows Explorer &amp; Dynamic Shaders</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Dynamic file ingestion for FBX and OBJ models through Windows Explorer file dialogs with automated scene tree generation. Features an in-engine PBR material authoring suite with copper, gold, and silver presets plus continuous Hue, Saturation, Luminance, and Alpha sliders with instant viewport feedback, saving serialized manifests to backend storage.
                          </p>
                          <div className="pt-2 border-t border-[#1E2736]/60">
                            <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Architecture &amp; Subsystems:</div>
                            <p className="text-[11px] font-mono text-[#89B2FF] leading-snug">
                              Windows File Explorer API · Dynamic Mesh Importer · Custom HLSL PBR Shader Suite · JSON Metadata Serialization
                            </p>
                          </div>
                        </div>

                        {/* Analysis 2 */}
                        <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                <Cpu className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  2. Standalone Quest 3 Snapdragon XR2 Gen 2 Optimization
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">72+ FPS Single-Pass Fragment Discard</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Industrial models contain dense geometric meshes that easily bottleneck standalone VR tile memory. Rather than relying on multi-pass stencil buffer slicing which overwhelms mobile GPU bandwidth, implemented a custom single-pass fragment discard clipping shader (<code className="text-amber-400 font-mono">clip()</code> in HLSL) using world-space bounding planes. Achieves zero stencil overhead and stable 72+ FPS.
                          </p>
                          <div className="pt-2 border-t border-[#1E2736]/60">
                            <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Architecture &amp; Subsystems:</div>
                            <p className="text-[11px] font-mono text-amber-400 leading-snug">
                              HLSL Fragment Discard (clip) · Single-Pass Stereo Instanced · Mobile Tile Memory Optimization · Fixed Foveated Rendering
                            </p>
                          </div>
                        </div>

                        {/* Analysis 3 */}
                        <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                                <GitBranch className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  3. Deterministic Cross-Platform State Sync
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">Quest 3 OpenXR 6DoF &lt;--&gt; Android Touch</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Bridges divergent input paradigms—OpenXR 6DoF hand tracking and raycast controllers on Quest 3 versus multi-touch gestures on Android. Employs a deterministic command-queue replication model that transmits part IDs, transform matrices, disassembly progress, and clipping plane coordinates with conflict resolution to ensure synchronized states without race conditions.
                          </p>
                          <div className="pt-2 border-t border-[#1E2736]/60">
                            <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Architecture &amp; Subsystems:</div>
                            <p className="text-[11px] font-mono text-[#B8A1FF] leading-snug">
                              Deterministic Command Pattern · Binary Delta Serialization · Shared-Authority Controller · Touch-to-Spatial Raycast Mapping
                            </p>
                          </div>
                        </div>

                        {/* Analysis 4 */}
                        <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2736] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                <Radio className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[#F4F6FA]">
                                  4. Low-Latency Agora RTC Audio &amp; Screen Streaming
                                </h5>
                                <span className="text-[10px] font-mono text-[#778294]">Decoupled Background Socket Threads</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#A4ADBB] leading-relaxed">
                            Native integration of Agora RTC C# SDK into the Unity runtime. Decoupled audio packet encoding and network socket polling from Unity&apos;s main render loop onto high-priority background worker threads to prevent frame drops in VR. Delivers sub-100ms bidirectional voice communication, secure token authentication, and spectator screen casting to remote tablets.
                          </p>
                          <div className="pt-2 border-t border-[#1E2736]/60">
                            <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Architecture &amp; Subsystems:</div>
                            <p className="text-[11px] font-mono text-emerald-400 leading-snug">
                              Agora RTC C# Native Plugin · Non-Blocking Thread Marshalling · Real-Time Audio Mixing · Headset Viewport Streaming
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 5. End-to-End Execution Pipeline (4 Staged Nodes) */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A4ADBB] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[#4D8DFF]" />
                          <span>End-to-End Execution Pipeline</span>
                        </span>
                        <span className="text-[11px] text-[#778294]">4 Staged Execution Nodes</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {activeCaseStudy.caseStudy.pipelineSteps.map((step, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-[#0C1017] border border-[#1E2736] flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-mono text-[#4D8DFF]">{step.stage}</span>
                                <span className="text-[10px] font-mono text-[#778294]">Node 0{i + 1}</span>
                              </div>
                              <div className="text-xs font-bold text-[#F4F6FA] mb-1.5">{step.title}</div>
                            </div>
                            <div className="text-[11px] text-[#A4ADBB] leading-snug">{step.detail}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* 1. Overview & 2. Problem / Requirement */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-xl bg-[#151C27] border border-[#1E2736]">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] mb-2 flex items-center gap-2">
                          <FileCode2 className="w-4 h-4" />
                          1. Project Overview
                        </h4>
                        <p className="text-sm text-[#A4ADBB] leading-relaxed">
                          {activeCaseStudy.caseStudy.overview}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#151C27] border border-[#1E2736]">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF] mb-2 flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          2. Problem &amp; Technical Requirement
                        </h4>
                        <p className="text-sm text-[#A4ADBB] leading-relaxed">
                          {activeCaseStudy.caseStudy.problem}
                        </p>
                      </div>
                    </div>

                    {/* 3. Role & Responsibilities (Personal vs Team Scope) */}
                    <div className="p-5 rounded-xl bg-[#0C1017] border border-[#1E2736] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" />
                          3. My Role &amp; Responsibilities ({activeCaseStudy.roleTitle})
                        </h4>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#151C27] text-[#F4F6FA] border border-[#1E2736]">
                          {activeCaseStudy.ownershipScope}
                        </span>
                      </div>

                      <p className="text-xs text-[#778294] italic border-l-2 border-[#4D8DFF] pl-3">
                        {activeCaseStudy.ownershipNote}
                      </p>

                      <ul className="space-y-2 pt-1">
                        {activeCaseStudy.caseStudy.responsibilities.map(
                          (resp, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-[#A4ADBB]"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4D8DFF] flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* 4. Technical Approach */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        4. Technical Approach
                      </h4>
                      <p className="text-sm text-[#A4ADBB] leading-relaxed">
                        {activeCaseStudy.caseStudy.technicalApproach}
                      </p>
                    </div>

                    {/* 5. Architecture & Implementation Details */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF] flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        5. Architecture &amp; Implementation Pipeline
                      </h4>

                      {/* Pipeline Step Cards */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {activeCaseStudy.caseStudy.pipelineSteps.map((step, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-[#151C27] border border-[#1E2736]"
                          >
                            <div className="text-[10px] font-mono text-[#4D8DFF] mb-1">
                              {step.stage}
                            </div>
                            <div className="text-sm font-semibold text-[#F4F6FA] mb-1">
                              {step.title}
                            </div>
                            <div className="text-xs text-[#A4ADBB] leading-snug">
                              {step.detail}
                            </div>
                          </div>
                        ))}
                      </div>

                      <ul className="space-y-2 pt-1">
                        {activeCaseStudy.caseStudy.architectureDetails.map(
                          (detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-[#A4ADBB]"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8B6CFF] flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* 6. Technologies Used */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF]">
                        6. Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeCaseStudy.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-md text-xs font-mono bg-[#151C27] text-[#F4F6FA] border border-[#1E2736]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 8. Challenges & Solutions */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF]">
                        8. Engineering Challenges &amp; Solutions
                      </h4>
                      <div className="grid gap-3">
                        {activeCaseStudy.caseStudy.challenges.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-2"
                          >
                            <p className="text-sm text-[#F4F6FA] font-medium">
                              <span className="font-mono text-xs text-[#8B6CFF] mr-2">
                                CHALLENGE:
                              </span>
                              {item.challenge}
                            </p>
                            <p className="text-sm text-[#A4ADBB]">
                              <span className="font-mono text-xs text-[#4D8DFF] mr-2">
                                SOLUTION:
                              </span>
                              {item.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 9. Results & Evidence-Based Outcomes */}
                    <div className="p-5 rounded-xl bg-[#151C27] border border-[#4D8DFF]/30 space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        9. Documented Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {activeCaseStudy.caseStudy.outcomes.map((outcome, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm text-[#F4F6FA]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] mt-0.5 flex-shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
