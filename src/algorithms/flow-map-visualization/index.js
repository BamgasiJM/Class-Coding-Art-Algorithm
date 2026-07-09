import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Flow Map Visualization은 2D 벡터 필드를 입자(Particle) 없이 시각화하는 기법입니다. 화면을 일정한 해상도의 그리드로 나누고, 각 셀에 위치한 선분의 회전 각도와 투명도를 Perlin Noise 필드에 실시간으로 매핑합니다. 이 정적 그리드 기반의 접근법은 공간 전체의 유동적인 장(Field)의 분포와 에너지의 흐름을 직관적이고 기하학적인 텍스처로 표현합니다.',
    en: 'Flow Map Visualization is a technique for visualizing 2D vector fields without using particles. It divides the screen into a grid of a set resolution, mapping the rotation angle and transparency of a line segment in each cell to a Perlin Noise field in real time. This static grid-based approach intuitively expresses the distribution of the fluid field and energy flow across the space as a geometric texture.',
  },
  sketch,
  params: [
    { 
      key: 'resolution', 
      label: '그리드 해상도', 
      min: 10, 
      max: 60, 
      step: 2, 
      default: 24, 
      restart: false 
    },
    { 
      key: 'noiseScale', 
      label: '노이즈 스케일', 
      min: 0.005, 
      max: 0.1, 
      step: 0.005, 
      default: 0.02, 
      restart: false 
    },
    { 
      key: 'timeSpeed', 
      label: '시간 흐름 속도', 
      min: 0, 
      max: 0.05, 
      step: 0.001, 
      default: 0.005, 
      restart: false 
    },
    { 
      key: 'lineLengthMult', 
      label: '선 길이 배율', 
      min: 0.2, 
      max: 2.0, 
      step: 0.1, 
      default: 0.8, 
      restart: false 
    },
    { 
      key: 'alphaPulse', 
      label: '투명도 파동 강도', 
      min: 50, 
      max: 255, 
      step: 5, 
      default: 200, 
      restart: false 
    }
  ],
  related: ['Flow Field', 'Perlin / Simplex Noise', 'Cellular Automata'],
}