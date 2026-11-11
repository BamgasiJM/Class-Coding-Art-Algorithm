import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'maxLeaves', label: '잎 개수', min: 100, max: 1000, step: 50, default: 500, restart: true },
    { key: 'minDist', label: '먹이 섭취 반경', min: 5, max: 30, step: 1, default: 10, unit: 'px' },
    { key: 'maxDist', label: '먹이 인식 반경', min: 40, max: 150, step: 5, default: 80, unit: 'px' },
    { key: 'branchLength', label: '나뭇가지 마디 길이', min: 1, max: 8, step: 1, default: 3, unit: 'px', restart: true },
    { key: 'leafSize', label: '잎 크기', min: 1, max: 6, step: 0.5, default: 2, unit: 'px' },
    { key: 'leafSpreadRadius', label: '잎 분포 반경', min: 0.2, max: 0.5, step: 0.05, default: 0.38, unit: '배수', restart: true },
  ],
  related: ["L-System", "Differential Growth", "Reaction-Diffusion"],
};
