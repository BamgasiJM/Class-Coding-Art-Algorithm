import sketch from "./sketch";

export default {
  longDescription: {
    ko: "N-Body Gravity는 모든 입자가 서로 만유인력으로 끌어당기는 역학을 시뮬레이션합니다. 각 쌍의 입자 사이에 거리 제곱에 반비례하는 인력(F = G·m₁·m₂/r²)이 작용하며, 이를 시간 적분하여 궤도 운동을 계산합니다. 중앙의 큰 질량(항성) 주변을 작은 질량(행성)들이 공전하며, 초기 조건에 따라 안정적인 원형 궤도, 타원 궤도, 혹은 혼돈스러운 상호작용이 나타납니다.",
    en: "N-Body Gravity simulates the dynamics where every particle attracts every other particle through universal gravitation. An inverse-square force (F = G·m₁·m₂/r²) acts between each pair, and orbital motion is computed through time integration. Small masses (planets) orbit around a central large mass (star), producing stable circular orbits, elliptical paths, or chaotic interactions depending on initial conditions.",
  },
  sketch,
  params: [
    { key: 'gravitationalConstant', label: '중력 상수', min: 0.2, max: 2.0, step: 0.1, default: 0.7 },
    { key: 'softening', label: '특이점 방지 거리', min: 5, max: 50, step: 5, default: 20, unit: 'px²' },
    { key: 'numSmallBodies', label: '행성 개수', min: 20, max: 150, step: 10, default: 60, restart: true },
    { key: 'timeStep', label: '시간 간격', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'starMass', label: '항성 질량', min: 500, max: 2000, step: 100, default: 1000, restart: true },
    { key: 'minOrbitDistance', label: '최소 궤도 거리', min: 40, max: 150, step: 10, default: 80, unit: 'px', restart: true },
    { key: 'maxOrbitDistance', label: '최대 궤도 거리', min: 0.2, max: 0.6, step: 0.05, default: 0.4, unit: '배수', restart: true },
    { key: 'trailAlpha', label: '궤적 길이', min: 5, max: 50, step: 5, default: 15 },
  ],
  related: ["Attractor System", "Spring & Constraint", "Boids / Flocking"],
};
