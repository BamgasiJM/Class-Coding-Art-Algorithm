import sketch from "./sketch";

export default {
  longDescription: {
    ko: `L-System(Lindenmayer System)은 생물의 성장 과정을 문자열 재작성(String Rewriting) 규칙으로 표현하는 절차적 생성 알고리즘입니다. 초기 문자열(Axiom)에 규칙을 반복적으로 적용하여 새로운 문자열을 만들고, 이를 Turtle Graphics로 해석하면 나무, 식물, 고사리, 산호와 같은 복잡한 가지 구조를 생성할 수 있습니다. 단순한 규칙을 반복하는 것만으로도 자연스럽고 자기 유사적인 형태가 만들어지기 때문에 프랙탈과 식물 모델링에서 널리 활용됩니다. 현재는 컴퓨터 그래픽스, 제너레이티브 아트, 교육용 시뮬레이션 등 다양한 분야에서 자연의 성장 원리를 표현하는 대표적인 알고리즘으로 사용되고 있습니다.`,

    en: `L-System (Lindenmayer System) is a procedural generation algorithm that models biological growth through string rewriting rules. Starting from an initial axiom, production rules are repeatedly applied to generate increasingly complex strings, which are then interpreted using Turtle Graphics to produce trees, plants, ferns, corals, and other branching structures. Because complex self-similar forms emerge from a small set of simple rules, L-Systems have become a fundamental technique in fractal geometry and procedural modeling. Today they are widely used in computer graphics, generative art, scientific visualization, and educational demonstrations of natural growth.`,
  },

  sketch,

  related: ["IFS & Fractal", "Space Colonization", "Differential Growth"],
};
