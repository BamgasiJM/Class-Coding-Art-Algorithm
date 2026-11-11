import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),

  sketch,
  params: [
    { key: 'waveCount', label: '파동 개수', min: 10, max: 100, step: 5, default: 50, restart: true },
    { key: 'samples', label: '샘플링 해상도', min: 40, max: 200, step: 10, default: 120, restart: true },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0.001, max: 0.03, step: 0.001, default: 0.008 },
    { key: 'fmBaseFreq', label: '기본 주파수', min: 1, max: 5, step: 0.2, default: 2.5 },
    { key: 'fmModulation', label: '주파수 변조', min: 0, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'frequencyModulation', label: '파동별 주파수 차이', min: 1, max: 6, step: 0.2, default: 3.2 },
    { key: 'baseAmplitude', label: '기본 진폭', min: 5, max: 40, step: 1, default: 12, unit: 'px' },
    { key: 'centerAmplitudeBoost', label: '중심부 진폭 부스트', min: 10, max: 80, step: 2, default: 40, unit: 'px' },
  ],

  related: ["Flow Field", "Perlin / Simplex Noise", "Fractal Brownian Motion"],
};
