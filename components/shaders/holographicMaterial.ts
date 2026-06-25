import * as THREE from "three";

export function createHolographicMaterial(color: string) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uHover: { value: 0 },
    },
    transparent: true,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uHover;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float scanline = sin(uv.y * 80.0 + uTime * 3.0) * 0.04;
        float border = smoothstep(0.0, 0.04, uv.x) * smoothstep(1.0, 0.96, uv.x)
                     * smoothstep(0.0, 0.04, uv.y) * smoothstep(1.0, 0.96, uv.y);
        float glow = border * (0.6 + uHover * 0.4);
        float fill = 0.04 + scanline + uHover * 0.06;
        vec3 col = uColor * (fill + glow * 2.0);
        float alpha = fill + glow * 0.8;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}
