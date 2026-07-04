import sketch from "./sketch";

export default {
  longDescription: {
    ko: `Trigonometric Wave는 사인(Sine)과 코사인(Cosine) 함수의 주기성을 이용하여 다양한 파형을 생성하는 가장 기본적인 제너레이티브 아트 알고리즘 중 하나입니다. 서로 다른 진폭, 주파수, 위상을 가진 여러 삼각함수를 조합하면 단순한 직선이 복잡하고 유기적인 리듬을 가진 형태로 변화합니다. 이러한 원리는 오디오 신호 처리, 진동 시뮬레이션, 물결 표현, 데이터 시각화 등 다양한 분야에서도 활용됩니다. 작은 수식의 변화만으로도 전혀 다른 시각적 결과를 만들어낼 수 있기 때문에 수학과 예술이 만나는 대표적인 예제로 자주 사용됩니다.`,

    en: `Trigonometric Wave is one of the most fundamental generative art algorithms, using the periodic nature of sine and cosine functions to create dynamic waveforms. By combining multiple trigonometric functions with different amplitudes, frequencies, and phases, simple curves evolve into rich and organic visual patterns. The same mathematical principles are widely used in audio synthesis, vibration simulation, water surface animation, and scientific visualization. Because subtle changes in mathematical parameters can produce dramatically different results, trigonometric waves are a classic example of the connection between mathematics and visual art.`,
  },

  sketch,

  related: ["Flow Field", "Perlin / Simplex Noise", "Fractal Brownian Motion"],
};
