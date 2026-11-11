import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numBalls', label: '메타볼 개수', min: 2, max: 20, step: 1, default: 6, restart: true },
    { key: 'sdfThreshold', label: '경계 임계값', min: 0.5, max: 2.0, step: 0.1, default: 1.0 },
    { key: 'step', label: '렌더링 해상도', min: 1, max: 8, step: 1, default: 4, unit: 'px', restart: true },
  ],
  related: ["Particle System", "Attractor System", "Fractal Brownian Motion"],
};
