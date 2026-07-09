// src/algorithms/agent-system/index.js
import sketch from './sketch';

export default {
  longDescription: {
    ko: 'Agent System은 독립적인 에이전트들이 단순 규칙(분리, 정렬, 응집)을 따라 상호작용하며, 군집 행동을 창발시키는 알고리즘입니다. 각 에이전트는 주변 에이전트들을 인식하고, 충돌을 피하며 같은 방향으로 정렬하고, 무리 중심으로 이동합니다. 이 간단한 규칙들이 결합되어 복잡한 집단 패턴(예: 무리, 학교 물고기 무리)이 자연스럽게 나타나며, 창발적 행동의 전형적인 예시입니다.',
    en: 'Agent System is an algorithm where independent agents follow simple rules (separation, alignment, cohesion) to interact and exhibit emergent flocking behavior. Each agent perceives nearby agents, avoids collisions, aligns direction, and moves toward the center of the group. These simple rules combine to produce complex collective patterns (e.g., flocks, schools of fish), serving as a classic example of emergent behavior.',
  },
  sketch,
    params: [
    { key: 'count', label: '에이전트 수', min: 20, max: 500, step: 10, default: 200, restart: true },
    { key: 'perceptionRadius', label: '인식 반경', min: 10, max: 150, step: 1, default: 50, unit: 'px' },
    { key: 'maxSpeed', label: '최대 속도', min: 0.5, max: 6, step: 0.1, default: 2 },
    { key: 'separationWeight', label: '분리 가중치', min: 0, max: 4, step: 0.1, default: 1.5 },
    { key: 'alignmentWeight', label: '정렬 가중치', min: 0, max: 4, step: 0.1, default: 1.0 },
    { key: 'cohesionWeight', label: '응집 가중치', min: 0, max: 4, step: 0.1, default: 1.2 },
  ],
  related: ['Boids / Flocking', 'Particle System', 'Attractor System'],
};