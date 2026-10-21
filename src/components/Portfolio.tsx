import { useState } from "react";
import { Link } from "react-router-dom";
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

                    {project.caseStudyUrl ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={project.caseStudyUrl}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider bg-[#4D8DFF] text-[#080B10] font-semibold hover:bg-[#89B2FF] transition-colors shadow-sm"
                        >
                          <span>Full Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCaseStudy(project);
                            setActiveMediaView(project.videoUrl ? "video" : "schematic");
                            setActiveModalVideoUrl(project.videoUrl || null);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider bg-[#151C27] text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/50 hover:bg-[#1E2736] transition-colors"
                        >
                          <span>Quick Specs</span>
                        </button>
                      </div>
                    ) : (
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
                        <span>Inspect Case Study</span>
                        <ArrowUpRight
                          className={`w-4 h-4 ${
                            isMainProject ? "text-[#080B10]" : "text-[#4D8DFF]"
                          }`}
                        />
                      </button>
                    )}
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
        <DialogContent className="max-w-4xl max-h-[88vh] overflow-y-auto bg-[#10151D] border border-[#1E2736] text-[#F4F6FA] p-6 sm:p-8">
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

                {activeCaseStudy.caseStudyUrl && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-[#4D8DFF]/15 via-[#8B6CFF]/10 to-transparent border border-[#4D8DFF]/30 mt-2">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#4D8DFF] flex-shrink-0" />
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#F4F6FA]">
                          Dedicated Full-Bleed Project Page Available
                        </div>
                        <div className="text-[11px] text-[#A4ADBB]">
                          10 deep-dive sections, 17 HD gallery screenshots, and 3 full walkthrough videos.
                        </div>
                      </div>
                    </div>
                    <Link
                      to={activeCaseStudy.caseStudyUrl}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#89B2FF] transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>Open Full Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
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
                                (activeModalVideoUrl || activeCaseStudy.videoUrl) === vid.url;
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
                          </div>
                        )}

                      {activeMediaView === "video" ? (
                        <div className="relative w-full h-72 sm:h-96 md:h-[420px] rounded-xl overflow-hidden bg-[#080B10] border border-[#1E2736] shadow-2xl">
                          {isEmbedIframe(activeModalVideoUrl || activeCaseStudy.videoUrl) ? (
                            <iframe
                              src={getEmbedVideoUrl(activeModalVideoUrl || activeCaseStudy.videoUrl)!}
                              title={`${activeCaseStudy.title} Video Demo`}
                              className="w-full h-full border-0"
                              allow="autoplay; fullscreen"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={activeModalVideoUrl || activeCaseStudy.videoUrl}
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
                                v.url ===
                                (activeModalVideoUrl || activeCaseStudy.videoUrl)
                            )?.label
                            ? `Displaying: ${
                                activeCaseStudy.additionalVideos.find(
                                  (v) =>
                                    v.url ===
                                    (activeModalVideoUrl ||
                                      activeCaseStudy.videoUrl)
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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
