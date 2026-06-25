"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const CAROUSEL_Y = -0.55;

export function MobileCameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.7, 7.8);
    camera.lookAt(0, CAROUSEL_Y, 0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 48;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return null;
}
