import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'gravity', label: '중력', min: 1, max: 6, step: 0.5, default: 3.0 },
    { key: 'numPendulums', label: '진자 개수', min: 1, max: 8, step: 1, default: 3, restart: true },
    { key: 'baseChaos', label: '카오스 계수', min: 0, max: 0.01, step: 0.001, default: 0.001, restart: true },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Attractor System"],
};
