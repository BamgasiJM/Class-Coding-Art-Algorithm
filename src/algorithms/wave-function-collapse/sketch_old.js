export default function waveFunctionCollapseSketch(p, size) {
  let gridSize = 20
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

  // 두 타일이 dir 방향으로 인접 가능한지 판정
  // dir: 0=상(b가 위), 1=우(b가 오른쪽), 2=하(b가 아래), 3=좌(b가 왼쪽)
  function compatible(aIdx, bIdx, dir) {
    let a = TILES[aIdx]
    let b = TILES[bIdx]
    if (dir === 0) return a.sockets[0] === b.sockets[2] // a상 == b하
    if (dir === 1) return a.sockets[1] === b.sockets[3] // a우 == b좌
    if (dir === 2) return a.sockets[2] === b.sockets[0] // a하 == b상
    if (dir === 3) return a.sockets[3] === b.sockets[1] // a좌 == b우
    return false
  }

  class Cell {
    constructor() {
      // 초기에는 모든 타일 가능 (슈퍼포지션)
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
    if (j > 0) neighbors.push({ i: i, j: j - 1, dir: 0 }) // 상
    if (i < gridSize - 1) neighbors.push({ i: i + 1, j: j, dir: 1 }) // 우
    if (j < gridSize - 1) neighbors.push({ i: i, j: j + 1, dir: 2 }) // 하
    if (i > 0) neighbors.push({ i: i - 1, j: j, dir: 3 }) // 좌
    return neighbors
  }

  // 붕괴 후 인접 셀의 불가능한 옵션을 전파
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

        if (allowed.length === 0) {
          // 모순 발생 시 해당 셀 초기화
          nCell.options = []
          for (let t = 0; t < TILES.length; t++) {
            for (let w = 0; w < TILES[t].weight; w++) nCell.options.push(t)
          }
          continue
        }

        let oldLen = nCell.options.length
        nCell.constrain(allowed)
        if (nCell.options.length < oldLen) {
          stack.push({ i: n.i, j: n.j })
        }
      }
    }
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

  // 엔트로피가 가장 낮은 미결정 셀 찾기
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

    if (tileIdx === 0) return // 빈 타일

    let s = TILES[tileIdx].sockets
    p.stroke(accentColor)
    p.strokeWeight(cellSize * 0.12)

    if (s[0] === 1) p.line(cx, cy, cx, y) // 상
    if (s[1] === 1) p.line(cx, cy, x + cellSize, cy) // 우
    if (s[2] === 1) p.line(cx, cy, cx, y + cellSize) // 하
    if (s[3] === 1) p.line(cx, cy, x, cy) // 좌
  }

  p.setup = function() {
    p.createCanvas(size, size)
    cellSize = size / gridSize

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    initGrid()
    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16)

    if (!finished) {
      let idx = findLowestEntropy()
      if (idx !== -1) {
        grid[idx].collapse()
        let i = idx % gridSize
        let j = p.floor(idx / gridSize)
        propagate(i, j)
      } else {
        finished = true
        restartTimer = p.millis()
      }
    } else {
      if (p.millis() - restartTimer > 2000) {
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
          let alpha = p.map(cell.entropy(), 1, TILES.length * 2, 200, 30)
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