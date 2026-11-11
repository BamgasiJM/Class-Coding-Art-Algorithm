import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
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
    key: 'walkStep',
    label: '보행 거리',
    min: 1,
    max: 15,
    step: 1,
    default: 5,
  },
  {
    key: 'walkersPerFrame',
    label: '입자 생성 속도',
    min: 1,
    max: 50,
    step: 1,
    default: 13,
  },
  {
    key: 'launchDistance',
    label: '생성 거리',
    min: 20,
    max: 100,
    step: 5,
    default: 45,
  },
  {
    key: 'maxWalkSteps',
    label: '최대 이동 횟수',
    min: 200,
    max: 4000,
    step: 100,
    default: 1500,
  },
],
  related: ["Space Colonization", "Boids / Flocking", "Circle Packing"],
};
