import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Dithering(디더링)**은 **제한된 색상 팔레트(Restricted Color Palette)**를 사용하여 연속적인 톤(Continuous Tone)을 재현하는 **신호 처리 및 그래픽 양자화 기법**입니다. 컴퓨터의 초기 시대 모니터와 프린터의 색상 해상도가 제한되었을 때, 청색 소음(Blue Noise)이나 오차 확산(Error Diffusion)을 통해 제한된 색깔 수로도 풍부한 톤을 인지하도록 속이는 시각적 착각 기법입니다. 현대에는 레트로 미학, 예술적 스타일화, 이미지 압축에서 의도적으로 사용되며, 확률적 패턴의 수학적 아름다움과 실용성을 동시에 보여줍니다.

### 1. 핵심 수학적 원리
디더링의 기본 과정은 다음과 같습니다:

1. **선순 이진화(Naive Thresholding):**
   - 입력 밝기값 $L(x, y) \in [0, 1]$에 대해 임계값 $\theta$와 비교:
   - $O(x, y) = \begin{cases} 1 & \text{if } L(x, y) > \theta \\ 0 & \text{otherwise} \end{cases}$
   - 문제: 연속 톤이 급격한 흑백으로 변하여 밴딩(Banding) 현상 발생

2. **Bayer 행렬(Ordered Dithering):**
   - 주기적인 패턴 행렬 $B$ (예: 2×2, 4×4, 8×8)를 사용
   - Bayer 8×8 행렬: 각 셀에 0~63 사이의 고유값 배치
   - 수정된 임계값: $\theta' = B[x \bmod n, y \bmod n] / 64$ (정규화)
   - 출력: $O(x, y) = L(x, y) > \theta'$?
   - 장점: 빠른 계산, 타일링 가능
   - 단점: 규칙적 패턴이 눈에 띔

3. **Floyd-Steinberg(오차 확산, Error Diffusion):**
   - 현재 픽셀의 이진화 오차를 주변 픽셀로 분산
   - 오차: $e(x, y) = L(x, y) - O(x, y)$
   - 주변 픽셀에 오차 전파:
     - 우측: $L(x+1, y) += e(x, y) \cdot 7/16$
     - 좌하: $L(x-1, y+1) += e(x, y) \cdot 3/16$
     - 중앙하: $L(x, y+1) += e(x, y) \cdot 5/16$
     - 우하: $L(x+1, y+1) += e(x, y) \cdot 1/16$
   - 장점: 더 자연스러운 톤 표현, 인지적 품질 높음
   - 단점: 순차적 처리로 인한 느린 계산

4. **색상 팔레트 확장:** 이진(2색) 대신 다중 색상(N색) 팔레트를 사용:
   - 각 색상까지의 최소 거리 픽셀 선택 후 오차 확산

### 2. 주요 특징 및 장점
- **시각적 착각(Optical Illusion):** 제한된 색깔로 인쇄/표시하면서도 인간의 눈이 평균 효과로 더 많은 톤을 지각하도록 함.
- **역사적 중요성:** 초기 컴퓨터 모니터(1비트 흑백), 노키아 휴대폰 디스플레이, 점자 프린팅 등에서 필수 기술.
- **예술적 가치:** 현대에는 의도적으로 레트로 미학, 픽셀 아트, 고전적 인쇄 느낌을 재현하는 도구로 활용.
- **수학적 우아함:** 단순한 규칙으로부터 청색 소음(Blue Noise) 스펙트럼의 최적화를 달성.

### 3. 구현 시 고려 사항
- **Bayer 패턴 생성:** 2의 거듭제곱(2, 4, 8, 16)의 행렬을 미리 계산하여 룩업 테이블로 사용하면 효율적.
- **색 공간 선택:** RGB, 그레이스케일, HSL 등에서 디더링 적용 대상(예: 명도)을 명확히 정의.
- **임계값 조정:** 이미지의 평균 밝기에 따라 전체 임계값을 오프셋하여, 너무 어둡거나 밝은 결과를 보정.
- **에지 처리:** Floyd-Steinberg 적용 시 이미지 경계에서 오차 전파가 유효한 범위를 유지.

### 4. 활용 분야
- **구식 미디어 재현:** 팩스, 초기 컴퓨터 그래픽, 신문 인쇄 느낌의 감정적 표현.
- **레트로/복고 예술:** 8비트/16비트 게임 스타일의 이미지 변환, 픽셀 아트 생성.
- **이미지 압축:** 색 깊이를 줄이면서도 시각적 품질을 유지 (예: GIF, 제한된 팔레트 PNG).
- **인쇄 기술:** 색상 프린터에서 여러 색 판(CMYK)으로의 분해, 점 크기 조정을 통한 톤 표현.
- **접근성(Accessibility):** 색약자가 구별하기 쉬운 색상 팔레트로 변환하는 전처리.
- **데이터 시각화:** 제한된 색상으로 그래디언트나 히트맵을 표현하되, 정보 손실을 최소화.
    `,
    en: 'Dithering is a quantization technique that reproduces continuous tones using a restricted color palette. This sketch binarizes a smoothly generated brightness field with both methods, letting you tune the scale, threshold, and image brightness correction in real time via parameters.',
  },
  sketch,
  params: [
    {
      key: 'ditherMode',
      label: '디더링 모드 (0:Bayer, 1:FS)',
      min: 0,
      max: 1,
      step: 1,
      default: 0,
      restart: false
    },
    {
      key: 'bayerScale',
      label: 'Bayer 스케일',
      min: 2,
      max: 8,
      step: 1,
      default: 8,
      restart: false
    },
    {
      key: 'thresholdBias',
      label: '임계점 (Bias)',
      min: 0.1,
      max: 0.9,
      step: 0.01,
      default: 0.5,
      restart: false
    },
    {
      key: 'lumMultiplier',
      label: '휘도 정규화 계수',
      min: 100,
      max: 510,
      step: 10,
      default: 255,
      restart: true
    },
    {
      key: 'brightnessBias',
      label: '밝기 보정 (Offset)',
      min: -0.5,
      max: 0.5,
      step: 0.05,
      default: 0.0,
      restart: false
    }
  ],
  related: ['Truchet Tiles', 'Cellular Automata', 'Perlin / Simplex Noise'],
}