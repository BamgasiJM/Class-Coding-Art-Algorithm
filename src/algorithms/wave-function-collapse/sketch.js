export default function waveFunctionCollapseSketch(p, size, params = {}) {
  let gridSize
  let cellSize
  let grid = []
  let finished = false
  let restartTimer = 0
  let accentColor

  // 타일 소켓 정의: [상, 우, 하, 좌] (1=연결, 0=빈)
  const TILES = [
    { sockets: [0, 0, 0, 0], weight: 1 }, // 0: 빈
    { sockets: [0, 1, 0, 1], weight: 2 }, // 1: 가로 직선
    { sockets: [1, 0, 1, 0], weight: 2 }, // 2: 세로 직선
    { sockets: [1, 1, 0, 0], weight: 2 }, // 3: ┐ 모서리
    { sockets: [0, 1, 1, 0], weight: 2 }, // 4: ┌ 모서리
    { sockets: [0, 0, 1, 1], weight: 2 }, // 5: ┘ 모서리
    { sockets: [1, 0, 0, 1], weight: 2 }, // 6: └ 모서리
    { sockets: [1, 1, 1, 1], weight: 1 }, // 7: 십자
  ]

  // === 파라미터 접근자
  const P = {
    gridSize: () => params.gridSize ?? 20,                // 구조
    restartDelayMs: () => params.restartDelayMs ?? 2000,  // 실시간
    uncertaintyAlphaMax: () => params.uncertaintyAlphaMax ?? 200, // 실시간
    uncertaintyAlphaMin: () => params.uncertaintyAlphaMin ?? 30,  // 실시간
  };

  function compatible(aIdx, bIdx, dir) {
    let a = TILES[aIdx]
    let b = TILES[bIdx]
    if (dir === 0) return a.sockets[0] === b.sockets[2]
    if (dir === 1) return a.sockets[1] === b.sockets[3]
    if (dir === 2) return a.sockets[2] === b.sockets[0]
    if (dir === 3) return a.sockets[3] === b.sockets[1]
    return false
  }

  class Cell {
    constructor() {
      this.options = []
      for (let i = 0; i < TILES.length; i++) {
        for (let w = 0; w < TILES[i].weight; w++) {
          this.options.push(i)
        }
      }
      this.collapsed = false
      this.value = null
    }

    entropy() {
      return this.collapsed ? 0 : this.options.length
    }

    collapse() {
      this.collapsed = true
      let r = p.floor(p.random(this.options.length))
      this.value = this.options[r]
      this.options = [this.value]
    }

    constrain(allowed) {
      let newOptions = []
      for (let opt of this.options) {
        if (allowed.includes(opt)) newOptions.push(opt)
      }
      this.options = newOptions
    }
  }

  function getNeighbors(i, j) {
    let neighbors = []
    if (j > 0) neighbors.push({ i: i, j: j - 1, dir: 0 })
    if (i < gridSize - 1) neighbors.push({ i: i + 1, j: j, dir: 1 })
    if (j < gridSize - 1) neighbors.push({ i: i, j: j + 1, dir: 2 })
    if (i > 0) neighbors.push({ i: i - 1, j: j, dir: 3 })
    return neighbors
  }

  function propagate(ci, cj) {
    let stack = [{ i: ci, j: cj }]
    while (stack.length > 0) {
      let { i, j } = stack.pop()
      let cell = grid[i + j * gridSize]
      if (!cell.collapsed) continue

      let neighbors = getNeighbors(i, j)
      for (let n of neighbors) {
        let nCell = grid[n.i + n.j * gridSize]
        if (nCell.collapsed) continue

        let allowed = []
        for (let opt of nCell.options) {
          if (compatible(cell.value, opt, n.dir)) allowed.push(opt)
        }

        // 모순: 이 칸에 맞는 타일이 하나도 없다. 이웃과 맞는 그림을 만들 수 없으므로 실패를 알린다.
        if (allowed.length === 0) return false

        let oldLen = nCell.options.length
        nCell.constrain(allowed)
        if (nCell.options.length < oldLen) {
          stack.push({ i: n.i, j: n.j })
        }
      }
    }
    return true
  }

  function initGrid() {
    grid = []
    for (let j = 0; j < gridSize; j++) {
      for (let i = 0; i < gridSize; i++) {
        grid.push(new Cell())
      }
    }
    finished = false
  }

  function findLowestEntropy() {
    let minEntropy = Infinity
    let candidates = []
    for (let idx = 0; idx < grid.length; idx++) {
      let cell = grid[idx]
      if (cell.collapsed) continue
      let e = cell.entropy()
      if (e < minEntropy) {
        minEntropy = e
        candidates = [idx]
      } else if (e === minEntropy) {
        candidates.push(idx)
      }
    }
    if (candidates.length === 0) return -1
    return candidates[p.floor(p.random(candidates.length))]
  }

  function drawTile(i, j, tileIdx) {
    let x = i * cellSize
    let y = j * cellSize
    let cx = x + cellSize / 2
    let cy = y + cellSize / 2

    if (tileIdx === 0) return

    let s = TILES[tileIdx].sockets
    p.stroke(accentColor)
    p.strokeWeight(cellSize * 0.12)

    if (s[0] === 1) p.line(cx, cy, cx, y)
    if (s[1] === 1) p.line(cx, cy, x + cellSize, cy)
    if (s[2] === 1) p.line(cx, cy, cx, y + cellSize)
    if (s[3] === 1) p.line(cx, cy, x, cy)
  }

  p.setup = function() {
    p.createCanvas(size, size)
    
    gridSize = P.gridSize()
    cellSize = size / gridSize

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    initGrid()
    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16)

    const restartDelay = P.restartDelayMs()
    const uncAlphaMax = P.uncertaintyAlphaMax()
    const uncAlphaMin = P.uncertaintyAlphaMin()

    if (!finished) {
      let idx = findLowestEntropy()
      if (idx !== -1) {
        grid[idx].collapse()
        let i = idx % gridSize
        let j = p.floor(idx / gridSize)
        // 모순이 생기면 이번 시도는 실패. 잠시 보여 준 뒤 처음부터 다시 시작한다 (draw의 재시작 분기).
        if (!propagate(i, j)) {
          finished = true
          restartTimer = p.millis()
        }
      } else {
        finished = true
        restartTimer = p.millis()
      }
    } else {
      if (p.millis() - restartTimer > restartDelay) {
        initGrid()
      }
    }

    // 그리드 렌더링
    for (let j = 0; j < gridSize; j++) {
      for (let i = 0; i < gridSize; i++) {
        let cell = grid[i + j * gridSize]
        if (cell.collapsed) {
          drawTile(i, j, cell.value)
        } else {
          let alpha = p.map(cell.entropy(), 1, TILES.length * 2, uncAlphaMax, uncAlphaMin)
          p.noStroke()
          let c = p.color(accentColor)
          c.setAlpha(alpha)
          p.fill(c)
          p.circle(i * cellSize + cellSize / 2, j * cellSize + cellSize / 2, 2)
        }
      }
    }

    // 그리드 라인
    p.stroke(30)
    p.strokeWeight(0.5)
    for (let i = 0; i <= gridSize; i++) {
      p.line(i * cellSize, 0, i * cellSize, size)
      p.line(0, i * cellSize, size, i * cellSize)
    }
  }
}