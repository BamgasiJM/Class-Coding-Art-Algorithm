import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'minDistance', label: '최소 점간 거리', min: 10, max: 60, step: 2, default: 25, unit: 'px', restart: true },
    { key: 'candidateAttempts', label: '후보 생성 시도 횟수', min: 10, max: 50, step: 5, default: 30, restart: true },
    { key: 'iterationsPerFrame', label: '프레임당 처리 점 수', min: 1, max: 20, step: 1, default: 8 },
    { key: 'circleDisplayDuration', label: '배제 영역 표시 시간', min: 50, max: 300, step: 25, default: 150, unit: 'frame' },
    { key: 'restartDelayFrames', label: '재시작 대기 시간', min: 100, max: 400, step: 25, default: 240, unit: 'frame' },
    { key: 'pointRadiusMin', label: '최근 점 최대 크기', min: 4, max: 16, step: 1, default: 8, unit: 'px' },
    { key: 'pointRadiusMax', label: '점 기본 크기', min: 2, max: 8, step: 0.5, default: 4, unit: 'px' },
    { key: 'pointAlphaMin', label: '점 기본 투명도', min: 100, max: 220, step: 10, default: 160 },
    { key: 'pointAlphaMax', label: '최근 점 투명도', min: 200, max: 255, step: 5, default: 255 },
  ],
  related: ['Circle Packing', 'Voronoi Diagram', 'Space Colonization'],
}