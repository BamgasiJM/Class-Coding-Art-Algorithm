import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'emitCount', label: '방출 파티클 수', min: 1, max: 20, step: 1, default: 5 },
    { key: 'emitterY', label: '방출 위치 Y', min: 0.3, max: 0.95, step: 0.05, default: 0.8, unit: '배수' },
    { key: 'velocityXMin', label: '수평 속도 최소', min: -10, max: 0, step: 0.5, default: -3, unit: 'px/f' },
    { key: 'velocityXMax', label: '수평 속도 최대', min: 0, max: 10, step: 0.5, default: 3, unit: 'px/f' },
    { key: 'velocityYMin', label: '수직 속도 최소', min: -15, max: -1, step: 0.5, default: -6, unit: 'px/f' },
    { key: 'velocityYMax', label: '수직 속도 최대', min: -5, max: 1, step: 0.5, default: -1, unit: 'px/f' },
    { key: 'particleSizeMin', label: '파티클 최소 크기', min: 0.5, max: 6, step: 0.5, default: 2, unit: 'px' },
    { key: 'particleSizeMax', label: '파티클 최대 크기', min: 4, max: 20, step: 1, default: 8, unit: 'px' },
    { key: 'particleLife', label: '파티클 수명', min: 100, max: 600, step: 50, default: 300, restart: true },
    { key: 'lifeDecay', label: '수명 감소율', min: 1, max: 10, step: 0.5, default: 4 },
    { key: 'gravity', label: '중력', min: 0, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'trailAlpha', label: '잔상 길이', min: 5, max: 100, step: 5, default: 40 },
  ],
  related: ["Flow Field", "Spring & Constraint", "Attractor System"],
};
