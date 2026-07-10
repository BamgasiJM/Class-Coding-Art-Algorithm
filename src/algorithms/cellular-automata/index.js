import sketch from "./sketch";

export default {
  longDescription: {
    en: "Cellular Automata consists of a regular grid of cells, each in one of a finite number of states, which alters and evolves through a discrete set of generations based on mathematical rules determined by neighboring cells. This implementation demonstrates Wolfram’s Rule 90 Elementary Cellular Automaton, mapping a 1D line over time down the vertical axis to illustrate how complex, recursive, and fractal-like Sierpinski structures organically materialize from minimal local behaviors.",
    ko: "Cellular Automata(세포 자동자)는 유한한 상태를 가진 격자 구조 내에서 주변 이웃 셀들의 관계식에 따라 격자 전체가 불연속적인 세대를 거치며 진화하는 수학적 모델입니다. 본 구현체는 울프람(Wolfram)의 Rule 90 1차원 세포 자동자를 기반으로, 시간의 흐름을 세로축으로 확장 시각화하여 지극히 단순한 규칙성으로부터 어떻게 복잡하고 정교한 시에르핀스키 삼각형 구조가 스스로 발현되는지 증명합니다.",
  },
  sketch,
  params: [
  {
    key: 'ruleNumber',
    label: 'Rule 번호 : 50,54,77,90,129,183',
    min: 0,
    max: 255,
    step: 1,
    default: 90,
    restart: true,
  },
  {
    key: 'cellSize',
    label: '셀 크기',
    min: 2,
    max: 12,
    step: 1,
    default: 4,
    unit: 'px',
    restart: true,
  },
  {
    key: 'startMode',
    label: '초기 상태',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    restart: true,
  },
  {
    key: 'drawSpeed',
    label: '세대 속도',
    min: 1,
    max: 10,
    step: 1,
    default: 1,
  },
],
  related: ["IFS & Fractal", "L-System", "Reaction-Diffusion"],
};
