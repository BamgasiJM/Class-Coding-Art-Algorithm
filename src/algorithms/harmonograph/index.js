import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'amplitude',
      label: '주 진폭',
      min: 0.15,
      max: 0.45,
      step: 0.01,
      default: 0.3,
      restart: true,
    },
    {
      key: 'frequencyOffset',
      label: '주파수 차이',
      min: 1,
      max: 1.05,
      step: 0.001,
      default: 1.01,
      restart: true,
    },
    {
      key: 'maxTime',
      label: '감쇠 시간',
      min: 30,
      max: 200,
      step: 5,
      default: 100,
      restart: true,
    },
  ],
  related: ["Trigonometric Wave", "Double Pendulum", "Attractor System"],
};
