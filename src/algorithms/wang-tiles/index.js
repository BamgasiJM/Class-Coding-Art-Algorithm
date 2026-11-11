import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'tileSize',
      label: '타일 크기',
      min: 20,
      max: 80,
      step: 2,
      default: 48,
      unit: 'px',
      restart: true,
    },
    {
      key: 'numColorVariations',
      label: '경계 색상 수',
      min: 2,
      max: 5,
      step: 1,
      default: 3,
      restart: true,
    },
    {
      key: 'tileComplexity',
      label: '타일 종류 수',
      min: 24,
      max: 48,
      step: 1,
      default: 32,
      restart: true,
    },
  ],
  related: ["Truchet Tiles", "Wave Function Collapse", "Circle Packing"],
};
