import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Truchet Tiles는 각 타일이 한 모서리에서 반대 모서리로 연결되는 곡선을 가진 패턴입니다. 타일의 회전 방향을 노이즈로 제어하면 복잡한 경로와 흐름 패턴이 형성되며, 이는 유기적인 흐름 구조를 시각화합니다.",
    en: "Truchet Tiles is a pattern where each tile has a curve connecting one edge to the opposite edge. By controlling the rotation direction of tiles with noise, complex paths and flow patterns emerge, visualizing organic flow structures.",
  },
  sketch,
  params: [
    { key: 'tileSize', label: '타일 크기', min: 15, max: 80, step: 5, default: 40, unit: 'px', restart: true },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0, max: 0.01, step: 0.001, default: 0.002 },
    { key: 'noiseScaleX', label: '노이즈 스케일 X', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'noiseScaleY', label: '노이즈 스케일 Y', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'orientationCount', label: '방향 개수', min: 2, max: 12, step: 1, default: 6, restart: true },
    { key: 'lineWeight', label: '선 굵기', min: 0.5, max: 5, step: 0.5, default: 2, unit: 'px' },
    { key: 'arcRadius', label: '호 크기', min: 0.5, max: 1.5, step: 0.1, default: 1.0 },
  ],
  related: ["Flow Field", "Perlin / Simplex Noise", "Cellular Automata"],
};
