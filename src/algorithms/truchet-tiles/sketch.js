export default function truchetTilesSketch(p, size, params = {}) {
  let cols, rows
  let accentColor
  let time = 0

  // === 파라미터 접근자
  const P = {
    tileSize: () => params.tileSize ?? 40,                    // 구조
    timeSpeed: () => params.timeSpeed ?? 0.002,               // 실시간
    noiseScale: () => params.noiseScale ?? 0.2,               // 실시간
    lineWeight: () => params.lineWeight ?? 2,                 // 실시간
    arcRadius: () => params.arcRadius ?? 1.0,                 // 실시간
  }

  p.setup = function() {
    p.createCanvas(size, size)

    const scl = P.tileSize()
    cols = p.floor(p.width / scl)
    rows = p.floor(p.height / scl)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16)

    time += P.timeSpeed()

    const scl = P.tileSize()
    const noiseScale = P.noiseScale()
    const lw = P.lineWeight()
    const arcR = P.arcRadius()

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * scl
        let y = j * scl

        // 노이즈 값(0~1)을 4방향 중 하나로 바꾼다.
        // 타일은 90도씩 돌려도 4가지 모양뿐이므로 방향도 4개로 나눈다.
        let n = p.noise(i * noiseScale, j * noiseScale, time)
        let orientation = p.floor(n * 4) % 4

        p.stroke(accentColor)
        p.strokeWeight(lw)
        p.noFill()

        p.push()
        p.translate(x + scl/2, y + scl/2)
        p.rotate(orientation * p.HALF_PI)

        // 대각선으로 연결되는 호(arc) 그리기
        const arcDist = scl / 2 * arcR
        p.arc(-arcDist, -arcDist, scl * arcR, scl * arcR, 0, p.HALF_PI)
        p.arc(arcDist, arcDist, scl * arcR, scl * arcR, p.PI, p.PI + p.HALF_PI)

        p.pop()
      }
    }
  }
}
