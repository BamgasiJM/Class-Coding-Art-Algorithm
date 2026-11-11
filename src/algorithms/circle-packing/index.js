import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'maxCircles', label: '최대 원 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'attemptsPerFrame', label: '프레임당 시도 횟수', min: 1, max: 15, step: 1, default: 5, restart: true },
    { key: 'growthRate', label: '성장 속도', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'initialRadius', label: '초기 반지름', min: 0.5, max: 3, step: 0.5, default: 1, unit: 'px', restart: true },
    { key: 'minDistance', label: '최소 간격', min: 1, max: 8, step: 1, default: 2, unit: 'px' },
    { key: 'maxRadiusForWeight', label: '선 굵기 기준 최대 반지름', min: 15, max: 60, step: 5, default: 30, unit: 'px' },
    { key: 'lineWeightMax', label: '최대 선 굵기', min: 2, max: 10, step: 0.5, default: 5.5, unit: 'px' },
  ],
  related: [
    "Voronoi Diagram",
    "Delaunay Triangulation",
    "Diffusion-Limited Aggregation",
  ],
};
