import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'spacing', label: '격자 간격', min: 20, max: 100, step: 5, default: 50, unit: 'px', restart: true },
    { key: 'stiffness', label: '스프링 강도', min: 0.01, max: 0.15, step: 0.01, default: 0.04 },
    { key: 'gravity', label: '중력', min: 0, max: 0.3, step: 0.02, default: 0.1 },
  ],
  related: ["Particle System", "Attractor System", "Differential Growth"],
};
