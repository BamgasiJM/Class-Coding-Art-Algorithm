export default function chladniFiguresSketch(p, size, params = {}) {
  let cols, rows
  let accentR, accentG, accentB
  const bgR = 8, bgG = 8, bgB = 16
  let n = 3, m = 5
  let time = 0

  // === 파라미터 접근자
  const P = {
    cellSize: () => params.cellSize ?? 4,                  // 구조
    nBase: () => params.nBase ?? 3,                        // 실시간
    nRange: () => params.nRange ?? 2.5,                    // 실시간
    mBase: () => params.mBase ?? 5,                        // 실시간
    mRange: () => params.mRange ?? 3,                      // 실시간
    nSpeed: () => params.nSpeed ?? 0.7,                    // 실시간
    mSpeed: () => params.mSpeed ?? 0.53,                   // 실시간
    timeSpeed: () => params.timeSpeed ?? 0.005,            // 실시간
    clarity: () => params.clarity ?? 6,                    // 실시간
  };

  p.setup = function () {
    p.createCanvas(size, size)
    p.pixelDensity(1)
    
    const CELL = P.cellSize()
    cols = p.floor(size / CELL)
    rows = p.floor(size / CELL)

    const hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
      
    const tmp = p.color(hex || '#ff5588')
    accentR = p.red(tmp)
    accentG = p.green(tmp)
    accentB = p.blue(tmp)

    p.background(bgR, bgG, bgB)
  }

  function chladni(x, y, n, m) {
    const a = p.cos(n * p.PI * x) * p.cos(m * p.PI * y)
    const b = p.cos(m * p.PI * x) * p.cos(n * p.PI * y)
    return a - b
  }

  p.draw = function () {
    time += P.timeSpeed()

    const nBase = P.nBase()
    const nRange = P.nRange()
    const mBase = P.mBase()
    const mRange = P.mRange()
    const nSpeed = P.nSpeed()
    const mSpeed = P.mSpeed()

    n = nBase + p.sin(time * nSpeed) * nRange
    m = mBase + p.cos(time * mSpeed) * mRange

    p.loadPixels()
    const d = p.pixelDensity()
    const buf = p.pixels
    const w = p.width * d
    const clarityFactor = P.clarity()
    const CELL = P.cellSize()

    for (let j = 0; j < rows; j++) {
      const y = j / rows
      for (let i = 0; i < cols; i++) {
        const x = i / cols
        const v = chladni(x, y, n, m)
        const av = p.abs(v)

        const t = 1 - p.exp(-av * clarityFactor)

        const r = p.lerp(accentR, bgR, t)
        const g = p.lerp(accentG, bgG, t)
        const b = p.lerp(accentB, bgB, t)

        for (let dy = 0; dy < CELL; dy++) {
          const py = j * CELL + dy
          if (py >= p.height) break
          const rowOff = py * w
          for (let dx = 0; dx < CELL; dx++) {
            const px = i * CELL + dx
            if (px >= p.width) break
            const off = (rowOff + px * d) * 4
            buf[off]     = r
            buf[off + 1] = g
            buf[off + 2] = b
            buf[off + 3] = 255
          }
        }
      }
    }
    p.updatePixels()

    p.noStroke()
    p.fill(255, 255, 255, 200)
    p.textSize(12)
    p.textAlign(p.LEFT, p.TOP)
    p.text(`n: ${n.toFixed(2)}   m: ${m.toFixed(2)}`, 10, 10)
  }
}