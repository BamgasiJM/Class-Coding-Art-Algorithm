import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Attractor System은 고정된 또는 움직이는 어트랙터(끌어당기는 점)가 주변의 파티클을 중력처럼 끌어당기는 알고리즘입니다. 역제곱 법칙 거리 계산으로 현실적인 인력을 구현하며, 여러 어트랙터의 상호작용은 복잡한 궤도 패턴을 형성합니다.",
    en: "Attractor System is an algorithm where fixed or moving attractors pull surrounding particles like gravity. Using inverse-square-law distance calculation implements realistic attraction, and interaction of multiple attractors forms complex orbital patterns.",
  },
  sketch,
  related: ["Particle System", "Boids / Flocking", "Differential Growth"],
};
