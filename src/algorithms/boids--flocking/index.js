import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Boids / Flocking은 Craig Reynolds의 새떼 알고리즘으로, 응집(cohesion), 정렬(alignment), 분리(separation) 세 가지 규칙만으로 현실감 있는 집단 행동을 시뮬레이션합니다. 각 개체가 지역적 이웃만 인식하므로 분산 시스템 특성을 보여줍니다.",
    en: "Boids / Flocking is Craig Reynolds' flocking algorithm that simulates realistic collective behavior with just three rules: cohesion, alignment, and separation. Since each individual only perceives local neighbors, it demonstrates distributed system characteristics.",
  },
  sketch,
  related: ["Particle System", "Attractor System", "Space Colonization"],
};
