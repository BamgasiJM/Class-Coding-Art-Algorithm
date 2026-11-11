import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numParticles', label: '파티클 개수', min: 100, max: 1500, step: 50, default: 600, restart: true },
    { key: 'attractorStrength', label: '어트랙터 강도', min: 20, max: 300, step: 10, default: 100 },
    { key: 'damping', label: '속도 감쇠', min: 0.85, max: 0.99, step: 0.01, default: 0.96 },
  ],
  related: ["Particle System", "Boids / Flocking", "Differential Growth"],
};
