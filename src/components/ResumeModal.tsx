import React, { useState } from "react";
import resumePage1Asset from "@/assets/resume-page-1.png";
import resumePage2Asset from "@/assets/resume-page-2.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { profileData } from "@/data/portfolioData";
import {
  Download,
  Phone,
  Mail,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Terminal,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const page1Ref = React.useRef<HTMLDivElement>(null);
  const page2Ref = React.useRef<HTMLDivElement>(null);

  const scrollToPage = (page: 1 | 2) => {
    if (page === 1) {
      page1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      page2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const resumeUrl = `${import.meta.env.BASE_URL}${profileData.resumeFileName}`;
  const page1Image = resumePage1Asset || `${import.meta.env.BASE_URL}resume-page-1.png`;
  const page2Image = resumePage2Asset || `${import.meta.env.BASE_URL}resume-page-2.png`;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(180, Math.max(70, prev + delta)));
  };

  const resetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          isFullscreen
            ? "!fixed !inset-0 !left-0 !top-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !max-h-none !rounded-none !p-0 bg-[#0C1017] border-0 text-[#F4F6FA] !flex !flex-col overflow-hidden z-50 shadow-none !gap-0"
            : "!fixed !left-[50%] !top-[50%] !translate-x-[-50%] !translate-y-[-50%] !w-[96vw] !h-[92vh] !max-w-7xl !max-h-[94vh] !rounded-2xl !p-0 bg-[#0C1017] border border-[#1E2736] text-[#F4F6FA] !flex !flex-col overflow-hidden shadow-2xl z-50 !gap-0"
        }
      >
        {/* Top Header Bar */}
        <DialogHeader className="px-4 sm:px-6 py-3 border-b border-[#1E2736] bg-[#10151D] flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-sm sm:text-base font-bold text-[#F4F6FA] flex flex-wrap items-center gap-2">
                <span>Sahil Vaghela — Technical Resume</span>
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-[#151C27] text-[#4D8DFF] border border-[#4D8DFF]/30">
                  Real-Time 3D &amp; XR Developer
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-[#778294] mt-0.5">
                Executive Profile (40%) &amp; High-Resolution Resume Image (60%)
              </DialogDescription>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 pr-12 sm:pr-14">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors"
              title={isFullscreen ? "Exit full screen" : "Expand full screen"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compact</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Full Screen</span>
                </>
              )}
            </button>

            <a
              href={resumeUrl}
              download="Sahil_Vaghela_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#4D8DFF]/90 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </DialogHeader>

        {/* 40 / 60 Main Layout Grid */}
        <div className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* ======================================================== */}
          {/* LEFT COLUMN (40%): ABOUT MYSELF & DIRECT CONTACT DETAILS */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 p-4 sm:p-6 overflow-y-auto bg-[#10151D] border-b lg:border-b-0 lg:border-r border-[#1E2736] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#080B10] border border-[#4D8DFF]/40 flex items-center justify-center text-[#4D8DFF] shadow-inner flex-shrink-0">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F4F6FA] leading-tight">
                      Sahil Vaghela
                    </h3>
                    <p className="text-xs font-mono text-[#89B2FF]">
                      Real-Time 3D &amp; XR Developer
                    </p>
                    <div className="inline-flex items-center gap-1.5 mt-1 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Open to Remote &amp; Relocation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E2736] flex items-center justify-between text-xs font-mono text-[#778294]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#4D8DFF]" />
                    <span>India</span>
                  </span>
                  <span>4+ Yrs 3D/XR Experience</span>
                </div>
              </div>

              {/* Technical Bio & Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>About Myself &amp; Core Stack</span>
                </h4>
                <p className="text-xs text-[#A4ADBB] leading-relaxed">
                  Specialized in building high-performance real-time interactive
                  software across Unreal Engine 5 (C++), Unity (C#), Meta Quest
                  standalone XR, and procedural geometry pipelines.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-lg bg-[#151C27] border border-[#1E2736]">
                    <div className="text-[10px] font-mono text-purple-400 uppercase">
                      Core Engine
                    </div>
                    <div className="text-xs font-bold text-[#F4F6FA] mt-0.5">
                      Unreal Engine 5 (C++)
                    </div>
                    <div className="text-[10px] text-[#778294]">
                      Subsystems &amp; Data Assets
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#151C27] border border-[#1E2736]">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase">
                      Spatial XR
                    </div>
                    <div className="text-xs font-bold text-[#F4F6FA] mt-0.5">
                      Meta Quest 3 / MR
                    </div>
                    <div className="text-[10px] text-[#778294]">
                      OpenXR &amp; Standalone 72+ FPS
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#151C27] border border-[#1E2736]">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase">
                      Multiplayer
                    </div>
                    <div className="text-xs font-bold text-[#F4F6FA] mt-0.5">
                      WebSocket &amp; RTC
                    </div>
                    <div className="text-[10px] text-[#778294]">
                      Live Cross-Device State Sync
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#151C27] border border-[#1E2736]">
                    <div className="text-[10px] font-mono text-amber-400 uppercase">
                      Procedural CAD
                    </div>
                    <div className="text-xs font-bold text-[#F4F6FA] mt-0.5">
                      DXF / JSON Meshing
                    </div>
                    <div className="text-[10px] text-[#778294]">
                      C++ LibTess2 Tessellation
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact Channels */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B6CFF] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Contact Information</span>
                </h4>

                <div className="space-y-2">
                  {/* Phone */}
                  <div className="p-2.5 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#10151D] border border-[#1E2736] flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-[#778294]">
                          Phone (Call / WhatsApp)
                        </div>
                        <div className="text-xs font-mono font-medium text-[#F4F6FA] truncate">
                          {profileData.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(profileData.phone, "phone")}
                        className="p-1.5 rounded-md hover:bg-[#1E2736] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
                        title="Copy phone number"
                      >
                        {copiedField === "phone" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={profileData.phoneHref}
                        className="px-2 py-1 rounded bg-[#10151D] hover:bg-[#1E2736] text-[10px] font-mono text-[#89B2FF] border border-[#1E2736] transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  {/* Primary Email */}
                  <div className="p-2.5 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#10151D] border border-[#1E2736] flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-[#778294]">
                          Primary Email
                        </div>
                        <div className="text-xs font-mono font-medium text-[#F4F6FA] truncate">
                          {profileData.primaryEmail}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(profileData.primaryEmail, "primaryEmail")
                        }
                        className="p-1.5 rounded-md hover:bg-[#1E2736] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
                        title="Copy primary email"
                      >
                        {copiedField === "primaryEmail" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={`mailto:${profileData.primaryEmail}`}
                        className="px-2 py-1 rounded bg-[#10151D] hover:bg-[#1E2736] text-[10px] font-mono text-[#89B2FF] border border-[#1E2736] transition-colors"
                      >
                        Mail
                      </a>
                    </div>
                  </div>

                  {/* Secondary Email */}
                  <div className="p-2.5 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#10151D] border border-[#1E2736] flex items-center justify-center text-[#8B6CFF] flex-shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-[#778294]">
                          Secondary Email
                        </div>
                        <div className="text-xs font-mono font-medium text-[#F4F6FA] truncate">
                          {profileData.secondaryEmail}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            profileData.secondaryEmail,
                            "secondaryEmail"
                          )
                        }
                        className="p-1.5 rounded-md hover:bg-[#1E2736] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
                        title="Copy secondary email"
                      >
                        {copiedField === "secondaryEmail" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#151C27] border border-[#1E2736] hover:border-[#4D8DFF]/40 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#10151D] border border-[#1E2736] flex items-center justify-center text-[#0A66C2] flex-shrink-0">
                        <Linkedin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#778294]">
                          LinkedIn Profile
                        </div>
                        <div className="text-xs font-mono font-medium text-[#F4F6FA] group-hover:text-[#4D8DFF] transition-colors">
                          sahil-vaghela-ba4822250
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#778294] group-hover:text-[#F4F6FA] transition-colors mr-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Left Panel */}
            <div className="pt-4 border-t border-[#1E2736] space-y-2">
              <a
                href="#contact"
                onClick={() => onOpenChange(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[#151C27] text-[#F4F6FA] border border-[#4D8DFF]/40 hover:border-[#4D8DFF] hover:bg-[#1E2736] transition-colors"
              >
                <span>Send Direct Inquiry Message</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#4D8DFF]" />
              </a>

              <p className="text-[10px] text-center font-mono text-[#778294]">
                Direct response within 24 hours · IST Timezone
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN (60%): MAIN RESUME HIGH-RES IMAGE VIEWER    */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 p-3 sm:p-5 bg-[#080B10] flex flex-col overflow-hidden space-y-3">
            {/* Viewer Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[#10151D] border border-[#1E2736]">
              {/* Continuous Scroll View Info & Page Jump Pills */}
              <div className="inline-flex items-center gap-1.5 p-0.5 rounded-lg bg-[#080B10] border border-[#1E2736]">
                <span className="px-2.5 py-1 text-xs font-mono text-[#A4ADBB] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF]" />
                  <span>2 Pages · Continuous</span>
                </span>
                <button
                  type="button"
                  onClick={() => scrollToPage(1)}
                  className="px-2.5 py-1 rounded text-xs font-mono text-[#778294] hover:text-[#F4F6FA] hover:bg-[#151C27] transition-colors"
                >
                  Page 1
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPage(2)}
                  className="px-2.5 py-1 rounded text-xs font-mono text-[#778294] hover:text-[#F4F6FA] hover:bg-[#151C27] transition-colors"
                >
                  Page 2
                </button>
              </div>

              {/* Zoom & Fit Tools */}
              <div className="flex items-center gap-1.5 ml-auto">
                <div className="hidden sm:inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#080B10] border border-[#1E2736]">
                  <button
                    type="button"
                    onClick={() => handleZoom(-15)}
                    className="p-1.5 rounded hover:bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono px-1.5 text-[#778294] select-none">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleZoom(15)}
                    className="p-1.5 rounded hover:bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  {zoomLevel !== 100 && (
                    <button
                      type="button"
                      onClick={resetZoom}
                      className="p-1.5 rounded hover:bg-[#151C27] text-[#4D8DFF] transition-colors"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors"
                  title="Open original PDF in browser tab"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden md:inline">PDF Tab</span>
                </a>
              </div>
            </div>

            {/* High-Resolution Resume Image Display Canvas - Single Continuous Scroll */}
            <div className="flex-1 overflow-auto rounded-xl border border-[#1E2736] bg-[#05070A] flex flex-col items-center p-3 sm:p-6 relative select-none scroll-smooth">
              <div
                style={{
                  width: `${zoomLevel}%`,
                  maxWidth: zoomLevel === 100 ? "100%" : "none",
                }}
                className="transition-all duration-150 flex flex-col items-center space-y-6"
              >
                {/* Page 1 */}
                <div ref={page1Ref} className="w-full flex flex-col items-center space-y-2">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#778294] px-1">
                    <span>PAGE 1 — EXPERIENCE &amp; SKILLS</span>
                    <span>1 / 2</span>
                  </div>
                  <img
                    src={page1Image}
                    alt="Sahil Vaghela Resume Page 1"
                    className="w-full h-auto rounded-lg shadow-2xl border border-white/5 bg-white"
                    loading="eager"
                  />
                </div>

                {/* Page 2 */}
                <div ref={page2Ref} className="w-full flex flex-col items-center space-y-2 pt-2">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#778294] px-1">
                    <span>PAGE 2 — PROJECTS &amp; EDUCATION</span>
                    <span>2 / 2</span>
                  </div>
                  <img
                    src={page2Image}
                    alt="Sahil Vaghela Resume Page 2"
                    className="w-full h-auto rounded-lg shadow-2xl border border-white/5 bg-white"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Status & Continuous Scroll Indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#778294] px-1 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>
                  High-DPI 300 DPI Render · Complete 2-Page Document
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#A4ADBB]">Scroll down to view Page 2</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
