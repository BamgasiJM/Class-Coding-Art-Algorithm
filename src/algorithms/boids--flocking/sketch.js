export default function boidsFlockingSketch(p, size, params = {}) {
  let boids = []
  let accentColor

  // === 파라미터 접근자
  const P = {
    numBoids: () => params.numBoids ?? 150,                        // 구조
    separationDistance: () => params.separationDistance ?? 15,     // 실시간
    separationStrength: () => params.separationStrength ?? 0.5,    // 실시간
    alignmentDistance: () => params.alignmentDistance ?? 30,       // 실시간
    alignmentStrength: () => params.alignmentStrength ?? 0.05,     // 실시간
    cohesionDistance: () => params.cohesionDistance ?? 30,         // 실시간
    cohesionStrength: () => params.cohesionStrength ?? 0.005,      // 실시간
    maxSpeed: () => params.maxSpeed ?? 4,                          // 실시간
    trailAlpha: () => params.trailAlpha ?? 40,                     // 실시간
    boidSize: () => params.boidSize ?? 6,                          // 실시간
  };

  p.setup = function() {
    p.createCanvas(size, size)
    accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    
    initBoids()
    p.background(8, 8, 16)
  }

  function initBoids() {
    boids = []
    const numB = P.numBoids()
    for (let i = 0; i < numB; i++) {
      boids.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-1, 1),
        vy: p.random(-1, 1)
      })
    }
  }

  p.draw = function() {
    const trailA = P.trailAlpha()
    p.background(8, 8, 16, trailA)
    
    const sepDist = P.separationDistance()
    const sepStr = P.separationStrength()
    const aliDist = P.alignmentDistance()
    const aliStr = P.alignmentStrength()
    const cohDist = P.cohesionDistance()
    const cohStr = P.cohesionStrength()
    const maxSpd = P.maxSpeed()
    const boidSz = P.boidSize()
    
    for (let boid of boids) {
      let sepX = 0, sepY = 0, sepCount = 0
      let aliX = 0, aliY = 0, aliCount = 0
      let cohX = 0, cohY = 0, cohCount = 0
      
      for (let other of boids) {
        if (boid === other) continue
        let d = p.dist(boid.x, boid.y, other.x, other.y)
        
        // 분리 (Separation)
        if (d < sepDist && d > 0) {
          sepX += (boid.x - other.x) / d
          sepY += (boid.y - other.y) / d
          sepCount++
        }
        // 정렬 (Alignment)
        if (d < aliDist) {
          aliX += other.vx
          aliY += other.vy
          aliCount++
        }
        // 응집 (Cohesion)
        if (d < cohDist) {
          cohX += other.x
          cohY += other.y
          cohCount++
        }
      }
      
      // 세 가지 규칙에 따른 힘 적용
      if (sepCount > 0) { 
        boid.vx += sepX / sepCount * sepStr
        boid.vy += sepY / sepCount * sepStr
      }
      if (aliCount > 0) { 
        boid.vx += (aliX / aliCount - boid.vx) * aliStr
        boid.vy += (aliY / aliCount - boid.vy) * aliStr
      }
      if (cohCount > 0) { 
        boid.vx += (cohX / cohCount - boid.x) * cohStr
        boid.vy += (cohY / cohCount - boid.y) * cohStr
      }
      
      // 최대 속도 제한
      let speed = p.sqrt(boid.vx * boid.vx + boid.vy * boid.vy)
      if (speed > maxSpd) { 
        boid.vx = (boid.vx / speed) * maxSpd
        boid.vy = (boid.vy / speed) * maxSpd
      }
      
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
      p.triangle(0, 0, -boidSz, -boidSz * 0.5, -boidSz, boidSz * 0.5)
      p.pop()
    }
  }
}