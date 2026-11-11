import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
  {
    key: 'cellSize',
    label: '격자 크기',
    min: 8,
    max: 40,
    step: 1,
    default: 18,
    unit: 'px',
    restart: true,
  },
  {
    key: 'noiseScale',
    label: '노이즈 스케일',
    min: 0.01,
    max: 0.2,
    step: 0.005,
    default: 0.08,
  },
  {
    key: 'timeSpeed',
    label: '애니메이션 속도',
    min: 0,
    max: 0.05,
    step: 0.001,
    default: 0.01,
  },
  {
    key: 'threshold',
    label: '강조 임계값',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.58,
  },
  {
    key: 'radiusMultiplier',
    label: '원 크기',
    min: 0.5,
    max: 2.5,
    step: 0.1,
    default: 1.4,
  },
  {
    key: 'jitter',
    label: '흔들림',
    min: 0,
    max: 10,
    step: 0.5,
    default: 2,
  },
],
  related: ["Flow Field", "Fractal Brownian Motion", "Curl Noise"],
};
