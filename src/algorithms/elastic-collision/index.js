import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numBalls', label: '공 개수', min: 5, max: 50, step: 1, default: 18, restart: true },
    { key: 'ballRadiusMin', label: '공 최소 반지름', min: 0.01, max: 0.08, step: 0.005, default: 0.025, unit: '배수', restart: true },
    { key: 'ballRadiusMax', label: '공 최대 반지름', min: 0.03, max: 0.15, step: 0.005, default: 0.05, unit: '배수', restart: true },
    { key: 'ballSpeedMin', label: '공 최소 속도', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'px/f', restart: true },
    { key: 'ballSpeedMax', label: '공 최대 속도', min: 1, max: 6, step: 0.25, default: 3.5, unit: 'px/f', restart: true },
    { key: 'ballHueShiftRange', label: '공 색상 변형 범위', min: 5, max: 50, step: 5, default: 20, restart: true },
    { key: 'flashDecay', label: '플래시 감쇠율', min: 0.75, max: 0.99, step: 0.02, default: 0.9 },
    { key: 'collisionEffectLife', label: '충돌 효과 감쇠율', min: 0.02, max: 0.2, step: 0.02, default: 0.08 },
    { key: 'collisionRingMaxRadius', label: '충돌 링 최대 반지름', min: 15, max: 60, step: 5, default: 30, unit: 'px' },
    { key: 'collisionRingStrokeWeight', label: '충돌 링 선 굵기', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'px' },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Boids / Flocking"],
};
