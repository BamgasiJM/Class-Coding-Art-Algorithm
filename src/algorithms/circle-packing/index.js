import sketch from "./sketch";

export default {
  longDescription: {
    en: "Circle Packing is a geometric packing algorithm that populates a defined space with non-overlapping circles. New circles are randomly spawned at minimal sizes and organically grow until they contact the boundary of an adjacent circle or the edge of the canvas. This constrained scaling models natural saturation and growth phenomena, resulting in intricate visual hierarchies and structures reminiscent of biological cells and stone arrangements.",
    ko: "Circle Packing(원 채우기)은 서로 겹치지 않는 원들을 배치하여 정해진 공간을 촘촘하게 채우는 기하학적 패킹 알고리즘입니다. 임의의 위치에 최소 크기로 생성된 원들은 이웃한 원의 경계나 캔버스의 가장자리에 닿을 때까지 유기적으로 성장합니다. 이러한 제약 조건부 확장은 자연계의 밀도 포화 및 성장 현상을 모사하며, 생물학적 세포 집합체나 석조 배열을 연상시키는 정교한 시각적 계층 구조를 형성합니다.",
  },
  sketch,
  related: [
    "Voronoi Diagram",
    "Delaunay Triangulation",
    "Diffusion-Limited Aggregation",
  ],
};
