import sketch from "./sketch";

export default {
  longDescription: {
    en: "Delaunay Triangulation is a geometric algorithm that connects a set of discrete points into a network of non-overlapping triangles, ensuring that no point falls inside the circumcircle of any triangle. This constraint maximizes the minimum angles of the triangles, avoiding thin or elongated geometries. It forms the exact dual mathematical structure of the Voronoi Diagram and is widely utilized in terrain modeling, mesh generation, and procedural network synthesis.",
    ko: "Delaunay Triangulation(델로네 삼각분할)은 평면 위의 이산적인 점들을 연결하여 겹치지 않는 삼각형 망을 형성하는 기하학 알고리즘으로, 모든 삼각형의 외접원 내부에 어떠한 정점도 포함되지 않도록 보장합니다. 이 제약 조건은 삼각형들의 최소 내각을 최대화하여 가늘고 길게 찢어진 비정상적 기하 형태의 발생을 원천 차단합니다. 보로노이 다이어그램과 완전한 쌍대(Dual)의 수학적 구조를 이루며 지형 모델링, 유한요소 메쉬 생성, 절차적 네트워크 합성 등에 폭넓게 응용됩니다.",
  },
  sketch,
  related: ["Voronoi Diagram", "Circle Packing", "Cellular Automata"],
};
