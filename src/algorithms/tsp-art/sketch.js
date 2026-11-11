export default function tspArtSketch(p, size, params = {}) {
  let points    = []
  let tour      = []
  let drawIndex = 0
  let accentColor
  let lineColor
  let dotColor

  // === 파라미터 접근자
  const P = {
    numPoints: () => params.numPoints ?? 200,                    // 구조
    noiseLowScale: () => params.noiseLowScale ?? 0.004,          // 구조
    noiseHighScale: () => params.noiseHighScale ?? 0.012,        // 구조
    noiseLowWeight: () => params.noiseLowWeight ?? 0.65,         // 실시간
    noiseHighWeight: () => params.noiseHighWeight ?? 0.35,       // 실시간
    twoOptPasses: () => params.twoOptPasses ?? 2,                // 구조
    lineAlpha: () => params.lineAlpha ?? 190,                    // 실시간
    dotSize: () => params.dotSize ?? 3,                          // 실시간
    lineWeight: () => params.lineWeight ?? 1.0,                  // 실시간
    renderSpeed: () => params.renderSpeed ?? 120,                // 실시간
  }

  // 저주파 + 고주파 퍼린 노이즈를 합산해 유기적인 밀도 분포 생성
  function generatePoints() {
    const pts = []
    const count = P.numPoints()
    const maxAttempts = count * 75
    const noiseLowScale = P.noiseLowScale()
    const noiseHighScale = P.noiseHighScale()
    const noiseLowWeight = P.noiseLowWeight()
    const noiseHighWeight = P.noiseHighWeight()

    let attempts = 0
    while (pts.length < count && attempts < maxAttempts) {
      attempts++
      const x = p.random(p.width * 0.06, p.width * 0.94)
      const y = p.random(p.height * 0.06, p.height * 0.94)
      const nLow = p.noise(x * noiseLowScale, y * noiseLowScale)
      const nHigh = p.noise(x * noiseHighScale + 50, y * noiseHighScale + 50)
      const density = nLow * noiseLowWeight + nHigh * noiseHighWeight
      if (p.random() < density) pts.push({ x, y })
    }
    // 거부 샘플링이 부족할 경우 보충
    while (pts.length < count) {
      pts.push({
        x: p.random(p.width * 0.1, p.width * 0.9),
        y: p.random(p.height * 0.1, p.height * 0.9)
      })
    }
    return pts
  }

  // 거리 제곱 — 정렬·비교 전용
  function dist2(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return dx * dx + dy * dy
  }

  // Nearest Neighbor 휴리스틱
  function nearestNeighborTour(pts) {
    const n = pts.length
    const visited = new Array(n).fill(false)
    const path = [0]
    visited[0] = true
    for (let s = 1; s < n; s++) {
      const last = path[path.length - 1]
      let bestD = Infinity, bestJ = -1
      for (let j = 0; j < n; j++) {
        if (!visited[j]) {
          const d = dist2(pts[last], pts[j])
          if (d < bestD) { bestD = d; bestJ = j }
        }
      }
      visited[bestJ] = true
      path.push(bestJ)
    }
    return path
  }

  // 2-opt 개선
  function twoOptImprove(path, pts, maxPasses) {
    const n = path.length
    for (let pass = 0; pass < maxPasses; pass++) {
      let improved = false
      for (let i = 1; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = pts[path[i - 1]], b = pts[path[i]]
          const c = pts[path[j]]
          // 경로는 열린 선(처음과 끝이 이어지지 않음)이므로, 뒤에 이어지는 간선이 있을 때만 비용에 넣는다
          const hasNext = j + 1 < n
          const d = hasNext ? pts[path[j + 1]] : null
          const before = p.dist(a.x, a.y, b.x, b.y) + (hasNext ? p.dist(c.x, c.y, d.x, d.y) : 0)
          const after = p.dist(a.x, a.y, c.x, c.y) + (hasNext ? p.dist(b.x, b.y, d.x, d.y) : 0)
          if (after < before - 0.01) {
            let lo = i, hi = j
            while (lo < hi) {
              const tmp = path[lo]
              path[lo] = path[hi]
              path[hi] = tmp
              lo++; hi--
            }
            improved = true
          }
        }
      }
      if (!improved) break
    }
    return path
  }

  p.setup = function() {
    p.createCanvas(size, size)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    lineColor = p.color(accentColor)
    lineColor.setAlpha(P.lineAlpha())
    dotColor = p.color(accentColor)

    // 점 생성
    points = generatePoints()

    // Nearest Neighbor 초기 경로
    let path = nearestNeighborTour(points)

    // 2-opt 최적화
    path = twoOptImprove(path, points, P.twoOptPasses())

    // 인덱스 배열 → 좌표 배열
    tour = path.map(i => points[i])

    drawIndex = 0

    // 초기 스티플 점 드로잉
    p.background(8, 8, 16)
    p.fill(dotColor)
    p.noStroke()
    const ds = P.dotSize()
    for (const pt of points) {
      p.circle(pt.x, pt.y, ds)
    }
  }

  p.draw = function() {
    // 모든 점 방문 완료 시 정지
    if (drawIndex >= tour.length - 1) {
      p.noLoop()
      return
    }

    // 렌더링 속도 계산
    const renderSpeed = P.renderSpeed()
    const step = p.max(1, p.floor(tour.length / renderSpeed))

    // 선 업데이트 (투명도는 draw에서 실시간 적용)
    lineColor.setAlpha(P.lineAlpha())
    p.stroke(lineColor)
    p.strokeWeight(P.lineWeight())
    p.noFill()

    for (let i = 0; i < step && drawIndex < tour.length - 1; i++) {
      const a = tour[drawIndex]
      const b = tour[drawIndex + 1]
      p.line(a.x, a.y, b.x, b.y)
      drawIndex++
    }

    // 스티플 점 재드로우
    p.fill(dotColor)
    p.noStroke()
    const ds = P.dotSize()
    for (const pt of points) {
      p.circle(pt.x, pt.y, ds)
    }
  }
}