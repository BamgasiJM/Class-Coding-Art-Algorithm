export default function shapeMorphingSketch(p, size, params = {}) {
  let shapeA = []
  let shapeB = []
  let accentColor

  // === 파라미터 접근자
  const P = {
    numPoints: () => params.numPoints ?? 150,              // 구조
    baseRadius: () => params.baseRadius ?? 0.32,           // 실시간
    starPoints: () => params.starPoints ?? 5,              // 구조
    starAmplitude: () => params.starAmplitude ?? 0.55,     // 구조
    morphSpeed: () => params.morphSpeed ?? 0.025,          // 실시간
    trailAlpha: () => params.trailAlpha ?? 28,             // 실시간
    lineWeight: () => params.lineWeight ?? 2.5,            // 실시간
  };

  p.setup = function() {
    p.createCanvas(size, size)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    p.background(8, 8, 16)
  }

  function buildShapes(baseR) {
    shapeA = []
    shapeB = []

    const n = P.numPoints()
    const cx = p.width / 2
    const cy = p.height / 2
    const starPts = P.starPoints()
    const starAmp = P.starAmplitude()

    // 도형 A: 원
    for (let i = 0; i < n; i++) {
      let angle = p.map(i, 0, n, 0, p.TWO_PI)
      shapeA.push({
        x: cx + p.cos(angle) * baseR,
        y: cy + p.sin(angle) * baseR,
      })
    }

    // 도형 B: 별
    for (let i = 0; i < n; i++) {
      let angle = p.map(i, 0, n, 0, p.TWO_PI)
      let r = baseR * (1 + starAmp * p.cos(angle * starPts)) / (1 + starAmp)
      shapeB.push({
        x: cx + p.cos(angle) * r,
        y: cy + p.sin(angle) * r,
      })
    }
  }

  p.draw = function() {
    const trailA = P.trailAlpha()
    p.background(8, 8, 16, trailA)

    // 매 프레임 현재 baseRadius로 도형 재계산
    const baseR = p.width * P.baseRadius()
    buildShapes(baseR)

    // 보간 계수
    const morphSpd = P.morphSpeed()
    let t = (p.sin(p.frameCount * morphSpd) + 1) / 2

    // 메인 도형
    const n = P.numPoints()
    const lw = P.lineWeight()

    p.noFill()
    p.stroke(accentColor)
    p.strokeWeight(lw)
    p.beginShape()
    for (let i = 0; i < n; i++) {
      let x = p.lerp(shapeA[i].x, shapeB[i].x, t)
      let y = p.lerp(shapeA[i].y, shapeB[i].y, t)
      p.vertex(x, y)
    }
    p.endShape(p.CLOSE)
  }
}