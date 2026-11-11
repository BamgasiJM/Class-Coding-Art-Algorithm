import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'maxNodes',
      label: '최대 노드 수',
      min: 100,
      max: 600,
      step: 10,
      default: 300,
      restart: true
    },
    {
      key: 'rInner',
      label: '반발 반경 (Separation)',
      min: 10,
      max: 30,
      step: 1,
      default: 18,
      restart: false
    },
    {
      key: 'rOuter',
      label: '분열 반경 (Subdivision)',
      min: 5,
      max: 20,
      step: 1,
      default: 12,
      restart: false
    },
    {
      key: 'maxForce',
      label: '최대 가속도',
      min: 0.1,
      max: 1.5,
      step: 0.1,
      default: 0.5,
      restart: false
    }
  ],
  related: ["Reaction-Diffusion", "Space Colonization", "Spring & Constraint"],
};