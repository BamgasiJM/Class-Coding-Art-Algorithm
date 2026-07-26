import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**N-Body Gravity**(N체 중력)는 우주의 모든 입자가 서로 **뉴턴의 만유인력**으로 상호작용하는 역학계를 시뮬레이션하는 **고전 천체역학** 알고리즘입니다. 각 입자 쌍 사이에 작용하는 인력은 **역제곱 법칙(Inverse-Square Law)** $F = \frac{G m_1 m_2}{r^2}$을 따르며, 이를 **시간 적분(Time Integration)** 하여 입자들의 궤도 운동과 장기 동역학을 계산합니다. 중앙에 거대한 질량(항성)이 있고 그 주변을 작은 질량들(행성)이 공전하는 단순한 초기 조건에서도, 입자 간 상호작용으로 인해 안정적인 원형 궤도, 복잡한 타원 궤도, 또는 혼돈스러운 상호작용이 나타납니다.

### 1. 핵심 수학적 원리
1. **만유인력:**
   - 두 질점 $i, j$ 사이의 인력 벡터: $\mathbf{F}_{ij} = G \frac{m_i m_j}{r_{ij}^3} (\mathbf{r}_j - \mathbf{r}_i)$
   - 여기서:
     - $G$: 중력 상수
     - $m_i, m_j$: 질량
     - $\mathbf{r}_i, \mathbf{r}_j$: 위치 벡터
     - $r_{ij} = \|\mathbf{r}_j - \mathbf{r}_i\|$: 거리

2. **뉴턴의 제2법칙:**
   - 입자 $i$의 가속도: $\mathbf{a}_i = \sum_{j \neq i} \frac{\mathbf{F}_{ij}}{m_i}$
   - 벡터 합으로 모든 이웃 입자의 중력 누적

3. **특이점 회피(Softening):**
   - 두 입자가 매우 가까워지면 인력이 무한대로 발산하는 문제 해결:
   - 수정된 거리: $r_{ij}' = \sqrt{r_{ij}^2 + \epsilon^2}$ (여기서 $\epsilon$은 작은 값)
   - 이로써 수치 안정성 향상

4. **시간 적분(Time Integration):**
   - 속도 갱신: $\mathbf{v}_i(t+\Delta t) = \mathbf{v}_i(t) + \mathbf{a}_i(t) \Delta t$
   - 위치 갱신: $\mathbf{r}_i(t+\Delta t) = \mathbf{r}_i(t) + \mathbf{v}_i(t+\Delta t) \Delta t$
   - 보통 **심플렉틱 적분기(Symplectic Integrator)** 사용하여 에너지 보존 개선

5. **궤도의 특성:**
   - 원형 궤도: 특정 반지름에서 원심력과 중력이 정확히 균형
   - 타원 궤도: 장축과 단축을 가진 닫힌 궤도 (케플러 법칙)
   - 쌍곡선 궤도: 열린 궤도 (에너지 > 0)

### 2. 주요 특징 및 장점
- **물리적 정확성:** 뉴턴 역학을 정확히 시뮬레이션하므로, 실제 천문학적 시스템과 일치합니다.
- **복잡계 동역학:** 3체 이상의 상호작용에서 혼돈적 행동이 나타나며, 장기 예측이 불가능합니다.
- **우주적 스케일의 대칭성:** 입자 간 상호작용이 대칭적이므로, 운동량과 에너지가 보존됩니다.
- **시각적 미감:** 입자들이 궤도를 그리는 모습이 극도로 아름답고, 우주의 질서를 시각화합니다.

### 3. 구현 시 고려 사항
- **계산 복잡도:** 모든 입자 쌍의 상호작용 계산은 $O(n^2)$이므로, 입자 수 증가 시 빠르게 느려집니다. 병렬화 또는 Barnes-Hut 알고리즘 같은 근사 방법 고려.
- **수치 안정성:** softening 거리와 시간 스텝을 신중히 선택하여 수치 오차 관리.
- **초기 조건의 중요성:** 원형 궤도를 위한 정확한 초기 속도 계산이 필수.
- **장기 시뮬레이션:** 에너지 보존 확인으로 계산의 정확성 검증.

### 4. 활용 분야
- **천문학 교육:** 행성 궤도, 이진 항성계, 은하계 충돌 시뮬레이션.
- **게임 개발:** 우주 게임의 중력 기반 게임플레이, 행성 시스템 자동 생성.
- **물리 시뮬레이션:** 입자군의 상호작용, 먼지 구름 형성, 물질 응집 과정.
- **Generative Art:** 궤도 자체를 예술로 표현하는 추상 작품, 우주적 패턴.
- **과학 커뮤니케이션:** 일반인을 위한 우주 역학 시각화 도구.
    `,
    en: "N-Body Gravity simulates the dynamics where every particle attracts every other particle through universal gravitation. An inverse-square force (F = G·m₁·m₂/r²) acts between each pair, and orbital motion is computed through time integration. Small masses (planets) orbit around a central large mass (star), producing stable circular orbits, elliptical paths, or chaotic interactions depending on initial conditions.",
  },
  sketch,
  params: [
    { key: 'gravitationalConstant', label: '중력 상수', min: 0.2, max: 2.0, step: 0.1, default: 0.7 },
    { key: 'softening', label: '특이점 방지 거리', min: 5, max: 50, step: 5, default: 20, unit: 'px²' },
    { key: 'numSmallBodies', label: '행성 개수', min: 20, max: 150, step: 10, default: 60, restart: true },
    { key: 'timeStep', label: '시간 간격', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'starMass', label: '항성 질량', min: 500, max: 2000, step: 100, default: 1000, restart: true },
    { key: 'minOrbitDistance', label: '최소 궤도 거리', min: 40, max: 150, step: 10, default: 80, unit: 'px', restart: true },
    { key: 'maxOrbitDistance', label: '최대 궤도 거리', min: 0.2, max: 0.6, step: 0.05, default: 0.4, unit: '배수', restart: true },
    { key: 'trailAlpha', label: '궤적 길이', min: 5, max: 50, step: 5, default: 15 },
  ],
  related: ["Attractor System", "Spring & Constraint", "Boids / Flocking"],
};
