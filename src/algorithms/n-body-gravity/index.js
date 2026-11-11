import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'gravitationalConstant', label: '중력 상수', min: 0.2, max: 2.0, step: 0.1, default: 0.7 },
    { key: 'softening', label: '특이점 방지 거리', min: 5, max: 50, step: 5, default: 20, unit: 'px²' },
    { key: 'numSmallBodies', label: '행성 개수', min: 20, max: 150, step: 10, default: 60, restart: true },
    { key: 'timeStep', label: '시간 간격', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'starMass', label: '항성 질량', min: 500, max: 2000, step: 100, default: 1000, restart: true },
    { key: 'minOrbitDistance', label: '최소 궤도 거리', min: 40, max: 150, step: 10, default: 80, unit: 'px', restart: true },
    { key: 'maxOrbitDistance', label: '최대 궤도 거리', min: 0.2, max: 0.6, step: 0.05, default: 0.4, unit: '배수', restart: true },
    { key: 'trailAlpha', label: '궤적 길이', min: 5, max: 50, step: 5, default: 15 },
  ],
  related: ["Attractor System", "Spring & Constraint", "Boids / Flocking"],
};
