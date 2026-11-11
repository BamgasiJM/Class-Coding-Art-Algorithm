import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'gravitationalConstant', label: '중력 상수', min: 0.2, max: 2.0, step: 0.1, default: 0.7 },
    { key: 'starMass', label: '항성 질량', min: 500, max: 2000, step: 100, default: 1000, restart: true },
    { key: 'numSmallBodies', label: '행성 개수', min: 20, max: 150, step: 10, default: 60, restart: true },
  ],
  related: ["Attractor System", "Spring & Constraint", "Boids / Flocking"],
};
