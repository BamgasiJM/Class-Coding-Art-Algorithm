# 알고리즘 설명글 생성 프롬프트

다른 LLM에 알고리즘 상세 페이지 설명글(`longDescription.ko` / `.en`)을 맡길 때 쓰는 프롬프트다.
아래 블록을 복사해 `<<알고리즘 이름>>` 부분만 바꿔서 사용한다. 결과물은
`src/algorithms/<slug>/index.js`의 `` String.raw`...` `` 백틱 사이에 그대로 붙여넣는다.

관련 규칙은 프로젝트 루트 `CLAUDE.md`의 "longDescription is Markdown + LaTeX — use `String.raw`" 참고.

---

## 프롬프트 (복사해서 사용)

````text
당신은 제너레이티브 아트 알고리즘을 설명하는 기술 문서 작가입니다.
React 기반 제너레이티브 아트 포트폴리오 사이트의 알고리즘 상세 페이지에 들어갈
설명글을 작성합니다. 결과물은 JS 파일의 String.raw`...` 백틱 사이에
"그대로" 붙여넣어져 react-markdown + KaTeX로 렌더링됩니다.

## 작성 대상
알고리즘 이름: <<여기에 알고리즘 이름, 예: "Reaction-Diffusion">>
(필요하면 핵심 개념/수식/활용처에 대한 추가 메모를 여기에 덧붙이세요.)

## 출력 형식
아래 두 개의 마크다운 블록만 출력하세요. 코드 펜스나 설명, 인사말은 넣지 마세요.

[KO]
(한국어 설명 — 사이트에서 본문으로 크게 노출됨)

[EN]
(영어 설명 — 한국어와 동일한 구조/깊이의 대응 번역, 보조 텍스트로 흐리게 노출됨)

## 구조 (curl-noise 기준)
- 맨 위에 소제목 없이 2~3문장의 도입 문단으로 알고리즘을 한 문장 정의 + 핵심 특징 요약.
- 이어서 `###` 소제목 섹션 3~4개. 예: "핵심 수학적 원리", "주요 특징 및 장점",
  "구현 시 고려 사항", "활용 분야". 알고리즘에 맞게 소제목을 조정하세요.
- 각 섹션은 짧은 문단 + 필요 시 불릿 리스트(`-`) 또는 번호 리스트로 구성.
- 핵심 용어는 **볼드**로 강조.

## 분량 (curl-noise 기준 — 반드시 이 수준을 맞출 것)
- 한국어: 도입 문단 포함 약 900~1200자, `###` 섹션 3~4개.
- 영어: 한국어와 대응되는 동일 구조/분량.
- 너무 짧으면(한 문단) 안 되고, 너무 장황해도 안 됩니다. curl-noise 예시와 비슷한 밀도로.

## 수식 (LaTeX + KaTeX)
- 인라인 수식은 $...$, 블록(가운데 정렬) 수식은 $$...$$ 로 작성.
- LaTeX 명령은 **백슬래시 하나**로 씁니다: \psi, \frac{\partial \psi}{\partial x},
  \nabla \times, \epsilon 등. (String.raw로 감싸지므로 이스케이프 불필요, 이중 백슬래시 금지.)
- 수식은 알고리즘에 실제로 해당하는 것만. 확실하지 않으면 지어내지 말고 정성적으로 설명.

## 절대 금지 (템플릿 리터럴이 깨짐)
- 백틱(`) 문자를 절대 쓰지 마세요. → 마크다운 인라인 코드(`code`)를 쓰지 말고 **볼드**로 대체.
- 두 글자 시퀀스 "${" 를 절대 쓰지 마세요. (중괄호가 필요하면 수식 안에서 \{ \} 사용.)
- 세 개짜리 코드 펜스(```)도 쓰지 마세요.

## 참고 예시 (curl-noise 한국어 — 이 길이·구조·수식 밀도를 목표로)
"""
Curl Noise는 유체 역학의 물리적 특성을 시뮬레이션하기 위해 사용되는 그래픽스 알고리즘으로,
벡터장의 **비회전성**과 **용량 보존성**을 수학적으로 보장하는 기술입니다. (…도입 문단…)

### 1. 핵심 수학적 원리
Curl Noise의 핵심은 스칼라 함수 $\psi$에 대해 그 **Curl(회전)** 연산을 수행하는 것입니다.
1. **Potential Function 생성:** …좌표 $(x, y, z)$… 스칼라 필드 $\psi(x, y, z)$…
2. **Curl 연산 적용:** …
   - **2D 환경:** $\mathbf{F} = \left( \frac{\partial \psi}{\partial y}, -\frac{\partial \psi}{\partial x} \right)$

### 2. 주요 특징 및 장점
- **Incompressibility (비압축성):** …
- **Vorticity (와도):** …

### 3. 구현 시 고려 사항
- **Finite Difference Method:** …$\frac{\partial \psi}{\partial x} \approx \frac{\psi(x+\epsilon,...) - \psi(x-\epsilon,...)}{2\epsilon}$

### 4. 활용 분야
- **Particle Systems:** …
"""
````

---

## 결과 붙여넣기

받은 `[KO]` / `[EN]` 블록을 `src/algorithms/<slug>/index.js`에 이렇게 감싼다:

```js
import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
(여기에 [KO] 붙여넣기)
`,
    en: String.raw`
(여기에 [EN] 붙여넣기)
`,
  },
  sketch,
  related: ['...'],  // ALGORITHMS의 정확한 이름
}
```

`String.raw`를 반드시 유지할 것 — 일반 백틱은 LaTeX 백슬래시(`\frac`, `\times`, `\nabla` 등)를
JS 이스케이프로 먹어치워 수식을 조용히 깨뜨린다.
