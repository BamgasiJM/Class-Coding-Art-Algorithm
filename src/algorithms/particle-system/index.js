import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'emitCount', label: '방출 파티클 수', min: 1, max: 20, step: 1, default: 5 },
    { key: 'gravity', label: '중력', min: 0, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'lifeDecay', label: '수명 감소율', min: 1, max: 10, step: 0.5, default: 4 },
  ],
  related: ["Flow Field", "Spring & Constraint", "Attractor System"],
};
