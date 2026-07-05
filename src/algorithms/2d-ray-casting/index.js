import sketch from './sketch'

export default {
  longDescription: {
    ko: '2D Ray Casting은 관찰점(광원)에서 사방으로 광선을 발사해 벽(선분)과의 교차점을 계산하는 기하 알고리즘입니다. 각 광선은 가장 먼저 만나는 벽까지만 뻗고, 그 교차점들을 각도순으로 연결하면 "보이는 영역(visibility polygon)"이 완성됩니다. 날카로운 그림자 경계를 정확히 재현하려면 벽의 끝점을 향하는 광선에 미세한 각도 오프셋을 주어 그림자의 시작/끝을 따로 포착해야 합니다. 게임 AI의 시야 판정, 2D 조명, 실시간 그림자 등 다양한 분야에서 쓰이는 기초 기술입니다.',
    en: '2D Ray Casting is a geometric algorithm that shoots rays in all directions from an observer (light source) and computes their intersections with wall segments. Each ray stops at the first wall it hits, and connecting those hit points in angular order yields the "visibility polygon." To reproduce crisp shadow edges, rays aimed at wall endpoints must be nudged with tiny angle offsets so the start and end of each shadow are captured separately. This primitive underpins game AI line-of-sight, 2D lighting, and real-time shadow rendering.',
  },
  sketch,
  related: ['Voronoi Diagram', 'Delaunay Triangulation', 'SDF & Metaballs'],
}