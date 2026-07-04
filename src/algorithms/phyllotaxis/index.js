import sketch from './sketch'

export default {
  longDescription: {
    ko: `Phyllotaxis는 식물의 잎, 꽃잎, 씨앗이 효율적으로 배치되는 자연의 패턴을 수학적으로 표현하는 알고리즘입니다. 각 점은 일정한 간격으로 중심에서 멀어지면서 약 137.5도의 황금각(Golden Angle)만큼 회전하여 배치됩니다. 이러한 단순한 규칙만으로도 해바라기 씨앗, 솔방울, 선인장 등에서 볼 수 있는 아름다운 나선 구조가 자연스럽게 형성됩니다. 자연의 성장 원리를 간결한 수식으로 구현할 수 있기 때문에 제너레이티브 아트에서 가장 널리 사용되는 알고리즘 중 하나입니다.`,

    en: `Phyllotaxis is a mathematical algorithm that models the arrangement of leaves, petals, and seeds found in many plants. Each point moves outward from the center while rotating by the Golden Angle of approximately 137.5 degrees, producing an efficient and aesthetically balanced spiral pattern. This simple rule recreates the structures seen in sunflowers, pinecones, cacti, and many other natural forms. Because it demonstrates how complex organic patterns emerge from simple mathematics, phyllotaxis is one of the most iconic algorithms in generative art.`,
  },

  sketch,

  related: [
    'IFS & Fractal',
    'L-System',
    'Space Colonization',
  ],
}