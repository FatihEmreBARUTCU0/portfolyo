"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HeroSlider3D from "./HeroSlider3D";
import { MobileCameraRig } from "./MobileCameraRig";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HeroCanvas({ activeIndex }: { activeIndex: number }) {
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{
        position: isMobile ? [0, 0.25, 6.8] : [0, 0.8, 8.5],
        fov: isMobile ? 48 : 50,
      }}
      dpr={isMobile ? 1 : [1, 2]}
      frameloop="always"
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      {isMobile && <MobileCameraRig />}
      <HeroSlider3D activeIndex={activeIndex} isMobile={isMobile} />
    </Canvas>
  );
}
