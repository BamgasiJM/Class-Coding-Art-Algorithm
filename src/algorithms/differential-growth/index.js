import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Differential Growth(차등 성장)는 뇌산호의 구불구불한 주름, 나뭇잎의 가장자리, 꽃잎 등 자연계의 생장 확장 패턴을 시각화하는 알고리즘입니다. 구조적 일관성을 유지하는 결합력과 인접 노드 간 충돌을 방지하는 반발력의 균형을 기초로 노드의 폐곡선 링크 시스템을 관리합니다. 노드 간의 거리가 임계점을 초과하여 스스로 분열하고 세포 구조처럼 증식함에 따라, 한정된 공간 속에 왜곡되며 채워지는 우아한 유기적 곡선 구조를 형성합니다.",
    en: "Differential Growth simulates the organic expanding patterns found in nature, such as the undulating ripples of brain corals, leaf margins, and petals. It works by managing a closed loop of nodes governed by balancing physical forces: a separation constraint that pushes neighboring nodes apart and a cohesion constraint that maintains structural integrity. As points split and self-subdivide due to distance thresholds, the path naturally buckles and warps into elegant, space-filling curves.",
  },
  sketch,
  params: [
    {
      key: 'maxNodes',
      label: '최대 노드 수',
      min: 100,
      max: 600,
      step: 10,
      default: 300,
      restart: true
    },
    {
      key: 'rInner',
      label: '반발 반경 (Separation)',
      min: 10,
      max: 30,
      step: 1,
      default: 18,
      restart: false
    },
    {
      key: 'rOuter',
      label: '분열 반경 (Subdivision)',
      min: 5,
      max: 20,
      step: 1,
      default: 12,
      restart: false
    },
    {
      key: 'maxForce',
      label: '최대 가속도',
      min: 0.1,
      max: 1.5,
      step: 0.1,
      default: 0.5,
      restart: false
    }
  ],
  related: ["Reaction-Diffusion", "Space Colonization", "Spring & Constraint"],
};