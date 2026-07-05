import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Penrose Tiling은 두 가지 폴리곤(kite와 dart)만으로 평면을 완전히 덮으면서도 어떤 반복 패턴 없이 비주기적으로 진행되는 타일링입니다. 황금비를 기반으로 한 inflation rule을 재귀적으로 적용하면 자기 유사성을 가진 복잡한 패턴이 창발됩니다. 이는 준결정질 구조의 수학적 모델로 실제 물리 시스템에도 나타나는 현상입니다.',
    en: 'Penrose Tiling is a non-periodic tiling of the plane using only two polygons (kite and dart) that covers the entire surface without any repeating pattern. By recursively applying inflation rules based on the golden ratio, a complex self-similar pattern emerges. This mathematical model of quasicrystalline structure appears in real physical systems.',
  },
  sketch,
  related: ['IFS & Fractal', 'Truchet Tiles', 'Wang Tiles'],
}