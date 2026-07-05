export default function penroseTilingSketch(p, size) {
  let triangles = []
  let accentColor

  // 황금비 — setup 이전에 p.sqrt 사용 불가하므로 직접 선언
  const PHI = 1.6180339887

  // Robinson 삼각형으로 Penrose P2 타일링 구현
  // type: 'thin' (날카로운) | 'thick' (넓은)
  function createTriangle(type, A, B, C) {
    return { type, A, B, C }
  }

  // vec: (x, y) 객체 생성 헬퍼
  function vec(x, y) {
    return { x, y }
  }

  // 두 벡터 사이의 선형 보간
  function lerpVec(v1, v2, t) {
    return vec(v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t)
  }

  // 한 세대의 삼각형들을 분할하여 다음 세대 생성
  function subdivide(tris) {
    const result = []
    for (const tri of tris) {
      const { type, A, B, C } = tri
      if (type === 'thick') {
        // Thick (황금 gnomon): A가 꼭짓점 36도
        // 분할 규칙: P = A에서 B 방향 1/PHI 지점
        const P = lerpVec(A, B, 1 / PHI)
        result.push(createTriangle('thick', C, P, B))
        result.push(createTriangle('thin',  P, C, A))
      } else {
        // Thin (황금 삼각형): A가 꼭짓점 108도
        // 분할 규칙: Q = B에서 A 방향 1/PHI 지점, R = B에서 C 방향 1/PHI 지점
        const Q = lerpVec(B, A, 1 / PHI)
        const R = lerpVec(B, C, 1 / PHI)
        result.push(createTriangle('thin',  R, C, A))
        result.push(createTriangle('thin',  Q, R, B))
        result.push(createTriangle('thick', R, Q, A))
      }
    }
    return result
  }

  // 삼각형 하나 그리기
  function drawTriangle(tri, kiteColor, dartColor, edgeColor) {
    const { type, A, B, C } = tri
    p.stroke(edgeColor)
    p.strokeWeight(0.8)
    p.fill(type === 'thin' ? kiteColor : dartColor)
    p.beginShape()
    p.vertex(A.x, A.y)
    p.vertex(B.x, B.y)
    p.vertex(C.x, C.y)
    p.endShape(p.CLOSE)
  }

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    const cx = p.width  / 2
    const cy = p.height / 2
    const r  = p.min(p.width, p.height) * 0.52

    // 오각형 대칭으로 초기 삼각형 10개 배치 (wheel)
    triangles = []
    for (let i = 0; i < 10; i++) {
      // 각도: 36도 간격, 홀짝으로 방향 반전
      const a1 = (i     * 36 - 90) * (p.PI / 180)
      const a2 = ((i+1) * 36 - 90) * (p.PI / 180)

      const B = vec(cx + r * p.cos(a1), cy + r * p.sin(a1))
      const C = vec(cx + r * p.cos(a2), cy + r * p.sin(a2))
      const A = vec(cx, cy)

      // 짝수/홀수 인덱스에 따라 방향 반전 (올바른 매칭 규칙 유지)
      if (i % 2 === 0) {
        triangles.push(createTriangle('thin', A, B, C))
      } else {
        triangles.push(createTriangle('thin', A, C, B))
      }
    }

    // 5세대 분할
    for (let g = 0; g < 5; g++) {
      triangles = subdivide(triangles)
    }

    p.background(8, 8, 16)
    p.noLoop()
  }

  p.draw = function() {
    p.background(8, 8, 16)

    // accent 색 파싱 — 엣지 색은 어두운 고정값
    const edgeCol = p.color(8, 8, 16)

    // thin 삼각형(Kite): accent 색
    // thick 삼각형(Dart): 어두운 보조 색
    const kiteCol = p.color(accentColor)
    const dartCol = p.color(50, 55, 80)

    // 모든 삼각형 렌더링
    for (const tri of triangles) {
      drawTriangle(tri, kiteCol, dartCol, edgeCol)
    }
  }
}