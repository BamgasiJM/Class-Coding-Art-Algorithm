import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Dithering은 제한된 색상 팔레트로 연속적인 톤을 표현하는 양자화 기법입니다. 이 스케치는 수식으로 생성한 부드러운 밝기 맵을 두 가지 방식으로 이진화하며, 마우스 및 파라미터를 통해 스케일, 임계점, 그리고 이미지 밝기 보정을 실시간으로 조절할 수 있습니다.',
    en: 'Dithering is a quantization technique that reproduces continuous tones using a restricted color palette. This sketch binarizes a smoothly generated brightness field with both methods, letting you tune the scale, threshold, and image brightness correction in real time via parameters.',
  },
  sketch,
  params: [
    {
      key: 'ditherMode',
      label: '디더링 모드 (0:Bayer, 1:FS)',
      min: 0,
      max: 1,
      step: 1,
      default: 0,
      restart: false
    },
    {
      key: 'bayerScale',
      label: 'Bayer 스케일',
      min: 2,
      max: 8,
      step: 1,
      default: 8,
      restart: false
    },
    {
      key: 'thresholdBias',
      label: '임계점 (Bias)',
      min: 0.1,
      max: 0.9,
      step: 0.01,
      default: 0.5,
      restart: false
    },
    {
      key: 'lumMultiplier',
      label: '휘도 정규화 계수',
      min: 100,
      max: 510,
      step: 10,
      default: 255,
      restart: true
    },
    {
      key: 'brightnessBias',
      label: '밝기 보정 (Offset)',
      min: -0.5,
      max: 0.5,
      step: 0.05,
      default: 0.0,
      restart: false
    }
  ],
  related: ['Truchet Tiles', 'Cellular Automata', 'Perlin / Simplex Noise'],
}