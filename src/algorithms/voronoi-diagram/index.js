import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: "numSeeds",
      label: "Seed 개수",
      min: 10,
      max: 150,
      step: 5,
      default: 50,
      restart: true,
    },
    {
      key: "edgeThreshold",
      label: "경계선 감지 기준",
      min: 0.5,
      max: 3,
      step: 0.1,
      default: 1.2,
      restart: true,
    },
    {
      key: "baseBrightnessMin",
      label: "최소 밝기",
      min: 0.1,
      max: 0.8,
      step: 0.1,
      default: 0.4,
    },
    {
      key: "baseBrightnessFactor",
      label: "밝기 변조",
      min: 0.2,
      max: 1.0,
      step: 0.1,
      default: 0.6,
    },
    {
      key: "distFadeMax",
      label: "거리 그라디언트 최대",
      min: 0.8,
      max: 2.0,
      step: 0.1,
      default: 1.2,
    },
    {
      key: "distFadeMin",
      label: "거리 그라디언트 최소",
      min: 0.2,
      max: 1.0,
      step: 0.1,
      default: 0.5,
    },
    {
      key: "seedPointSize",
      label: "Seed 포인트 크기",
      min: 2,
      max: 12,
      step: 1,
      default: 4,
      unit: "px",
    },
  ],
  related: ["Delaunay Triangulation", "Cellular Automata", "Circle Packing"],
};
