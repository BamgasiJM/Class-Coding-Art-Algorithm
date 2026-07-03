export default function flowFieldSketch(p, size) {
  let particles = []
  let cols, rows
  let scl = 20
  let time = 0
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)

    cols = p.floor(p.width / scl)
    rows = p.floor(p.height / scl)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 파티클 초기화
    particles = []
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: 0,
        vy: 0,
      })
    }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 25) // 트레일 효과

    time += 0.01

    // 각 파티클 업데이트
    for (let particle of particles) {
      // 현재 위치의 noise 기반 각도
      const angle = p.noise(
        particle.x * 0.002,
        particle.y * 0.002,
        time * 0.3
      ) * p.TWO_PI * 4

      // 속도 업데이트
      particle.vx = p.cos(angle) * 2
      particle.vy = p.sin(angle) * 2

      // 위치 업데이트
      particle.x += particle.vx
      particle.y += particle.vy

      // 경계 처리
      if (particle.x < 0) particle.x = p.width
      if (particle.x > p.width) particle.x = 0
      if (particle.y < 0) particle.y = p.height
      if (particle.y > p.height) particle.y = 0

      // 파티클 그리기
      p.stroke(accentColor)
      p.strokeWeight(1.5)
      p.point(particle.x, particle.y)
    }
  }
}
