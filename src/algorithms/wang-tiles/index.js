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
  {
    key: 'gridLineAlpha',
    label: '구분선 투명도',
    min: 0,
    max: 125,
    step: 5,
    default: 60,
  },
  {
    key: 'tileOutlineWeight',
    label: '외곽선 두께',
    min: 0,
    max: 3,
    step: 0.1,
    default: 1,
  },
  {
    key: 'colorBrightness',
    label: '밝기',
    min: 0.3,
    max: 1.2,
    step: 0.05,
    default: 1.0,
    restart: true,
  },
],
  related: ["Truchet Tiles", "Wave Function Collapse", "Circle Packing"],
};