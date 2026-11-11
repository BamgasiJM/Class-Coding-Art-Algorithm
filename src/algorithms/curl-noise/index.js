import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  // 마크다운 문자열 (react-markdown 으로 렌더링). ko는 본문(--fg), en은 보조(--muted).
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numParticles', label: '파티클 개수', min: 50, max: 1000, step: 50, default: 400, restart: true },
    { key: 'stepSize', label: '미분 스텝', min: 0.01, max: 0.5, step: 0.01, default: 0.1, unit: 'px' },
    { key: 'noiseScale', label: '노이즈 스케일', min: 0.0005, max: 0.01, step: 0.0005, default: 0.002 },
    { key: 'curlScale', label: '흐름 강도', min: 0.3, max: 3, step: 0.1, default: 1.2 },
    { key: 'trailAlpha', label: '잔상 길이', min: 2, max: 30, step: 1, default: 15 },
    { key: 'pointSize', label: '파티클 크기', min: 1, max: 6, step: 0.5, default: 2.5, unit: 'px' },
    { key: 'particleLifeMin', label: '수명 최소값', min: 20, max: 150, step: 10, default: 100, restart: true },
    { key: 'particleLifeMax', label: '수명 최대값', min: 150, max: 400, step: 10, default: 200, restart: true },
  ],
  related: ["Perlin / Simplex Noise", "Flow Field", "Fractal Brownian Motion"],
};
