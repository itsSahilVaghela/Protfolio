import { Briefcase, Calendar } from "lucide-react";
import { experienceTimeline } from "@/data/portfolioData";

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 md:py-32 border-b border-[#1E2736] bg-[#0A0E15]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736] mb-4">
              <Briefcase className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                CAREER PROGRESSION · 3+ YEARS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F6FA]">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-[#A4ADBB] text-base sm:text-lg mt-3 max-w-2xl">
              Progression from AI &amp; computer-vision prototyping to full
              Unity C# game/XR development and Unreal Engine 5 C++ architectural
              systems at Invisible Fiction.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div
              className="hidden sm:block absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#4D8DFF] via-[#8B6CFF]/60 to-[#1E2736]"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {experienceTimeline.map((exp, index) => (
                <article
                  key={index}
                  className="relative sm:pl-16"
                >
                  {/* Timeline Node */}
                  <div
                    className={`hidden sm:flex absolute left-2.5 top-6 w-5 h-5 rounded-full items-center justify-center border-2 ${
                      exp.current
                        ? "bg-[#080B10] border-[#4D8DFF] shadow-[0_0_12px_rgba(77,141,255,0.65)]"
                        : "bg-[#080B10] border-[#8B6CFF]/70"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        exp.current ? "bg-[#4D8DFF]" : "bg-[#8B6CFF]"
                      }`}
                    />
                  </div>

                  <div
                    className={`surface-card rounded-2xl p-6 sm:p-8 ${
                      exp.current ? "border-[#4D8DFF]/35 bg-[#111722]" : ""
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-bold text-[#F4F6FA]">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#4D8DFF]/15 text-[#4D8DFF] border border-[#4D8DFF]/35">
                              Current Role
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-mono text-[#4D8DFF] mt-1">
                          {exp.company}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151C27] border border-[#1E2736] text-xs font-mono text-[#A4ADBB] self-start">
                        <Calendar className="w-3.5 h-3.5 text-[#8B6CFF]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Concise Role Summary */}
                    <p className="text-sm sm:text-base text-[#F4F6FA]/90 leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    {/* Key Contributions */}
                    <ul className="space-y-2 mb-6">
                      {exp.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-[#A4ADBB] leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4D8DFF] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1E2736]">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#080B10] text-[#A4ADBB] border border-[#1E2736]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
