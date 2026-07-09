export default function boidsFlockingSketch(p, size) {
  let boids = []
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)
    accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    
    for (let i = 0; i < 150; i++) {
      boids.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-1, 1),
        vy: p.random(-1, 1)
      })
    }
    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 40)
    
    for (let boid of boids) {
      let sepX = 0, sepY = 0, sepCount = 0
      let aliX = 0, aliY = 0, aliCount = 0
      let cohX = 0, cohY = 0, cohCount = 0
      
      for (let other of boids) {
        if (boid === other) continue
        let d = p.dist(boid.x, boid.y, other.x, other.y)
        
        // 분리 (Separation): 너무 가까운 개체 피하기
        if (d < 15 && d > 0) {
          sepX += (boid.x - other.x) / d
          sepY += (boid.y - other.y) / d
          sepCount++
        }
        // 정렬 (Alignment): 이웃들의 평균 속도 방향으로 정렬
        if (d < 30) {
          aliX += other.vx
          aliY += other.vy
          aliCount++
        }
        // 응집 (Cohesion): 이웃들의 평균 위치를 향해 이동
        if (d < 30) {
          cohX += other.x
          cohY += other.y
          cohCount++
        }
      }
      
      // 세 가지 규칙에 따른 힘 적용
      if (sepCount > 0) { boid.vx += sepX / sepCount * 0.5; boid.vy += sepY / sepCount * 0.5 }
      if (aliCount > 0) { boid.vx += (aliX / aliCount - boid.vx) * 0.05; boid.vy += (aliY / aliCount - boid.vy) * 0.05 }
      if (cohCount > 0) { boid.vx += (cohX / cohCount - boid.x) * 0.005; boid.vy += (cohY / cohCount - boid.y) * 0.005 }
      
      // 최대 속도 제한
      let speed = p.sqrt(boid.vx * boid.vx + boid.vy * boid.vy)
      if (speed > 4) { boid.vx = (boid.vx / speed) * 4; boid.vy = (boid.vy / speed) * 4 }
      
      boid.x += boid.vx
      boid.y += boid.vy
      
      // 화면 경계 래핑
      if (boid.x < 0) boid.x = p.width
      if (boid.x > p.width) boid.x = 0
      if (boid.y < 0) boid.y = p.height
      if (boid.y > p.height) boid.y = 0
      
      // 진행 방향을 향하는 삼각형 그리기
      let angle = p.atan2(boid.vy, boid.vx)
      p.push()
      p.translate(boid.x, boid.y)
      p.rotate(angle)
      p.fill(accentColor)
      p.noStroke()
      p.triangle(0, 0, -6, -3, -6, 3)
      p.pop()
    }
  }
}