import {
  ArrowDown,
  ArrowRight,
  Code2,
  Download,
  Gamepad2,
  Mail,
  Sparkles,
} from "lucide-react";
import { profileData } from "@/data/portfolioData";

export const Hero = () => {
  const resumeUrl = `${import.meta.env.BASE_URL}${profileData.resumeFileName}`;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-section relative isolate flex min-h-[760px] items-center overflow-hidden border-b border-[#1E2736] pb-16 pt-28 md:min-h-[860px] md:pb-20"
    >
      <img
        className="hero-art-image absolute inset-0 -z-20 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}hero-engine-view.png`}
        alt="Real-time 3D and game engine visualization"
        // @ts-expect-error React DOM custom attribute
        fetchpriority="high"
      />
      <div className="hero-art-shade pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-grain pointer-events-none absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12">
          <div className="max-w-[720px] space-y-7 lg:col-span-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0B1018]/70 px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.17em] text-[#C1CDDC] shadow-[0_8px_30px_-18px_rgba(0,0,0,.9)] backdrop-blur-md">
              <span className="hero-status-dot h-2 w-2 rounded-full bg-[#89B2FF]" />
              Unity &amp; Unreal developer <span className="text-[#7791B6]">/</span> Real-Time 3D &amp; XR
            </div>

            <div className="space-y-5">
              <p className="text-sm font-mono tracking-wide text-[#B8C7DA]">
                Hey, I’m <span className="font-semibold text-white">Sahil Vaghela.</span>
              </p>
              <h1 className="max-w-[700px] text-[2.75rem] font-bold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.15rem]">
                I build <span className="hero-title-accent">games</span> and the real-time systems behind them.
              </h1>
              <p className="max-w-[620px] text-base leading-relaxed text-[#D0D8E4] sm:text-lg">
                Software developer with 3+ years engineering gameplay mechanics, procedural geometry, architectural visualization, and XR experiences in Unity, Unreal Engine 5, C++, and WebGL — accelerated with agentic AI tooling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="hero-primary-action inline-flex items-center gap-2 rounded-xl bg-[#A9C8FF] px-5 py-3.5 text-sm font-semibold text-[#08101C] transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore my work <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#0B1018]/65 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-[#111927]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="h-4 w-4 text-[#A9C8FF]" /> Let’s talk
              </button>
              <a
                href={resumeUrl}
                download="Sahil_Vaghela_Software_Developer_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-medium text-[#D0D8E4] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>

            <div className="grid max-w-[640px] gap-3 pt-4 sm:grid-cols-2">
              <div className="hero-focus-card group rounded-2xl border border-white/[0.12] bg-[#0B111B]/70 p-4 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-[#9CBFFF]/45 hover:bg-[#111B2A]/85">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <span className="hero-icon-tile flex h-8 w-8 items-center justify-center rounded-lg border border-[#A9C8FF]/20 bg-[#A9C8FF]/10 text-[#A9C8FF] transition-transform group-hover:-rotate-3">
                      <Gamepad2 className="h-4 w-4" />
                    </span>
                    Game &amp; XR development
                  </div>
                  <span className="font-mono text-[10px] text-[#9BAFCB]">01</span>
                </div>
                <p className="text-xs leading-relaxed text-[#AAB8CC]">
                  Gameplay mechanics, 6-DoF Quest 3 interactions, real-time shaders &amp; multiplayer
                </p>
                <div className="mt-3 flex gap-2 text-[10px] font-mono uppercase tracking-wider text-[#B9C9DE]">
                  <span>Unity</span><span className="text-[#52627A]">/</span><span>Unreal 5</span><span className="text-[#52627A]">/</span><span>OpenXR</span>
                </div>
              </div>

              <div className="hero-focus-card group rounded-2xl border border-white/[0.12] bg-[#0B111B]/70 p-4 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-[#B9A8FF]/45 hover:bg-[#141526]/85">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <span className="hero-icon-tile flex h-8 w-8 items-center justify-center rounded-lg border border-[#B9A8FF]/20 bg-[#B9A8FF]/10 text-[#C2B4FF] transition-transform group-hover:rotate-3">
                      <Code2 className="h-4 w-4" />
                    </span>
                    Systems &amp; AI workflows
                  </div>
                  <span className="font-mono text-[10px] text-[#9BAFCB]">02</span>
                </div>
                <p className="text-xs leading-relaxed text-[#AAB8CC]">
                  C++ procedural geometry, DXF tessellation, Three.js &amp; agentic AI development
                </p>
                <div className="mt-3 flex gap-2 text-[10px] font-mono uppercase tracking-wider text-[#B9C9DE]">
                  <span>C++</span><span className="text-[#52627A]">/</span><span>Three.js</span><span className="text-[#52627A]">/</span><span>Antigravity</span>
                </div>
              </div>
            </div>

            {/* Subtle AI & Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-[#8B9CB2]">
              <span className="inline-flex items-center gap-1.5 text-[#C1CDDC]">
                <Sparkles className="h-3.5 w-3.5 text-[#89B2FF]" />
                <span>AI Stack:</span>
              </span>
              <span className="rounded-md border border-white/10 bg-[#0B111B]/60 px-2 py-0.5">Antigravity</span>
              <span className="rounded-md border border-white/10 bg-[#0B111B]/60 px-2 py-0.5">Gemini</span>
              <span className="rounded-md border border-white/10 bg-[#0B111B]/60 px-2 py-0.5">Claude</span>
              <span className="rounded-md border border-white/10 bg-[#0B111B]/60 px-2 py-0.5">Codex</span>
            </div>
          </div>

          <div className="hero-art-note hidden lg:block lg:col-span-4">
            <div className="ml-auto max-w-[210px] rounded-2xl border border-white/15 bg-[#0B111B]/55 p-4 text-right shadow-[0_20px_60px_-30px_rgba(0,0,0,.9)] backdrop-blur-md">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9EADC1]">
                Engine view <span className="text-[#A9C8FF]">/ 01</span>
              </div>
              <div className="mt-2 text-sm font-medium text-white">Worlds meet systems.</div>
              <div className="mt-1 text-[11px] text-[#AAB8CC]">Illustrative scene · concept art</div>
              <div className="mt-3 border-t border-white/10 pt-2.5">
                <div className="text-[10px] font-mono text-[#89B2FF]">Unity · UE5 · Meta Quest 3</div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#0B1018]/50 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#AAB8CC] backdrop-blur-md transition hover:border-white/25 hover:text-white md:inline-flex"
          aria-label="Scroll to about section"
        >
          Scroll to explore <ArrowDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};
