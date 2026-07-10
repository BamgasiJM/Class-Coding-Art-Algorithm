import sketch from "./sketch";

export default {
  longDescription: {
    en: "Reaction-Diffusion models the mathematical interaction of two chemical substances diffusing through space and reacting with one another. Utilizing the Gray-Scott model, this algorithm simulates complex, lifelike organic patterns resembling zebra stripes, coral structures, and cellular colonies. This visualization demonstrates how natural textures and morphogenesis emerge autonomously through localized biochemical interaction mechanics.",
    ko: "Reaction-Diffusion(반응 확산)은 공간 상에서 서로 확산되며 결합 및 반응하는 두 종류의 화학 물질 간의 수학적 상호작용을 모델링한 알고리즘입니다. 그레이-스콧(Gray-Scott) 모델 수식을 적용하여 얼룩말의 줄무늬, 산호 표면 구조, 박테리아 군집 등 생명체 표면의 유기적인 모포제네시스(Morphogenesis, 형태형성) 패턴을 정밀하게 모사합니다. 본 구현체는 국소적인 미분방정식 수치 연산만으로 어떻게 유기적인 자연의 무늬가 스스로 설계 및 발현되는지 증명합니다.",
  },
  sketch,
  params: [
    {
      key: "feed",
      label: "공급율(Feed)",
      min: 0.01,
      max: 0.1,
      step: 0.001,
      default: 0.055,
    },
    {
      key: "k",
      label: "소비율(Kill)",
      min: 0.02,
      max: 0.08,
      step: 0.001,
      default: 0.062,
    },
    {
      key: "speed",
      label: "시뮬레이션 속도",
      min: 1,
      max: 10,
      step: 1,
      default: 3,
    },
    {
      key: "trailAlpha",
      label: "잔상 강도",
      min: 10,
      max: 150,
      step: 5,
      default: 50,
    },
  ],
  related: ["Cellular Automata", "Space Colonization", "Differential Growth"],
};
