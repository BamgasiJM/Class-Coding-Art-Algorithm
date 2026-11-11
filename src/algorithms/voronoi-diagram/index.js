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
      label: "경계선 두께",
      min: 0.5,
      max: 3,
      step: 0.1,
      default: 1.2,
      restart: true,
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
