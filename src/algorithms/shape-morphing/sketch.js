export default function shapeMorphingSketch(p, size) {
  let numPoints = 150
  let shapeA = [] // 원
  let shapeB = [] // 별
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    let cx = p.width / 2
    let cy = p.height / 2
    let baseR = p.width * 0.32

    // 도형 A: 균등한 정점으로 구성된 원
    for (let i = 0; i < numPoints; i++) {
      let angle = p.map(i, 0, numPoints, 0, p.TWO_PI)
      shapeA.push({
        x: cx + p.cos(angle) * baseR,
        y: cy + p.sin(angle) * baseR,
      })
    }

    // 도형 B: 균등한 정점으로 구성된 5각 별
    for (let i = 0; i < numPoints; i++) {
      let angle = p.map(i, 0, numPoints, 0, p.TWO_PI)
      // 별의 극좌표 반경: 5개 뾰족한 파동
      let r = baseR * (1 + 0.55 * p.cos(angle * 5)) / 1.55
      shapeB.push({
        x: cx + p.cos(angle) * r,
        y: cy + p.sin(angle) * r,
      })
    }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 28) // 잔상 트레일

    // 0 → 1 → 0으로 순환하는 보간 계수
    let t = (p.sin(p.frameCount * 0.025) + 1) / 2

    // 메인 도형 그리기
    p.noFill()
    p.stroke(accentColor)
    p.strokeWeight(2.5)
    p.beginShape()
    for (let i = 0; i < numPoints; i++) {
      let x = p.lerp(shapeA[i].x, shapeB[i].x, t)
      let y = p.lerp(shapeA[i].y, shapeB[i].y, t)
      p.vertex(x, y)
    }
    p.endShape(p.CLOSE)

    // 중심점 표시
    p.noStroke()
    p.fill(accentColor)
    p.circle(p.width / 2, p.height / 2, 4)
  }
}