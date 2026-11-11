import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
  {
    key: 'ruleNumber',
    label: 'Rule 번호 : 22,50,54,77,90,129,183,246',
    min: 0,
    max: 255,
    step: 1,
    default: 90,
    restart: true,
  },
  {
    key: 'cellSize',
    label: '셀 크기',
    min: 2,
    max: 12,
    step: 1,
    default: 4,
    unit: 'px',
    restart: true,
  },
  {
    key: 'startMode',
    label: '초기 상태',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    restart: true,
  },
  {
    key: 'drawSpeed',
    label: '세대 속도',
    min: 1,
    max: 10,
    step: 1,
    default: 1,
  },
],
  related: ["IFS & Fractal", "L-System", "Reaction-Diffusion"],
};
