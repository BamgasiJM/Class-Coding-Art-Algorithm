export default function abelianSandpileSketch(p, size) {
  const CELL = 6
  let cols, rows
  let grid
  let accentColor
  let accentR, accentG, accentB
  let initialized = false

  let palette = []

  p.setup = function () {
    p.createCanvas(size, size)
    p.pixelDensity(1)

    cols = p.floor(size / CELL)
    rows = p.floor(size / CELL)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    
    const tmp = p.color(accentColor)
    accentR = p.red(tmp)
    accentG = p.green(tmp)
    accentB = p.blue(tmp)

    // 안정 상태(0~3)와 붕괴 중인 상태(4+)를 명확히 구분하는 팔레트
    palette = [
      [8, 8, 16],                                                                  // 0: 배경
      [p.floor(accentR * 0.25), p.floor(accentG * 0.25), p.floor(accentB * 0.35)], // 1
      [p.floor(accentR * 0.60), p.floor(accentG * 0.60), p.floor(accentB * 0.70)], // 2
      [accentR, accentG, accentB],                                                 // 3: 최대 안정 상태
      [255, 255, 255],                                                             // 4+: 붕괴 진행 중
    ]

    resetGrid()
    initialized = true
    p.background(8, 8, 16)
  }

  function resetGrid() {
    // 모래의 양이 많아질 경우 오버플로우 방지를 위해 Int32Array 사용
    // 메모리 효율을 위해 nextGrid는 제거하고 In-place 업데이트(Gauss-Seidel 방식) 사용
    grid = new Int32Array(cols * rows)

    const cx = p.floor(cols / 2)
    const cy = p.floor(rows / 2)
    const idx = cy * cols + cx
    
    // 크고 복잡한 프랙탈 대칭 패턴을 위해 중앙에 방대한 양의 모래 배치
    grid[idx] = 15000 
  }

  p.draw = function () {
    if (!initialized) return

    // 랜덤 스캔 대신 전체 그리드를 체계적으로 순회해야 완벽한 대칭 프랙탈이 형성됨
    // speed 값을 조절하여 한 프레임당 연산량(애니메이션 속도) 제어
    const speed = 2 
    
    for (let iter = 0; iter < speed; iter++) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i
          const v = grid[idx]
          
          if (v >= 4) {
            // v / 2가 아닌 v / 4로 나누어야 수학적으로 올바른 Abelian 모델이 성립됨
            const drops = p.floor(v / 4) 
            grid[idx] -= drops * 4
            
            if (i > 0)        grid[idx - 1] += drops
            if (i < cols - 1) grid[idx + 1] += drops
            if (j > 0)        grid[idx - cols] += drops
            if (j < rows - 1) grid[idx + cols] += drops
          }
        }
      }
    }

    p.loadPixels()
    const d = p.pixelDensity()
    const buf = p.pixels
    const w = p.width * d

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const v = grid[j * cols + i]
        
        let palIdx = v
        if (v <= 0) palIdx = 0
        else if (v >= 4) palIdx = 4

        const c = palette[palIdx]

        for (let dy = 0; dy < CELL; dy++) {
          const py = j * CELL + dy
          if (py >= p.height) break
          const rowOff = py * w
          for (let dx = 0; dx < CELL; dx++) {
            const px = i * CELL + dx
            if (px >= p.width) break
            const off = (rowOff + px * d) * 4
            buf[off]     = c[0]
            buf[off + 1] = c[1]
            buf[off + 2] = c[2]
            buf[off + 3] = 255
          }
        }
      }
    }
    p.updatePixels()
  }

  p.mousePressed = function () {
    if (p.mouseX < 0 || p.mouseX >= p.width || p.mouseY < 0 || p.mouseY >= p.height) return
    const ci = p.floor(p.mouseX / CELL)
    const cj = p.floor(p.mouseY / CELL)
    const idx = cj * cols + ci
    grid[idx] += 10000 
  }
}