export default function particleSystemSketch(p, size) {
  let particles = []
  let emitter
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)
    accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    emitter = { x: p.width / 2, y: p.height - 150 }
    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 40) // 트레일 효과
    
    // 중앙에서 파티클 방출
    for (let i = 0; i < 5; i++) {
      particles.push({
        x: emitter.x,
        y: emitter.y,
        vx: p.random(-3, 3),
        vy: p.random(-6, -1),
        life: 300,
        size: p.random(2, 8)
      })
    }
    
    // 파티클 업데이트 및 그리기
    for (let i = particles.length - 1; i >= 0; i--) {
      let pt = particles[i]
      pt.vy += 0.05 // 중력 적용
      pt.x += pt.vx
      pt.y += pt.vy
      pt.life -= 4
      
      // 수명이 다한 파티클 제거
      if (pt.life <= 0) {
        particles.splice(i, 1)
      } else {
        let c = p.color(accentColor)
        c.setAlpha(pt.life) // 수명에 따라 투명도 조절
        p.fill(c)
        p.noStroke()
        p.ellipse(pt.x, pt.y, pt.size, pt.size)
      }
    }
  }
}
