import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  // 황금비(φ)는 펜로즈 타일링의 규칙 자체이므로 슬라이더로 바꾸지 않는다 (sketch.js 기본값 1.618 사용).
  params: [
    {
      key: 'generations',
      label: '분할 세대 수',
      min: 1,
      max: 4,
      step: 1,
      default: 2,
      restart: true
    },
    {
      key: 'rotationSpeed',
      label: '회전 속도',
      min: -0.02,
      max: 0.02,
      step: 0.001,
      default: 0.001
    },
  ],
  related: ['IFS & Fractal', 'Truchet Tiles', 'Wang Tiles'],
}
