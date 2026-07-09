export default function sdfMetaballsSketch(p, size, params = {}) {
  let balls = []
  let accentColor
  let bufferImg

  // === 파라미터 접근자
  const P = {
    numBalls: () => params.numBalls ?? 6,                      // 구조
    step: () => params.step ?? 4,                              // 구조
    ballRadiusMin: () => params.ballRadiusMin ?? 0.08,         // 구조
    ballRadiusMax: () => params.ballRadiusMax ?? 0.15,         // 구조
    ballSpeedMin: () => params.ballSpeedMin ?? -1.5,           // 구조
    ballSpeedMax: () => params.ballSpeedMax ?? 1.5,            // 구조
    sdfThreshold: () => params.sdfThreshold ?? 1.0,            // 실시간
    sdfAlphaMin: () => params.sdfAlphaMin ?? 10,               // 실시간
    sdfAlphaMax: () => params.sdfAlphaMax ?? 255,              // 실시간
    sdfAlphaRange: () => params.sdfAlphaRange ?? 3.0,          // 실시간
  };

  p.setup = function() {
    p.createCanvas(size, size)
    p.pixelDensity(1)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    bufferImg = p.createImage(size, size)

    initBalls()

    p.background(8, 8, 16)
  }

  function initBalls() {
    balls = []
    const numB = P.numBalls()
    const radMin = P.ballRadiusMin()
    const radMax = P.ballRadiusMax()
    const spdMin = P.ballSpeedMin()
    const spdMax = P.ballSpeedMax()

    for (let i = 0; i < numB; i++) {
      balls.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(spdMin, spdMax),
        vy: p.random(spdMin, spdMax),
        r: p.random(p.width * radMin, p.width * radMax)
      })
    }
  }

  p.draw = function() {
    // 1. メタボール位置更新 及び 壁面反射
    for (let ball of balls) {
      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.x < 0 || ball.x > p.width) ball.vx *= -1
      if (ball.y < 0 || ball.y > p.height) ball.vy *= -1
    }

    // 2. accent色解析
    let ac = p.color(accentColor)
    let acR = p.red(ac)
    let acG = p.green(ac)
    let acB = p.blue(ac)

    // 3. ピクセルバッファ直接操作
    const stp = P.step()
    const threshold = P.sdfThreshold()
    const alphaMin = P.sdfAlphaMin()
    const alphaMax = P.sdfAlphaMax()
    const alphaRange = P.sdfAlphaRange()

    bufferImg.loadPixels()

    for (let x = 0; x < p.width; x += stp) {
      for (let y = 0; y < p.height; y += stp) {
        let sum = 0

        for (let ball of balls) {
          let dx = x - ball.x
          let dy = y - ball.y
          let dSq = dx * dx + dy * dy
          if (dSq > 0) {
            sum += (ball.r * ball.r) / dSq
          }
        }

        let alpha = 0
        if (sum > threshold) {
          alpha = p.map(sum, threshold, threshold + alphaRange, alphaMin, alphaMax)
          alpha = p.constrain(alpha, 0, 255)
        }

        for (let sx = 0; sx < stp; sx++) {
          for (let sy = 0; sy < stp; sy++) {
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

    p.background(8, 8, 16)
    p.image(bufferImg, 0, 0)
  }
}