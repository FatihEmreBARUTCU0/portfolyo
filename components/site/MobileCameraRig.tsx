"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function MobileCameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.45, 6.2);
    camera.lookAt(0, -0.35, 0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 50;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return null;
}
