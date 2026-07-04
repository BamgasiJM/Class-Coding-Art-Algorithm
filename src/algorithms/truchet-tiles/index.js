import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Truchet Tiles는 각 타일이 한 모서리에서 반대 모서리로 연결되는 곡선을 가진 패턴입니다. 타일의 회전 방향을 노이즈로 제어하면 복잡한 경로와 흐름 패턴이 형성되며, 이는 유기적인 흐름 구조를 시각화합니다.",
    en: "Truchet Tiles is a pattern where each tile has a curve connecting one edge to the opposite edge. By controlling the rotation direction of tiles with noise, complex paths and flow patterns emerge, visualizing organic flow structures.",
  },
  sketch,
  related: ["Flow Field", "Perlin / Simplex Noise", "Cellular Automata"],
};
