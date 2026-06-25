"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { HERO_SLIDES } from "@/lib/heroSlides";

type SceneConfig = {
  cardActiveScale: number;
  cardIdleScale: number;
  cardSize: [number, number, number];
  screenSize: [number, number];
  barY: number;
  radius: number;
  carouselY: number;
  stars: number;
  sparkles: number;
  sparkleScale: [number, number, number];
  sparkleY: number;
  fogNear: number;
  fogFar: number;
  glowY: number;
  glowRadius: number;
  showGrid: boolean;
  showFloating: boolean;
  activeEmissive: number;
  activeLight: number;
  floatAmp: number;
  useBasicScreen: boolean;
  showGlowRing: boolean;
  carouselLerp: number;
  frameColor: string;
};

const DESKTOP: SceneConfig = {
  cardActiveScale: 1.2,
  cardIdleScale: 0.75,
  cardSize: [2.8, 1.7, 0.1],
  screenSize: [2.55, 1.45],
  barY: 0.88,
  radius: 4.2,
  carouselY: -0.3,
  stars: 1200,
  sparkles: 120,
  sparkleScale: [22, 10, 18],
  sparkleY: 0,
  fogNear: 10,
  fogFar: 24,
  glowY: -0.5,
  glowRadius: 5.5,
  showGrid: true,
  showFloating: true,
  activeEmissive: 0.65,
  activeLight: 1.2,
  floatAmp: 0.08,
  useBasicScreen: false,
  showGlowRing: true,
  carouselLerp: 0.05,
  frameColor: "#252535",
};

const MOBILE: SceneConfig = {
  cardActiveScale: 0.9,
  cardIdleScale: 0.52,
  cardSize: [2, 1.2, 0.08],
  screenSize: [1.82, 1.05],
  barY: 0.62,
  radius: 3.75,
  carouselY: -0.5,
  stars: 400,
  sparkles: 30,
  sparkleScale: [14, 6, 12],
  sparkleY: -0.8,
  fogNear: 10,
  fogFar: 30,
  glowY: -1.2,
  glowRadius: 4.2,
  showGrid: false,
  showFloating: false,
  activeEmissive: 0.42,
  activeLight: 0,
  floatAmp: 0.04,
  useBasicScreen: true,
  showGlowRing: true,
  carouselLerp: 0.07,
  frameColor: "#3d3d58",
};

function GridFloor() {
  const lines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const size = 16;
    const step = 1.2;
    for (let i = -size; i <= size; i += step) {
      pts.push(new THREE.Vector3(-size, -2.2, i));
      pts.push(new THREE.Vector3(size, -2.2, i));
      pts.push(new THREE.Vector3(i, -2.2, -size));
      pts.push(new THREE.Vector3(i, -2.2, size));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <lineSegments geometry={lines}>
      <lineBasicMaterial color="#a855f7" transparent opacity={0.12} />
    </lineSegments>
  );
}

function GlowRing({ y, radius }: { y: number; radius: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, y, -2]}>
      <torusGeometry args={[radius, 0.02, 8, 120]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
    </mesh>
  );
}

function BrowserCard({
  color,
  position,
  rotationY,
  active,
  config,
}: {
  color: string;
  position: [number, number, number];
  rotationY: number;
  active: boolean;
  config: SceneConfig;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [w, h, d] = config.cardSize;
  const [sw, sh] = config.screenSize;
  const floatAmp = config.floatAmp;

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetScale = active ? config.cardActiveScale : config.cardIdleScale;
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
    groupRef.current.scale.setScalar(s);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY,
      0.07
    );
    const baseY = position[1];
    groupRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.9 + position[0]) * floatAmp;
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[w, h, d]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color={config.frameColor}
          metalness={0.75}
          roughness={0.25}
          transparent={!active && config.useBasicScreen}
          opacity={!active && config.useBasicScreen ? 0.55 : 1}
        />
      </RoundedBox>

      <mesh position={[0, 0, d * 0.55]}>
        <planeGeometry args={[sw, sh]} />
        {config.useBasicScreen ? (
          active ? (
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={config.activeEmissive}
              metalness={0.15}
              roughness={0.35}
            />
          ) : (
            <meshBasicMaterial color={color} transparent opacity={0.32} />
          )
        ) : (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={active ? config.activeEmissive : 0.15}
            metalness={0.2}
            roughness={0.3}
          />
        )}
      </mesh>

      <mesh position={[0, config.barY, d * 0.65]}>
        <planeGeometry args={[sw, 0.08]} />
        <meshStandardMaterial color="#3a3a50" metalness={0.7} roughness={0.25} />
      </mesh>

      {active && config.activeLight > 0 && (
        <pointLight
          position={[0, 0, 0.4]}
          intensity={config.activeLight}
          color={color}
          distance={3}
        />
      )}
    </group>
  );
}

function Carousel({
  activeIndex,
  config,
}: {
  activeIndex: number;
  config: SceneConfig;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const count = HERO_SLIDES.length;

  useFrame(() => {
    if (!groupRef.current) return;
    const target = -(activeIndex / count) * Math.PI * 2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target,
      config.carouselLerp
    );
  });

  return (
    <group ref={groupRef} position={[0, config.carouselY, 0]}>
      {HERO_SLIDES.map((slide, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <BrowserCard
            key={slide.title}
            color={slide.color}
            config={config}
            position={[
              Math.sin(angle) * config.radius,
              0,
              Math.cos(angle) * config.radius,
            ]}
            rotationY={-angle + Math.PI}
            active={i === activeIndex}
          />
        );
      })}
    </group>
  );
}

function FloatingShapes() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref1.current) {
      ref1.current.position.y = 2.5 + Math.sin(t * 0.6) * 0.3;
      ref1.current.rotation.x = t * 0.2;
      ref1.current.rotation.z = t * 0.15;
    }
    if (ref2.current) {
      ref2.current.position.y = -1.8 + Math.sin(t * 0.5 + 1) * 0.25;
      ref2.current.rotation.y = t * 0.25;
    }
  });

  return (
    <>
      <mesh ref={ref1} position={[-5.5, 2.5, -3]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ref2} position={[5.8, -1.8, -2]}>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </>
  );
}

export default function HeroSlider3D({
  activeIndex,
  isMobile = false,
}: {
  activeIndex: number;
  isMobile?: boolean;
}) {
  const config = isMobile ? MOBILE : DESKTOP;

  return (
    <>
      <fog attach="fog" args={["#13131a", config.fogNear, config.fogFar]} />

      <ambientLight intensity={isMobile ? 0.65 : 0.6} />
      <directionalLight position={[4, 6, 5]} intensity={isMobile ? 0.5 : 1.2} color="#ffffff" />
      {!isMobile && (
        <pointLight position={[0, 3, 2]} intensity={2} color="#a855f7" />
      )}
      {!isMobile && (
        <>
          <pointLight position={[-5, 1, 4]} intensity={1} color="#c084fc" />
          <pointLight position={[5, -1, 3]} intensity={0.8} color="#8b5cf6" />
        </>
      )}

      <Stars
        radius={isMobile ? 45 : 60}
        depth={isMobile ? 30 : 40}
        count={config.stars}
        factor={isMobile ? 2 : 3}
        saturation={0.2}
        fade
        speed={0.4}
      />
      <Sparkles
        count={config.sparkles}
        position={[0, config.sparkleY, 0]}
        scale={config.sparkleScale}
        size={isMobile ? 1.6 : 2.5}
        speed={0.3}
        color="#c084fc"
        opacity={isMobile ? 0.4 : 0.6}
      />
      {config.showGrid && <GridFloor />}
      {config.showGlowRing && (
        <GlowRing y={config.glowY} radius={config.glowRadius} />
      )}
      {config.showFloating && <FloatingShapes />}
      <Carousel activeIndex={activeIndex} config={config} />
    </>
  );
}
