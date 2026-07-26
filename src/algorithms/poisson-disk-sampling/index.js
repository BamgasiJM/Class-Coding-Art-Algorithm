import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Poisson Disk Sampling**(푸아송 원판 샘플링)은 **최소 간격 제약**을 만족하면서 **균일하게 공간을 채우는** 점 분포를 생성하는 알고리즘입니다. 완전 무작위 분포는 점들이 뭉쳐있는 클러스터링 현상을 보이고, 규칙적 격자(Grid)는 부자연스러운 주기성을 갖는 반면, Poisson Disk Sampling은 두 극단 사이의 **최적 균형**을 달성합니다. 이는 **청색 소음(Blue Noise)** 스펙트럼 특성을 가지며, 자연계의 나무 배치, 털 분포, 신경 세포 배열 등을 정확히 모델링합니다. **Bridson 알고리즘**은 활성 목록(Active List)과 공간 해시 그리드(Spatial Hash Grid)를 사용하여 선형 시간 복잡도로 효율적 구현을 제공합니다.

### 1. 핵심 수학적 원리
1. **최소 거리 제약:**
   - 모든 점 쌍 $(p_i, p_j)$ 사이: $\|p_i - p_j\| \geq d_{\min}$
   - 결과: 점들이 서로 $d_{\min}$ 반경 내에 다른 점 불가

2. **Bridson 알고리즘:**
   - 입력: 캔버스 크기, 최소 거리 $r$, 후보 시도 횟수 $k$
   - 셀 크기: $s = r / \sqrt{2}$ (격자)
   - 활성 목록: 최근 추가된 점들 관리

3. **알고리즘 단계:**
   1. 첫 점을 무작위로 선택하여 활성 목록에 추가
   2. 활성 목록에서 무작위로 점 선택
   3. 그 점으로부터 거리 $[r, 2r]$ 범위, 무작위 각도에서 후보점 생성 ($k$번 시도)
   4. 후보점이 모든 기존 점과 $\geq r$ 거리를 유지하면 채택, 활성 목록에 추가
   5. $k$번 실패하면 점을 활성 목록에서 제거
   6. 활성 목록이 비울 때까지 반복

4. **공간 해시 그리드:**
   - 각 셀은 반경 $r$ 내 점들을 저장
   - 후보점의 유효성 확인: 주변 8개 셀의 점들과만 거리 비교

### 2. 주요 특징 및 장점
- **청색 소음(Blue Noise):** 저주파 클러스터링 없고 고주파 깍둑거림도 없는 최적 분포.
- **자연성:** 나무숲, 별빛, 식생 패턴 등 자연의 균형 잡힌 배치를 모델링.
- **효율성:** $O(n)$ 시간 복잡도로 빠른 생성 가능.
- **시각적 우아함:** 규칙적이면서도 유기적인 느낌의 분포.

### 3. 구현 시 고려 사항
- **최소 거리 $r$:** 작으면 더 많은 점, 크면 희박; 보통 공간 크기의 5~10%.
- **후보 시도 횟수 $k$:** 크면 더 조밀하지만 느림; 보통 30~50회.
- **공간 해시 최적화:** 셀 크기 정확히 설정하면 이웃 탐색 효율 극대화.
- **경계 처리:** 경계 근처 점들의 불균형; 순환 경계(Toroidal) 사용으로 완화.

### 4. 활용 분야
- **절차적 생성:** 게임 맵에 자원, 건물, 몬스터 배치; 자연스러운 분포 보장.
- **스티플링 & 이미지 처리:** 초상화 점 배치, 절반톤(Halftone) 인쇄.
- **데이터 시각화:** 산점도에서 겹침 제거, 점 표본 다양화.
- **물리 시뮬레이션:** 입자 초기 배치, 분자 동역학 초기화.
- **Generative Art:** 식물 배치, 별 분포, 유기적 패턴 생성.
    `,
    en: String.raw`
Poisson Disk Sampling generates point distributions that maintain minimum distance constraints while uniformly filling space. Unlike pure random (which clusters) or grids (which show artificial periodicity), it achieves optimal balance with blue noise characteristics—a distribution found in nature wherever points naturally repel each other: tree spacing, hair density, and neural distributions. The Bridson algorithm uses an active list and spatial hash grid for O(n) linear-time efficiency, making it practical for real-time generation.
    `,
  },
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