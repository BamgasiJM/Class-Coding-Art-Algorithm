import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'tileSize', label: '타일 크기', min: 15, max: 80, step: 5, default: 40, unit: 'px', restart: true },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0, max: 0.01, step: 0.001, default: 0.002 },
    { key: 'noiseScaleX', label: '노이즈 스케일 X', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'noiseScaleY', label: '노이즈 스케일 Y', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'orientationCount', label: '방향 개수', min: 2, max: 12, step: 1, default: 6, restart: true },
    { key: 'lineWeight', label: '선 굵기', min: 0.5, max: 5, step: 0.5, default: 2, unit: 'px' },
    { key: 'arcRadius', label: '호 크기', min: 0.5, max: 1.5, step: 0.1, default: 1.0 },
  ],
  related: ["Flow Field", "Perlin / Simplex Noise", "Cellular Automata"],
};
