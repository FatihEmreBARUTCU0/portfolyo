"use client";

import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CAROUSEL_Y = -0.12;
const LOOK_AT = new THREE.Vector3(0, CAROUSEL_Y, 0.8);

export function MobileCameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 50;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(0, 0.75, 8.5), 0.06);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
