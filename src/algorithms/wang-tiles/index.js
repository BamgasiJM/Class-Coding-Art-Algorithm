import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Wang Tiles은 각 변에 색상이 할당된 정사각형 타일을 사용하여, 인접한 타일의 변 색상이 일치하도록 배치하는 알고리즘입니다. 유한한 타일 집합으로도 반복되지 않는 비주기적 패턴을 생성할 수 있으며, 이는 제약 충족 문제(constraint satisfaction)의 대표적인 예시입니다. 타일링 이론, 컴퓨터 그래픽스, 절차적 콘텐츠 생성 등에 활용됩니다.",
    en: "Wang Tiles is an algorithm that places square tiles with colored edges such that adjacent tiles have matching edge colors. Even with a finite tile set, it can generate aperiodic patterns that never repeat, serving as a classic example of constraint satisfaction problems. It is used in tiling theory, computer graphics, and procedural content generation.",
  },
  sketch,
  related: ["Truchet Tiles", "Wave Function Collapse", "Circle Packing"],
};
