export default function mazeGenerationSketch(p, size) {
  let cols = 16
  let rows = 16
  let w // 각 셀의 너비
  let grid = []
  let current
  let stack = []
  let accentColor
  let finished = false
  let restartTimer = 0

  // 격자 인덱스를 1차원 배열 위치로 변환
  function index(i, j) {
    if (i < 0 || j < 0 || i >= cols || j >= rows) return -1
    return i + j * cols
  }

  // 두 셀 사이의 벽을 제거
  function removeWalls(a, b) {
    let x = a.i - b.i
    if (x === 1) {
      a.walls[3] = false
      b.walls[1] = false
    } else if (x === -1) {
      a.walls[1] = false
      b.walls[3] = false
    }
    let y = a.j - b.j
    if (y === 1) {
      a.walls[0] = false
      b.walls[2] = false
    } else if (y === -1) {
      a.walls[2] = false
      b.walls[0] = false
    }
  }

  class Cell {
    constructor(i, j) {
      this.i = i
      this.j = j
      // 상, 우, 하, 좌 벽
      this.walls = [true, true, true, true]
      this.visited = false
    }

    // 방문하지 않은 이웃 셀 중 하나를 무작위로 반환
    checkNeighbors() {
      let neighbors = []
      let top = grid[index(this.i, this.j - 1)]
      let right = grid[index(this.i + 1, this.j)]
      let bottom = grid[index(this.i, this.j + 1)]
      let left = grid[index(this.i - 1, this.j)]

      if (top && !top.visited) neighbors.push(top)
      if (right && !right.visited) neighbors.push(right)
      if (bottom && !bottom.visited) neighbors.push(bottom)
      if (left && !left.visited) neighbors.push(left)

      if (neighbors.length > 0) {
        let r = p.floor(p.random(neighbors.length))
        return neighbors[r]
      }
      return undefined
    }

    show() {
      let x = this.i * w
      let y = this.j * w

      // 방문한 셀은 어둡게 채움
      if (this.visited) {
        p.noStroke()
        p.fill(18, 18, 28)
        p.rect(x, y, w, w)
      }

      // 벽 그리기
      p.stroke(60)
      p.strokeWeight(1.5)
      if (this.walls[0]) p.line(x, y, x + w, y) // 상
      if (this.walls[1]) p.line(x + w, y, x + w, y + w) // 우
      if (this.walls[2]) p.line(x + w, y + w, x, y + w) // 하
      if (this.walls[3]) p.line(x, y + w, x, y) // 좌
    }

    highlight() {
      let x = this.i * w
      let y = this.j * w
      p.noStroke()
      p.fill(accentColor)
      p.rect(x + 1, y + 1, w - 2, w - 2)
    }
  }

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    w = p.width / cols

    // 격자 초기화
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(i, j))
      }
    }

    current = grid[0]
    current.visited = true
    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16)

    // 모든 셀 렌더링
    for (let i = 0; i < grid.length; i++) {
      grid[i].show()
    }

    if (!finished) {
      // DFS 백트래킹: 다음 이웃을 찾아 이동
      let next = current.checkNeighbors()
      if (next) {
        next.visited = true
        stack.push(current)
        removeWalls(current, next)
        current = next
      } else if (stack.length > 0) {
        // 막다른 길: 스택에서 되짚어감
        current = stack.pop()
      } else {
        // 모든 셀 방문 완료
        finished = true
        restartTimer = p.millis()
      }
    } else {
      // 완료 후 2.5초 대기하고 새 미로 생성
      if (p.millis() - restartTimer > 2500) {
        grid = []
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            grid.push(new Cell(i, j))
          }
        }
        current = grid[0]
        current.visited = true
        stack = []
        finished = false
      }
    }

    // 현재 탐색 중인 셀 강조
    if (!finished) {
      current.highlight()
    }
  }
}