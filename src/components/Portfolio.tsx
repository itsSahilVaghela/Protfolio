import { useState, useEffect } from "react";
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
  Box,
  Palette,
  FileText,
  Sliders,
  CloudUpload,
  CloudDownload,
  Scissors,
  GraduationCap,
  Network,
  Loader2,
  AlertCircle,
  ExternalLink,
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
  const [activeMediaView, setActiveMediaView] = useState<"video" | "photo" | "schematic">(
    "video"
  );
  const [activeModalVideoUrl, setActiveModalVideoUrl] = useState<string | null>(null);
  const [activeModalImageUrl, setActiveModalImageUrl] = useState<string | null>(null);
  const [activeImageMode, setActiveImageMode] = useState<"image" | "schematic">("image");

  const currentVideoUrl = activeCaseStudy
    ? activeModalVideoUrl || activeCaseStudy.videoUrl
    : undefined;

  const currentImageUrl = activeCaseStudy
    ? activeModalImageUrl ||
      activeCaseStudy.additionalImages?.[0]?.previewUrl ||
      activeCaseStudy.mediaUrl
    : undefined;

  const currentImageDriveUrl = activeCaseStudy?.additionalImages?.find(
    (img) => img.previewUrl === currentImageUrl
  )?.url;

  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isSlowNetwork, setIsSlowNetwork] = useState<boolean>(false);

  useEffect(() => {
    if (activeMediaView !== "video" || !currentVideoUrl) return;
    setIsVideoLoading(true);
    setIsSlowNetwork(false);

    const timer = setTimeout(() => {
      setIsSlowNetwork(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentVideoUrl, activeCaseStudy?.id, activeMediaView]);

  const getPosterSrc = (project?: ProjectCaseStudy | null) => {
    if (!project) return null;
    const rawUrl = project.cardSlides?.[0]?.url || project.mediaUrl;
    if (!rawUrl) return null;
    return rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? rawUrl
      : `${import.meta.env.BASE_URL}${
          rawUrl.startsWith("/") ? rawUrl.slice(1) : rawUrl
        }`;
  };

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
                              : isWorkedAlone || project.ownershipScope.includes("Sole Developer")
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                : "bg-[#151C27] text-[#A4ADBB] border-[#1E2736]"
                          }`}
                        >
                          {isMainProject
                            ? "Sole Developer"
                            : isWorkedAlone
                              ? "Worked Alone"
                              : project.ownershipScope.includes("Sole Developer")
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

                    {/* Engineering Bento Capsules (Point-Wise Overview) */}
                    <div className="space-y-2 mb-5">
                      {(
                        project.cardCapsules ||
                        project.highlights.slice(0, 3).map((hl) => {
                          const parts = hl.split(":");
                          if (parts.length > 1) {
                            return {
                              tag: parts[0].trim(),
                              detail: parts.slice(1).join(":").trim(),
                            };
                          }
                          return { tag: "Core Capability", detail: hl };
                        })
                      )
                        .slice(0, 3)
                        .map((capsule, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-[#10151D]/80 border border-[#1E2736]/80 hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-center space-y-0.5 group/capsule"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                  i === 0
                                    ? "bg-[#4D8DFF]"
                                    : i === 1
                                      ? "bg-[#8B6CFF]"
                                      : "bg-emerald-400"
                                }`}
                              />
                              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#89B2FF]">
                                {capsule.tag}
                              </span>
                            </div>
                            <p className="text-xs text-[#CBD5E1] leading-relaxed pl-3 font-normal">
                              {capsule.detail}
                            </p>
                          </div>
                        ))}
                    </div>
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
                        setActiveImageMode("image");
                        setActiveModalImageUrl(
                          project.additionalImages?.[0]?.previewUrl || project.mediaUrl || null
                        );
                      }}
                      className={`w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] ${
                        isMainProject
                          ? "bg-[#4D8DFF] text-[#080B10] font-semibold hover:bg-[#89B2FF]"
                          : "bg-[#151C27] text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/50 hover:bg-[#1E2736]"
                      }`}
                    >
                      <span>View Case Study</span>
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

          {/* Secondary Archive: Internship Projects */}
          <div className="mt-16 pt-12 border-t border-[#1E2736]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#F4F6FA]">
                  Internship Projects
                </h3>
                <p className="text-sm text-[#778294]">
                  Computer vision body tracking and interactive prototypes developed during internship
                </p>
              </div>
              <span className="font-mono text-xs text-[#778294]">
                INTERNSHIP // {additionalProjects.length} PROJECTS
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
                      <div className="flex items-center gap-2">
                        {item.videoUrl && (
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#4D8DFF]/15 text-[#89B2FF] border border-[#4D8DFF]/30 hover:bg-[#4D8DFF]/25 transition-colors"
                          >
                            <Play className="w-2.5 h-2.5 fill-[#89B2FF]" />
                            Video
                          </a>
                        )}
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#151C27] text-[#A4ADBB] border border-[#1E2736]">
                          {item.role}
                        </span>
                      </div>
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
                            {activeMediaView === "video" ? (
                              <>
                                <Play className="w-3.5 h-3.5 fill-[#4D8DFF]" />
                                <span>Live Production Video Demo</span>
                              </>
                            ) : activeMediaView === "photo" ? (
                              <>
                                <Monitor className="w-3.5 h-3.5 text-[#4D8DFF]" />
                                <span>Production Project Capture</span>
                              </>
                            ) : (
                              <>
                                <Cpu className="w-3.5 h-3.5 text-[#4D8DFF]" />
                                <span>System Architecture Schematic</span>
                              </>
                            )}
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
                          {activeCaseStudy.mediaUrl && (
                            <button
                              type="button"
                              onClick={() => setActiveMediaView("photo")}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors ${
                                activeMediaView === "photo"
                                  ? "bg-[#4D8DFF] text-[#080B10] font-semibold shadow-sm"
                                  : "text-[#A4ADBB] hover:text-[#F4F6FA]"
                              }`}
                            >
                              <Monitor className="w-3 h-3" />
                              <span>Photo</span>
                            </button>
                          )}
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
                          {/* Layer 0: Poster Backdrop (Prevents pitch-black void on slow networks) */}
                          {getPosterSrc(activeCaseStudy) ? (
                            <img
                              src={getPosterSrc(activeCaseStudy)!}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover blur-sm opacity-25 scale-105 pointer-events-none"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#10151D] via-[#080B10] to-[#151C27] opacity-60" />
                          )}

                          {/* Layer 1: Active Video Player (Iframe or Video with smooth fade-in) */}
                          <div
                            className={`relative z-10 w-full h-full transition-opacity duration-300 ${
                              isVideoLoading ? "opacity-0" : "opacity-100"
                            }`}
                          >
                            {isEmbedIframe(currentVideoUrl) ? (
                              <iframe
                                src={getEmbedVideoUrl(currentVideoUrl)!}
                                title={`${activeCaseStudy.title} Video Demo`}
                                className="w-full h-full border-0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                onLoad={() => setIsVideoLoading(false)}
                              />
                            ) : (
                              <video
                                src={currentVideoUrl}
                                controls
                                playsInline
                                className="w-full h-full object-contain bg-black"
                                onLoadedData={() => setIsVideoLoading(false)}
                              />
                            )}
                          </div>

                          {/* Layer 2: Loading State & Slow Network Recovery Overlay */}
                          {isVideoLoading && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#080B10]/80 backdrop-blur-md transition-all duration-300">
                              <div className="relative mb-3 flex items-center justify-center">
                                <span className="absolute w-12 h-12 rounded-full bg-[#4D8DFF]/20 animate-ping" />
                                <div className="w-10 h-10 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-center text-[#4D8DFF] shadow-lg">
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                              </div>

                              <p className="text-sm font-medium text-[#F4F6FA] mb-1">
                                Connecting video stream...
                              </p>
                              <p className="text-xs font-mono text-[#778294] max-w-sm">
                                Buffering high-resolution walkthrough demo from external host
                              </p>

                              {/* 6-Second Slow Network Indicator & Direct CTAs */}
                              {isSlowNetwork && (
                                <div className="mt-4 p-3 rounded-lg bg-[#151C27] border border-amber-500/30 flex flex-col sm:flex-row items-center gap-3 animate-fade-in shadow-xl">
                                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>Slow connection detected</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {currentVideoUrl && (
                                      <a
                                        href={currentVideoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#4D8DFF] text-[#080B10] hover:bg-[#629BFF] transition-colors"
                                      >
                                        <span>Open in Drive ↗</span>
                                      </a>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => setActiveMediaView("schematic")}
                                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-[#10151D] text-[#A4ADBB] border border-[#1E2736] hover:text-[#F4F6FA] hover:bg-[#1E2736] transition-colors"
                                    >
                                      <span>View Schematic</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : activeMediaView === "photo" && activeCaseStudy.mediaUrl ? (
                        <div className="relative w-full aspect-video max-h-[460px] rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl flex items-center justify-center">
                          <img
                            src={
                              activeCaseStudy.mediaUrl.startsWith("http://") || activeCaseStudy.mediaUrl.startsWith("https://")
                                ? activeCaseStudy.mediaUrl
                                : `${import.meta.env.BASE_URL}${
                                    activeCaseStudy.mediaUrl.startsWith("/") ? activeCaseStudy.mediaUrl.slice(1) : activeCaseStudy.mediaUrl
                                  }`
                            }
                            alt={activeCaseStudy.title}
                            className="w-full h-full object-contain bg-[#080B10]"
                          />
                        </div>
                      ) : (
                        <ProjectTechnicalVisual
                          project={activeCaseStudy}
                          variant="modal"
                          forceSchematic
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
                            : "Interactive recording from production session."
                          : activeMediaView === "photo"
                          ? "Production high-resolution screenshot."
                          : activeCaseStudy.mediaCaption}
                      </p>
                    </div>
                  ) : activeCaseStudy.additionalImages && activeCaseStudy.additionalImages.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-1.5">
                            {activeImageMode === "image"
                              ? "Live Production AR Capture"
                              : "System Architecture Schematic"}
                          </h4>
                        </div>
                        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0C1017] border border-[#1E2736]">
                          <button
                            type="button"
                            onClick={() => setActiveImageMode("image")}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                              activeImageMode === "image"
                                ? "bg-[#4D8DFF] text-[#080B10] font-semibold shadow-sm"
                                : "text-[#A4ADBB] hover:text-[#F4F6FA]"
                            }`}
                          >
                            Live Capture
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveImageMode("schematic")}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                              activeImageMode === "schematic"
                                ? "bg-[#4D8DFF] text-[#080B10] font-semibold shadow-sm"
                                : "text-[#A4ADBB] hover:text-[#F4F6FA]"
                            }`}
                          >
                            Schematic
                          </button>
                        </div>
                      </div>

                      {activeImageMode === "image" ? (
                        <>
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] font-mono text-[#778294] uppercase tracking-wider mr-1">
                              Inspection Mode:
                            </span>
                            {activeCaseStudy.additionalImages.map((img, idx) => {
                              const isSelected = currentImageUrl === img.previewUrl;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setActiveModalImageUrl(img.previewUrl || null)}
                                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                                    isSelected
                                      ? "bg-[#4D8DFF] text-[#080B10] font-semibold border-[#4D8DFF]"
                                      : "bg-[#0C1017] text-[#A4ADBB] border-[#1E2736] hover:text-[#F4F6FA] hover:border-[#4D8DFF]/40"
                                  }`}
                                >
                                  {img.label}
                                </button>
                              );
                            })}
                            {currentImageDriveUrl && (
                              <a
                                href={currentImageDriveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono text-[#89B2FF] hover:bg-[#4D8DFF]/10 transition-colors border border-[#4D8DFF]/30 ml-auto"
                              >
                                <span>Open Drive ↗</span>
                              </a>
                            )}
                          </div>

                          <div className="relative w-full aspect-video max-h-[460px] rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl flex items-center justify-center">
                            <img
                              src={
                                currentImageUrl?.startsWith("http://") || currentImageUrl?.startsWith("https://")
                                  ? currentImageUrl
                                  : `${import.meta.env.BASE_URL}${
                                      currentImageUrl?.startsWith("/") ? currentImageUrl.slice(1) : currentImageUrl
                                    }`
                              }
                              alt={activeCaseStudy.title}
                              className="w-full h-full object-contain bg-[#080B10]"
                            />
                          </div>
                        </>
                      ) : (
                        <ProjectTechnicalVisual
                          project={activeCaseStudy}
                          variant="modal"
                          forceSchematic
                        />
                      )}

                      <p className="text-xs font-mono text-[#778294]">
                        {activeCaseStudy.mediaCaption}
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
                    {/* 1. Overview Banner (System Scope & Sole Developer Role) */}
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
                          Dual-Component Industrial 3D Model Visualization &amp; Multi-Device XR Platform
                        </h4>
                        <p className="text-xs sm:text-sm text-[#A4ADBB] mt-2 leading-relaxed">
                          Fiction Mech is an industrial 3D model visualization, mechanical analysis, and multi-device collaboration platform conceived, architected, and engineered 100% by Sahil Vaghela as sole developer. The platform decouples complex CAD project preparation from runtime spatial inspection:
                        </p>
                        <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#A4ADBB] leading-relaxed">
                          <div className="p-3 rounded-lg bg-[#0C1017]/80 border border-[#1E2736]/70">
                            <span className="font-semibold text-[#89B2FF]">Part 1 (PC Authoring Studio):</span> Creates and manages 3D projects, ingests FBX/OBJ models with 360° inspection, assigns materials across 4 viewport modes (Mesh, Wireframe, Edge, Texture), sequences assembly/disassembly steps, binds part-level metadata (dimensions, tools, manuals, video clips), manages subsystem layers, and publishes ready bundles to the backend.
                          </div>
                          <div className="p-3 rounded-lg bg-[#0C1017]/80 border border-[#1E2736]/70">
                            <span className="font-semibold text-[#B8A1FF]">Part 2 (Quest 3 MR &amp; Mobile Viewers):</span> Downloads projects on-demand from the backend for 1:1 room/tabletop passthrough inspection on Meta Quest 3 and mobile review on Android &amp; iOS. Features individual part selection with metadata HUDs, layer toggling, real-time expanded view with 1-click reset, 3-axis shader cross-section cutting, guided procedural training, and Photon multiplayer state sync with live voice, plus Agora RTC screen casting to web pages.
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1E2736]/60">
                        <span className="text-[11px] font-mono text-[#778294]">System Pillars:</span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#89B2FF] border border-[#1E2736]">
                          PC Authoring Studio
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#B8A1FF] border border-[#1E2736]">
                          Meta Quest 3 MR (OpenXR)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-emerald-400 border border-[#1E2736]">
                          Android &amp; iOS Touch
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-emerald-400 border border-[#1E2736]">
                          Photon PUN &amp; Voice
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-amber-400 border border-[#1E2736]">
                          Agora Webcast
                        </span>
                      </div>
                    </div>

                    {/* 2. Key Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Developer Scope</div>
                          <div className="text-sm sm:text-base font-bold text-[#4D8DFF]">Sole Developer</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">100% Architecture &amp; Delivery</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Full-stack Unity C#, HLSL shaders, OpenXR, Photon &amp; Agora RTC.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Target Runtimes</div>
                          <div className="text-sm sm:text-base font-bold text-[#F4F6FA]">PC · Quest 3 · Android · iOS</div>
                          <div className="text-xs font-medium text-[#89B2FF] mt-0.5">Cross-Platform Ecosystem</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Windows authoring studio, standalone OpenXR APK, and touch mobile clients.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Multiplayer &amp; Webcast</div>
                          <div className="text-sm sm:text-base font-bold text-emerald-400">Photon + Agora</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">PUN Voice + Web Stream</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Photon multiplayer sync &amp; voice; Agora VR screen cast streaming to web pages.
                        </div>
                      </div>
                    </div>

                    {/* 3. Part 1 — PC Authoring Studio */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-[#4D8DFF]" />
                            <span>Part 1: PC Authoring Studio (Project Setup &amp; Staging)</span>
                          </h4>
                          <p className="text-[11px] font-mono text-[#778294] mt-0.5">
                            Windows Desktop Application · CAD Preparation &amp; Cloud Publishing
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-[#89B2FF] px-2.5 py-0.5 rounded bg-[#10151D] border border-[#1E2736]">
                          6 Authoring Modules
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {/* Block 1 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                  <Box className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    1. Project Management &amp; 3D Ingestion
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    CAD Ingestion &amp; Turntable
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                                Ingestion
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Dynamic FBX/OBJ multi-model loader with interactive 360° turntable orbit review.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              FBX / OBJ Importer
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              360° Orbit Review
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Multi-Model Staging
                            </span>
                          </div>
                        </div>

                        {/* Block 2 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#8B6CFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                                  <Palette className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    2. Material Customization &amp; 4 Viewport Modes
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    PBR Textures &amp; Shading
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#B8A1FF] border border-[#1E2736]">
                                4 Viewports
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Assign custom PBR materials across 4 instant viewport rendering modes.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Mesh View
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Wireframe View
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Edge View
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Texture View
                            </span>
                          </div>
                        </div>

                        {/* Block 3 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                  <FileText className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    3. Part-Level Engineering Metadata Binding
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Technical Specifications
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-emerald-400 border border-[#1E2736]">
                                Metadata HUD
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Bind physical specs, operational tools, and documentation directly to sub-components.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Dimensions &amp; Specs
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Required Tooling
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              PDFs &amp; Video Demos
                            </span>
                          </div>
                        </div>

                        {/* Block 4 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-amber-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                  <Wrench className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    4. Disassembly &amp; Assembly Sequence Authoring
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    SOP Timelines &amp; Explosions
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-amber-400 border border-[#1E2736]">
                                Timelines
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Author step-by-step procedural maintenance timelines with continuous explosion slider.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Step Sequencing
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Exploded View Slider
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Disassembly Timelines
                            </span>
                          </div>
                        </div>

                        {/* Block 5 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                  <Sliders className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    5. Subsystem Layer Assignment &amp; Device Permissions
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Runtime Target Scoping
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                                Scoping
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Group parts into functional layers and set target view permissions per platform.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Subsystem Layer Deck
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Quest 3 Permissions
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Mobile View Filters
                            </span>
                          </div>
                        </div>

                        {/* Block 6 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#8B6CFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                                  <CloudUpload className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    6. Media Recording &amp; Cloud Publishing
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Chroma Key &amp; Cloud Sync
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#B8A1FF] border border-[#1E2736]">
                                Publishing
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Capture 1080p turntable demos with chroma green screen and publish packages to backend.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Chroma Key Green Screen
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              1080p Video Rec
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Cloud Package Export
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Part 2 — Spatial Viewers (Quest 3 MR, Android & iOS) */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF] flex items-center gap-2">
                            <Glasses className="w-4 h-4 text-[#8B6CFF]" />
                            <span>Part 2: Spatial Viewers (Quest 3 MR, Android &amp; iOS)</span>
                          </h4>
                          <p className="text-[11px] font-mono text-[#778294] mt-0.5">
                            Spatial Mixed Reality &amp; Touch Companions · Real-Time Multi-Device Review
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-[#B8A1FF] px-2.5 py-0.5 rounded bg-[#10151D] border border-[#1E2736]">
                          6 Runtime Capabilities
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {/* Block 1 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                  <CloudDownload className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    1. Dynamic Cloud Project Fetching
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    On-Demand Bundles
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                                Cloud Sync
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Connects to cloud backend to download and cache authored project bundles on demand.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Cloud Manifest Sync
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              On-Demand Asset Fetch
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Local Caching
                            </span>
                          </div>
                        </div>

                        {/* Block 2 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#8B6CFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#8B6CFF]/15 border border-[#8B6CFF]/30 flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                                  <FileText className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    2. Part Metadata &amp; Technical Manual HUD
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Specs, Tooling &amp; Video Reference
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#B8A1FF] border border-[#1E2736]">
                                HUD Overlay
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Tap any subcomponent to inspect dimensions, required tools, reference photos, PDF manuals, and video clips.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Tool Specifications
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              PDF Manual Viewer
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              MP4 Video Reference
                            </span>
                          </div>
                        </div>

                        {/* Block 3 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                  <Layers className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    3. Layer Deck &amp; Real-Time Part Expansion
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Exploded View &amp; Subsystems
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-emerald-400 border border-[#1E2736]">
                                Inspection
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Filter subsystem layers live, expand parts with smooth slider, and reset in 1-click.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Subsystem Filtering
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Real-Time Part Expansion
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              1-Touch Instant Reset
                            </span>
                          </div>
                        </div>

                        {/* Block 4 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-amber-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                  <Scissors className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    4. Real-Time 3-Axis Cross-Section Slicing
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Shader Clipping Gizmo
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-amber-400 border border-[#1E2736]">
                                HLSL Discard
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Interactive 3D RGB gizmo slicing internal tolerances with zero stencil GPU overhead.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              3-Axis RGB Cutting
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Single-Pass Fragment Clip
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Internal Inspection
                            </span>
                          </div>
                        </div>

                        {/* Block 5 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                  <GraduationCap className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    5. Interactive Assembly &amp; Disassembly Training
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Step-by-Step SOP Guided
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                                SOP Training
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Step-by-step SOP playback teaching technicians maintenance sequences authored on PC.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Interactive SOP Guidance
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Assembly Playback
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Safety Step Verification
                            </span>
                          </div>
                        </div>

                        {/* Block 6 */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                  <Radio className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    6. Agora Screen Cast &amp; Photon Multiplayer
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    PUN State Sync + Web Screencast
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-emerald-400 border border-[#1E2736]">
                                Photon + Agora
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Multiplayer state sync &amp; voice via Photon; Quest 3 screen cast feeds directly to web pages via Agora.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Photon State Sync
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Photon Voice Chat
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Agora Web Feed Casting
                            </span>
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
                ) : activeCaseStudy.id === "radicon-powerbuild-xr" ? (
                  <div className="space-y-6 pt-1 text-left">
                    {/* 1. Overview Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#151C27] via-[#10151D] to-[#0C1017] border border-[#1E2736] space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4D8DFF]/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4D8DFF]" />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#89B2FF]">
                            INDUSTRIAL AR/MR SHOWCASE · SOLE DEVELOPER
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#778294] px-2.5 py-0.5 rounded bg-[#080B10] border border-[#1E2736]">
                          Mobile &amp; Meta Quest 3
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#F4F6FA] tracking-tight">
                          Interactive Gearbox Showroom with Dual Tracking &amp; Radial HUD
                        </h4>
                        <p className="text-xs sm:text-sm text-[#A4ADBB] mt-1.5 leading-relaxed">
                          Engineered independently as sole developer for Radicon Powerbuild. Enables sales engineers to demonstrate industrial gearboxes via Vuforia printed brochure tracking or markerless room placement on mobile and Meta Quest 3.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/70">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#89B2FF] border border-[#1E2736]">
                          Android Phone (Vuforia)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-purple-400 border border-[#1E2736]">
                          Meta Quest 3 MR
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-emerald-400 border border-[#1E2736]">
                          Marker &amp; Markerless
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-amber-400 border border-[#1E2736]">
                          Radial Spec HUD
                        </span>
                      </div>
                    </div>

                    {/* 2. Key Specifications Grid (3 Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Developer Scope</div>
                          <div className="text-sm sm:text-base font-bold text-[#4D8DFF]">Sole Developer</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">100% Architecture &amp; Delivery</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Full-stack Unity C#, Vuforia tracking, Meta Quest 3 MR &amp; radial UI.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Target Runtimes</div>
                          <div className="text-sm sm:text-base font-bold text-[#F4F6FA]">Android · Meta Quest 3</div>
                          <div className="text-xs font-medium text-[#89B2FF] mt-0.5">Mobile AR &amp; Immersive MR</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Native Android touch app and standalone Meta Quest 3 APK.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Inspection Modes</div>
                          <div className="text-sm sm:text-base font-bold text-emerald-400">Marker + Markerless</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Dual-Vision Tracking</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Printed brochure image target and ground-plane real surface placement.
                        </div>
                      </div>
                    </div>

                    {/* 3. Core Capabilities Bento (4 Cards) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#4D8DFF]" />
                          <span>Core Engineering Capabilities</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#778294]">
                          4 Highlight Features
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                  <FileText className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    1. Vuforia Brochure Tracking
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Printed Collateral Target
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                                Marker AR
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Locks interactive 3D Series-M gearbox directly onto physical printed marketing brochures.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Brochure Anchor
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Image Target Tracking
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                  <Box className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    2. Markerless Surface Showroom
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Plane &amp; Passthrough Placement
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-emerald-400 border border-[#1E2736]">
                                Ground Plane
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Anchors full product lineup onto real floors and tabletops across mobile and Meta Quest 3 MR.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Floor Anchoring
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Quest 3 Passthrough
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                                  <Sliders className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    3. Circular Carousel &amp; Shaft Swap
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Ring Showroom &amp; Variants
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-purple-400 border border-[#1E2736]">
                                Configuration
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Orbiting product ring with central hero focus and real-time mechanical shaft swapping.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Circular Carousel
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Shaft Customizer
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                  <Wrench className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    4. Curved Radial Engineering HUD
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Specs, Manuals &amp; Catalogs
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-amber-400 border border-[#1E2736]">
                                Radial UI
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Curved arc menu giving instant on-device access to specs, catalogs, applications, and manuals.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Catalog &amp; Manuals
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Curved Arc Layout
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Execution Pipeline */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A4ADBB] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[#4D8DFF]" />
                          <span>4-Stage Pipeline</span>
                        </span>
                        <span className="text-[11px] text-[#778294]">Vision to Inspection</span>
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
                ) : activeCaseStudy.id === "fiction-archviz" ? (
                  <div className="space-y-6 pt-1 text-left">
                    {/* 1. Overview Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#151C27] via-[#10151D] to-[#0C1017] border border-[#1E2736] space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4D8DFF]/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4D8DFF]" />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#89B2FF]">
                            ENTERPRISE ARCHITECTURAL PLATFORM · CORE CONTRIBUTOR
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#778294] px-2.5 py-0.5 rounded bg-[#080B10] border border-[#1E2736]">
                          5 Predefined Test Rooms · PC &amp; Quest Standalone
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#F4F6FA] tracking-tight">
                          Collaborative Architectural Visualization with Real-Time WebSocket Multiuser Sync
                        </h4>
                        <p className="text-xs sm:text-sm text-[#A4ADBB] mt-1.5 leading-relaxed">
                          Unreal Engine 5 platform featuring 5 interactive rooms (Living Room, Bathroom, Kitchen, Bed Room, Kids Room) with live bidirectional sync between PC Desktop and Meta Quest standalone VR.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/70">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#89B2FF] border border-[#1E2736]">
                          Unreal Engine 5
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-purple-400 border border-[#1E2736]">
                          WebSocket / Node.js
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-emerald-400 border border-[#1E2736]">
                          Meta Quest Standalone VR
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-amber-400 border border-[#1E2736]">
                          5 Predefined Rooms
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-cyan-400 border border-[#1E2736]">
                          Procedural Tile Engine
                        </span>
                      </div>
                    </div>

                    {/* 2. Key Specifications Grid (3 Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Developer Scope</div>
                          <div className="text-sm sm:text-base font-bold text-[#4D8DFF]">Core Contributor</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">5 Rooms, Multiplayer, Tiles &amp; VR</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Built 5 showcase rooms, WebSocket sync, procedural tile cutting, and auto-lighting.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Target Runtimes</div>
                          <div className="text-sm sm:text-base font-bold text-[#F4F6FA]">PC · Quest Standalone</div>
                          <div className="text-xs font-medium text-[#89B2FF] mt-0.5">Desktop &amp; Mobile VR</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Windows mouse/keyboard workstation mode and standalone 6DoF Meta Quest VR.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Multiuser Sync</div>
                          <div className="text-sm sm:text-base font-bold text-emerald-400">WebSocket Relay</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Node.js Server Bus</div>
                        </div>
                        <div className="text-[11px] text-[#778294] mt-2 pt-2 border-t border-[#1E2736]/60 leading-snug">
                          Bidirectional event sync reflecting real-time user actions instantly across clients.
                        </div>
                      </div>
                    </div>

                    {/* 3. Core Developer Ownership (4 Highlight Cards) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#4D8DFF]" />
                          <span>My Core Technical Ownership</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#89B2FF] px-2.5 py-0.5 rounded bg-[#10151D] border border-[#1E2736]">
                          Personal Engineering Contributions
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Ownership 1: 5 Predefined Rooms */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-cyan-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                                  <Box className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    1. 5 Predefined Showcase Rooms
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Living, Bath, Kitchen, Bed &amp; Kids
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-cyan-400 border border-[#1E2736]">
                                Environments
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Built 5 complete room environments to stress-test tile cuts, lighting, and VR mechanics.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              5 Room Testbeds
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Interactive Spaces
                            </span>
                          </div>
                        </div>

                        {/* Ownership 2: WebSocket Multiuser */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4D8DFF]/15 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                                  <Network className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    2. WebSocket Multiuser Pipeline
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Node.js Event Bus (PC ↔ VR)
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-[#89B2FF] border border-[#1E2736]">
                                Multiplayer
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Real-time bidirectional event bus synchronizing PC Desktop and Meta Quest VR with sub-100ms parity.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              WebSocket Node Server
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              PC ↔ VR Parity
                            </span>
                          </div>
                        </div>

                        {/* Ownership 3: Procedural Wall Tile Engine */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-purple-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                                  <Palette className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    3. Procedural Wall Tile Engine
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    Seam Math &amp; 15+ Finish PBR
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-purple-400 border border-[#1E2736]">
                                Tile Engine
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Fixed wall-cut seams with 4-way offset stepping, 90° rotation, and Matte/Glossy PBR swapping.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Tile Cut Seam Math
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              Matte / Glossy PBR
                            </span>
                          </div>
                        </div>

                        {/* Ownership 4: VR Floating Dock & Dynamic Lights */}
                        <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-2.5">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                  <Glasses className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-[#F4F6FA] leading-tight">
                                    4. VR Dock &amp; Dynamic Lights
                                  </h5>
                                  <span className="text-[10px] font-mono text-[#778294]">
                                    WidgetHolder &amp; DynamicRectLight
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10151D] text-emerald-400 border border-[#1E2736]">
                                VR &amp; Lighting
                              </span>
                            </div>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Grabbable in-VR tool palette and room-bounds calculated ceiling lighting fixtures.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/60">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              WidgetHolderActor
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1017] text-[#778294] border border-[#1E2736]">
                              DynamicRectLight
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Platform Architectural Subsystems (Compact 6-Item Grid) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF] flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#8B6CFF]" />
                          <span>Platform Architectural Subsystems</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#778294]">
                          6 Core Modules
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wider mb-0.5">Grout Physics</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Grout Width Sliders</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Independent XY millimeter readouts</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-0.5">Wall Finishes</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Paint &amp; Gradients</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Solid PBR &amp; 2-sided wall separation</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">CAD Engine</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">DXF / JSON Ingestion</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">C++ LibTess2 &amp; earcut mesh generation</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-0.5">Mesh Booleans</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Parametric Void Cutters</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Dynamic door &amp; window wall cutouts</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-0.5">Presets</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Copy &amp; Paste Setup</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">1-click transfer across adjoining surfaces</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-0.5">Subsystem</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Runtime Localization</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Live language switch without level reloads</div>
                        </div>
                      </div>
                    </div>

                    {/* 5. Execution Pipeline */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A4ADBB] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[#4D8DFF]" />
                          <span>4-Stage End-to-End Pipeline</span>
                        </span>
                        <span className="text-[11px] text-[#778294]">CAD to Collaborative Review</span>
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
                ) : activeCaseStudy.id === "mimadim-home-studio" ? (
                  <div className="space-y-6 pt-1 text-left">
                    {/* 1. Overview Banner */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#151C27] via-[#10151D] to-[#0C1017] border border-[#1E2736] space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B6CFF]/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B6CFF]/10 border border-[#8B6CFF]/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#8B6CFF]" />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#B8A3FF]">
                            PC INTERIOR ARCHITECTURE · CORE SYSTEMS CONTRIBUTOR
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#778294] px-2.5 py-0.5 rounded bg-[#080B10] border border-[#1E2736]">
                          Predefined Showcase Rooms · High-Fidelity PC
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#F4F6FA] tracking-tight">
                          High-Fidelity PC Interior &amp; Furniture Customization Architecture
                        </h4>
                        <p className="text-xs sm:text-sm text-[#A4ADBB] mt-1.5 leading-relaxed">
                          Unreal Engine 5 desktop experience featuring predefined showcase rooms to test and swap furniture (beds, floor parquet, wallpaper, and curtains) in real time with photorealistic graphics.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E2736]/70">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-[#89B2FF] border border-[#1E2736]">
                          Unreal Engine 5
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-purple-400 border border-[#1E2736]">
                          C++ / Blueprints
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-emerald-400 border border-[#1E2736]">
                          Predefined Showcase Rooms
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-amber-400 border border-[#1E2736]">
                          Data Assets Registry
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-cyan-400 border border-[#1E2736]">
                          GameInstance Subsystem
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#151C27] text-rose-400 border border-[#1E2736]">
                          High-End PC Graphics
                        </span>
                      </div>
                    </div>

                    {/* 2. Key Specifications Grid (3 Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Developer Scope</div>
                          <div className="text-sm sm:text-base font-bold text-[#8B6CFF]">Core Contributor</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Catalog Architecture &amp; Subsystem</div>
                        </div>
                        <div className="text-[11px] text-[#A4ADBB] mt-2 pt-2 border-t border-[#1E2736]">
                          Data Assets, master mapping, transform caching, and subsystem refactoring.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Target Platform</div>
                          <div className="text-sm sm:text-base font-bold text-[#38BDF8]">High-End PC Desktop</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Photorealistic PBR &amp; Dynamic Lighting</div>
                        </div>
                        <div className="text-[11px] text-[#A4ADBB] mt-2 pt-2 border-t border-[#1E2736]">
                          Engineered specifically for high graphical fidelity, reflections, and realtime material swaps.
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#778294] mb-1">Interactive Customization</div>
                          <div className="text-sm sm:text-base font-bold text-emerald-400">Predefined Rooms</div>
                          <div className="text-xs font-medium text-[#F4F6FA] mt-0.5">Bed · Parquet · Wallpaper · Curtains</div>
                        </div>
                        <div className="text-[11px] text-[#A4ADBB] mt-2 pt-2 border-t border-[#1E2736]">
                          Instantaneous asset &amp; texture replacement with zero coordinate drift.
                        </div>
                      </div>
                    </div>

                    {/* 3. Part 1: Predefined Rooms & Customization Capabilities (6 Bento Cards) */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A4ADBB] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-[#8B6CFF]" />
                          <span>Customization Capabilities &amp; Showcase Environments</span>
                        </span>
                        <span className="text-[11px] text-[#778294]">Predefined Rooms · 6 Concrete Modules</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B10] text-[#89B2FF] border border-[#1E2736]">ROOM SHOWCASE</span>
                            <h5 className="text-sm font-bold text-[#F4F6FA] mt-2 mb-1">Predefined Rooms</h5>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Interactive architectural spaces configured with tailored camera vantage points to test furniture placement.
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#1E2736]/60 text-[10px] font-mono text-[#778294]">
                            Contextual Layout Testing
                          </div>
                        </div>

                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B10] text-purple-400 border border-[#1E2736]">FURNITURE SWAP</span>
                            <h5 className="text-sm font-bold text-[#F4F6FA] mt-2 mb-1">Bed Variations</h5>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Dynamic actor replacement across bed frames, headboards, and mattress designs with preserved pivot alignment.
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#1E2736]/60 text-[10px] font-mono text-[#778294]">
                            Transform-Safe Replacement
                          </div>
                        </div>

                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B10] text-emerald-400 border border-[#1E2736]">SURFACE FINISH</span>
                            <h5 className="text-sm font-bold text-[#F4F6FA] mt-2 mb-1">Floor Parquet</h5>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Real-time switching between hardwood, herringbone, and chevron parquet with photorealistic PBR normal maps.
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#1E2736]/60 text-[10px] font-mono text-[#778294]">
                            PBR Material Instances
                          </div>
                        </div>

                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B10] text-amber-400 border border-[#1E2736]">WALL STYLING</span>
                            <h5 className="text-sm font-bold text-[#F4F6FA] mt-2 mb-1">Wallpaper Sets</h5>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Curated patterns, accent textures, and modern plaster finishes dynamically mapped to room perimeter geometries.
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#1E2736]/60 text-[10px] font-mono text-[#778294]">
                            Seamless UV Projections
                          </div>
                        </div>

                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B10] text-cyan-400 border border-[#1E2736]">TEXTILE CUSTOMIZATION</span>
                            <h5 className="text-sm font-bold text-[#F4F6FA] mt-2 mb-1">Curtains &amp; Drapery</h5>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Customizable window drapes with realistic fabric weave, light translucency, and complementary color schemes.
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#1E2736]/60 text-[10px] font-mono text-[#778294]">
                            Subsurface Fabric Shading
                          </div>
                        </div>

                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B10] text-rose-400 border border-[#1E2736]">PC GRAPHICS</span>
                            <h5 className="text-sm font-bold text-[#F4F6FA] mt-2 mb-1">Photorealistic PC Fidelity</h5>
                            <p className="text-xs text-[#A4ADBB] leading-relaxed">
                              Engineered specifically for high-end PC GPUs with dynamic lighting, realistic reflections, and crisp texture resolution.
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#1E2736]/60 text-[10px] font-mono text-[#778294]">
                            High-End Unreal 5 Rendering
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Part 2: Technical Architecture & C++ Subsystem (4 Bento Cards) */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A4ADBB] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#4D8DFF]" />
                          <span>Technical Architecture &amp; C++ Systems</span>
                        </span>
                        <span className="text-[11px] text-[#778294]">Decoupled Data-Driven Pattern</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5">Data Layer</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Master Data Assets</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Modular catalog indexing beds, parquet, wallpaper &amp; curtains</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-0.5">Transform Safety</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Matrix-Cached Swap</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Zero positional or rotation drift during actor replacement</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-0.5">Subsystem</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">UGameInstance Subsystem</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Centralized state manager decoupled from level Blueprints</div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                          <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-0.5">PBR Shaders</div>
                          <div className="text-xs font-bold text-[#F4F6FA]">Material Instancing</div>
                          <div className="text-[11px] text-[#778294] mt-0.5">Live texture parameter updates without shader recompiles</div>
                        </div>
                      </div>
                    </div>

                    {/* 5. Execution Pipeline */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A4ADBB] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[#8B6CFF]" />
                          <span>4-Stage End-to-End Pipeline</span>
                        </span>
                        <span className="text-[11px] text-[#778294]">Data Definition to Photorealistic Render</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {activeCaseStudy.caseStudy.pipelineSteps.map((step, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-[#0C1017] border border-[#1E2736] flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-mono text-[#8B6CFF]">{step.stage}</span>
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
