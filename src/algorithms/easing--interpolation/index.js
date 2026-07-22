import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Easing & Interpolation(이징과 보간)**은 시작점 $S$에서 끝점 $E$까지의 움직임을 **시간에 따라 부드럽고 자연스럽게** 표현하는 애니메이션의 가장 기본적인 수학적 기법입니다. **선형 보간(Linear Interpolation, Lerp)**은 일정한 속도로 움직이는 단순한 중간값 계산을 제공하고, **이징(Easing)**은 속도 곡선을 비선형으로 변형하여 가속도, 감속도, 반동 등 현실 세계의 자연스러운 움직임을 표현합니다. 게임, UI 애니메이션, 모션그래픽, 데이터 시각화 등 모든 실시간 그래픽 시스템에서 핵심적으로 사용되며, 제너레이티브 아트에서도 단순한 규칙으로부터 표현력 있는 움직임을 창출하는 기초 도구입니다.

### 1. 핵심 수학적 원리
1. **선형 보간(Linear Interpolation, Lerp):**
   - 정규화된 시간 $t \in [0, 1]$에 대해: $p(t) = S + t(E - S) = S(1-t) + Et$
   - 속도가 일정하므로 움직임이 기계적이고 딱딱합니다.

2. **이징 함수(Easing Function):**
   - 입력 정규화 시간 $t \in [0, 1]$를 출력 $f(t) \in [0, 1]$로 변환하는 함수
   - 최종 위치: $p(t) = S + f(t)(E - S)$
   - 다양한 이징 함수 유형:
     - **Ease-in:** $f(t) = t^2$ 또는 $t^3$ (처음에 느리다가 가속)
     - **Ease-out:** $f(t) = 1 - (1-t)^2$ (처음에 빠르다가 감속)
     - **Ease-in-out:** 양쪽 끝에서 부드러운 곡선 (시작과 끝에서 정체)
     - **Elastic:** $f(t) = \sin(13\pi/2 \cdot t)(1-t)^3 + t$ (탄성 진동처럼 반동)
     - **Bounce:** 여러 감쇠된 반동 (튀는 공처럼)

3. **다차원 확장:**
   - 벡터 보간: 각 차원(x, y, z, ...)에 독립적으로 적용
   - $\mathbf{p}(t) = \mathbf{S} + f(t)(\mathbf{E} - \mathbf{S})$

4. **시간 매개변수화:**
   - 애니메이션 경과 시간을 총 기간으로 정규화: $t = \text{elapsed} / \text{duration}$
   - $t$가 1을 초과하면 애니메이션 완료

### 2. 주요 특징 및 장점
- **극도의 단순성:** 몇 줄의 수식만으로 복잡한 움직임을 표현하며, 계산량이 극도로 적습니다.
- **직관적 인지:** 사람의 눈은 선형 움직임을 부자연스럽게 인식하며, 이징을 통한 가속/감속을 자연스럽다고 느낍니다.
- **높은 확장성:** 색상, 회전, 스케일 등 모든 수치 값에 적용 가능하며, 조합(easing chaining)도 용이합니다.
- **성능 효율성:** 실시간 처리에 적합하며, 심지어 저사양 기기에서도 매끄러운 애니메이션을 제공합니다.

### 3. 구현 시 고려 사항
- **이징 함수 선택:** 움직임의 감정(급박함, 우아함, 재미 등)에 따라 함수 선택이 중요합니다. 일반적으로 ease-out이 가장 자연스럽습니다.
- **애니메이션 곡선 라이브러리:** Cubic Bézier, Catmull-Rom 등 복잡한 곡선도 표현 가능하며, 미리 계산된 룩업 테이블이 성능을 향상시킵니다.
- **시간 정규화 정확성:** floating-point 오차를 최소화하려면 정규화 계산을 정밀하게 수행합니다.
- **연쇄 애니메이션:** 여러 애니메이션을 순차 실행하거나 병렬 실행하는 스케줄링이 필요합니다.

### 4. 활용 분야
- **UI/UX 애니메이션:** 버튼 클릭, 슬라이드 메뉴, 모달 전환 등의 자연스러운 움직임.
- **게임 개발:** 캐릭터 점프, 물체 이동, 카메라 패닝, 이펙트 재생.
- **모션그래픽 & 영상:** 타이틀 애니메이션, 텍스트 효과, 객체 변형.
- **데이터 시각화:** 차트 애니메이션, 그래프 전환, 수치 카운트업.
- **제너레이티브 아트:** 추상 움직임, 리듬 표현, 음악 시각화에 기반이 되는 기술.
    `,

    en: "Easing & Interpolation are fundamental animation techniques for creating smooth motion between two positions. Interpolation (Lerp) computes intermediate values between a start and an end point, while easing gradually changes the movement speed to produce more natural motion. These techniques are widely used in games, user interfaces, motion graphics, and data visualization. Because they transform simple linear movement into expressive animation with only a few mathematical operations, they are essential building blocks in generative art.",
  },

  sketch,
    params: [
    {
      key: 'easing',
      label: '이싱 가중치',
      min: 0.01,
      max: 0.3,
      step: 0.01,
      default: 0.08,
    },
    {
      key: 'circleRadius',
      label: '원 반지름',
      min: 10,
      max: 80,
      step: 2,
      default: 36,
    },
    {
      key: 'trailAlpha',
      label: '잔상 강도',
      min: 50,
      max: 255,
      step: 5,
      default: 150,
    },
    {
      key: 'targetRadius',
      label: '목적지 원 크기',
      min: 2,
      max: 15,
      step: 1,
      default: 4,
    },
  ],

  related: ["Particle System", "Spring & Constraint", "Flow Field"],
};
