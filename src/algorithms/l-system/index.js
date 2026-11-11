import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'iterations',
      label: '반복 횟수 (Iterations)',
      min: 1,
      max: 7,
      step: 1,
      default: 5,
      restart: true
    },
    {
      key: 'baseAngle',
      label: '가지 각도 (Angle)',
      min: 15,
      max: 45,
      step: 1,
      default: 25,
      restart: false
    },
    {
      key: 'windSpeed',
      label: '바람 세기 (Wind)',
      min: 0.0,
      max: 0.05,
      step: 0.005,
      default: 0.02,
      restart: false
    }
  ],
  related: ["IFS & Fractal", "Space Colonization", "Differential Growth"],
};