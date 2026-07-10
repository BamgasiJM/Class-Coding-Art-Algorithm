import sketch from "./sketch";

export default {
  longDescription: {
    en: "Diffusion-Limited Aggregation (DLA) is an algorithmic process where particles undergoing Brownian motion (random walk) cluster together to form beautiful, organic, dendritic structures. Driven by diffusion rather than direct attraction, wandering particles solidify the moment they collide with the pre-existing cluster. This simulation produces complex, self-similar branch-like clusters that accurately model physical phenomena like lightning paths, coral growth, and mineral crystallization.",
    ko: "Diffusion-Limited Aggregation(DLA, 확산 제한 응집)은 브라운 운동(무작위 보행)을 하는 입자들이 충돌을 통해 고정된 핵 주위로 모여들어 아름답고 유기적인 수지상 구조를 형성하는 알고리즘적 과정입니다. 직접적인 인력이 아닌 무작위 확산에 지배받기 때문에, 배회하던 입자가 기존 클러스터와 접촉하는 순간 응고되어 결합합니다. 본 구현체는 번개의 경로, 산호의 성장, 광물의 결정화와 같은 물리학적 현상을 정밀하게 모사하여 자기닮음 형태의 복잡한 나뭇가지 모양 클러스터를 생성합니다.",
  },
  sketch,
  params: [
  {
    key: 'maxParticles',
    label: '최대 입자 수',
    min: 200,
    max: 3000,
    step: 100,
    default: 1500,
    restart: true,
  },
  {
    key: 'stickRadius',
    label: '응집 반경',
    min: 2,
    max: 12,
    step: 1,
    default: 6,
  },
  {
    key: 'walkStep',
    label: '보행 거리',
    min: 1,
    max: 15,
    step: 1,
    default: 5,
  },
  {
    key: 'walkersPerFrame',
    label: '입자 생성 속도',
    min: 1,
    max: 50,
    step: 1,
    default: 13,
  },
  {
    key: 'launchDistance',
    label: '생성 거리',
    min: 20,
    max: 100,
    step: 5,
    default: 45,
  },
  {
    key: 'maxWalkSteps',
    label: '최대 이동 횟수',
    min: 200,
    max: 4000,
    step: 100,
    default: 1500,
  },
],
  related: ["Space Colonization", "Boids / Flocking", "Circle Packing"],
};
