import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  // 응집 반경의 최대값(12)은 sketch.js의 공간 격자 칸 크기(GRID_CELL = 12)와 맞춰져 있다. 이 값을 넘기지 말 것.
  params: [
    {
      key: 'maxParticles',
      label: '최대 입자 수',
      min: 200,
      max: 3000,
      step: 100,
      default: 1500,
      restart: true,
    },
    {
      key: 'stickRadius',
      label: '응집 반경',
      min: 2,
      max: 12,
      step: 1,
      default: 6,
    },
    {
      key: 'walkersPerFrame',
      label: '입자 생성 속도',
      min: 1,
      max: 50,
      step: 1,
      default: 13,
    },
  ],
  related: ["Space Colonization", "Boids / Flocking", "Circle Packing"],
};
