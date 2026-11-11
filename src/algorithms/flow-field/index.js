import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  // 설명은 description.md에서 읽습니다 (ko 본문, <!-- en --> 뒤는 en).
  longDescription: parseDescription(descriptionMd),
  sketch,
  // Playground 슬라이더 스키마. restart: true는 구조 파라미터(setup에서만 반영 → 인스턴스 재시작).
  params: [
    { key: "count", label: "파티클 수", min: 50, max: 800, step: 10, default: 300, restart: true },
    { key: "scl", label: "필드 해상도", min: 10, max: 60, step: 1, default: 25, unit: "px", restart: true },
    { key: "noiseScale", label: "노이즈 스케일", min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: "speed", label: "파티클 속도", min: 0.5, max: 6, step: 0.1, default: 2 },
    { key: "damping", label: "댐핑", min: 0.5, max: 0.98, step: 0.01, default: 0.9 },
    { key: "timeSpeed", label: "필드 변화 속도", min: 0, max: 0.03, step: 0.001, default: 0.005 },
  ],
  related: ["Perlin / Simplex Noise", "Trigonometric Wave", "Curl Noise"],
};
