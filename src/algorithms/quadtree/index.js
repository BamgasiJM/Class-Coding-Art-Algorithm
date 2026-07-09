import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Quadtree는 2차원 공간을 재귀적으로 4개의 하위 영역으로 분할하는 자료구조입니다. 각 노드는 정해진 용량만큼의 점을 담고, 초과하면 4개의 자식 노드로 나뉩니다. 이 시각화에서는 움직이는 파티클들을 매 프레임 Quadtree에 삽입하여, 실시간으로 공간이 분할되는 과정을 보여줍니다. 깊이에 따라 선명도가 달라지는 경계선으로 트리의 계층 구조를 직관적으로 표현합니다.',
    en: 'A Quadtree is a spatial data structure that recursively subdivides 2D space into four quadrants. Each node stores points up to a set capacity, then splits into four children when exceeded. This visualization inserts moving particles into a fresh Quadtree every frame, showing how space subdivides in real time. Boundary lines fade with depth, intuitively revealing the tree’s hierarchical structure.',
  },
  sketch,
  params: [
    { 
      key: 'particleCount', 
      label: '파티클 개수', 
      min: 50, 
      max: 1000, 
      step: 10, 
      default: 300, 
      restart: true 
    },
    { 
      key: 'capacity', 
      label: '노드 수용량', 
      min: 1, 
      max: 10, 
      step: 1, 
      default: 4, 
      restart: false 
    },
    { 
      key: 'maxDepth', 
      label: '트리 최대 깊이', 
      min: 2, 
      max: 9, 
      step: 1, 
      default: 6, 
      restart: false 
    },
    { 
      key: 'speed', 
      label: '이동 속도 배율', 
      min: 0, 
      max: 5, 
      step: 0.1, 
      default: 1, 
      restart: false 
    },
    { 
      key: 'trailAlpha', 
      label: '잔상 길이 (Alpha)', 
      min: 0, 
      max: 255, 
      step: 5, 
      default: 40, 
      restart: false 
    },
  ],
  related: ['Circle Packing', 'Voronoi Diagram', 'Boids / Flocking'],
}