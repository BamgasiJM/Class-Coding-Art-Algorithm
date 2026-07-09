import sketch from "./sketch";

export default {
  longDescription: {
    en: "IFS (Iterated Function System) & Fractal explores self-similar structures created by applying a set of affine transformations repeatedly. Using a chaos game approach, random functions are picked based on specific probabilities to map points dynamically. This implementation generates the famous Barnsley Fern, visualizing how complex, organic, and lifelike natural geometries emerge from deterministic linear algebraic matrices.",
    ko: "IFS (Iterated Function System) & Fractal은 일련의 아핀 변환(Affine Transformation)을 반복적으로 적용하여 형성되는 자기닮음 구조를 탐구합니다. 카오스 게임 방식을 기반으로, 특정 확률에 따라 수학적 변환 함수를 무작위로 선택하고 좌표를 매핑합니다. 본 구현체는 자연의 결을 담은 바른슬리 고사리(Barnsley Fern)를 생성하여, 결정론적인 선형대수 행렬식 속에서 어떻게 복잡하고 유기적인 생명체의 기하학적 형태가 발현되는지 보여줍니다.",
  },
  sketch,
  params: [
    { 
      key: 'maxPoints', 
      label: '최대 정밀도', 
      min: 10000, 
      max: 100000, 
      step: 5000, 
      default: 40000, 
      restart: true 
    },
    { 
      key: 'pointsPerFrame', 
      label: '그리기 속도', 
      min: 10, 
      max: 1000, 
      step: 10, 
      default: 300 
    },
    { 
      key: 'pointSize', 
      label: '점 크기', 
      min: 0.1, 
      max: 3, 
      step: 0.1, 
      default: 1 
    },
    { 
      key: 'mainShrink', 
      label: '잎 축소 비율', 
      min: 0.5, 
      max: 0.95, 
      step: 0.01, 
      default: 0.85 
    },
    { 
      key: 'branchAngle', 
      label: '가지 휨 정도', 
      min: -0.2, 
      max: 0.2, 
      step: 0.01, 
      default: 0.04 
    },
    { 
      key: 'stemHeight', 
      label: '줄기 높이', 
      min: 0.5, 
      max: 3.0, 
      step: 0.1, 
      default: 1.6 
    },
    { 
      key: 'chaosFactor', 
      label: '무질서도', 
      min: 0, 
      max: 0.5, 
      step: 0.01, 
      default: 0 
    },
  ],
  related: ["Phyllotaxis", "L-System", "Cellular Automata"],
};
