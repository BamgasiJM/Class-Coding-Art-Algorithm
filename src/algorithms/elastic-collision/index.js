import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numBalls', label: '공 개수', min: 5, max: 50, step: 1, default: 18, restart: true },
    { key: 'ballRadiusMax', label: '공 최대 반지름', min: 0.03, max: 0.15, step: 0.005, default: 0.05, unit: '배수', restart: true },
    { key: 'ballSpeedMax', label: '공 최대 속도', min: 1, max: 6, step: 0.25, default: 3.5, unit: 'px/f', restart: true },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Boids / Flocking"],
};
