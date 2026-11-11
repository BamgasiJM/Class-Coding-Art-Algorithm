import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numBoids', label: '보이드 개수', min: 20, max: 500, step: 10, default: 150, restart: true },
    { key: 'separationDistance', label: '분리 거리', min: 5, max: 50, step: 2, default: 15, unit: 'px' },
    { key: 'separationStrength', label: '분리 강도', min: 0.1, max: 2.0, step: 0.1, default: 0.5 },
    { key: 'alignmentDistance', label: '정렬 거리', min: 10, max: 100, step: 5, default: 30, unit: 'px' },
    { key: 'alignmentStrength', label: '정렬 강도', min: 0.01, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'cohesionDistance', label: '응집 거리', min: 10, max: 100, step: 5, default: 30, unit: 'px' },
    { key: 'cohesionStrength', label: '응집 강도', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: 'maxSpeed', label: '최대 속도', min: 1, max: 8, step: 0.5, default: 4, unit: 'px/f' },
    { key: 'trailAlpha', label: '궤적 길이', min: 5, max: 100, step: 5, default: 40 },
    { key: 'boidSize', label: '보이드 크기', min: 2, max: 15, step: 1, default: 6, unit: 'px' },
  ],
  related: ["Particle System", "Attractor System", "Space Colonization"],
};
