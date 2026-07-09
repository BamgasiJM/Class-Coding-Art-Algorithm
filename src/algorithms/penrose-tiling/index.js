import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Penrose Tiling은 두 가지 마름모(Thick Rhombus와 Thin Rhombus)를 사용하여 평면을 비주기적으로 덮는 타일링 방식입니다. P3 규칙과 황금비를 기반으로 한 분할(Inflation)을 통해 생성되며, 제공된 이미지와 같은 별 모양(Sun) 패턴에서 시작하여 자기 유사성을 가진 복잡한 기하학적 구조를 창발합니다.',
    en: 'Penrose Tiling is a non-periodic tiling of the plane using two types of rhombuses (thick and thin). Generated via P3 rules and golden ratio inflation starting from a star (Sun) pattern, it covers the surface without repeating, emerging as a complex self-similar geometric structure.',
  },
  sketch,
  params: [
    { 
      key: 'generations', 
      label: '분할 세대 수', 
      min: 1, 
      max: 7, 
      step: 1, 
      default: 5, 
      restart: true 
    },
    { 
      key: 'initialRadius', 
      label: '초기 반지름 비율', 
      min: 0.2, 
      max: 0.8, 
      step: 0.01, 
      default: 0.52, 
      restart: true 
    },
    { 
      key: 'goldenRatio', 
      label: '황금비 - 1.618', 
      min: 1.4, 
      max: 1.8, 
      step: 0.001, 
      default: 1.618, 
      restart: true 
    },
    { 
      key: 'lineWeight', 
      label: '경계선 굵기', 
      min: 0, 
      max: 3, 
      step: 0.1, 
      default: 0.8 
    },
    { 
      key: 'rotationSpeed', 
      label: '회전 속도', 
      min: -0.02, 
      max: 0.02, 
      step: 0.001, 
      default: 0 
    },
  ],
  related: ['IFS & Fractal', 'Truchet Tiles', 'Wang Tiles'],
}