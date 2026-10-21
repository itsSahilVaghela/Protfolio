import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, Gamepad2, Sparkles, Eye, RotateCcw } from "lucide-react";

export type HeroModelKey = "quest" | "gamepad" | "ai-core";

interface Hero3DStageProps {
  className?: string;
}

export const Hero3DStage = ({ className = "" }: Hero3DStageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeModelKey, setActiveModelKey] = useState<HeroModelKey>("quest");
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  // References across render loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const currentMeshGroupRef = useRef<THREE.Group | null>(null);

  const stateRef = useRef({
    activeKey: activeModelKey,
    wireframe: wireframeMode,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    rotX: 0.2,
    rotY: -0.4,
    targetRotX: 0.2,
    targetRotY: -0.4,
    scale: 1,
    targetScale: 1,
    isVisible: true,
    reducedMotion: false,
  });

  useEffect(() => {
    stateRef.current.activeKey = activeModelKey;
  }, [activeModelKey]);

  useEffect(() => {
    stateRef.current.wireframe = wireframeMode;
    if (currentMeshGroupRef.current) {
      currentMeshGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = (child as THREE.Mesh).material;
          if (Array.isArray(m)) {
            m.forEach((mat) => (mat.wireframe = wireframeMode));
          } else if (m) {
            m.wireframe = wireframeMode;
          }
        }
      });
    }
  }, [wireframeMode]);

  // -------------------------------------------------------------
  // LOW-POLY 3D MODEL BUILDERS (PBR, flatShading, crisp facets)
  // -------------------------------------------------------------

  // 1. Meta Quest 3 VR Headset & Spatial Controller
  const buildQuestModel = (wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    // Dark sleek chassis material
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x141822,
      roughness: 0.35,
      metalness: 0.55,
      flatShading: true,
      wireframe,
    });

    // Face gasket / cushion material
    const gasketMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c10,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
      wireframe,
    });

    // Front sensor glass & lenses material (Electric blue glow)
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x4D8DFF,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      wireframe,
    });

    // Strap material
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x1f2633,
      roughness: 0.8,
      metalness: 0.2,
      flatShading: true,
      wireframe,
    });

    // Visor main curved body
    const visorGeo = new THREE.BoxGeometry(2.1, 1.1, 1.3, 3, 2, 2);
    const visor = new THREE.Mesh(visorGeo, chassisMat);
    visor.position.set(0, 0, 0);
    group.add(visor);

    // Facial gasket cushion (back)
    const gasketGeo = new THREE.BoxGeometry(2.15, 1.15, 0.4, 2, 2, 1);
    const gasket = new THREE.Mesh(gasketGeo, gasketMat);
    gasket.position.set(0, 0, -0.75);
    group.add(gasket);

    // Front pill camera sensors (Meta Quest 3 signature 3 front pill sensors)
    const sensorGeo = new THREE.CapsuleGeometry(0.12, 0.25, 4, 8);
    sensorGeo.rotateZ(Math.PI / 2);

    const sensorLeft = new THREE.Mesh(sensorGeo, sensorMat);
    sensorLeft.position.set(-0.55, -0.05, 0.66);
    group.add(sensorLeft);

    const sensorCenter = new THREE.Mesh(sensorGeo, sensorMat);
    sensorCenter.position.set(0, -0.05, 0.66);
    group.add(sensorCenter);

    const sensorRight = new THREE.Mesh(sensorGeo, sensorMat);
    sensorRight.position.set(0.55, -0.05, 0.66);
    group.add(sensorRight);

    // Side head-strap rigid arms
    const sideArmGeo = new THREE.BoxGeometry(0.12, 0.22, 1.8);
    const armL = new THREE.Mesh(sideArmGeo, strapMat);
    armL.position.set(-1.12, 0.05, -0.6);
    group.add(armL);

    const armR = new THREE.Mesh(sideArmGeo, strapMat);
    armR.position.set(1.12, 0.05, -0.6);
    group.add(armR);

    // Flexible rear strap arc
    const strapArcGeo = new THREE.TorusGeometry(1.05, 0.12, 5, 14, Math.PI);
    const strapArc = new THREE.Mesh(strapArcGeo, strapMat);
    strapArc.position.set(0, 0.05, -1.35);
    strapArc.rotation.x = Math.PI / 2;
    group.add(strapArc);

    // Accompanying 6-DoF Touch Plus Spatial Controller (floating alongside)
    const cGroup = new THREE.Group();
    cGroup.position.set(1.65, -0.5, 0.6);
    cGroup.rotation.set(-0.25, 0.35, -0.15);

    // Handle
    const handleGeo = new THREE.CylinderGeometry(0.16, 0.12, 1.1, 7);
    const handle = new THREE.Mesh(handleGeo, chassisMat);
    handle.position.y = -0.45;
    cGroup.add(handle);

    // Top tracking halo ring
    const haloGeo = new THREE.TorusGeometry(0.42, 0.08, 5, 12);
    const halo = new THREE.Mesh(haloGeo, chassisMat);
    halo.position.set(0, 0.1, 0.1);
    halo.rotation.x = 0.45;
    cGroup.add(halo);

    // Glowing laser pointer ray
    const rayGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 4);
    rayGeo.rotateX(Math.PI / 2);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x4D8DFF,
      transparent: true,
      opacity: 0.7,
      wireframe,
    });
    const ray = new THREE.Mesh(rayGeo, rayMat);
    ray.position.set(0, 0.1, 1.4);
    cGroup.add(ray);

    group.add(cGroup);
    return group;
  };

  // 2. Low-Poly Game Engine Controller / Mech Core
  const buildGamepadModel = (wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x161C27,
      roughness: 0.35,
      metalness: 0.65,
      flatShading: true,
      wireframe,
    });

    const gripMat = new THREE.MeshStandardMaterial({
      color: 0x0f131a,
      roughness: 0.8,
      metalness: 0.2,
      flatShading: true,
      wireframe,
    });

    const buttonMat = (col: number) =>
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.9,
        wireframe,
      });

    // Central controller bridge
    const bridgeGeo = new THREE.BoxGeometry(1.6, 0.85, 0.6, 3, 2, 2);
    const bridge = new THREE.Mesh(bridgeGeo, bodyMat);
    group.add(bridge);

    // Left ergonomic wing grip
    const wingGeo = new THREE.ConeGeometry(0.55, 1.7, 7);
    const leftWing = new THREE.Mesh(wingGeo, gripMat);
    leftWing.position.set(-1.15, -0.45, -0.05);
    leftWing.rotation.set(0.2, 0.15, 0.45);
    group.add(leftWing);

    // Right ergonomic wing grip
    const rightWing = new THREE.Mesh(wingGeo, gripMat);
    rightWing.position.set(1.15, -0.45, -0.05);
    rightWing.rotation.set(0.2, -0.15, -0.45);
    group.add(rightWing);

    // Dual analog thumbsticks
    const stickGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.28, 8);
    const stickL = new THREE.Mesh(stickGeo, bodyMat);
    stickL.position.set(-0.55, 0.42, 0.15);
    group.add(stickL);

    const stickR = new THREE.Mesh(stickGeo, bodyMat);
    stickR.position.set(0.42, 0.15, 0.15);
    group.add(stickR);

    // Directional Pad cross (Left)
    const dpadH = new THREE.BoxGeometry(0.55, 0.15, 0.12);
    const dpadV = new THREE.BoxGeometry(0.15, 0.55, 0.12);
    const dpadMat = new THREE.MeshStandardMaterial({ color: 0x242d3d, roughness: 0.5, metalness: 0.5, wireframe });
    const d1 = new THREE.Mesh(dpadH, dpadMat);
    d1.position.set(-0.55, -0.05, 0.32);
    const d2 = new THREE.Mesh(dpadV, dpadMat);
    d2.position.set(-0.55, -0.05, 0.32);
    group.add(d1);
    group.add(d2);

    // 4 Colored Action Buttons (Right)
    const btnGeo = new THREE.SphereGeometry(0.08, 6, 6);
    const btnA = new THREE.Mesh(btnGeo, buttonMat(0x10b981)); // Green
    btnA.position.set(0.95, 0.32, 0.32);
    const btnB = new THREE.Mesh(btnGeo, buttonMat(0xef4444)); // Red
    btnB.position.set(1.15, 0.52, 0.32);
    const btnX = new THREE.Mesh(btnGeo, buttonMat(0x4D8DFF)); // Blue
    btnX.position.set(0.75, 0.52, 0.32);
    const btnY = new THREE.Mesh(btnGeo, buttonMat(0xf59e0b)); // Amber
    btnY.position.set(0.95, 0.72, 0.32);
    group.add(btnA);
    group.add(btnB);
    group.add(btnX);
    group.add(btnY);

    // Glowing Engine Power Core in center
    const coreGeo = new THREE.IcosahedronGeometry(0.24, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x8B6CFF,
      emissive: 0x8B6CFF,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      wireframe,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, 0.25, 0.32);
    group.add(core);

    return group;
  };

  // 3. Low-Poly AI Quantum Neural Core
  const buildAiCoreModel = (wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    // Metallic ring material
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
      wireframe,
    });

    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x8B6CFF,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
      wireframe,
    });

    // Central faceted crystal nucleus
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.8,
      flatShading: true,
      wireframe,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Outer Gyroscope Ring
    const outerRingGeo = new THREE.TorusGeometry(1.65, 0.08, 5, 20);
    const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
    outerRing.name = "outerRing";
    group.add(outerRing);

    // Middle Gyroscope Ring
    const midRingGeo = new THREE.TorusGeometry(1.35, 0.07, 5, 18);
    const midRing = new THREE.Mesh(midRingGeo, innerRingMat);
    midRing.name = "midRing";
    midRing.rotation.x = Math.PI / 3;
    group.add(midRing);

    // Inner Gyroscope Ring
    const innerRingGeo = new THREE.TorusGeometry(1.08, 0.06, 5, 16);
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
    innerRing.name = "innerRing";
    innerRing.rotation.y = Math.PI / 4;
    group.add(innerRing);

    // Orbiting data bit cubes
    const bitGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const bitMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x4D8DFF,
      emissiveIntensity: 1.0,
      wireframe,
    });

    const numBits = 8;
    for (let i = 0; i < numBits; i++) {
      const angle = (i / numBits) * Math.PI * 2;
      const bit = new THREE.Mesh(bitGeo, bitMat);
      bit.position.set(Math.cos(angle) * 1.9, (i % 2 === 0 ? 0.3 : -0.3), Math.sin(angle) * 1.9);
      group.add(bit);
    }

    return group;
  };

  const loadModel = (key: HeroModelKey) => {
    if (!modelGroupRef.current) return;

    // Remove old model
    if (currentMeshGroupRef.current) {
      currentMeshGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.geometry.dispose();
          if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
          else if (m.material) m.material.dispose();
        }
      });
      modelGroupRef.current.remove(currentMeshGroupRef.current);
    }

    let newMesh: THREE.Group;
    if (key === "quest") {
      newMesh = buildQuestModel(stateRef.current.wireframe);
      newMesh.scale.set(1.15, 1.15, 1.15);
    } else if (key === "gamepad") {
      newMesh = buildGamepadModel(stateRef.current.wireframe);
      newMesh.scale.set(1.25, 1.25, 1.25);
    } else {
      newMesh = buildAiCoreModel(stateRef.current.wireframe);
      newMesh.scale.set(1.1, 1.1, 1.1);
    }

    currentMeshGroupRef.current = newMesh;
    modelGroupRef.current.add(newMesh);

    // Initial orientation tweak per model
    if (key === "quest") {
      stateRef.current.targetRotX = 0.2;
      stateRef.current.targetRotY = -0.35;
    } else if (key === "gamepad") {
      stateRef.current.targetRotX = 0.45;
      stateRef.current.targetRotY = -0.25;
    } else {
      stateRef.current.targetRotX = 0.3;
      stateRef.current.targetRotY = 0.4;
    }
  };

  // Switch model with scale pop
  const switchModel = (key: HeroModelKey) => {
    setActiveModelKey(key);
    stateRef.current.targetScale = 0.2;
    setTimeout(() => {
      loadModel(key);
      stateRef.current.targetScale = 1;
    }, 120);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // 4. Lighting Rig (PBR cinematic studio lighting)
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Directional Key Light (Electric blue tint)
    const keyLight = new THREE.DirectionalLight(0x4D8DFF, 2.5);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    // Rim/Back Light (Violet punch)
    const rimLight = new THREE.PointLight(0x8B6CFF, 3.5, 15);
    rimLight.position.set(-4, -3, -3);
    scene.add(rimLight);

    // Hemisphere sky/ground fill
    const hemiLight = new THREE.HemisphereLight(0x2a3b5c, 0x090d14, 0.8);
    scene.add(hemiLight);

    // Ground soft shadow plane
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(77, 141, 255, 0.25)");
      grad.addColorStop(0.4, "rgba(139, 108, 255, 0.08)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.75;
    scene.add(shadowMesh);

    // 5. Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Load initial model
    loadModel(stateRef.current.activeKey);

    // 6. Resize handling
    const resize = () => {
      if (!canvas || !renderer || !camera) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    resize();
    window.addEventListener("resize", resize);

    // 7. Observer to pause offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          stateRef.current.isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // 8. Pointer interactions (Drag to orbit 360°)
    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.isDragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.targetRotY += dx * 0.01;
      s.targetRotX = Math.max(-0.9, Math.min(0.9, s.targetRotX + dy * 0.01));
    };

    const onPointerUp = (e: PointerEvent) => {
      stateRef.current.isDragging = false;
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

    // 9. Render & Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const s = stateRef.current;
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (s.isVisible && modelGroup) {
        // Smooth rotation damping
        if (!s.isDragging && !s.reducedMotion) {
          s.targetRotY += 0.005; // Gentle continuous turntable rotation
        }

        s.rotX += (s.targetRotX - s.rotX) * 0.1;
        s.rotY += (s.targetRotY - s.rotY) * 0.1;
        modelGroup.rotation.x = s.rotX;
        modelGroup.rotation.y = s.rotY;

        // Floating levitation
        modelGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.12;

        // Scale pop interpolation
        s.scale += (s.targetScale - s.scale) * 0.18;
        modelGroup.scale.set(s.scale, s.scale, s.scale);

        // Internal sub-mesh animations for AI Core
        if (s.activeKey === "ai-core" && currentMeshGroupRef.current) {
          const outer = currentMeshGroupRef.current.getObjectByName("outerRing");
          const mid = currentMeshGroupRef.current.getObjectByName("midRing");
          const inner = currentMeshGroupRef.current.getObjectByName("innerRing");
          if (outer) outer.rotation.z += 0.01;
          if (mid) mid.rotation.y -= 0.012;
          if (inner) inner.rotation.x += 0.015;
        }

        renderer.render(scene, camera);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      renderer.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
    };
  }, []);

  const resetView = () => {
    stateRef.current.targetRotX = 0.2;
    stateRef.current.targetRotY = -0.35;
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#10151D] to-[#0A0D13] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2736]/70 bg-[#0C1017]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4D8DFF] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[#F4F6FA] uppercase tracking-wider">
            Real-Time 3D Stage //{" "}
            <span className="text-[#4D8DFF]">
              {activeModelKey === "quest" && "Meta Quest 3 XR Rig"}
              {activeModelKey === "gamepad" && "Game Engine Controller"}
              {activeModelKey === "ai-core" && "AI Quantum Neural Core"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWireframeMode(!wireframeMode)}
            aria-pressed={wireframeMode}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
              wireframeMode
                ? "bg-[#4D8DFF]/20 border-[#4D8DFF] text-[#4D8DFF]"
                : "bg-[#151C27] border-[#1E2736] text-[#A4ADBB] hover:text-[#F4F6FA]"
            }`}
            title="Toggle Low-Poly Wireframe"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Wireframe</span>
          </button>

          <button
            type="button"
            onClick={resetView}
            className="p-1.5 rounded-md bg-[#151C27] border border-[#1E2736] text-[#A4ADBB] hover:text-[#F4F6FA] transition-colors"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative h-[340px] sm:h-[420px] bg-[#07090E] select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
          aria-label="Interactive 3D low poly model viewer"
        />

        {/* Ambient Subtle Tech Overlay */}
        <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-3 font-mono text-[11px] text-[#778294]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            WebGL PBR Shading
          </span>
          <span>·</span>
          <span>Drag to Orbit 360°</span>
        </div>
      </div>

      {/* Floating Model Switcher Dock at Bottom */}
      <div className="p-3 border-t border-[#1E2736]/70 bg-[#0C1017]/90 backdrop-blur-md flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => switchModel("quest")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeModelKey === "quest"
              ? "bg-[#4D8DFF] text-[#080B10] shadow-[0_0_20px_-4px_rgba(77,141,255,0.6)] font-semibold"
              : "bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736]"
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>01 // Meta Quest 3</span>
        </button>

        <button
          type="button"
          onClick={() => switchModel("gamepad")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeModelKey === "gamepad"
              ? "bg-[#8B6CFF] text-[#080B10] shadow-[0_0_20px_-4px_rgba(139,108,255,0.6)] font-semibold"
              : "bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736]"
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>02 // Game Controller</span>
        </button>

        <button
          type="button"
          onClick={() => switchModel("ai-core")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeModelKey === "ai-core"
              ? "bg-sky-400 text-[#080B10] shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)] font-semibold"
              : "bg-[#151C27] text-[#A4ADBB] hover:text-[#F4F6FA] border border-[#1E2736]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>03 // AI Neural Core</span>
        </button>
      </div>
    </div>
  );
};
