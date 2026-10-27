import { useEffect, useRef } from "react";

export type Micro3DModelType = "quest" | "game-crystal" | "ai-orb";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: Vec3;
  b: Vec3;
  color: string;
}

interface Face {
  pts: Vec3[];
  fill: string;
}

interface ModelGeometry {
  edges: Edge[];
  faces: Face[];
}

// 1. Meta Quest 3 3D Spatial Rig
function createQuestModel(): ModelGeometry {
  const edges: Edge[] = [];
  const faces: Face[] = [];

  // Visor rounded box
  const w = 0.95;
  const h = 0.48;
  const d = 0.65;
  const corners: Vec3[] = [
    { x: -w, y: -h, z: -d },
    { x: w, y: -h, z: -d },
    { x: w, y: -h, z: d },
    { x: -w, y: -h, z: d },
    { x: -w * 0.9, y: h, z: -d * 0.9 },
    { x: w * 0.9, y: h, z: -d * 0.9 },
    { x: w * 0.9, y: h, z: d * 0.9 },
    { x: -w * 0.9, y: h, z: d * 0.9 },
  ];

  for (let i = 0; i < 4; i++) {
    edges.push({ a: corners[i], b: corners[(i + 1) % 4], color: "rgba(77, 141, 255, 0.85)" });
    edges.push({ a: corners[i + 4], b: corners[((i + 1) % 4) + 4], color: "rgba(77, 141, 255, 0.85)" });
    edges.push({ a: corners[i], b: corners[i + 4], color: "rgba(77, 141, 255, 0.85)" });
  }

  faces.push({
    pts: [corners[0], corners[1], corners[5], corners[4]],
    fill: "rgba(77, 141, 255, 0.08)",
  });
  faces.push({
    pts: [corners[3], corners[2], corners[6], corners[7]],
    fill: "rgba(77, 141, 255, 0.12)",
  });

  // Front camera sensors
  const camL: Vec3[] = [
    { x: -0.45, y: -0.15, z: d + 0.02 },
    { x: -0.22, y: -0.15, z: d + 0.02 },
    { x: -0.22, y: 0.15, z: d + 0.02 },
    { x: -0.45, y: 0.15, z: d + 0.02 },
  ];
  const camR: Vec3[] = [
    { x: 0.22, y: -0.15, z: d + 0.02 },
    { x: 0.45, y: -0.15, z: d + 0.02 },
    { x: 0.45, y: 0.15, z: d + 0.02 },
    { x: 0.22, y: 0.15, z: d + 0.02 },
  ];
  for (let i = 0; i < 4; i++) {
    edges.push({ a: camL[i], b: camL[(i + 1) % 4], color: "rgba(56, 189, 248, 0.9)" });
    edges.push({ a: camR[i], b: camR[(i + 1) % 4], color: "rgba(56, 189, 248, 0.9)" });
  }

  // 6-DoF spatial tracking laser ray
  edges.push({
    a: { x: 0, y: 0, z: d },
    b: { x: 0, y: -0.3, z: d + 1.2 },
    color: "rgba(139, 108, 255, 0.95)",
  });

  return { edges, faces };
}

// 2. 3D Game Engine Crystal / Power Core
function createGameCrystalModel(): ModelGeometry {
  const edges: Edge[] = [];
  const faces: Face[] = [];

  const top: Vec3 = { x: 0, y: 1.15, z: 0 };
  const bottom: Vec3 = { x: 0, y: -1.15, z: 0 };
  const midSegs = 6;
  const midR = 0.85;

  const ring: Vec3[] = [];
  for (let i = 0; i < midSegs; i++) {
    const angle = (i / midSegs) * Math.PI * 2;
    ring.push({
      x: Math.cos(angle) * midR,
      y: (i % 2 === 0 ? 0.12 : -0.12),
      z: Math.sin(angle) * midR,
    });
  }

  for (let i = 0; i < midSegs; i++) {
    const next = (i + 1) % midSegs;
    edges.push({ a: top, b: ring[i], color: "rgba(139, 108, 255, 0.9)" });
    edges.push({ a: bottom, b: ring[i], color: "rgba(77, 141, 255, 0.9)" });
    edges.push({ a: ring[i], b: ring[next], color: "rgba(56, 189, 248, 0.85)" });

    faces.push({
      pts: [top, ring[i], ring[next]],
      fill: "rgba(139, 108, 255, 0.09)",
    });
    faces.push({
      pts: [bottom, ring[next], ring[i]],
      fill: "rgba(77, 141, 255, 0.08)",
    });
  }

  // Energy core coordinate box
  const bs = 0.35;
  const b0: Vec3 = { x: -bs, y: -bs, z: -bs };
  const b1: Vec3 = { x: bs, y: -bs, z: -bs };
  const b2: Vec3 = { x: bs, y: bs, z: -bs };
  const b3: Vec3 = { x: -bs, y: bs, z: -bs };
  for (let i = 0; i < 4; i++) {
    const pts = [b0, b1, b2, b3];
    edges.push({ a: pts[i], b: pts[(i + 1) % 4], color: "rgba(255, 255, 255, 0.6)" });
  }

  return { edges, faces };
}

// 3. 3D AI Neural Orb / Geodesic Icosahedron
function createAiOrbModel(): ModelGeometry {
  const edges: Edge[] = [];
  const faces: Face[] = [];

  const phi = (1 + Math.sqrt(5)) / 2;
  const s = 0.55;

  const rawVerts: Vec3[] = [
    { x: -s, y: phi * s, z: 0 },
    { x: s, y: phi * s, z: 0 },
    { x: -s, y: -phi * s, z: 0 },
    { x: s, y: -phi * s, z: 0 },
    { x: 0, y: -s, z: phi * s },
    { x: 0, y: s, z: phi * s },
    { x: 0, y: -s, z: -phi * s },
    { x: 0, y: s, z: -phi * s },
    { x: phi * s, y: 0, z: -s },
    { x: phi * s, y: 0, z: s },
    { x: -phi * s, y: 0, z: -s },
    { x: -phi * s, y: 0, z: s },
  ];

  // Connect nearest neighbors for icosahedron
  const threshold = 1.25 * s;
  for (let i = 0; i < rawVerts.length; i++) {
    for (let j = i + 1; j < rawVerts.length; j++) {
      const dx = rawVerts[i].x - rawVerts[j].x;
      const dy = rawVerts[i].y - rawVerts[j].y;
      const dz = rawVerts[i].z - rawVerts[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < threshold + 0.1) {
        edges.push({
          a: rawVerts[i],
          b: rawVerts[j],
          color: "rgba(77, 141, 255, 0.75)",
        });
      }
    }
  }

  // Orbital neural halo ring
  const haloSegs = 14;
  const haloR = 1.15;
  for (let i = 0; i < haloSegs; i++) {
    const a1 = (i / haloSegs) * Math.PI * 2;
    const a2 = ((i + 1) / haloSegs) * Math.PI * 2;
    edges.push({
      a: { x: Math.cos(a1) * haloR, y: Math.sin(a1) * 0.3, z: Math.sin(a1) * haloR },
      b: { x: Math.cos(a2) * haloR, y: Math.sin(a2) * 0.3, z: Math.sin(a2) * haloR },
      color: "rgba(139, 108, 255, 0.85)",
    });
  }

  return { edges, faces };
}

const MODEL_GENERATORS: Record<Micro3DModelType, () => ModelGeometry> = {
  quest: createQuestModel,
  "game-crystal": createGameCrystalModel,
  "ai-orb": createAiOrbModel,
};

interface HeroMini3DCanvasProps {
  modelType: Micro3DModelType;
  className?: string;
}

export const HeroMini3DCanvas = ({
  modelType,
  className = "w-full h-[140px]",
}: HeroMini3DCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let isVisible = true;
    let yaw = 0.5;
    let pitch = 0.25;
    let targetYaw = 0.5;
    let targetPitch = 0.25;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const geometry = MODEL_GENERATORS[modelType]();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetYaw += dx * 0.015;
      targetPitch = Math.max(-0.8, Math.min(0.8, targetPitch + dy * 0.015));
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const project = (
      v: Vec3,
      cosY: number,
      sinY: number,
      cosP: number,
      sinP: number,
      w: number,
      h: number
    ) => {
      const x1 = v.x * cosY - v.z * sinY;
      const z1 = v.x * sinY + v.z * cosY;
      const y2 = v.y * cosP - z1 * sinP;
      const z2 = v.y * sinP + z1 * cosP;

      const camDist = 4.2;
      const depth = camDist - z2;
      const scale = (Math.min(w, h) * 0.9) / Math.max(1.2, depth);

      return {
        x: w * 0.5 + x1 * scale,
        y: h * 0.5 - y2 * scale,
      };
    };

    const render = () => {
      if (isVisible) {
        if (!isDragging && !prefersReducedMotion) {
          targetYaw += 0.009;
        }
        yaw += (targetYaw - yaw) * 0.1;
        pitch += (targetPitch - pitch) * 0.1;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        ctx.clearRect(0, 0, w, h);

        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const cosP = Math.cos(pitch);
        const sinP = Math.sin(pitch);

        // Draw translucent faces
        for (const face of geometry.faces) {
          ctx.beginPath();
          for (let i = 0; i < face.pts.length; i++) {
            const p = project(face.pts[i], cosY, sinY, cosP, sinP, w, h);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
          ctx.fillStyle = face.fill;
          ctx.fill();
        }

        // Draw wireframe edges
        for (const edge of geometry.edges) {
          const p1 = project(edge.a, cosY, sinY, cosP, sinP, w, h);
          const p2 = project(edge.b, cosY, sinY, cosP, sinP, w, h);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = edge.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [modelType]);

  return (
    <div className={`relative ${className} select-none overflow-hidden rounded-xl bg-[#090D14]/70 border border-[#1E2736]/70`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
        aria-label={`Interactive 3D preview: ${modelType}`}
      />
      <div className="pointer-events-none absolute bottom-1.5 right-2 text-[9px] font-mono text-[#778294] tracking-wider uppercase">
        3D Drag to Rotate
      </div>
    </div>
  );
};
