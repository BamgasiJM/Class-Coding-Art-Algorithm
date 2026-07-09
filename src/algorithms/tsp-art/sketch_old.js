export default function tspArtSketch(p, size) {
  let points    = []  // 스티플 점 배열
  let tour      = []  // TSP 순서로 정렬된 좌표 배열
  let drawIndex = 0   // 애니메이션 진행 위치
  let accentColor
  let lineColor
  let dotColor

  const NUM_POINTS = 200 // 점 개수 — 성능과 밀도의 균형

  // 저주파 + 고주파 퍼린 노이즈를 합산해 유기적인 밀도 분포 생성
  function generatePoints() {
    const pts = []
    let attempts = 0
    while (pts.length < NUM_POINTS && attempts < 15000) {
      attempts++
      const x = p.random(p.width  * 0.06, p.width  * 0.94)
      const y = p.random(p.height * 0.06, p.height * 0.94)
      // 큰 덩어리(저주파)와 세밀한 질감(고주파) 혼합
      const nLow  = p.noise(x * 0.004, y * 0.004)
      const nHigh = p.noise(x * 0.012 + 50, y * 0.012 + 50)
      const density = nLow * 0.65 + nHigh * 0.35
      if (p.random() < density) pts.push({ x, y })
    }
    // 거부 샘플링이 부족할 경우 보충
    while (pts.length < NUM_POINTS) {
      pts.push({
        x: p.random(p.width  * 0.1, p.width  * 0.9),
        y: p.random(p.height * 0.1, p.height * 0.9)
      })
    }
    return pts
  }

  // 거리 제곱 — 정렬·비교 전용 (sqrt 생략 최적화)
  function dist2(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return dx * dx + dy * dy
  }

  // Nearest Neighbor 휴리스틱: O(n²) — 초기 순회 경로 생성
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

  // 2-opt 개선: 교차 엣지를 제거해 총 경로 길이 단축
  function twoOptImprove(path, pts, maxPasses) {
    const n = path.length
    for (let pass = 0; pass < maxPasses; pass++) {
      let improved = false
      for (let i = 1; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = pts[path[i - 1]], b = pts[path[i]]
          const c = pts[path[j]],     d = pts[path[(j + 1) % n]]
          // 교환 전후 엣지 합계 비교
          const before = p.dist(a.x, a.y, b.x, b.y) + p.dist(c.x, c.y, d.x, d.y)
          const after  = p.dist(a.x, a.y, c.x, c.y) + p.dist(b.x, b.y, d.x, d.y)
          if (after < before - 0.01) {
            // i ~ j 구간 역전
            let lo = i, hi = j
            while (lo < hi) {
              const tmp = path[lo]
              path[lo]  = path[hi]
              path[hi]  = tmp
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

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 선: 약간 투명하게, 점: 불투명
    lineColor = p.color(accentColor)
    lineColor.setAlpha(190)
    dotColor  = p.color(accentColor)

    // 1. 스티플 점 생성
    points = generatePoints()

    // 2. Nearest Neighbor 초기 경로
    let path = nearestNeighborTour(points)

    // 3. 2-opt 최적화 (2회 패스)
    path = twoOptImprove(path, points, 2)

    // 4. 인덱스 배열 → 좌표 배열
    tour = path.map(i => points[i])

    drawIndex = 0

    // 배경과 초기 스티플 점 드로잉
    p.background(8, 8, 16)
    p.fill(dotColor)
    p.noStroke()
    for (const pt of points) {
      p.circle(pt.x, pt.y, 3)
    }
  }

  p.draw = function() {
    // 모든 점 방문 완료 시 정지
    if (drawIndex >= tour.length - 1) {
      p.noLoop()
      return
    }

    // 전체를 약 120프레임에 완료하는 step 크기 계산
    const step = p.max(1, p.floor(tour.length / 120))

    p.stroke(lineColor)
    p.strokeWeight(1.0)
    p.noFill()

    for (let i = 0; i < step && drawIndex < tour.length - 1; i++) {
      const a = tour[drawIndex]
      const b = tour[drawIndex + 1]
      p.line(a.x, a.y, b.x, b.y)
      drawIndex++
    }

    // 스티플 점을 선 위에 다시 그려 항상 visible 유지
    p.fill(dotColor)
    p.noStroke()
    for (const pt of points) {
      p.circle(pt.x, pt.y, 3)
    }
  }
}