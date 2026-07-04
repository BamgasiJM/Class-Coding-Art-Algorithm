import sketch from "./sketch";

export default {
  longDescription: {
    en: "Voronoi Diagram is a mathematical partitioning of a plane into regions based on distance to specific points called seeds. Each region contains all pixels that are closer to its corresponding seed than to any other. This algorithm models spatial distribution patterns observed in nature, such as giraffe skin textures, dragonfly wing structures, and dried mud cracks. This implementation updates the moving seed points continuously, producing a dynamic, fluid geometric cellular mesh.",
    ko: "Voronoi Diagram(보로노이 다이어그램)은 평면 위에 배치된 특정 핵(Seed)점들과의 거리를 기반으로 공간을 분할하는 수학적 기하학 알고리즘입니다. 분할된 각 영역은 다른 어떤 핵보다 해당 영역의 핵에 가까운 모든 좌표들의 집합으로 구성됩니다. 이 모델은 기린의 피부 무늬, 잠자리 날개의 그물망 구조, 가뭄으로 갈라진 논바닥 등 자연계의 다양한 공간 분할 메커니즘을 모사합니다. 본 구현체는 실시간으로 움직이는 핵의 궤적을 추적하여 동적이고 유연한 셀룰러 기하학 메쉬를 보여줍니다.",
  },
  sketch,
  related: ["Delaunay Triangulation", "Cellular Automata", "Circle Packing"],
};
