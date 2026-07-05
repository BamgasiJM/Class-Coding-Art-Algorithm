import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Shape Morphing은 두 개의 서로 다른 도형을 동일한 수의 정점으로 재구성한 뒤, 선형 보간(lerp)으로 부드럽게 변형시키는 알고리즘입니다. 원과 별처럼 위상이 다른 형태 사이에서도 균등하게 샘플링된 정점들이 일대일 대응을 이루며 자연스러운 중간 형태를 생성합니다. 시간에 따라 보간 계수가 주기적으로 변하면서 도형이 무한히 숨 쉬는 듯한 시각적 리듬을 만듭니다.',
    en: 'Shape Morphing reconstructs two different shapes with an identical number of vertices, then smoothly transitions between them via linear interpolation (lerp). Even topologically different forms—such as a circle and a star—produce natural intermediate shapes through evenly sampled one-to-one vertex correspondence. As the interpolation coefficient oscillates over time, the shape creates an endless, breathing visual rhythm.',
  },
  sketch,
  related: ['Easing & Interpolation', 'Trigonometric Wave', 'SDF & Metaballs'],
}