import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'minDistance', label: '최소 점간 거리', min: 10, max: 60, step: 2, default: 25, unit: 'px', restart: true },
    { key: 'candidateAttempts', label: '후보 생성 시도 횟수', min: 10, max: 50, step: 5, default: 30, restart: true },
    { key: 'iterationsPerFrame', label: '프레임당 처리 점 수', min: 1, max: 20, step: 1, default: 8 },
  ],
  related: ['Circle Packing', 'Voronoi Diagram', 'Space Colonization'],
}
