import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'gravity', label: '중력', min: 1, max: 6, step: 0.5, default: 3.0 },
    { key: 'length1', label: '첫 번째 암 길이', min: 0.1, max: 0.35, step: 0.02, default: 0.18, unit: '배수', restart: true },
    { key: 'length2', label: '두 번째 암 길이', min: 0.1, max: 0.4, step: 0.02, default: 0.28, unit: '배수', restart: true },
    { key: 'numPendulums', label: '진자 개수', min: 1, max: 8, step: 1, default: 3, restart: true },
    { key: 'baseChaos', label: '카오스 계수', min: 0, max: 0.01, step: 0.001, default: 0.001, restart: true },
    { key: 'timeStep', label: '시간 간격', min: 0.05, max: 0.3, step: 0.02, default: 0.15 },
    { key: 'trailLength', label: '궤적 길이', min: 100, max: 800, step: 50, default: 400, restart: true },
    { key: 'pivotYRatio', label: '피벗 Y 위치', min: 0.2, max: 0.5, step: 0.05, default: 0.35 },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Attractor System"],
};
