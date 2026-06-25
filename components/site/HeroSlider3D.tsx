"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { HERO_SLIDES } from "@/lib/heroSlides";

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

function GlowRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, -0.5, -2]}>
      <torusGeometry args={[5.5, 0.02, 8, 120]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
    </mesh>
  );
}

function BrowserCard({
  color,
  position,
  rotationY,
  active,
}: {
  color: string;
  position: [number, number, number];
  rotationY: number;
  active: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetScale = active ? 1.2 : 0.75;
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.07);
    groupRef.current.scale.setScalar(s);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY,
      0.07
    );
    const baseY = position[1];
    groupRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.9 + position[0]) * 0.08;
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[2.8, 1.7, 0.1]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#252535" metalness={0.85} roughness={0.2} />
      </RoundedBox>

      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2.55, 1.45]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.65 : 0.2}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, 0.88, 0.07]}>
        <planeGeometry args={[2.55, 0.1]} />
        <meshStandardMaterial color="#3a3a50" metalness={0.7} roughness={0.25} />
      </mesh>

      {[ -0.9, -0.55, -0.2 ].map((x) => (
        <mesh key={x} position={[x, 0.88, 0.08]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}

      {active && (
        <pointLight position={[0, 0, 0.5]} intensity={1.2} color={color} distance={4} />
      )}
    </group>
  );
}

function Carousel({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = HERO_SLIDES.length;
  const radius = 4.2;

  useFrame(() => {
    if (!groupRef.current) return;
    const target = -(activeIndex / count) * Math.PI * 2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {HERO_SLIDES.map((slide, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <BrowserCard
            key={slide.title}
            color={slide.color}
            position={[
              Math.sin(angle) * radius,
              0,
              Math.cos(angle) * radius,
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

export default function HeroSlider3D({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      <fog attach="fog" args={["#13131a", 10, 24]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 3, 2]} intensity={2} color="#a855f7" />
      <pointLight position={[-5, 1, 4]} intensity={1} color="#c084fc" />
      <pointLight position={[5, -1, 3]} intensity={0.8} color="#8b5cf6" />

      <Stars
        radius={60}
        depth={40}
        count={1200}
        factor={3}
        saturation={0.2}
        fade
        speed={0.5}
      />
      <Sparkles
        count={120}
        scale={[22, 10, 18]}
        size={2.5}
        speed={0.35}
        color="#c084fc"
        opacity={0.6}
      />
      <GridFloor />
      <GlowRing />
      <FloatingShapes />
      <Carousel activeIndex={activeIndex} />
    </>
  );
}
