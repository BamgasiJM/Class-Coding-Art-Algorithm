import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numBoids', label: '보이드 개수', min: 20, max: 500, step: 10, default: 150, restart: true },
    { key: 'separationStrength', label: '분리 강도', min: 0.1, max: 2.0, step: 0.1, default: 0.5 },
    { key: 'alignmentStrength', label: '정렬 강도', min: 0.01, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'cohesionStrength', label: '응집 강도', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
  ],
  related: ["Particle System", "Attractor System", "Space Colonization"],
};
