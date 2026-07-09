import sketch from "./sketch";

export default {
  longDescription: {
    en: "Circle Packing is a geometric packing algorithm that populates a defined space with non-overlapping circles. New circles are randomly spawned at minimal sizes and organically grow until they contact the boundary of an adjacent circle or the edge of the canvas. This constrained scaling models natural saturation and growth phenomena, resulting in intricate visual hierarchies and structures reminiscent of biological cells and stone arrangements.",
    ko: "Circle Packing(원 채우기)은 서로 겹치지 않는 원들을 배치하여 정해진 공간을 촘촘하게 채우는 기하학적 패킹 알고리즘입니다. 임의의 위치에 최소 크기로 생성된 원들은 이웃한 원의 경계나 캔버스의 가장자리에 닿을 때까지 유기적으로 성장합니다. 이러한 제약 조건부 확장은 자연계의 밀도 포화 및 성장 현상을 모사하며, 생물학적 세포 집합체나 석조 배열을 연상시키는 정교한 시각적 계층 구조를 형성합니다.",
  },
  sketch,
  params: [
    { key: 'maxCircles', label: '최대 원 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'attemptsPerFrame', label: '프레임당 시도 횟수', min: 1, max: 15, step: 1, default: 5, restart: true },
    { key: 'growthRate', label: '성장 속도', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'initialRadius', label: '초기 반지름', min: 0.5, max: 3, step: 0.5, default: 1, unit: 'px', restart: true },
    { key: 'minDistance', label: '최소 간격', min: 1, max: 8, step: 1, default: 2, unit: 'px' },
    { key: 'maxRadiusForWeight', label: '선 굵기 기준 최대 반지름', min: 15, max: 60, step: 5, default: 30, unit: 'px' },
    { key: 'lineWeightMax', label: '최대 선 굵기', min: 2, max: 10, step: 0.5, default: 5.5, unit: 'px' },
  ],
  related: [
    "Voronoi Diagram",
    "Delaunay Triangulation",
    "Diffusion-Limited Aggregation",
  ],
};
