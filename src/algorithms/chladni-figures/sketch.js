export default function chladniFiguresSketch(p, size) {
  const CELL = 2
  let cols, rows
  let accentR, accentG, accentB
  let n = 3, m = 5
  let time = 0

  p.setup = function () {
    p.createCanvas(size, size)
    p.pixelDensity(1)
    cols = p.floor(size / CELL)
    rows = p.floor(size / CELL)

    // accent 색 파싱
    const hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    const tmp = p.color(hex)
    accentR = p.red(tmp)
    accentG = p.green(tmp)
    accentB = p.blue(tmp)

    p.background(8, 8, 16)
  }

  // Chladni 고유모드 함수
  // f(x,y) = cos(nπx)·cos(mπy) - cos(mπx)·cos(nπy)
  // x,y ∈ [0,1] 정규화 좌표, n,m는 주파수 파라미터
  function chladni(x, y, n, m) {
    const a = p.cos(n * p.PI * x) * p.cos(m * p.PI * y)
    const b = p.cos(m * p.PI * x) * p.cos(n * p.PI * y)
    return a - b
  }

  p.draw = function () {
    time += 0.004

    // 마우스가 캔버스 안에 있으면 n,m을 마우스 위치로 제어
    // 벗어나면 자동 애니메이션 (정수 사이를 부드럽게 보간)
    const mouseIn = p.mouseX > 0 && p.mouseX < size && p.mouseY > 0 && p.mouseY < size
    if (mouseIn) {
      n = p.map(p.mouseX, 0, size, 1, 10)
      m = p.map(p.mouseY, 0, size, 1, 10)
    } else {
      n = 3 + p.sin(time * 0.7) * 2.5
      m = 5 + p.cos(time * 0.53) * 3
    }

    // 픽셀 단위로 직접 채우기 (CELL=2 블록)
    p.loadPixels()
    const d = p.pixelDensity()
    const buf = p.pixels
    const w = p.width * d

    // 색상 기준점: 플레이트(밝은 회색) ↔ 모래(어두운 accent)
    const plateR = 225, plateG = 225, plateB = 235
    const sandR = accentR * 0.18
    const sandG = accentG * 0.18
    const sandB = accentB * 0.22

    for (let j = 0; j < rows; j++) {
      const y = j / rows
      for (let i = 0; i < cols; i++) {
        const x = i / cols
        const v = chladni(x, y, n, m)
        const av = p.abs(v)

        // |f|가 0에 가까울수록 node line → 모래가 모인 곳 (어두움)
        // |f|가 클수록 antinode → 진동하는 플레이트 (밝음)
        // 지수 감쇠로 node line을 얇고 선명하게
        const t = 1 - p.exp(-av * 6)

        const r = p.lerp(sandR, plateR, t)
        const g = p.lerp(sandG, plateG, t)
        const b = p.lerp(sandB, plateB, t)

        // CELL x CELL 블록 채우기
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

    // HUD
    p.noStroke()
    p.fill(255, 255, 255, 200)
    p.textSize(12)
    p.textAlign(p.LEFT, p.TOP)
    p.text(`n: ${n.toFixed(2)}   m: ${m.toFixed(2)}   ${mouseIn ? 'manual' : 'auto'}`, 10, 10)
    p.text('hover: control n/m · leave: auto-animate', 10, 26)
  }

  // 클릭하면 정수 모드로 점프 (가장 선명한 패턴)
  p.mousePressed = function () {
    if (p.mouseX < 0 || p.mouseX >= size || p.mouseY < 0 || p.mouseY >= size) return
    n = p.round(n)
    m = p.round(m)
    // 정수 모드에서도 살짝 어긋나게 해서 다음 프레임부터 다시 부드러운 변화 재개
    n += 0.001
    m += 0.001
  }
}