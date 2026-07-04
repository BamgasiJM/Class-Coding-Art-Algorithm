import sketch from "./sketch";

export default {
  longDescription: {
    en: "Differential Growth simulates the organic expanding patterns found in nature, such as the undulating ripples of brain corals, leaf margins, and petals. It works by managing a closed loop of nodes governed by balancing physical forces: a separation constraint that pushes neighboring nodes apart and a cohesion constraint that maintains structural integrity. As points split and self-subdivide due to distance thresholds, the path naturally buckles and warps into elegant, space-filling curves.",
    ko: "Differential Growth(차등 성장)는 뇌산호의 구불구불한 주름, 나뭇잎의 가장자리, 꽃잎 등 자연계의 생장 확장 패턴을 시각화하는 알고리즘입니다. 구조적 일관성을 유지하는 결합력과 인접 노드 간 충돌을 방지하는 반발력의 균형을 기초로 노드의 폐곡선 링크 시스템을 관리합니다. 노드 간의 거리가 임계점을 초과하여 스스로 분열하고 세포 구조처럼 증식함에 따라, 한정된 공간 속에 왜곡되며 채워지는 우아한 유기적 곡선 구조를 형성합니다.",
  },
  sketch,
  related: ["Reaction-Diffusion", "Space Colonization", "Spring & Constraint"],
};
