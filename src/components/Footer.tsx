import { Mail, Linkedin, Download, Terminal } from "lucide-react";
import { profileData } from "@/data/portfolioData";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const resumeUrl = `${import.meta.env.BASE_URL}${profileData.resumeFileName}`;

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#06080C] border-t border-[#1E2736] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-[#1E2736]">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#151C27] border border-[#1E2736] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[#4D8DFF]" />
                </div>
                <span className="text-lg font-bold text-[#F4F6FA]">
                  {profileData.name}
                </span>
              </div>
              <p className="text-sm text-[#A4ADBB] max-w-sm leading-relaxed">
                {profileData.title} — building interactive 3D applications, VR/AR
                systems, procedural geometry pipelines, and browser-based 3D
                experiences.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#778294] mb-3">
                Navigation
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[#A4ADBB] hover:text-[#4D8DFF] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Links Column */}
            <div className="md:col-span-4 space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#778294] mb-3">
                Links &amp; Resume
              </h3>
              <a
                href={`mailto:${profileData.primaryEmail}`}
                className="flex items-center gap-2 text-sm text-[#A4ADBB] hover:text-[#4D8DFF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#4D8DFF]" />
                <span>{profileData.primaryEmail}</span>
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#A4ADBB] hover:text-[#4D8DFF] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#4D8DFF]" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={resumeUrl}
                download="Sahil_Vaghela_Software_Developer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#4D8DFF] hover:underline pt-1"
              >
                <Download className="w-4 h-4" />
                <span>Download Updated Resume (PDF)</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#778294]">
            <p>© {currentYear} Sahil Vaghela. All rights reserved.</p>
            <p className="font-mono">
              Unity · Unreal Engine 5 · C++ · C# · Three.js · OpenXR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
