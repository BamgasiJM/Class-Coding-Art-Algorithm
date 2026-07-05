import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Quadtree는 2차원 공간을 재귀적으로 4개의 하위 영역으로 분할하는 자료구조입니다. 각 노드는 정해진 용량만큼의 점을 담고, 초과하면 4개의 자식 노드로 나뉩니다. 이 시각화에서는 움직이는 파티클들을 매 프레임 Quadtree에 삽입하여, 실시간으로 공간이 분할되는 과정을 보여줍니다. 깊이에 따라 선명도가 달라지는 경계선으로 트리의 계층 구조를 직관적으로 표현합니다.',
    en: 'A Quadtree is a spatial data structure that recursively subdivides 2D space into four quadrants. Each node stores points up to a set capacity, then splits into four children when exceeded. This visualization inserts moving particles into a fresh Quadtree every frame, showing how space subdivides in real time. Boundary lines fade with depth, intuitively revealing the tree’s hierarchical structure.',
  },
  sketch,
  related: ['Circle Packing', 'Voronoi Diagram', 'Boids / Flocking'],
}