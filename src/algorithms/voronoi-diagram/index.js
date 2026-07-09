import sketch from "./sketch";

export default {
  longDescription: {
    en: "Voronoi Diagram is a mathematical partitioning of a plane into regions based on distance to specific points called seeds. Each region contains all pixels that are closer to its corresponding seed than to any other. This algorithm models spatial distribution patterns observed in nature, such as giraffe skin textures, dragonfly wing structures, and dried mud cracks. This implementation updates the moving seed points continuously, producing a dynamic, fluid geometric cellular mesh.",
    ko: "Voronoi Diagram(보로노이 다이어그램)은 평면 위에 배치된 특정 핵(Seed)점들과의 거리를 기반으로 공간을 분할하는 수학적 기하학 알고리즘입니다. 분할된 각 영역은 다른 어떤 핵보다 해당 영역의 핵에 가까운 모든 좌표들의 집합으로 구성됩니다. 이 모델은 기린의 피부 무늬, 잠자리 날개의 그물망 구조, 가뭄으로 갈라진 논바닥 등 자연계의 다양한 공간 분할 메커니즘을 모사합니다. 본 구현체는 실시간으로 움직이는 핵의 궤적을 추적하여 동적이고 유연한 셀룰러 기하학 메쉬를 보여줍니다.",
  },
  sketch,
  params: [
    { key: 'numSeeds', label: 'Seed 개수', min: 10, max: 150, step: 5, default: 50, restart: true },
    { key: 'edgeThreshold', label: '경계선 감지 기준', min: 0.5, max: 3, step: 0.1, default: 1.2 },
    { key: 'baseBrightnessMin', label: '최소 밝기', min: 0.1, max: 0.8, step: 0.1, default: 0.4 },
    { key: 'baseBrightnessFactor', label: '밝기 변조', min: 0.2, max: 1.0, step: 0.1, default: 0.6 },
    { key: 'distFadeMax', label: '거리 그라디언트 최대', min: 0.8, max: 2.0, step: 0.1, default: 1.2 },
    { key: 'distFadeMin', label: '거리 그라디언트 최소', min: 0.2, max: 1.0, step: 0.1, default: 0.5 },
    { key: 'seedPointSize', label: 'Seed 포인트 크기', min: 2, max: 12, step: 1, default: 4, unit: 'px' },
  ],
  related: ["Delaunay Triangulation", "Cellular Automata", "Circle Packing"],
};
