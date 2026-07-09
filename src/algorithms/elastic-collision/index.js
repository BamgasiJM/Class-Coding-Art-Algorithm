import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Elastic Collision은 두 원이 접촉하는 순간을 거리 기반으로 감지하고, 운동량과 운동에너지가 모두 보존되는 완전 탄성 충돌 공식으로 반발 속도를 계산합니다. 충돌 법선 방향으로만 속도 성분이 교환되며, 질량비에 따라 작은 공은 크게 튕기고 큰 공은 적게 움직입니다. 위치 보정(penetration resolution)을 통해 공이 서로 겹치는 현상을 방지하며, 당구공처럼 매끄러운 반발 움직임을 재현합니다.",
    en: "Elastic Collision detects contact between circles using distance checks and computes rebound velocities using the perfectly elastic collision formula that conserves both momentum and kinetic energy. Only the velocity component along the collision normal is exchanged, so lighter balls bounce off sharply while heavier ones move less. Penetration resolution prevents circles from overlapping, producing smooth billiard-ball-like motion.",
  },
  sketch,
  params: [
    { key: 'numBalls', label: '공 개수', min: 5, max: 50, step: 1, default: 18, restart: true },
    { key: 'ballRadiusMin', label: '공 최소 반지름', min: 0.01, max: 0.08, step: 0.005, default: 0.025, unit: '배수', restart: true },
    { key: 'ballRadiusMax', label: '공 최대 반지름', min: 0.03, max: 0.15, step: 0.005, default: 0.05, unit: '배수', restart: true },
    { key: 'ballSpeedMin', label: '공 최소 속도', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'px/f', restart: true },
    { key: 'ballSpeedMax', label: '공 최대 속도', min: 1, max: 6, step: 0.25, default: 3.5, unit: 'px/f', restart: true },
    { key: 'ballHueShiftRange', label: '공 색상 변형 범위', min: 5, max: 50, step: 5, default: 20, restart: true },
    { key: 'flashDecay', label: '플래시 감쇠율', min: 0.75, max: 0.99, step: 0.02, default: 0.9 },
    { key: 'collisionEffectLife', label: '충돌 효과 감쇠율', min: 0.02, max: 0.2, step: 0.02, default: 0.08 },
    { key: 'collisionRingMaxRadius', label: '충돌 링 최대 반지름', min: 15, max: 60, step: 5, default: 30, unit: 'px' },
    { key: 'collisionRingStrokeWeight', label: '충돌 링 선 굵기', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'px' },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Boids / Flocking"],
};
