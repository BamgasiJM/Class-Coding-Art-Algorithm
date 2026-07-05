export default function randomWalkSketch(p, size) {
  let walkers = []
  let numWalkers = 6
  let accentColor

  class Walker {
    constructor(index) {
      this.x = p.width / 2
      this.y = p.height / 2
      this.index = index
      this.history = []
      this.maxHistory = 100
      this.speed = 12.5
    }

    step() {
      // 4방향 무작위 보행
      let dir = p.floor(p.random(4))
      if (dir === 0) this.y -= this.speed
      else if (dir === 1) this.x += this.speed
      else if (dir === 2) this.y += this.speed
      else if (dir === 3) this.x -= this.speed

      // 경계 반사
      if (this.x < 0) this.x = 0
      if (this.x > p.width) this.x = p.width
      if (this.y < 0) this.y = 0
      if (this.y > p.height) this.y = p.height

      this.history.push({ x: this.x, y: this.y })
      if (this.history.length > this.maxHistory) {
        this.history.shift()
      }
    }

    show() {
      // 꼬리 그리기: 먼 과거일수록 투명하고 가늘게
      p.noFill()
      for (let i = 1; i < this.history.length; i++) {
        let alpha = p.map(i, 0, this.history.length, 15, 200)
        let weight = p.map(i, 0, this.history.length, 0.5, 2.5)
        let c = p.color(accentColor)
        c.setAlpha(alpha)
        p.stroke(c)
        p.strokeWeight(weight)
        p.line(this.history[i - 1].x, this.history[i - 1].y,
               this.history[i].x, this.history[i].y)
      }

      // 현재 위치 강조
      p.noStroke()
      p.fill(accentColor)
      p.circle(this.x, this.y, 4)
    }
  }

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기 (CSS 변수 --accent)
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 워커 초기화
    for (let i = 0; i < numWalkers; i++) {
      walkers.push(new Walker(i))
    }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    // 어두운 배경에 알파를 줘서 잔상 트레일 효과
    p.background(8, 8, 16, 45)

    for (let walker of walkers) {
      walker.step()
      walker.show()
    }
  }
}