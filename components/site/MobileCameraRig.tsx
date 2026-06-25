"use client";

import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CAROUSEL_Y = -0.05;
const CARD_Z = 2.6;
const LOOK_AT = new THREE.Vector3(0, CAROUSEL_Y, CARD_Z);

export function MobileCameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 48;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(0, 0.25, 6.8), 0.06);
    camera.lookAt(LOOK_AT);
  });

  return null;
}
