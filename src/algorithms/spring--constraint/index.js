import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Spring & Constraint는 노드와 스프링으로 이루어진 물리 기반 시뮬레이션입니다. 각 스프링은 정해진 길이를 유지하려 하고, Verlet 통합을 이용해 중력과 제약을 함께 계산하면 천 흔들기, 망 변형 등의 유연한 구조가 표현됩니다.",
    en: "Spring & Constraint is a physics-based simulation made of nodes and springs. Each spring tries to maintain a fixed length, and using Verlet integration to calculate both gravity and constraints creates flexible structures like cloth swaying and mesh deformation.",
  },
  sketch,
  params: [
    { key: 'spacing', label: '격자 간격', min: 20, max: 100, step: 5, default: 50, unit: 'px', restart: true },
    { key: 'stiffness', label: '스프링 강도', min: 0.01, max: 0.15, step: 0.01, default: 0.04 },
    { key: 'gravity', label: '중력', min: 0, max: 0.3, step: 0.02, default: 0.1 },
    { key: 'damping', label: '속도 감쇠', min: 0.9, max: 0.99, step: 0.01, default: 0.98 },
    { key: 'mouseInfluenceRadius', label: '마우스 영향 반경', min: 20, max: 200, step: 10, default: 80, unit: 'px' },
    { key: 'mouseInfluenceStrength', label: '마우스 영향 강도', min: 0.1, max: 2.0, step: 0.1, default: 0.5 },
  ],
  related: ["Particle System", "Attractor System", "Differential Growth"],
};
