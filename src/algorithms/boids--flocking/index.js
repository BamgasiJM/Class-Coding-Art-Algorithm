import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Boids / Flocking은 Craig Reynolds의 새떼 알고리즘으로, 응집(cohesion), 정렬(alignment), 분리(separation) 세 가지 규칙만으로 현실감 있는 집단 행동을 시뮬레이션합니다. 각 개체가 지역적 이웃만 인식하므로 분산 시스템 특성을 보여줍니다.",
    en: "Boids / Flocking is Craig Reynolds' flocking algorithm that simulates realistic collective behavior with just three rules: cohesion, alignment, and separation. Since each individual only perceives local neighbors, it demonstrates distributed system characteristics.",
  },
  sketch,
  params: [
    { key: 'numBoids', label: '보이드 개수', min: 20, max: 500, step: 10, default: 150, restart: true },
    { key: 'separationDistance', label: '분리 거리', min: 5, max: 50, step: 2, default: 15, unit: 'px' },
    { key: 'separationStrength', label: '분리 강도', min: 0.1, max: 2.0, step: 0.1, default: 0.5 },
    { key: 'alignmentDistance', label: '정렬 거리', min: 10, max: 100, step: 5, default: 30, unit: 'px' },
    { key: 'alignmentStrength', label: '정렬 강도', min: 0.01, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'cohesionDistance', label: '응집 거리', min: 10, max: 100, step: 5, default: 30, unit: 'px' },
    { key: 'cohesionStrength', label: '응집 강도', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: 'maxSpeed', label: '최대 속도', min: 1, max: 8, step: 0.5, default: 4, unit: 'px/f' },
    { key: 'trailAlpha', label: '궤적 길이', min: 5, max: 100, step: 5, default: 40 },
    { key: 'boidSize', label: '보이드 크기', min: 2, max: 15, step: 1, default: 6, unit: 'px' },
  ],
  related: ["Particle System", "Attractor System", "Space Colonization"],
};
