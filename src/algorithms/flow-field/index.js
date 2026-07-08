import sketch from "./sketch";

// Flow Field 상세 정보: 설명(ko/en), 시각화 sketch, 관련 알고리즘.
export default {
  longDescription: {
    en: "Flow Field is a foundational algorithm where particles follow velocity vectors defined by a noise field. Using Perlin noise, we create a continuous vector field that smoothly varies across space and time. Each particle senses the vector at its current position and follows that direction, creating organic, fluid-like motion patterns. This technique is widely used in particle systems, creature animation, and natural phenomena visualization.",
    ko: "Flow Field는 파티클들이 노이즈 필드로 정의된 속도 벡터를 따르는 기본 알고리즘입니다. Perlin noise를 사용하여 공간과 시간에 걸쳐 부드럽게 변하는 연속적인 벡터 필드를 생성합니다. 각 파티클은 현재 위치의 벡터를 감지하고 그 방향을 따르며, 유기적이고 유체와 같은 동작 패턴을 만듭니다. 이 기법은 파티클 시스템, 캐릭터 애니메이션, 자연 현상 시각화에 광범위하게 사용됩니다.",
  },
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
