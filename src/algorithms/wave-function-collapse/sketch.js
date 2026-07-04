export default function wfcSketch(p, size) {
  let cellSize = 30
  let cols, rows
  let grid = []
  let accentColor
  let collapsed = 0
  let stateColors = []

  p.setup = function() {
    p.createCanvas(size, size)
    p.colorMode(p.RGB)

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 4가지 상태별 색상 정의 (accent 기반)
    stateColors = [
      p.color(100, 200, 255),    // 상태 0: 밝은 파랑
      p.color(150, 100, 255),    // 상태 1: 자주색
      p.color(255, 100, 150),    // 상태 2: 분홍
      p.color(100, 255, 200),    // 상태 3: 초록
    ]

    cols = p.floor(p.width / cellSize)
    rows = p.floor(p.height / cellSize)

    grid = []
    for (let i = 0; i < cols * rows; i++) {
      grid[i] = {
        superposition: [true, true, true, true],
        collapsed: false,
        value: -1,
      }
    }

    p.background(8, 8, 16)
    collapsed = 0
  }

  p.draw = function() {
    p.background(8, 8, 16)

    // 최소 엔트로피 셀 찾기
    let minEntropy = 5
    let minIdx = -1

    for (let i = 0; i < grid.length; i++) {
      const cell = grid[i]
      if (cell.collapsed) continue

      const entropy = cell.superposition.filter(x => x).length

      if (entropy === 0) {
        continue
      }

      if (entropy < minEntropy) {
        minEntropy = entropy
        minIdx = i
      }
    }

    // 셀 붕괴
    if (minIdx !== -1) {
      const cell = grid[minIdx]
      const validStates = cell.superposition
        .map((x, i) => (x ? i : -1))
        .filter(x => x !== -1)

      if (validStates.length > 0) {
        const chosen = validStates[p.floor(p.random(validStates.length))]
        cell.value = chosen
        cell.collapsed = true
        cell.superposition = [false, false, false, false]
        cell.superposition[chosen] = true

        // 제약 전파
        const row = p.floor(minIdx / cols)
        const col = minIdx % cols
        const neighbors = [
          [row - 1, col],
          [row + 1, col],
          [row, col - 1],
          [row, col + 1],
        ]

        for (let [nr, nc] of neighbors) {
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            const nIdx = nr * cols + nc
            const neighbor = grid[nIdx]

            if (!neighbor.collapsed && neighbor.superposition[chosen]) {
              neighbor.superposition[chosen] = false

              const remainingCount = neighbor.superposition.filter(x => x).length
              if (remainingCount === 0) {
                const idx = p.floor(p.random(4))
                neighbor.superposition[idx] = true
              }
            }
          }
        }

        collapsed++
      }
    }

    // 렌더링
    p.noStroke()

    for (let i = 0; i < grid.length; i++) {
      const row = p.floor(i / cols)
      const col = i % cols
      const x = col * cellSize
      const y = row * cellSize
      const cell = grid[i]

      if (cell.collapsed) {
        // 붕괴된 셀: 선택된 상태의 색상
        p.fill(stateColors[cell.value])
        p.rect(x, y, cellSize, cellSize)
      } else {
        // 중첩 상태: 가능한 상태들의 색상을 평균화
        const possibleIndices = cell.superposition
          .map((x, i) => (x ? i : -1))
          .filter(x => x !== -1)

        if (possibleIndices.length > 0) {
          let r = 0, g = 0, b = 0

          for (let idx of possibleIndices) {
            const col = stateColors[idx]
            r += p.red(col)
            g += p.green(col)
            b += p.blue(col)
          }

          r /= possibleIndices.length
          g /= possibleIndices.length
          b /= possibleIndices.length

          p.fill(r * 0.6, g * 0.6, b * 0.6) // 좀 더 어둡게
          p.rect(x, y, cellSize, cellSize)

          // 엔트로피 표시 (경계선)
          p.stroke(r, g, b)
          p.strokeWeight(1)
          p.noFill()
          p.rect(x, y, cellSize, cellSize)
        }
      }
    }

    // 진행 상황
    p.noStroke()
    p.fill(255)
    p.textSize(11)
    p.textAlign(p.LEFT)
    p.text(`${collapsed} / ${cols * rows}`, 8, p.height - 6)
  }
}