import {
  Code2,
  Cpu,
  Glasses,
  Globe,
  Layers,
  Network,
  Terminal,
} from "lucide-react";
import { skillCategories } from "@/data/portfolioData";

const categoryIconMap: Record<string, typeof Code2> = {
  programming: Terminal,
  "engines-rendering": Cpu,
  "xr-cv": Glasses,
  "web-3d": Globe,
  "software-engineering": Layers,
  "networking-integration": Network,
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 border-b border-[#1E2736] bg-[#080B10]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header & Scope Legend */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736] mb-4">
                <Code2 className="w-3.5 h-3.5 text-[#4D8DFF]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                  TECHNICAL CAPABILITIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F6FA]">
                Skills &amp; <span className="text-gradient">Technologies</span>
              </h2>
              <p className="text-[#A4ADBB] text-base sm:text-lg mt-3 max-w-2xl">
                Organized by engineering domain and practical production usage
                across game engines, XR hardware, procedural pipelines, and web
                3D.
              </p>
            </div>

            {/* Meaningful Proficiency Tier Legend (no arbitrary percentages) */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-[#10151D] border border-[#1E2736] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#F4F6FA]">
                <span className="w-2 h-2 rounded-full bg-[#4D8DFF]" />
                Core Production
              </span>
              <span className="flex items-center gap-1.5 text-[#A4ADBB]">
                <span className="w-2 h-2 rounded-full bg-[#8B6CFF]" />
                Applied Project
              </span>
              <span className="flex items-center gap-1.5 text-[#778294]">
                <span className="w-2 h-2 rounded-full bg-[#778294]" />
                Foundational
              </span>
            </div>
          </div>

          {/* 6 Skill Category Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((group) => {
              const Icon = categoryIconMap[group.id] || Code2;
              return (
                <div
                  key={group.id}
                  className="surface-card surface-card-interactive rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#151C27] border border-[#1E2736] flex items-center justify-center text-[#4D8DFF] flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#F4F6FA]">
                          {group.title}
                        </h3>
                        <p className="text-xs text-[#778294] mt-0.5 leading-snug">
                          {group.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => {
                        const isCore = skill.tier === "core";
                        const isFoundational = skill.tier === "foundational";
                        return (
                          <div
                            key={skill.name}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                              isCore
                                ? "bg-[#151C27] border-[#4D8DFF]/35 text-[#F4F6FA]"
                                : isFoundational
                                  ? "bg-[#080B10] border-[#1E2736] text-[#778294]"
                                  : "bg-[#0C1017] border-[#1E2736] text-[#A4ADBB]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isCore
                                  ? "bg-[#4D8DFF]"
                                  : isFoundational
                                    ? "bg-[#778294]"
                                    : "bg-[#8B6CFF]"
                              }`}
                            />
                            <span>{skill.name}</span>
                            {skill.note && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#151C27] text-[#778294] border border-[#1E2736]">
                                {skill.note}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
