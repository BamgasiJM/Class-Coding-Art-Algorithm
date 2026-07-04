import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Wave Function Collapse는 양자 역학에서 영감을 받은 절차적 생성 알고리즘입니다. 각 셀이 여러 상태 중 하나를 가질 수 있고, 엔트로피가 낮은 셀부터 붕괴시키면서 이웃 셀에 제약을 전파하여 일관된 패턴을 생성합니다.",
    en: "Wave Function Collapse is a procedural generation algorithm inspired by quantum mechanics. Each cell can have multiple states, and by collapsing cells with low entropy while propagating constraints to neighbors, coherent patterns emerge.",
  },
  sketch,
  related: [
    "Cellular Automata",
    "Fractal Brownian Motion",
    "Perlin / Simplex Noise",
  ],
};
