import {
  UserCheck,
  GraduationCap,
  Box,
  Cpu,
  Glasses,
  GitMerge,
  Globe,
} from "lucide-react";
import profileImage from "@/assets/profile-image.png";
import { profileData } from "@/data/portfolioData";

const highlightIcons = [Box, Cpu, Glasses, GitMerge, Globe];

export const About = () => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 border-b border-[#1E2736] bg-[#0A0E15]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736] mb-4">
              <UserCheck className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                PROFILE &amp; ENGINEERING FOCUS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F6FA]">
              About <span className="text-gradient">Me</span>
            </h2>
          </div>

          {/* Main Two-Column About Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-14">
            {/* Left Column: Portrait & Core Identity Card */}
            <div className="lg:col-span-4 surface-card rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[#1E2736] bg-[#151C27] mb-5">
                <img
                  src={profileImage}
                  alt="Sahil Vaghela — Real-Time 3D & XR Software Developer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-[#F4F6FA]">
                {profileData.name}
              </h3>
              <p className="text-xs font-mono text-[#4D8DFF] mt-1 mb-4">
                {profileData.title}
              </p>

              <div className="w-full pt-4 border-t border-[#1E2736] grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                  <span className="block text-[10px] font-mono uppercase text-[#778294]">
                    EXPERIENCE
                  </span>
                  <span className="text-sm font-semibold text-[#F4F6FA]">
                    {profileData.experienceYears}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#151C27] border border-[#1E2736]">
                  <span className="block text-[10px] font-mono uppercase text-[#778294]">
                    EDUCATION
                  </span>
                  <span className="text-sm font-semibold text-[#F4F6FA]">
                    B.E. Comp. Eng.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Concise Bio & Professional Highlights */}
            <div className="lg:col-span-8 space-y-6">
              <div className="surface-card rounded-2xl p-6 sm:p-8 space-y-4">
                {profileData.about.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg text-[#F4F6FA]/95 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Compact Professional Highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                {profileData.about.highlights.map((item, index) => {
                  const Icon = highlightIcons[index % highlightIcons.length];
                  return (
                    <div
                      key={item.title}
                      className={`surface-card rounded-xl p-4 flex items-start gap-3.5 ${
                        index === profileData.about.highlights.length - 1
                          ? "sm:col-span-2"
                          : ""
                      }`}
                    >
                      <div className="p-2.5 rounded-lg bg-[#151C27] border border-[#1E2736] text-[#4D8DFF] flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#F4F6FA]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#A4ADBB] mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Academic Background Strip */}
          <div className="surface-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap className="w-5 h-5 text-[#4D8DFF]" />
              <h3 className="text-lg font-bold text-[#F4F6FA]">
                Education &amp; Academic Foundation
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {profileData.about.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="p-4 rounded-xl bg-[#151C27] border border-[#1E2736] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs text-[#4D8DFF]">
                        {edu.year}
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#10151D] text-[#F4F6FA] border border-[#1E2736]">
                        {edu.credential}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-[#F4F6FA]">
                      {edu.degree}
                    </h4>
                  </div>
                  <p className="text-xs text-[#A4ADBB] mt-2">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
