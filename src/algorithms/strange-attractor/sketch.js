export default function strangeAttractorSketch(p, size, params = {}) {
  let points = []      // 계산된 모든 점 {x, y}
  let drawIndex = 0    // 애니메이션 진행 위치
  let accentColor

  // === 파라미터 접근자
  const P = {
    numSeeds: () => params.numSeeds ?? 250,            // 구조
    iterations: () => params.iterations ?? 200,        // 구조
    dejongA: () => params.dejongA ?? 1.641,            // 구조
    dejongB: () => params.dejongB ?? 1.902,            // 구조
    dejongC: () => params.dejongC ?? 0.316,            // 구조
    dejongD: () => params.dejongD ?? 1.525,            // 구조
    speed: () => params.speed ?? 30.0,                 // 실시간
    pointSize: () => params.pointSize ?? 2.2,          // 실시간
  };

  // De Jong 반복 함수
  function iterate(x, y, a, b, c, d) {
    const nx = p.sin(a * y) - p.cos(b * x)
    const ny = p.sin(c * x) - p.cos(d * y)
    return { x: nx, y: ny }
  }

  // 좌표 범위 추적 — 정규화 스케일 결정
  function computeNormalizationParams(allPts) {
    if (allPts.length === 0) return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
    
    let minX = allPts[0].x, maxX = allPts[0].x
    let minY = allPts[0].y, maxY = allPts[0].y
    
    for (const pt of allPts) {
      minX = p.min(minX, pt.x)
      maxX = p.max(maxX, pt.x)
      minY = p.min(minY, pt.y)
      maxY = p.max(maxY, pt.y)
    }
    
    return { minX, maxX, minY, maxY }
  }

  // 어트랙터 좌표 → 캔버스 좌표
  function normalizeToCanvas(x, y, bounds) {
    const rangeX = bounds.maxX - bounds.minX || 1
    const rangeY = bounds.maxY - bounds.minY || 1
    
    const margin = 0.05
    const scale = p.min(
      (1 - 2 * margin) * size / rangeX,
      (1 - 2 * margin) * size / rangeY
    )
    
    const normX = (x - bounds.minX) / rangeX
    const normY = (y - bounds.minY) / rangeY
    
    return {
      x: margin * size + normX * (1 - 2 * margin) * size,
      y: margin * size + normY * (1 - 2 * margin) * size
    }
  }

p.setup = function() {
    p.createCanvas(size, size)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // ── 1단계: 모든 점 계산 (정규화 전) ────────────────────
    const rawPoints = []
    const numSeeds = P.numSeeds()
    const iters = P.iterations()
    const a = P.dejongA()
    const b = P.dejongB()
    const c = P.dejongC()
    const d = P.dejongD()
    
    for (let i = 0; i < numSeeds; i++) {
      let x = p.random(-0.5, 0.5)
      let y = p.random(-0.5, 0.5)

      // warm-up: 처음 100번 반복은 버림 (더 늘림)
      for (let w = 0; w < 100; w++) {
        const next = iterate(x, y, a, b, c, d)
        x = next.x
        y = next.y
      }

      // 점 기록
      for (let iter = 0; iter < iters; iter++) {
        const next = iterate(x, y, a, b, c, d)
        x = next.x
        y = next.y
        // 발산한 점 필터링 (범위를 벗어난 점 제외)
        if (p.abs(x) < 100 && p.abs(y) < 100) {
          rawPoints.push({ x, y })
        }
      }
    }

    // ── 2단계: 좌표 범위 계산 ────────────────────────────────
    const bounds = computeNormalizationParams(rawPoints)

    // ── 3단계: 캔버스 좌표로 정규화 ──────────────────────────
    points = rawPoints.length > 0 ? rawPoints.map(pt => normalizeToCanvas(pt.x, pt.y, bounds)) : []

    drawIndex = 0
    p.background(8, 8, 16)
  }

  p.draw = function() {
    // 모든 점 렌더링 완료 시 중단
    if (drawIndex >= points.length) {
      p.noLoop()
      return
    }

    p.background(8, 8, 16)
    p.fill(accentColor)
    p.noStroke()

    // 이번 프레임에 그릴 점 개수
    const speed = P.speed()
    const step = p.max(1, p.floor(points.length / 120 * speed))
    const psize = P.pointSize()

    for (let i = 0; i < step && drawIndex < points.length; i++) {
      const pt = points[drawIndex]
      p.circle(pt.x, pt.y, psize)
      drawIndex++
    }
  }
}