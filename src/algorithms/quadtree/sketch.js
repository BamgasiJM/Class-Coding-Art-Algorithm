export default function quadtreeSketch(p, size) {
  let particles = []
  let quadtree
  let accentColor
  const CAPACITY = 4
  const MAX_DEPTH = 6

  // 2D 영역을 나타내는 사각형
  class Rectangle {
    constructor(x, y, w, h) {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }

    // 점이 이 영역 안에 있는지 판정
    contains(point) {
      return (
        point.x >= this.x &&
        point.x < this.x + this.w &&
        point.y >= this.y &&
        point.y < this.y + this.h
      )
    }
  }

  // Quadtree 노드
  class Quadtree {
    constructor(boundary, capacity, depth = 0) {
      this.boundary = boundary
      this.capacity = capacity
      this.points = []
      this.divided = false
      this.depth = depth
      this.children = []
    }

    // 점을 삽입: 용량 초과 시 재귀적으로 4분할
    insert(point) {
      if (!this.boundary.contains(point)) return false

      if (!this.divided) {
        // 용량에 여유가 있거나 최대 깊이에 도달하면 현재 노드에 저장
        if (this.points.length < this.capacity || this.depth >= MAX_DEPTH) {
          this.points.push(point)
          return true
        }
        // 4분할 후 기존 점들을 자식으로 재분배
        this.subdivide()
        for (let pt of this.points) {
          this.insertToChildren(pt)
        }
        this.points = []
      }
      return this.insertToChildren(point)
    }

    // 4개 자식 노드에 점을 전달
    insertToChildren(point) {
      for (let child of this.children) {
        if (child.insert(point)) return true
      }
      return false
    }

    // 현재 영역을 4등분
    subdivide() {
      let x = this.boundary.x
      let y = this.boundary.y
      let w = this.boundary.w / 2
      let h = this.boundary.h / 2

      this.children.push(
        new Quadtree(new Rectangle(x, y, w, h), this.capacity, this.depth + 1)
      )
      this.children.push(
        new Quadtree(new Rectangle(x + w, y, w, h), this.capacity, this.depth + 1)
      )
      this.children.push(
        new Quadtree(new Rectangle(x, y + h, w, h), this.capacity, this.depth + 1)
      )
      this.children.push(
        new Quadtree(new Rectangle(x + w, y + h, w, h), this.capacity, this.depth + 1)
      )
      this.divided = true
    }

    // 경계선과 점을 시각화
    show() {
      p.noFill()
      let alpha = p.map(this.depth, 0, MAX_DEPTH, 120, 30)
      let c = p.color(accentColor)
      c.setAlpha(alpha)
      p.stroke(c)
      p.strokeWeight(p.map(this.depth, 0, MAX_DEPTH, 2, 0.5))
      p.rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h)

      if (this.divided) {
        for (let child of this.children) {
          child.show()
        }
      } else {
        // 리프 노드에 속한 점들을 그림
        p.noStroke()
        p.fill(accentColor)
        for (let pt of this.points) {
          p.circle(pt.x, pt.y, 2.5)
        }
      }
    }
  }

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 300개 파티클을 무작위 위치에 초기화
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.8, 0.8),
        vy: p.random(-0.8, 0.8),
      })
    }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 40) // 미세 트레일

    // 파티클 이동 및 경계 반사
    for (let pt of particles) {
      pt.x += pt.vx
      pt.y += pt.vy
      if (pt.x < 0 || pt.x > p.width) pt.vx *= -1
      if (pt.y < 0 || pt.y > p.height) pt.vy *= -1
    }

    // 매 프레임 새로운 Quadtree 구성
    let boundary = new Rectangle(0, 0, p.width, p.height)
    quadtree = new Quadtree(boundary, CAPACITY, 0)
    for (let pt of particles) {
      quadtree.insert(pt)
    }

    quadtree.show()
  }
}