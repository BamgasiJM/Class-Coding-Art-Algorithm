import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Attractor System은 고정된 또는 움직이는 어트랙터(끌어당기는 점)가 주변의 파티클을 중력처럼 끌어당기는 알고리즘입니다. 역제곱 법칙 거리 계산으로 현실적인 인력을 구현하며, 여러 어트랙터의 상호작용은 복잡한 궤도 패턴을 형성합니다.",
    en: "Attractor System is an algorithm where fixed or moving attractors pull surrounding particles like gravity. Using inverse-square-law distance calculation implements realistic attraction, and interaction of multiple attractors forms complex orbital patterns.",
  },
  sketch,
  params: [
    { key: 'numParticles', label: '파티클 개수', min: 100, max: 1500, step: 50, default: 600, restart: true },
    { key: 'attractorStrength', label: '어트랙터 강도', min: 20, max: 300, step: 10, default: 100 },
    { key: 'damping', label: '속도 감쇠', min: 0.85, max: 0.99, step: 0.01, default: 0.96 },
    { key: 'timeSpeed', label: '시간 진행 속도', min: 0.005, max: 0.05, step: 0.005, default: 0.02 },
    { key: 'lissajousSpeedX', label: '리사주 X 속도', min: 0.2, max: 2.0, step: 0.1, default: 0.7 },
    { key: 'lissajousSpeedY', label: '리사주 Y 속도', min: 0.2, max: 2.0, step: 0.1, default: 1.1 },
    { key: 'lissajousRadiusX', label: '리사주 X 진폭', min: 0.1, max: 0.5, step: 0.05, default: 0.3, unit: '배수' },
    { key: 'lissajousRadiusY', label: '리사주 Y 진폭', min: 0.1, max: 0.5, step: 0.05, default: 0.3, unit: '배수' },
    { key: 'minDistance', label: '최소 거리', min: 5, max: 50, step: 5, default: 10, unit: 'px' },
    { key: 'maxDistance', label: '최대 거리', min: 200, max: 800, step: 50, default: 500, unit: 'px' },
    { key: 'particleLineWeight', label: '파티클 크기', min: 0.5, max: 4.0, step: 0.25, default: 1.5, unit: 'px' },
    { key: 'attractorSize', label: '어트랙터 크기', min: 8, max: 60, step: 4, default: 20, unit: 'px' },
  ],
  related: ["Particle System", "Boids / Flocking", "Differential Growth"],
};
