import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Shape Morphing은 두 개의 서로 다른 도형을 동일한 수의 정점으로 재구성한 뒤, 선형 보간(lerp)으로 부드럽게 변형시키는 알고리즘입니다. 원과 별처럼 위상이 다른 형태 사이에서도 균등하게 샘플링된 정점들이 일대일 대응을 이루며 자연스러운 중간 형태를 생성합니다. 시간에 따라 보간 계수가 주기적으로 변하면서 도형이 무한히 숨 쉬는 듯한 시각적 리듬을 만듭니다.',
    en: 'Shape Morphing reconstructs two different shapes with an identical number of vertices, then smoothly transitions between them via linear interpolation (lerp). Even topologically different forms—such as a circle and a star—produce natural intermediate shapes through evenly sampled one-to-one vertex correspondence. As the interpolation coefficient oscillates over time, the shape creates an endless, breathing visual rhythm.',
  },
  sketch,
params: [
    { key: 'numPoints', label: '도형 정점 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'baseRadius', label: '기본 반경', min: 0.15, max: 0.45, step: 0.03, default: 0.32, unit: '배수' },
    { key: 'starPoints', label: '별 극의 개수', min: 3, max: 12, step: 1, default: 5, restart: true },
    { key: 'starAmplitude', label: '별의 진폭', min: 0.2, max: 1.0, step: 0.05, default: 0.55, restart: true },
    { key: 'morphSpeed', label: '변형 속도', min: 0.01, max: 0.1, step: 0.005, default: 0.025 },
    { key: 'trailAlpha', label: '잔상 길이', min: 5, max: 80, step: 5, default: 28 },
    { key: 'lineWeight', label: '선 굵기', min: 1, max: 5, step: 0.5, default: 2.5, unit: 'px' },
  ],
  related: ['Easing & Interpolation', 'Trigonometric Wave', 'SDF & Metaballs'],
}