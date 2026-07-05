import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Dithering은 제한된 색상 팔레트로 연속적인 톤을 표현하는 양자화 기법입니다. Bayer 행렬은 각 픽셀을 고정된 임계값 패턴과 비교해 규칙적인 점 패턴을 만들고, Floyd–Steinberg는 양자화 오차를 이웃 픽셀로 확산시켜 더 자연스러운 질감을 만듭니다. 이 스케치는 수식으로 생성한 부드러운 밝기 맵을 두 가지 방식으로 이진화하며, 마우스 위치로 스케일과 임계점을 실시간으로 조절할 수 있습니다.',
    en: 'Dithering is a quantization technique that reproduces continuous tones using a restricted color palette. The Bayer matrix compares each pixel against a fixed threshold pattern to produce a regular dot texture, while Floyd–Steinberg diffuses the quantization error to neighboring pixels for a more organic look. This sketch binarizes a smoothly generated brightness field with both methods, letting you tune the scale and threshold in real time via the mouse.',
  },
  sketch,
  related: ['Truchet Tiles', 'Cellular Automata', 'Perlin / Simplex Noise'],
}