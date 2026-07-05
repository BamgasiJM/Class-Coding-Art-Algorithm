export default function abelianSandpileSketch(p, size) {
  // 격자 크기 (한 셀이 여러 픽셀을 차지)
  const CELL = 4
  let cols, rows
  let grid, nextGrid
  let accentColor
  let accentR, accentG, accentB
  let initialized = false

  // 색상 팔레트: 모래 높이에 따라 0~4+ 단계로 색상 매핑
  let palette = []

  p.setup = function () {
    p.createCanvas(size, size)
    p.pixelDensity(1)

    cols = p.floor(size / CELL)
    rows = p.floor(size / CELL)

    // 액센트 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    // hex -> rgb 파싱
    const tmp = p.color(accentColor)
    accentR = p.red(tmp)
    accentG = p.green(tmp)
    accentB = p.blue(tmp)

    // 0~5 단계 팔레트 구성 (어두운 배경 → 액센트 → 밝은 하이라이트)
    palette = [
      [8, 8, 16],                              // 0: 배경
      [p.floor(accentR * 0.15), p.floor(accentG * 0.15), p.floor(accentB * 0.2)], // 1
      [p.floor(accentR * 0.35), p.floor(accentG * 0.35), p.floor(accentB * 0.45)], // 2
      [p.floor(accentR * 0.7),  p.floor(accentG * 0.7),  p.floor(accentB * 0.8)],  // 3
      [accentR, accentG, accentB],             // 4: 임계 (터지기 직전)
      [255, 255, 255],                         // 5+: 과도하게 쌓임 (흰색 하이라이트)
    ]

    resetGrid()
    initialized = true
    p.background(8, 8, 16)
  }

  // 격자를 초기화하고 중앙에 큰 더미를 쌓는다
  function resetGrid() {
    grid = new Int16Array(cols * rows)
    nextGrid = new Int16Array(cols * rows)

    // 중앙에 대량의 모래를 한 번에 쌓아 첫 avalanch를 유발
    const cx = p.floor(cols / 2)
    const cy = p.floor(rows / 2)
    const idx = cy * cols + cx
    grid[idx] = 6000 // 매우 큰 값 → 연쇄 붕괴 시작
  }

  // 한 셀이 무너지는 규칙: 4 이상이면 4를 빼고 상하좌우에 1씩 배분
  // 경계는 고정(모래가 사라짐) — 프랙탈 대칭을 위해 닫힌 경계 사용
  function toppleAt(i, j) {
    const idx = j * cols + i
    const v = grid[idx]
    if (v < 4) return 0
    const drops = p.floor(v / 2) // 한 번에 여러 번 무너뜨려도 됨 (속도↑)
    grid[idx] -= drops * 4
    if (i > 0)        grid[idx - 1] += drops
    if (i < cols - 1) grid[idx + 1] += drops
    if (j > 0)        grid[idx - cols] += drops
    if (j < rows - 1) grid[idx + cols] += drops
    return drops
  }

  p.draw = function () {
    if (!initialized) return

    // 매 프레임 제한된 수만큼 불안정 셀을 처리 (애니메이션 효과)
    // 전체를 한 번에 처리하면 패턴이 순식간에 완성돼 버림
    let budget = 1500
    // 랜덤 스캔으로 편향을 줄임 (결정론적이면 한쪽으로 쏠림)
    for (let k = 0; k < budget; k++) {
      const i = p.random(cols) | 0
      const j = p.random(rows) | 0
      const idx = j * cols + i
      if (grid[idx] >= 4) {
        toppleAt(i, j)
      }
    }

    // 픽셀 단위로 그리기 (rect를 셀마다 호출하면 느림)
    p.loadPixels()
    const d = p.pixelDensity()
    const buf = p.pixels
    const w = p.width * d
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const v = grid[j * cols + i]
        // 팔레트 인덱스: 0~3은 그대로, 4 이상은 4에 클램프 (흰 하이라이트는 16 이상)
        let palIdx
        if (v <= 0) palIdx = 0
        else if (v < 4) palIdx = v
        else if (v < 16) palIdx = 4
        else palIdx = 5
        const c = palette[palIdx]

        // CELL x CELL 블록을 같은 색으로 채움
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

  // 클릭하면 해당 위치에 큰 더미를 추가 → 새로운 avalanche 유발
  p.mousePressed = function () {
    if (p.mouseX < 0 || p.mouseX >= p.width || p.mouseY < 0 || p.mouseY >= p.height) return
    const ci = p.floor(p.mouseX / CELL)
    const cj = p.floor(p.mouseY / CELL)
    const idx = cj * cols + ci
    grid[idx] += 2000
  }
}