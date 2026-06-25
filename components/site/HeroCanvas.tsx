"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HeroSlider3D from "./HeroSlider3D";

export default function HeroCanvas({ activeIndex }: { activeIndex: number }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0.8, 8.5], fov: 50 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <HeroSlider3D activeIndex={activeIndex} />
    </Canvas>
  );
}
