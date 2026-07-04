import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Spring & Constraint는 노드와 스프링으로 이루어진 물리 기반 시뮬레이션입니다. 각 스프링은 정해진 길이를 유지하려 하고, Verlet 통합을 이용해 중력과 제약을 함께 계산하면 천 흔들기, 망 변형 등의 유연한 구조가 표현됩니다.",
    en: "Spring & Constraint is a physics-based simulation made of nodes and springs. Each spring tries to maintain a fixed length, and using Verlet integration to calculate both gravity and constraints creates flexible structures like cloth swaying and mesh deformation.",
  },
  sketch,
  related: ["Particle System", "Attractor System", "Differential Growth"],
};
