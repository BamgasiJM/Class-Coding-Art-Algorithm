import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),

  sketch,
    params: [
    {
      key: 'easing',
      label: '이싱 가중치',
      min: 0.01,
      max: 0.3,
      step: 0.01,
      default: 0.08,
    },
    {
      key: 'circleRadius',
      label: '원 반지름',
      min: 10,
      max: 80,
      step: 2,
      default: 36,
    },
    {
      key: 'trailAlpha',
      label: '잔상 강도',
      min: 50,
      max: 255,
      step: 5,
      default: 150,
    },
    {
      key: 'targetRadius',
      label: '목적지 원 크기',
      min: 2,
      max: 15,
      step: 1,
      default: 4,
    },
  ],

  related: ["Particle System", "Spring & Constraint", "Flow Field"],
};
