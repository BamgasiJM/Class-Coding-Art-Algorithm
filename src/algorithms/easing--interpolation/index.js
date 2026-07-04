import sketch from "./sketch";

export default {
  longDescription: {
    ko: `Easing & Interpolation은 객체를 한 위치에서 다른 위치로 자연스럽게 이동시키기 위한 가장 기본적인 애니메이션 기법입니다. Interpolation(Lerp)은 시작점과 끝점 사이를 일정한 비율로 보간하여 중간 위치를 계산하며, Easing은 속도를 점진적으로 변화시켜 더욱 부드럽고 현실적인 움직임을 만들어냅니다. 게임, 사용자 인터페이스, 모션그래픽, 데이터 시각화 등 거의 모든 실시간 그래픽 시스템에서 사용되는 핵심 개념입니다. 단순한 수식만으로도 딱딱한 움직임을 생동감 있는 애니메이션으로 바꿀 수 있기 때문에 제너레이티브 아트에서도 매우 중요한 알고리즘입니다.`,

    en: `Easing & Interpolation are fundamental animation techniques for creating smooth motion between two positions. Interpolation (Lerp) computes intermediate values between a start and an end point, while easing gradually changes the movement speed to produce more natural motion. These techniques are widely used in games, user interfaces, motion graphics, and data visualization. Because they transform simple linear movement into expressive animation with only a few mathematical operations, they are essential building blocks in generative art.`,
  },

  sketch,

  related: ["Particle System", "Spring & Constraint", "Flow Field"],
};
