export default function sdfMetaballsSketch(p, size) {
  let balls = []
  let numBalls = 6
  let step = 4 // 낮을 수록 해상도 향상
  let accentColor
  let bufferImg

  p.setup = function() {
    p.createCanvas(size, size)
    p.pixelDensity(1)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 픽셀 조작용 이미지 버퍼 생성
    bufferImg = p.createImage(size, size)

    // 메타볼 초기화
    balls = []
    for (let i = 0; i < numBalls; i++) {
      balls.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-1.5, 1.5),
        vy: p.random(-1.5, 1.5),
        r: p.random(size * 0.08, size * 0.15)
      })
    }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    // 1. 메타볼 위치 업데이트 및 벽면 반사
    for (let ball of balls) {
      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.x < 0 || ball.x > p.width) ball.vx *= -1
      if (ball.y < 0 || ball.y > p.height) ball.vy *= -1
    }

    // 2. accent 색상 파싱 (한 번만 수행)
    let ac = p.color(accentColor)
    let acR = p.red(ac)
    let acG = p.green(ac)
    let acB = p.blue(ac)

    // 3. 픽셀 버퍼 직접 조작으로 성능 최적화
    bufferImg.loadPixels()

    for (let x = 0; x < p.width; x += step) {
      for (let y = 0; y < p.height; y += step) {
        let sum = 0

        // 각 좌표에서 메타볼들의 잠재 필드 합산
        for (let ball of balls) {
          let dx = x - ball.x
          let dy = y - ball.y
          let dSq = dx * dx + dy * dy
          if (dSq > 0) {
            sum += (ball.r * ball.r) / dSq
          }
        }

        // SDF 값에 따른 색상 및 알파 계산
        let alpha = 0
        if (sum > 1.0) {
          // 임계값 초과 시 거리 필드 강도에 따라 알파 매핑
          alpha = p.map(sum, 1.0, 3.0, 10, 255)
          alpha = p.constrain(alpha, 0, 255)
        }

        // step 크기만큼 픽셀 블록 채우기
        for (let sx = 0; sx < step; sx++) {
          for (let sy = 0; sy < step; sy++) {
            let px = x + sx
            let py = y + sy
            if (px < p.width && py < p.height) {
              let pidx = (py * p.width + px) * 4
              bufferImg.pixels[pidx] = acR
              bufferImg.pixels[pidx + 1] = acG
              bufferImg.pixels[pidx + 2] = acB
              bufferImg.pixels[pidx + 3] = alpha
            }
          }
        }
      }
    }

    bufferImg.updatePixels()

    // 4. 배경 초기화 후 버퍼를 한 번에 복사
    p.background(8, 8, 16)
    p.image(bufferImg, 0, 0)
  }
}