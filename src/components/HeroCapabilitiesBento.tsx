import { useState } from "react";
import {
  Gamepad2,
  Radio,
  Cpu,
  Sparkles,
  Layers,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { HeroMini3DCanvas, Micro3DModelType } from "@/components/HeroMini3DCanvas";

export const HeroCapabilitiesBento = () => {
  const [activeModel, setActiveModel] = useState<Micro3DModelType>("quest");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1: Game Engines & Mechanics */}
        <div className="surface-card rounded-2xl p-4 sm:p-5 border border-[#1E2736] flex flex-col justify-between hover:border-[#4D8DFF]/50 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#151C27] border border-[#1E2736] text-[#8B6CFF]">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[#F4F6FA] tracking-tight">
                  Game Engines &amp; Physics
                </h3>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#151C27] border border-[#1E2736] text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                60Hz Physics
              </span>
            </div>

            <p className="text-xs text-[#A4ADBB] leading-relaxed mb-3">
              Production gameplay mechanics, GameInstance subsystems, and PhysX simulation in Unity (C#) &amp; UE5 (C++).
            </p>

            {/* Embedded 3D Game Crystal */}
            <div className="mb-3">
              <HeroMini3DCanvas modelType="game-crystal" className="w-full h-[115px]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1E2736]/70">
            {["Unreal Engine 5", "Unity C#", "PhysX", "Subsystems", "Shader Graph"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#151C27] text-[#A4ADBB] border border-[#1E2736]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Card 2: Immersive Spatial XR */}
        <div className="surface-card rounded-2xl p-4 sm:p-5 border border-[#1E2736] flex flex-col justify-between hover:border-[#4D8DFF]/50 transition-all duration-300 group">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#151C27] border border-[#1E2736] text-[#4D8DFF]">
                  <Radio className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[#F4F6FA] tracking-tight">
                  Immersive Spatial XR
                </h3>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#151C27] border border-[#1E2736] text-[10px] font-mono text-[#4D8DFF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF] animate-pulse" />
                6-DoF Inside-Out
              </span>
            </div>

            <p className="text-xs text-[#A4ADBB] leading-relaxed mb-3">
              Meta Quest 3 spatial applications, OpenXR interactions, cross-device RPC sync, and WebAR optical tracking.
            </p>

            {/* Embedded 3D Meta Quest 3 Headset */}
            <div className="mb-3">
              <HeroMini3DCanvas modelType="quest" className="w-full h-[115px]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1E2736]/70">
            {["Meta Quest 3", "OpenXR", "WebAR (MindAR)", "Agora Video", "MediaPipe"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#151C27] text-[#A4ADBB] border border-[#1E2736]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Card 3: AI-Augmented Engineering (Wide/Spanning) */}
        <div className="sm:col-span-2 surface-card rounded-2xl p-4 sm:p-5 border border-[#1E2736] hover:border-[#8B6CFF]/50 transition-all duration-300">
          <div className="grid sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-7 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#151C27] border border-[#1E2736] text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#F4F6FA] tracking-tight">
                    AI-Augmented Engineering Stack
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-400">
                  Agentic Pair Dev
                </span>
              </div>

              <p className="text-xs text-[#A4ADBB] leading-relaxed">
                Daily integration of frontier AI models to accelerate complex math, GLSL shaders, procedural C++ tessellation, and interactive test harnesses:
              </p>

              {/* AI Tools Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#151C27] text-[#4D8DFF] border border-[#4D8DFF]/40 font-medium">
                  <Terminal className="w-3.5 h-3.5" />
                  Google Antigravity
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#151C27] text-sky-400 border border-sky-500/40 font-medium">
                  Google Gemini 2.0 / Pro
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#151C27] text-[#8B6CFF] border border-[#8B6CFF]/40 font-medium">
                  Anthropic Claude 3.5
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#151C27] text-emerald-400 border border-emerald-500/40 font-medium">
                  OpenAI ChatGPT &amp; Codex
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#151C27] text-[#A4ADBB] border border-[#1E2736]">
                  MCP Tools
                </span>
              </div>
            </div>

            {/* Embedded 3D AI Neural Orb */}
            <div className="sm:col-span-5">
              <HeroMini3DCanvas modelType="ai-orb" className="w-full h-[125px]" />
            </div>
          </div>
        </div>

        {/* Card 4: Developer Telemetry & Stats (Spanning) */}
        <div className="sm:col-span-2 rounded-2xl p-4 bg-gradient-to-r from-[#10151D] via-[#151C27] to-[#10151D] border border-[#1E2736] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div>
              <p className="text-xl font-bold font-mono text-[#F4F6FA]">3+ Yrs</p>
              <p className="text-[11px] font-mono uppercase text-[#778294]">Real-Time Dev</p>
            </div>
            <div className="w-px h-8 bg-[#1E2736]" />
            <div>
              <p className="text-xl font-bold font-mono text-[#4D8DFF]">Unity &amp; UE5</p>
              <p className="text-[11px] font-mono uppercase text-[#778294]">Production Engines</p>
            </div>
            <div className="w-px h-8 bg-[#1E2736]" />
            <div>
              <p className="text-xl font-bold font-mono text-[#8B6CFF]">Quest 3 / XR</p>
              <p className="text-[11px] font-mono uppercase text-[#778294]">Spatial &amp; WebAR</p>
            </div>
            <div className="w-px h-8 bg-[#1E2736]" />
            <div>
              <p className="text-xl font-bold font-mono text-emerald-400">Agentic AI</p>
              <p className="text-[11px] font-mono uppercase text-[#778294]">Full AI Toolchain</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("skills")}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4D8DFF] hover:text-white transition-colors group"
          >
            <span>View All Skills</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
