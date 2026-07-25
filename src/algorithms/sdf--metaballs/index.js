import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**SDF(Signed Distance Field) & Metaballs(메타볼)**는 **부호 있는 거리장(Signed Distance Field)**을 기반으로 여러 **영향 구(Influence Sphere)**의 거리 기여도를 **합산(Summation)**하여 **부드러운 블롭 형태(Smooth Blob Shape)**를 형성하는 알고리즘입니다. 각 화면 픽셀에 대해 모든 구까지의 **가중 거리(Weighted Distance)**를 누적하고, **임계값(Threshold)**과 비교하여 경계를 결정합니다. 결과적으로 **겹치는 구들이 자연스럽게 병합되고**, **변형되는 유기적 형태(Morphing Organic Shape)**와 **유동감 있는 표면**이 표현됩니다. 이는 게임, 영화, 시뮬레이션에서 **물질의 흐름, 젤 같은 몸체, 액체 표면** 등을 효과적으로 렌더링하는 도구입니다.

### 1. 핵심 수학적 원리
1. **부호 있는 거리장(SDF):**
   - 점 $p$에서 구 중심 $c$까지의 거리: $d = \|p - c\| - r$ (구 반지름 $r$)
   - $d < 0$: 구 내부, $d = 0$: 표면, $d > 0$: 외부
   - SDF 값: $\text{sdf}(p) = d$

2. **메타볼 함수(Metaball Function):**
   - 각 구의 영향도: $f_i(p) = \max(0, 1 - (d_i / r_i)^2)^2$ (또는 다른 감쇠 함수)
   - 전체 영향도: $F(p) = \sum_{i=1}^{n} w_i f_i(p)$ (가중치 $w_i$)

3. **경계 결정:**
   - 임계값 $\tau$와 비교: $F(p) > \tau$ → 표면 내부
   - 경계선: $F(p) = \tau$의 등고선

4. **거리장 계산:**
   - 암시적 거리: $\text{sdf}_{\text{combined}}(p) = -\log(F(p))$ (또는 선형 근사)
   - 또는 원점 기반: $d_{\text{combined}}(p) = \max_i(r_i - d_i)$

### 2. 주요 특징 및 장점
- **부드러운 병합:** 구들이 겹칠 때 날카로운 경계 없이 자연스럽게 연결.
- **계산 효율성:** SDF 계산이 $O(n \times W \times H)$ (n = 구 개수, W×H = 해상도); 명시적 메시 생성 불필요.
- **동적 변형:** 구의 위치, 크기를 실시간으로 변경해도 자동 렌더링.
- **정규 표면:** 폐곡면 보장, 물리 시뮬레이션과의 호환성.

### 3. 구현 시 고려 사항
- **감쇠 함수 선택:** 다항식, 지수, 가우시안 등 여러 옵션; 부드러움과 계산 비용 트레이드오프.
- **임계값 조정:** 작으면 더 큰 블롭, 크면 작은 블롭; 구의 반지름과 연계해 조정.
- **해상도:** 높을수록 세밀하지만 계산 오버헤드 증가; 보통 256×256~1024×1024.
- **색상 매핑:** 각 픽셀의 거리, 구의 ID, 정규벡터에 따라 색상 할당.

### 4. 활용 분야
- **게임 개발:** 유동하는 몬스터, 젤 생물, 액체 표면 렌더링.
- **영화 & VFX:** 변형하는 캐릭터, 유기적 생물 표면.
- **물리 시뮬레이션:** Metaball 기반 충돌 감지, 변형 물질 시뮬레이션.
- **Generative Art:** 유기적 형태, 음악 시각화, 추상 애니메이션.
- **과학 시각화:** 분자 표면, 단백질 폴딩, 밀도 분포 시각화.
    `,
    en: String.raw`
SDF & Metaballs forms smooth blob shapes by summing the distance field influence of multiple spheres. Each pixel's combined influence is compared to a threshold; pixels exceeding it are "inside" the blob. Where spheres overlap, influences blend smoothly, creating natural merging effects and organic flowing surfaces. This is a core technique for rendering fluids, gel bodies, and morphing creatures in games and film, providing both visual elegance and computational efficiency over explicit mesh generation.
    `,
  },
  sketch,
  params: [
    { key: 'numBalls', label: '메타볼 개수', min: 2, max: 20, step: 1, default: 6, restart: true },
    { key: 'step', label: '렌더링 해상도', min: 1, max: 8, step: 1, default: 4, unit: 'px', restart: true },
    { key: 'ballRadiusMin', label: '메타볼 최소 반지름', min: 0.04, max: 0.2, step: 0.02, default: 0.08, unit: '배수', restart: true },
    { key: 'ballRadiusMax', label: '메타볼 최대 반지름', min: 0.1, max: 0.3, step: 0.02, default: 0.15, unit: '배수', restart: true },
    { key: 'ballSpeedMin', label: '메타볼 최소 속도', min: -3, max: 0, step: 0.5, default: -1.5, unit: 'px/f', restart: true },
    { key: 'ballSpeedMax', label: '메타볼 최대 속도', min: 0, max: 3, step: 0.5, default: 1.5, unit: 'px/f', restart: true },
    { key: 'sdfThreshold', label: 'SDF 임계값', min: 0.5, max: 2.0, step: 0.1, default: 1.0 },
    { key: 'sdfAlphaMin', label: '알파 최소값', min: 0, max: 100, step: 5, default: 10 },
    { key: 'sdfAlphaMax', label: '알파 최대값', min: 150, max: 255, step: 5, default: 255 },
    { key: 'sdfAlphaRange', label: 'SDF 알파 범위', min: 1.0, max: 5.0, step: 0.5, default: 3.0 },
  ],
  related: ["Particle System", "Attractor System", "Fractal Brownian Motion"],
};
