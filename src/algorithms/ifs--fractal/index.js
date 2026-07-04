import sketch from "./sketch";

export default {
  longDescription: {
    en: "IFS (Iterated Function System) & Fractal explores self-similar structures created by applying a set of affine transformations repeatedly. Using a chaos game approach, random functions are picked based on specific probabilities to map points dynamically. This implementation generates the famous Barnsley Fern, visualizing how complex, organic, and lifelike natural geometries emerge from deterministic linear algebraic matrices.",
    ko: "IFS (Iterated Function System) & Fractal은 일련의 아핀 변환(Affine Transformation)을 반복적으로 적용하여 형성되는 자기닮음 구조를 탐구합니다. 카오스 게임 방식을 기반으로, 특정 확률에 따라 수학적 변환 함수를 무작위로 선택하고 좌표를 매핑합니다. 본 구현체는 자연의 결을 담은 바른슬리 고사리(Barnsley Fern)를 생성하여, 결정론적인 선형대수 행렬식 속에서 어떻게 복잡하고 유기적인 생명체의 기하학적 형태가 발현되는지 보여줍니다.",
  },
  sketch,
  related: ["Phyllotaxis", "L-System", "Cellular Automata"],
};
