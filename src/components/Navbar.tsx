import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Download,
  Terminal,
  FileText,
  ExternalLink,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { profileData } from "@/data/portfolioData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isResumeFullscreen, setIsResumeFullscreen] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const resumeUrl = `${import.meta.env.BASE_URL}${profileData.resumeFileName}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const sections = navLinks.map((link) => link.href.substring(1));
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#080B10]/90 backdrop-blur-md border-b border-[#1E2736] shadow-lg"
          : "bg-[#080B10]/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Primary Navigation"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Identity */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] rounded-lg px-1 py-1"
          >
            <div className="w-9 h-9 rounded-lg bg-[#151C27] border border-[#1E2736] group-hover:border-[#4D8DFF]/60 flex items-center justify-center transition-colors">
              <Terminal className="w-4 h-4 text-[#4D8DFF]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-semibold tracking-tight text-[#F4F6FA]">
                Sahil Vaghela
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#778294] hidden sm:inline">
                Real-Time 3D &amp; XR Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links + Resume Action */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] ${
                    isActive
                      ? "bg-[#151C27] text-[#F4F6FA] border border-[#4D8DFF]/40"
                      : "text-[#A4ADBB] hover:text-[#F4F6FA] hover:bg-[#10151D]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Resume Button (Styled like Contact button, opens Resume Viewer with Download option) */}
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] inline-flex items-center gap-1.5 ${
                isResumeOpen
                  ? "bg-[#151C27] text-[#F4F6FA] border border-[#4D8DFF]"
                  : "bg-[#151C27] text-[#F4F6FA] border border-[#4D8DFF]/40 hover:border-[#4D8DFF] hover:bg-[#1E2736]"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-[#A4ADBB] hover:text-[#F4F6FA] hover:bg-[#151C27] border border-[#1E2736] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Compact Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="lg:hidden py-4 border-t border-[#1E2736] bg-[#10151D]/95 backdrop-blur-md rounded-b-xl px-2 mb-2 animate-fade-in"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#151C27] text-[#F4F6FA] border border-[#4D8DFF]/40"
                        : "text-[#A4ADBB] hover:text-[#F4F6FA] hover:bg-[#151C27]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              {/* Mobile Resume Button */}
              <div className="pt-2 mt-2 border-t border-[#1E2736]">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsResumeOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium bg-[#151C27] text-[#F4F6FA] border border-[#4D8DFF]/40 hover:border-[#4D8DFF] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#4D8DFF]" />
                    <span>View Resume</span>
                  </span>
                  <span className="text-xs font-mono text-[#89B2FF] px-2 py-0.5 rounded bg-[#080B10] border border-[#1E2736]">
                    Preview &amp; Download
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Resume Viewer Dialog Modal */}
      <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
        <DialogContent
          className={
            isResumeFullscreen
              ? "!fixed !inset-0 !left-0 !top-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !max-h-none !rounded-none !p-0 bg-[#0C1017] border-0 text-[#F4F6FA] flex flex-col overflow-hidden z-50 shadow-none"
              : "!fixed !left-[50%] !top-[50%] !translate-x-[-50%] !translate-y-[-50%] !w-[96vw] !h-[94vh] !max-w-7xl !max-h-[94vh] !rounded-2xl !p-0 bg-[#0C1017] border border-[#1E2736] text-[#F4F6FA] flex flex-col overflow-hidden shadow-2xl z-50"
          }
        >
          {/* Header */}
          <DialogHeader className="p-3 sm:px-6 border-b border-[#1E2736] bg-[#10151D] flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg font-bold text-[#F4F6FA] flex flex-wrap items-center gap-2">
                  <span>Sahil Vaghela — Technical Resume</span>
                  <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded bg-[#151C27] text-[#4D8DFF] border border-[#4D8DFF]/30">
                    Real-Time 3D &amp; XR
                  </span>
                </DialogTitle>
                <DialogDescription className="text-xs text-[#778294] mt-0.5">
                  Unreal Engine 5 (C++) · Unity (C#) · OpenXR · Procedural Geometry · Three.js
                </DialogDescription>
              </div>
            </div>

            {/* Quick Actions (Fullscreen Toggle + Open Tab + Download Button) */}
            <div className="flex items-center gap-2 pr-12 sm:pr-14">
              <button
                type="button"
                onClick={() => setIsResumeFullscreen(!isResumeFullscreen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors"
                title={isResumeFullscreen ? "Restore window size" : "Expand to edge-to-edge full screen"}
              >
                {isResumeFullscreen ? (
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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736] hover:border-[#4D8DFF]/40 transition-colors"
                title="Open resume in full browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Tab</span>
              </a>

              <a
                href={resumeUrl}
                download="Sahil_Vaghela_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#4D8DFF]/90 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
            </div>
          </DialogHeader>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full h-full bg-[#080B10] p-0 overflow-hidden relative flex flex-col">
            <iframe
              src={`${resumeUrl}#view=FitH`}
              title="Sahil Vaghela Technical Resume Preview"
              className="w-full flex-1 border-0 bg-[#0C1017]"
            />
          </div>

          {/* Footer bar */}
          <div className="px-4 sm:px-6 py-2 bg-[#10151D] border-t border-[#1E2736] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#778294] flex-shrink-0">
            <span className="truncate">Sahil_Vaghela_Resume.pdf</span>
            <div className="flex items-center gap-3">
              <span>Looking to collaborate?</span>
              <a
                href="#contact"
                onClick={() => setIsResumeOpen(false)}
                className="text-[#4D8DFF] hover:underline"
              >
                Contact Me →
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
