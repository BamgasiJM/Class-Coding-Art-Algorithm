import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'maxCircles', label: '최대 원 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'growthRate', label: '성장 속도', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'minDistance', label: '최소 간격', min: 1, max: 8, step: 1, default: 2, unit: 'px' },
  ],
  related: [
    "Voronoi Diagram",
    "Delaunay Triangulation",
    "Diffusion-Limited Aggregation",
  ],
};
