import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Trigonometric Wave는 사인(Sine)과 코사인(Cosine) 함수의 주기성을 이용하여 다양한 파형을 생성하는 가장 기본적인 제너레이티브 아트 알고리즘 중 하나입니다. 서로 다른 진폭, 주파수, 위상을 가진 여러 삼각함수를 조합하면 단순한 직선이 복잡하고 유기적인 리듬을 가진 형태로 변화합니다. 이러한 원리는 오디오 신호 처리, 진동 시뮬레이션, 물결 표현, 데이터 시각화 등 다양한 분야에서도 활용됩니다. 작은 수식의 변화만으로도 전혀 다른 시각적 결과를 만들어낼 수 있기 때문에 수학과 예술이 만나는 대표적인 예제로 자주 사용됩니다.",

    en: "Trigonometric Wave is one of the most fundamental generative art algorithms, using the periodic nature of sine and cosine functions to create dynamic waveforms. By combining multiple trigonometric functions with different amplitudes, frequencies, and phases, simple curves evolve into rich and organic visual patterns. The same mathematical principles are widely used in audio synthesis, vibration simulation, water surface animation, and scientific visualization. Because subtle changes in mathematical parameters can produce dramatically different results, trigonometric waves are a classic example of the connection between mathematics and visual art.",
  },

  sketch,
  params: [
    { key: 'waveCount', label: '파동 개수', min: 10, max: 100, step: 5, default: 50, restart: true },
    { key: 'samples', label: '샘플링 해상도', min: 40, max: 200, step: 10, default: 120, restart: true },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0.001, max: 0.03, step: 0.001, default: 0.008 },
    { key: 'fmBaseFreq', label: '기본 주파수', min: 1, max: 5, step: 0.2, default: 2.5 },
    { key: 'fmModulation', label: '주파수 변조', min: 0, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'frequencyModulation', label: '파동별 주파수 차이', min: 1, max: 6, step: 0.2, default: 3.2 },
    { key: 'baseAmplitude', label: '기본 진폭', min: 5, max: 40, step: 1, default: 12, unit: 'px' },
    { key: 'centerAmplitudeBoost', label: '중심부 진폭 부스트', min: 10, max: 80, step: 2, default: 40, unit: 'px' },
  ],

  related: ["Flow Field", "Perlin / Simplex Noise", "Fractal Brownian Motion"],
};
