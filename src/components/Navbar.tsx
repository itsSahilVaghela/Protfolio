import { useState, useEffect } from "react";
import { Menu, X, Download, Terminal } from "lucide-react";
import { profileData } from "@/data/portfolioData";

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

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
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
          </div>

          {/* Desktop Download Resume Action */}
          <div className="hidden lg:flex items-center">
            <a
              href={resumeUrl}
              download="Sahil_Vaghela_Software_Developer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#4D8DFF] text-[#080B10] hover:bg-[#4D8DFF]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B10]"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
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

              <div className="pt-2 mt-2 border-t border-[#1E2736]">
                <a
                  href={resumeUrl}
                  download="Sahil_Vaghela_Software_Developer_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#4D8DFF] text-[#080B10] hover:bg-[#4D8DFF]/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
