// src/algorithms/flow-map-visualization/index.js
import sketch from './sketch';

export default {
  longDescription: {
    ko: 'Flow Map Visualization은 2D 벡터 필드를 시각화하는 기법입니다. Perlin Noise를 사용하여 벡터 필드를 생성하고, 스트림라인을 통해 흐름의 방향과 세기를 표현합니다. 각 입자는 벡터 필드를 따라 이동하며, 그 경로를 선으로 연결하여 유동적인 흐름을 시각적으로 보여줍니다. 이 방법은 LIC(Line Integral Convolution)과 유사한 효과를 내며, 복잡한 흐름 패턴을 직관적으로 이해하는 데 도움이 됩니다.',
    en: 'Flow Map Visualization is a technique for visualizing 2D vector fields. It uses Perlin Noise to generate the vector field and represents the direction and magnitude of the flow through streamlines. Each particle follows the vector field, and their paths are connected with lines to visually display fluid flow. This method produces effects similar to LIC (Line Integral Convolution) and helps intuitively understand complex flow patterns.',
  },
  sketch,
  related: ['Flow Field', 'Perlin / Simplex Noise', 'Curl Noise'],
};