export const LIGHT_RAY_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const LIGHT_RAY_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;

  void main() {
    vec2 uv = vUv;

    float diagonal = uv.x * 0.72 + uv.y * 0.28;
    float mainBeam = smoothstep(0.25, 0.95, diagonal);
    mainBeam *= smoothstep(0.05, 0.55, uv.y) * smoothstep(1.0, 0.45, uv.y);
    mainBeam *= smoothstep(0.2, 0.92, uv.x);

    float streaks = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float center = 0.55 + fi * 0.07 + sin(uTime * 0.15 + fi) * 0.015;
      float line = abs(uv.x * 0.75 + uv.y * 0.35 - center);
      streaks += smoothstep(0.06, 0.0, line) * (0.06 + fi * 0.008);
    }

    float haze = smoothstep(0.3, 0.9, uv.x) * smoothstep(0.0, 0.6, uv.y) * 0.06;
    float alpha = (mainBeam * 0.22 + streaks + haze) * uIntensity;
    gl_FragColor = vec4(0.98, 0.98, 1.0, alpha);
  }
`;
