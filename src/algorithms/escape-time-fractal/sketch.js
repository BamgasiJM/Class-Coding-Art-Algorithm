export default function escapeTimeFractalSketch(p, size) {
  let gridSize = 60
  let cellSize
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)
    cellSize = size / gridSize

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    p.background(8, 8, 16)
    p.noStroke()
  }

  p.draw = function() {
    p.background(8, 8, 16)

    // 시간이 흐를수록 maxIter를 서서히 늘려 "성장"하는 듯한 효과
    let currentMaxIter = 20 + p.floor(p.frameCount * 0.3) % 40

    for (let j = 0; j < gridSize; j++) {
      for (let i = 0; i < gridSize; i++) {
        // 캔버스 좌표를 복소평면 좌표로 매핑 (만델브로트 표준 영역)
        let x0 = p.map(i, 0, gridSize, -2.5, 1.0)
        let y0 = p.map(j, 0, gridSize, -1.25, 1.25)

        let x = 0.0
        let y = 0.0
        let iter = 0

        // z = z² + c 반복, |z|² > 4 이면 발산으로 판정
        while (x * x + y * y <= 4.0 && iter < currentMaxIter) {
          let xtemp = x * x - y * y + x0
          y = 2 * x * y + y0
          x = xtemp
          iter++
        }

        let c
        if (iter === currentMaxIter) {
          // 발산하지 않은 내부 점: 배경색과 동일하게 처리
          c = p.color(8, 8, 16)
        } else {
          // 발산한 점: 반복 횟수에 비례해 accent 색과 어두운 색을 보간
          let t = iter / currentMaxIter
          c = p.lerpColor(p.color(20, 20, 35), p.color(accentColor), t)
        }

        p.fill(c)
        p.rect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    }
  }
}