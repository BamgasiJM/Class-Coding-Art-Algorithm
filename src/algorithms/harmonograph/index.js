import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Harmonograph는 감쇠하는 여러 사인 진동을 합성하여 정교한 리사주 곡선을 그리는 알고리즘입니다. x축과 y축에 각각 2개씩 총 4개의 진동자를 배치하고, 각기 다른 주파수, 위상, 진폭, 감쇠율을 적용합니다. 시간이 지남에 따라 진폭이 지수적으로 줄어들며 중심부로 수렴하는 나선형 패턴이 형성됩니다. 진동자들의 주파수 비율이 정수비(1:2, 2:3 등)를 이룰 때 특히 아름다운 리사주 곡선이 나타납니다.",
    en: "Harmonograph is an algorithm that draws intricate Lissajous curves by combining multiple damped sine oscillations. It places two oscillators each on the x and y axes (four total), applying different frequencies, phases, amplitudes, and damping rates to each. As time progresses, the amplitudes decay exponentially toward the center, forming spiral patterns. Particularly beautiful Lissajous curves emerge when the oscillators' frequency ratios are integer values (1:2, 2:3, etc.).",
  },
  sketch,
  params: [
  {
    key: 'amplitude',
    label: '주 진폭',
    min: 0.15,
    max: 0.45,
    step: 0.01,
    default: 0.3,
    restart: true,
  },
  {
    key: 'secondaryAmplitude',
    label: '보조 진폭',
    min: 0.05,
    max: 0.3,
    step: 0.01,
    default: 0.15,
    restart: true,
  },
  {
    key: 'frequencyOffset',
    label: '주파수 차이',
    min: 1,
    max: 1.05,
    step: 0.001,
    default: 1.01,
    restart: true,
  },
  {
    key: 'dt',
    label: '곡선 해상도',
    min: 0.005,
    max: 0.05,
    step: 0.001,
    default: 0.02,
  },
  {
    key: 'pointsPerFrame',
    label: '그리기 속도',
    min: 10,
    max: 300,
    step: 10,
    default: 80,
  },
  {
    key: 'maxTime',
    label: '감쇠 시간',
    min: 30,
    max: 200,
    step: 5,
    default: 100,
    restart: true,
  },
],
  related: ["Trigonometric Wave", "Double Pendulum", "Attractor System"],
};
