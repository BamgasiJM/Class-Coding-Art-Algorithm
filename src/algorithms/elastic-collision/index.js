import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Elastic Collision은 두 원이 접촉하는 순간을 거리 기반으로 감지하고, 운동량과 운동에너지가 모두 보존되는 완전 탄성 충돌 공식으로 반발 속도를 계산합니다. 충돌 법선 방향으로만 속도 성분이 교환되며, 질량비에 따라 작은 공은 크게 튕기고 큰 공은 적게 움직입니다. 위치 보정(penetration resolution)을 통해 공이 서로 겹치는 현상을 방지하며, 당구공처럼 매끄러운 반발 움직임을 재현합니다.",
    en: "Elastic Collision detects contact between circles using distance checks and computes rebound velocities using the perfectly elastic collision formula that conserves both momentum and kinetic energy. Only the velocity component along the collision normal is exchanged, so lighter balls bounce off sharply while heavier ones move less. Penetration resolution prevents circles from overlapping, producing smooth billiard-ball-like motion.",
  },
  sketch,
  related: ["N-Body Gravity", "Spring & Constraint", "Boids / Flocking"],
};
