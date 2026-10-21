import { useEffect, useRef, useState } from "react";
import {
  Layers,
  Eye,
  RotateCcw,
  Cpu,
  Radio,
  Gamepad2,
  Globe,
  Compass,
} from "lucide-react";

export type DomainKey = "xr" | "games" | "web3d" | "procedural";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: Vec3;
  b: Vec3;
  layer: "structure" | "telemetry" | "mesh" | "grid";
}

interface FacePoly {
  pts: Vec3[];
  layer: "structure" | "mesh";
  fill: string;
}

// -------------------------------------------------------------
// 1. XR & SPATIAL COMPUTING (Meta Quest 3 Headset + 6DoF Controllers + Tracking Reticle)
// -------------------------------------------------------------
function buildXrGeometry(): { edges: Edge[]; faces: FacePoly[] } {
  const edges: Edge[] = [];
  const faces: FacePoly[] = [];

  // Ground spatial reference grid
  for (let i = -3; i <= 3; i++) {
    edges.push({
      a: { x: i * 0.8, y: -1.2, z: -2.4 },
      b: { x: i * 0.8, y: -1.2, z: 2.4 },
      layer: "grid",
    });
    edges.push({
      a: { x: -2.4, y: -1.2, z: i * 0.8 },
      b: { x: 2.4, y: -1.2, z: i * 0.8 },
      layer: "grid",
    });
  }

  // Meta Quest 3 Headset Visor Chassis
  const visorW = 1.15;
  const visorH = 0.55;
  const visorD = 0.75;
  const vY = 0.15;

  const vCorners: Vec3[] = [
    { x: -visorW, y: vY - visorH, z: -visorD },
    { x: visorW, y: vY - visorH, z: -visorD },
    { x: visorW, y: vY - visorH, z: visorD },
    { x: -visorW, y: vY - visorH, z: visorD },
    { x: -visorW * 0.9, y: vY + visorH, z: -visorD * 0.85 },
    { x: visorW * 0.9, y: vY + visorH, z: -visorD * 0.85 },
    { x: visorW * 0.9, y: vY + visorH, z: visorD * 0.85 },
    { x: -visorW * 0.9, y: vY + visorH, z: visorD * 0.85 },
  ];

  for (let i = 0; i < 4; i++) {
    edges.push({ a: vCorners[i], b: vCorners[(i + 1) % 4], layer: "structure" });
    edges.push({ a: vCorners[i + 4], b: vCorners[((i + 1) % 4) + 4], layer: "structure" });
    edges.push({ a: vCorners[i], b: vCorners[i + 4], layer: "structure" });
  }

  faces.push({
    pts: [vCorners[0], vCorners[1], vCorners[5], vCorners[4]],
    layer: "structure",
    fill: "rgba(77, 141, 255, 0.08)",
  });
  faces.push({
    pts: [vCorners[3], vCorners[2], vCorners[6], vCorners[7]],
    layer: "structure",
    fill: "rgba(77, 141, 255, 0.08)",
  });

  // Front camera sensors on Quest 3
  const camL: Vec3[] = [
    { x: -0.55, y: vY - 0.2, z: visorD + 0.02 },
    { x: -0.3, y: vY - 0.2, z: visorD + 0.02 },
    { x: -0.3, y: vY + 0.1, z: visorD + 0.02 },
    { x: -0.55, y: vY + 0.1, z: visorD + 0.02 },
  ];
  const camR: Vec3[] = [
    { x: 0.3, y: vY - 0.2, z: visorD + 0.02 },
    { x: 0.55, y: vY - 0.2, z: visorD + 0.02 },
    { x: 0.55, y: vY + 0.1, z: visorD + 0.02 },
    { x: 0.3, y: vY + 0.1, z: visorD + 0.02 },
  ];
  for (let i = 0; i < 4; i++) {
    edges.push({ a: camL[i], b: camL[(i + 1) % 4], layer: "telemetry" });
    edges.push({ a: camR[i], b: camR[(i + 1) % 4], layer: "telemetry" });
  }

  // Dual 6-DoF Spatial Controllers (Left & Right)
  const buildController = (offsetX: number, offsetZ: number) => {
    // Grip handle
    const hTop = { x: offsetX, y: -0.4, z: offsetZ };
    const hBottom = { x: offsetX * 0.9, y: -1.1, z: offsetZ - 0.2 };
    edges.push({ a: hTop, b: hBottom, layer: "structure" });

    // Tracking Halo Ring
    const haloSegs = 10;
    const haloR = 0.42;
    const haloCenter = { x: offsetX, y: -0.25, z: offsetZ + 0.1 };
    for (let i = 0; i < haloSegs; i++) {
      const a1 = (i / haloSegs) * Math.PI * 2;
      const a2 = ((i + 1) / haloSegs) * Math.PI * 2;
      const p1 = {
        x: haloCenter.x + Math.cos(a1) * haloR,
        y: haloCenter.y + Math.sin(a1) * haloR * 0.4,
        z: haloCenter.z + Math.sin(a1) * haloR,
      };
      const p2 = {
        x: haloCenter.x + Math.cos(a2) * haloR,
        y: haloCenter.y + Math.sin(a2) * haloR * 0.4,
        z: haloCenter.z + Math.sin(a2) * haloR,
      };
      edges.push({ a: p1, b: p2, layer: "mesh" });
    }

    // Laser pointer ray from controller forward
    edges.push({
      a: haloCenter,
      b: { x: offsetX * 1.5, y: 0.8, z: offsetZ + 2.2 },
      layer: "telemetry",
    });
  };

  buildController(-1.45, 0.4);
  buildController(1.45, 0.4);

  // Concentric 6-DoF spatial tracking waves around the origin
  for (const r of [1.6, 2.2]) {
    const ringSegs = 14;
    for (let i = 0; i < ringSegs; i++) {
      const a1 = (i / ringSegs) * Math.PI * 2;
      const a2 = ((i + 1) / ringSegs) * Math.PI * 2;
      edges.push({
        a: { x: Math.cos(a1) * r, y: -1.2, z: Math.sin(a1) * r },
        b: { x: Math.cos(a2) * r, y: -1.2, z: Math.sin(a2) * r },
        layer: "telemetry",
      });
    }
  }

  return { edges, faces };
}

// -------------------------------------------------------------
// 2. GAME ENGINE ARCHITECTURE & PHYSICS MECH (Articulated Rig + Bounding Box + Velocity Vector)
// -------------------------------------------------------------
function buildGamesGeometry(): { edges: Edge[]; faces: FacePoly[] } {
  const edges: Edge[] = [];
  const faces: FacePoly[] = [];

  // Ground plane grid
  for (let i = -3; i <= 3; i++) {
    edges.push({
      a: { x: i * 0.75, y: -1.2, z: -2.25 },
      b: { x: i * 0.75, y: -1.2, z: 2.25 },
      layer: "grid",
    });
    edges.push({
      a: { x: -2.25, y: -1.2, z: i * 0.75 },
      b: { x: 2.25, y: -1.2, z: i * 0.75 },
      layer: "grid",
    });
  }

  // 3D Physics Bounding Box Collider (Box3 Wireframe)
  const bw = 1.35;
  const bh = 1.45;
  const bd = 1.15;
  const by = 0.05;

  const boxCorners: Vec3[] = [
    { x: -bw, y: by - bh, z: -bd },
    { x: bw, y: by - bh, z: -bd },
    { x: bw, y: by - bh, z: bd },
    { x: -bw, y: by - bh, z: bd },
    { x: -bw, y: by + bh, z: -bd },
    { x: bw, y: by + bh, z: -bd },
    { x: bw, y: by + bh, z: bd },
    { x: -bw, y: by + bh, z: bd },
  ];

  for (let i = 0; i < 4; i++) {
    edges.push({ a: boxCorners[i], b: boxCorners[(i + 1) % 4], layer: "structure" });
    edges.push({ a: boxCorners[i + 4], b: boxCorners[((i + 1) % 4) + 4], layer: "structure" });
    edges.push({ a: boxCorners[i], b: boxCorners[i + 4], layer: "structure" });
  }

  // Articulated Character / Mech Torso Geometry
  const chestTop: Vec3 = { x: 0, y: 0.95, z: 0 };
  const chestMid: Vec3[] = [
    { x: -0.7, y: 0.45, z: -0.5 },
    { x: 0.7, y: 0.45, z: -0.5 },
    { x: 0.7, y: 0.45, z: 0.5 },
    { x: -0.7, y: 0.45, z: 0.5 },
  ];
  const waist: Vec3[] = [
    { x: -0.45, y: -0.2, z: -0.35 },
    { x: 0.45, y: -0.2, z: -0.35 },
    { x: 0.45, y: -0.2, z: 0.35 },
    { x: -0.45, y: -0.2, z: 0.35 },
  ];

  for (let i = 0; i < 4; i++) {
    edges.push({ a: chestTop, b: chestMid[i], layer: "mesh" });
    edges.push({ a: chestMid[i], b: chestMid[(i + 1) % 4], layer: "mesh" });
    edges.push({ a: chestMid[i], b: waist[i], layer: "mesh" });
    edges.push({ a: waist[i], b: waist[(i + 1) % 4], layer: "mesh" });

    faces.push({
      pts: [chestTop, chestMid[i], chestMid[(i + 1) % 4]],
      layer: "mesh",
      fill: "rgba(139, 108, 255, 0.09)",
    });
  }

  // Pelvis & Legs
  const kneeL = { x: -0.65, y: -0.75, z: 0.25 };
  const footL = { x: -0.75, y: -1.2, z: -0.1 };
  const kneeR = { x: 0.65, y: -0.75, z: -0.2 };
  const footR = { x: 0.75, y: -1.2, z: 0.35 };

  edges.push({ a: waist[3], b: kneeL, layer: "structure" });
  edges.push({ a: kneeL, b: footL, layer: "structure" });
  edges.push({ a: waist[2], b: kneeR, layer: "structure" });
  edges.push({ a: kneeR, b: footR, layer: "structure" });

  // Dynamic Physics Velocity Vector Arrow (projecting forward)
  const arrowOrigin: Vec3 = { x: 0, y: 0.45, z: 0.5 };
  const arrowHead: Vec3 = { x: 0, y: 0.85, z: 1.85 };
  edges.push({ a: arrowOrigin, b: arrowHead, layer: "telemetry" });
  edges.push({ a: arrowHead, b: { x: -0.2, y: 0.75, z: 1.6 }, layer: "telemetry" });
  edges.push({ a: arrowHead, b: { x: 0.2, y: 0.75, z: 1.6 }, layer: "telemetry" });

  return { edges, faces };
}

// -------------------------------------------------------------
// 3. WEB 3D & SHADERS (Holographic Geodesic Sphere + Gimbal Rings + 2048x2048 UV Plane)
// -------------------------------------------------------------
function buildWeb3dGeometry(): { edges: Edge[]; faces: FacePoly[] } {
  const edges: Edge[] = [];
  const faces: FacePoly[] = [];

  // Reference grid
  for (let i = -2; i <= 2; i++) {
    edges.push({
      a: { x: i * 0.9, y: -1.15, z: -1.8 },
      b: { x: i * 0.9, y: -1.15, z: 1.8 },
      layer: "grid",
    });
    edges.push({
      a: { x: -1.8, y: -1.15, z: i * 0.9 },
      b: { x: 1.8, y: -1.15, z: i * 0.9 },
      layer: "grid",
    });
  }

  // Central Geodesic Holo-Sphere
  const r = 0.95;
  const latSegs = 6;
  const lonSegs = 12;

  const sphereGrid: Vec3[][] = [];
  for (let lat = 0; lat <= latSegs; lat++) {
    const theta = (lat / latSegs) * Math.PI - Math.PI / 2;
    const ring: Vec3[] = [];
    for (let lon = 0; lon < lonSegs; lon++) {
      const phi = (lon / lonSegs) * Math.PI * 2;
      ring.push({
        x: Math.cos(theta) * Math.cos(phi) * r,
        y: Math.sin(theta) * r + 0.1,
        z: Math.cos(theta) * Math.sin(phi) * r,
      });
    }
    sphereGrid.push(ring);
  }

  for (let lat = 0; lat < latSegs; lat++) {
    for (let lon = 0; lon < lonSegs; lon++) {
      const nextLon = (lon + 1) % lonSegs;
      const p1 = sphereGrid[lat][lon];
      const p2 = sphereGrid[lat][nextLon];
      const p3 = sphereGrid[lat + 1][nextLon];
      const p4 = sphereGrid[lat + 1][lon];

      edges.push({ a: p1, b: p2, layer: "mesh" });
      edges.push({ a: p1, b: p4, layer: "mesh" });

      if (lat % 2 === 0) {
        faces.push({
          pts: [p1, p2, p3, p4],
          layer: "mesh",
          fill: "rgba(77, 141, 255, 0.08)",
        });
      }
    }
  }

  // Orbiting Triple Gimbal Orientation Rings (Yaw, Pitch, Roll)
  const gimbalR = 1.35;
  const gimbalSegs = 16;
  for (let i = 0; i < gimbalSegs; i++) {
    const a1 = (i / gimbalSegs) * Math.PI * 2;
    const a2 = ((i + 1) / gimbalSegs) * Math.PI * 2;

    // Ring 1: Horizontal equatorial ring (Yaw)
    edges.push({
      a: { x: Math.cos(a1) * gimbalR, y: 0.1, z: Math.sin(a1) * gimbalR },
      b: { x: Math.cos(a2) * gimbalR, y: 0.1, z: Math.sin(a2) * gimbalR },
      layer: "structure",
    });

    // Ring 2: Vertical pitch ring
    edges.push({
      a: { x: Math.cos(a1) * gimbalR, y: Math.sin(a1) * gimbalR + 0.1, z: 0 },
      b: { x: Math.cos(a2) * gimbalR, y: Math.sin(a2) * gimbalR + 0.1, z: 0 },
      layer: "telemetry",
    });
  }

  // Unwarped 2048x2048 UV Texture Projection Plane (hovering below/side)
  const uvY = -1.15;
  const uvW = 1.4;
  const uvCorners: Vec3[] = [
    { x: -uvW, y: uvY, z: -uvW },
    { x: uvW, y: uvY, z: -uvW },
    { x: uvW, y: uvY, z: uvW },
    { x: -uvW, y: uvY, z: uvW },
  ];
  for (let i = 0; i < 4; i++) {
    edges.push({ a: uvCorners[i], b: uvCorners[(i + 1) % 4], layer: "structure" });
  }

  // Projection rays connecting UV corners to sphere pole
  for (let i = 0; i < 4; i++) {
    edges.push({
      a: uvCorners[i],
      b: { x: 0, y: 1.05, z: 0 },
      layer: "telemetry",
    });
  }

  return { edges, faces };
}

// -------------------------------------------------------------
// 4. PROCEDURAL GEOMETRY & CAD PIPELINE (DXF Floor Plan + C++ Tessellated Roof)
// -------------------------------------------------------------
function buildProceduralGeometry(): { edges: Edge[]; faces: FacePoly[] } {
  const edges: Edge[] = [];
  const faces: FacePoly[] = [];

  // CAD floor grid
  for (let i = -3; i <= 3; i++) {
    edges.push({
      a: { x: i * 0.8, y: -0.9, z: -2.4 },
      b: { x: i * 0.8, y: -0.9, z: 2.4 },
      layer: "grid",
    });
    edges.push({
      a: { x: -2.4, y: -0.9, z: i * 0.8 },
      b: { x: 2.4, y: -0.9, z: i * 0.8 },
      layer: "grid",
    });
  }

  // L-shaped building footprint (DXF WALLS layer)
  const footprint: [number, number][] = [
    [-1.9, -1.4],
    [1.9, -1.4],
    [1.9, 0.4],
    [0.3, 0.4],
    [0.3, 1.5],
    [-1.9, 1.5],
  ];

  const yFloor = -0.9;
  const yWallTop = 0.25;

  for (let i = 0; i < footprint.length; i++) {
    const [x1, z1] = footprint[i];
    const [x2, z2] = footprint[(i + 1) % footprint.length];
    const p1b = { x: x1, y: yFloor, z: z1 };
    const p2b = { x: x2, y: yFloor, z: z2 };
    const p1t = { x: x1, y: yWallTop, z: z1 };
    const p2t = { x: x2, y: yWallTop, z: z2 };

    edges.push({ a: p1b, b: p2b, layer: "structure" });
    edges.push({ a: p1t, b: p2t, layer: "structure" });
    edges.push({ a: p1b, b: p1t, layer: "structure" });

    faces.push({
      pts: [p1b, p2b, p2t, p1t],
      layer: "structure",
      fill: "rgba(77, 141, 255, 0.07)",
    });
  }

  // Procedural Roof Mesh Tessellation (C++ Roof Generator layer)
  const rRidge1: Vec3 = { x: -0.8, y: 1.05, z: -0.5 };
  const rRidge2: Vec3 = { x: 1.1, y: 1.05, z: -0.5 };
  const rRidge3: Vec3 = { x: -0.8, y: 0.95, z: 0.95 };

  const c0: Vec3 = { x: -2.0, y: yWallTop, z: -1.5 };
  const c1: Vec3 = { x: 2.0, y: yWallTop, z: -1.5 };
  const c2: Vec3 = { x: 2.0, y: yWallTop, z: 0.5 };
  const c3: Vec3 = { x: 0.4, y: yWallTop, z: 0.5 };
  const c4: Vec3 = { x: 0.4, y: yWallTop, z: 1.6 };
  const c5: Vec3 = { x: -2.0, y: yWallTop, z: 1.6 };

  const roofTriangles: [Vec3, Vec3, Vec3][] = [
    [c0, c1, rRidge1],
    [c1, rRidge2, rRidge1],
    [c1, c2, rRidge2],
    [c2, c3, rRidge2],
    [c3, rRidge1, rRidge2],
    [c3, rRidge3, rRidge1],
    [c3, c4, rRidge3],
    [c4, c5, rRidge3],
    [c5, c0, rRidge1],
    [c5, rRidge1, rRidge3],
  ];

  for (const [t1, t2, t3] of roofTriangles) {
    edges.push({ a: t1, b: t2, layer: "mesh" });
    edges.push({ a: t2, b: t3, layer: "mesh" });
    edges.push({ a: t3, b: t1, layer: "mesh" });
    faces.push({
      pts: [t1, t2, t3],
      layer: "mesh",
      fill: "rgba(139, 108, 255, 0.1)",
    });
  }

  // Ear-clipping triangulation telemetry lines
  edges.push({ a: c0, b: c3, layer: "telemetry" });
  edges.push({ a: c5, b: c2, layer: "telemetry" });

  return { edges, faces };
}

const GEOMETRY_MAP: Record<DomainKey, { edges: Edge[]; faces: FacePoly[] }> = {
  xr: buildXrGeometry(),
  games: buildGamesGeometry(),
  web3d: buildWeb3dGeometry(),
  procedural: buildProceduralGeometry(),
};

interface HeroViewport3DProps {
  activeDomain?: DomainKey;
  onDomainChange?: (domain: DomainKey) => void;
}

export const HeroViewport3D = ({
  activeDomain = "xr",
  onDomainChange,
}: HeroViewport3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [sceneMode, setSceneMode] = useState<DomainKey>(activeDomain);
  const [layers, setLayers] = useState({
    structure: true,
    telemetry: true,
    mesh: true,
    xray: true,
  });

  useEffect(() => {
    setSceneMode(activeDomain);
  }, [activeDomain]);

  const handleModeSelect = (mode: DomainKey) => {
    setSceneMode(mode);
    onDomainChange?.(mode);
  };

  const viewStateRef = useRef({
    yaw: 0.65,
    pitch: 0.42,
    targetYaw: 0.65,
    targetPitch: 0.42,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    isVisible: true,
    reducedMotion: false,
  });

  useEffect(() => {
    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    viewStateRef.current.reducedMotion = rmQuery.matches;
    const onRmChange = (e: MediaQueryListEvent) => {
      viewStateRef.current.reducedMotion = e.matches;
    };
    rmQuery.addEventListener("change", onRmChange);
    return () => rmQuery.removeEventListener("change", onRmChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          viewStateRef.current.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const projectPoint = (
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

      const camDist = 6.2;
      const depth = camDist - z2;
      const fovScale = Math.min(w, h) * 0.88;
      const scale = fovScale / Math.max(1.2, depth);

      return {
        x: w * 0.5 + x1 * scale,
        y: h * 0.52 - y2 * scale,
        depth,
      };
    };

    const renderFrame = () => {
      const state = viewStateRef.current;
      if (state.isVisible) {
        if (!state.isDragging && !state.reducedMotion) {
          state.targetYaw += 0.0028;
        }
        state.yaw += (state.targetYaw - state.yaw) * 0.12;
        state.pitch += (state.targetPitch - state.pitch) * 0.12;

        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        ctx.clearRect(0, 0, w, h);

        // Ambient radial glow
        const grad = ctx.createRadialGradient(
          w * 0.5,
          h * 0.52,
          10,
          w * 0.5,
          h * 0.52,
          w * 0.55
        );
        grad.addColorStop(0, "rgba(77, 141, 255, 0.09)");
        grad.addColorStop(0.55, "rgba(139, 108, 255, 0.03)");
        grad.addColorStop(1, "rgba(8, 11, 16, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const cosY = Math.cos(state.yaw);
        const sinY = Math.sin(state.yaw);
        const cosP = Math.cos(state.pitch);
        const sinP = Math.sin(state.pitch);

        const activeGeo = GEOMETRY_MAP[sceneMode] || GEOMETRY_MAP.xr;

        // Render faces (X-Ray translucent fills)
        if (layers.xray) {
          for (const face of activeGeo.faces) {
            if (face.layer === "structure" && !layers.structure) continue;
            if (face.layer === "mesh" && !layers.mesh) continue;

            ctx.beginPath();
            for (let i = 0; i < face.pts.length; i++) {
              const p = projectPoint(face.pts[i], cosY, sinY, cosP, sinP, w, h);
              if (i === 0) ctx.moveTo(p.x, p.y);
              else ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            ctx.fillStyle = face.fill;
            ctx.fill();
          }
        }

        // Render edges by layer
        for (const edge of activeGeo.edges) {
          if (edge.layer === "structure" && !layers.structure) continue;
          if (edge.layer === "telemetry" && !layers.telemetry) continue;
          if (edge.layer === "mesh" && !layers.mesh) continue;

          const p1 = projectPoint(edge.a, cosY, sinY, cosP, sinP, w, h);
          const p2 = projectPoint(edge.b, cosY, sinY, cosP, sinP, w, h);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (edge.layer === "grid") {
            ctx.strokeStyle = "rgba(119, 130, 148, 0.16)";
            ctx.lineWidth = 1;
            ctx.stroke();
          } else if (edge.layer === "structure") {
            ctx.strokeStyle = "rgba(77, 141, 255, 0.85)";
            ctx.lineWidth = 1.35;
            ctx.stroke();
          } else if (edge.layer === "telemetry") {
            ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
            ctx.lineWidth = 1.1;
            ctx.stroke();
          } else if (edge.layer === "mesh") {
            ctx.strokeStyle = "rgba(139, 108, 255, 0.9)";
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [sceneMode, layers]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const s = viewStateRef.current;
    s.isDragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const s = viewStateRef.current;
    if (!s.isDragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;

    s.targetYaw += dx * 0.007;
    s.targetPitch = Math.max(-0.95, Math.min(1.1, s.targetPitch + dy * 0.007));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const s = viewStateRef.current;
    s.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already lost
    }
  };

  const resetView = () => {
    const s = viewStateRef.current;
    s.targetYaw = 0.65;
    s.targetPitch = 0.42;
  };

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div
      ref={containerRef}
      className="surface-card rounded-2xl overflow-hidden border border-[#1E2736] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.6)]"
    >
      {/* Viewport Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#10151D] border-b border-[#1E2736]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4D8DFF] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[#F4F6FA] uppercase tracking-wider">
            Real-Time 3D Engine Console
          </span>
        </div>
        <button
          type="button"
          onClick={resetView}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono text-[#A4ADBB] hover:text-[#F4F6FA] bg-[#151C27] hover:bg-[#1E2736] border border-[#1E2736] transition-colors"
          aria-label="Reset 3D camera orientation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset View
        </button>
      </div>

      {/* 4 Multi-Domain Selector Tabs */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#1E2736] bg-[#0C1017]"
        role="tablist"
        aria-label="Real-Time 3D Disciplines"
      >
        <button
          type="button"
          role="tab"
          aria-selected={sceneMode === "xr"}
          onClick={() => handleModeSelect("xr")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-mono border-b-2 transition-colors ${
            sceneMode === "xr"
              ? "border-[#4D8DFF] text-[#F4F6FA] bg-[#151C27]/70"
              : "border-transparent text-[#778294] hover:text-[#A4ADBB]"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-[#4D8DFF]" />
          <span className="truncate">01 // Spatial XR</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sceneMode === "games"}
          onClick={() => handleModeSelect("games")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-mono border-b-2 transition-colors ${
            sceneMode === "games"
              ? "border-[#8B6CFF] text-[#F4F6FA] bg-[#151C27]/70"
              : "border-transparent text-[#778294] hover:text-[#A4ADBB]"
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5 text-[#8B6CFF]" />
          <span className="truncate">02 // Game Systems</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sceneMode === "web3d"}
          onClick={() => handleModeSelect("web3d")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-mono border-b-2 transition-colors ${
            sceneMode === "web3d"
              ? "border-[#4D8DFF] text-[#F4F6FA] bg-[#151C27]/70"
              : "border-transparent text-[#778294] hover:text-[#A4ADBB]"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-[#4D8DFF]" />
          <span className="truncate">03 // Web 3D</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={sceneMode === "procedural"}
          onClick={() => handleModeSelect("procedural")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-mono border-b-2 transition-colors ${
            sceneMode === "procedural"
              ? "border-[#8B6CFF] text-[#F4F6FA] bg-[#151C27]/70"
              : "border-transparent text-[#778294] hover:text-[#A4ADBB]"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#8B6CFF]" />
          <span className="truncate">04 // Procedural</span>
        </button>
      </div>

      {/* Interactive 3D Canvas Area */}
      <div className="relative h-[310px] sm:h-[350px] bg-[#080B10] bg-tech-grid select-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
          aria-label="Interactive 3D real-time model preview"
        />

        {/* Top-left Telemetry Overlay */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1 bg-[#10151D]/90 backdrop-blur-sm border border-[#1E2736] rounded-lg px-3 py-2 max-w-[85%]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F4F6FA]">
            <Cpu className="w-3.5 h-3.5 text-[#4D8DFF] flex-shrink-0" />
            <span className="truncate">
              {sceneMode === "xr" && "Meta Quest 3 · OpenXR · Multiuser RPC"}
              {sceneMode === "games" && "Unity & UE5 · Subsystems & PhysX Rig"}
              {sceneMode === "web3d" && "Three.js WebGL · Shaders & WebAR"}
              {sceneMode === "procedural" && "C++ Procedural · DXF/JSON Mesh Tessellation"}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#778294] truncate">
            {sceneMode === "xr" && "Telemetry: 6-DoF Inside-Out · Controller Haptics · Spatial Ray"}
            {sceneMode === "games" && "Telemetry: 60Hz Tick · Rigidbody Bounds · Velocity Vectors"}
            {sceneMode === "web3d" && "Telemetry: GLSL Vertex Displacement · Triple Gimbal · UV Map"}
            {sceneMode === "procedural" && "Telemetry: Ear-Clipping · Layer Extraction · Gap Handling"}
          </span>
        </div>

        {/* Bottom-right Interactive Hint */}
        <div className="pointer-events-none absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#10151D]/90 border border-[#1E2736] text-[10px] font-mono text-[#778294]">
          Drag to Orbit 360°
        </div>
      </div>

      {/* Layer Controls Footer */}
      <div className="px-4 py-3 bg-[#10151D] border-t border-[#1E2736] flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-[#778294] flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#4D8DFF]" />
          Layers:
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleLayer("structure")}
            aria-pressed={layers.structure}
            className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
              layers.structure
                ? "bg-[#4D8DFF]/15 border-[#4D8DFF]/50 text-[#F4F6FA]"
                : "bg-[#080B10] border-[#1E2736] text-[#778294]"
            }`}
          >
            {sceneMode === "xr"
              ? "HEADSET_RIG"
              : sceneMode === "games"
                ? "BOUNDS_BOX"
                : sceneMode === "web3d"
                  ? "GIMBAL_RINGS"
                  : "DXF_WALLS"}
          </button>

          <button
            type="button"
            onClick={() => toggleLayer("telemetry")}
            aria-pressed={layers.telemetry}
            className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
              layers.telemetry
                ? "bg-sky-500/15 border-sky-400/50 text-[#F4F6FA]"
                : "bg-[#080B10] border-[#1E2736] text-[#778294]"
            }`}
          >
            {sceneMode === "xr"
              ? "SPATIAL_RAYS"
              : sceneMode === "games"
                ? "VELOCITY_VEC"
                : sceneMode === "web3d"
                  ? "UV_PROJECTION"
                  : "EAR_CLIPPING"}
          </button>

          <button
            type="button"
            onClick={() => toggleLayer("mesh")}
            aria-pressed={layers.mesh}
            className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
              layers.mesh
                ? "bg-[#8B6CFF]/15 border-[#8B6CFF]/50 text-[#F4F6FA]"
                : "bg-[#080B10] border-[#1E2736] text-[#778294]"
            }`}
          >
            {sceneMode === "xr"
              ? "CONTROLLERS"
              : sceneMode === "games"
                ? "MECH_RIG"
                : sceneMode === "web3d"
                  ? "HOLO_SPHERE"
                  : "ROOF_TESSELLATION"}
          </button>

          <button
            type="button"
            onClick={() => toggleLayer("xray")}
            aria-pressed={layers.xray}
            className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
              layers.xray
                ? "bg-emerald-500/15 border-emerald-400/50 text-[#F4F6FA]"
                : "bg-[#080B10] border-[#1E2736] text-[#778294]"
            }`}
          >
            XRAY_FILL
          </button>
        </div>
      </div>
    </div>
  );
};
