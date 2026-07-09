import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Particle System은 다수의 입자(파티클)를 방출, 이동, 소멸시키는 기본 알고리즘입니다. 각 파티클은 속도, 수명, 물리 효과(중력, 감속)를 가지며, 이들을 조합하면 폭발, 흐름, 소산 효과 등 동적 시각화를 만들 수 있습니다.",
    en: "Particle System is a fundamental algorithm for emitting, moving, and disappearing multiple particles. Each particle has velocity, lifespan, and physics effects (gravity, drag), and combining them creates dynamic visualizations like explosions, flows, and dissipation.",
  },
  sketch,
  params: [
    { key: 'emitCount', label: '방출 파티클 수', min: 1, max: 20, step: 1, default: 5 },
    { key: 'emitterY', label: '방출 위치 Y', min: 0.3, max: 0.95, step: 0.05, default: 0.8, unit: '배수' },
    { key: 'velocityXMin', label: '수평 속도 최소', min: -10, max: 0, step: 0.5, default: -3, unit: 'px/f' },
    { key: 'velocityXMax', label: '수평 속도 최대', min: 0, max: 10, step: 0.5, default: 3, unit: 'px/f' },
    { key: 'velocityYMin', label: '수직 속도 최소', min: -15, max: -1, step: 0.5, default: -6, unit: 'px/f' },
    { key: 'velocityYMax', label: '수직 속도 최대', min: -5, max: 1, step: 0.5, default: -1, unit: 'px/f' },
    { key: 'particleSizeMin', label: '파티클 최소 크기', min: 0.5, max: 6, step: 0.5, default: 2, unit: 'px' },
    { key: 'particleSizeMax', label: '파티클 최대 크기', min: 4, max: 20, step: 1, default: 8, unit: 'px' },
    { key: 'particleLife', label: '파티클 수명', min: 100, max: 600, step: 50, default: 300, restart: true },
    { key: 'lifeDecay', label: '수명 감소율', min: 1, max: 10, step: 0.5, default: 4 },
    { key: 'gravity', label: '중력', min: 0, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'trailAlpha', label: '잔상 길이', min: 5, max: 100, step: 5, default: 40 },
  ],
  related: ["Flow Field", "Spring & Constraint", "Attractor System"],
};
