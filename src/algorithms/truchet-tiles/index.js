import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'tileSize', label: '타일 크기', min: 15, max: 80, step: 5, default: 40, unit: 'px', restart: true },
    { key: 'noiseScale', label: '노이즈 스케일', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0, max: 0.01, step: 0.001, default: 0.002 },
  ],
  related: ["Flow Field", "Perlin / Simplex Noise", "Cellular Automata"],
};
