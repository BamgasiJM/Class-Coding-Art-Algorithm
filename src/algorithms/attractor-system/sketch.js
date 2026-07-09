export default function attractorSystemSketch(p, size, params = {}) {
  let particles = [];
  let attractor;
  let accentColor;
  let time = 0;

  // === 파라미터 접근자
  const P = {
    numParticles: () => params.numParticles ?? 600,                    // 구조
    attractorStrength: () => params.attractorStrength ?? 100,          // 실시간
    damping: () => params.damping ?? 0.96,                             // 실시간
    timeSpeed: () => params.timeSpeed ?? 0.02,                         // 실시간
    lissajousSpeedX: () => params.lissajousSpeedX ?? 0.7,              // 실시간
    lissajousSpeedY: () => params.lissajousSpeedY ?? 1.1,              // 실시간
    lissajousRadiusX: () => params.lissajousRadiusX ?? 0.3,            // 실시간
    lissajousRadiusY: () => params.lissajousRadiusY ?? 0.3,            // 실시간
    minDistance: () => params.minDistance ?? 10,                       // 실시간
    maxDistance: () => params.maxDistance ?? 500,                      // 실시간
    particleLineWeight: () => params.particleLineWeight ?? 1.5,        // 실시간
    attractorSize: () => params.attractorSize ?? 20,                   // 실시간
  };

  p.setup = function () {
    p.createCanvas(size, size);
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initParticles();
    attractor = { x: p.width / 2, y: p.height / 2 };
    p.background(8, 8, 16);
  };

  function initParticles() {
    particles = [];
    const numP = P.numParticles();
    for (let i = 0; i < numP; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: 0,
        vy: 0,
      });
    }
  }

  p.draw = function () {
    p.background(8, 8, 16);
    
    const timeSpd = P.timeSpeed();
    const lissSpeedX = P.lissajousSpeedX();
    const lissSpeedY = P.lissajousSpeedY();
    const lissRadX = P.lissajousRadiusX();
    const lissRadY = P.lissajousRadiusY();
    const minDist = P.minDistance();
    const maxDist = P.maxDistance();
    const strength = P.attractorStrength();
    const damp = P.damping();
    const pLineWeight = P.particleLineWeight();
    const attractSize = P.attractorSize();

    time += timeSpd;

    // 어트랙터 리사주 곡선 이동
    attractor.x = p.width / 2 + p.sin(time * lissSpeedX) * p.width * lissRadX;
    attractor.y = p.height / 2 + p.sin(time * lissSpeedY) * p.height * lissRadY;

    // 어트랙터 시각화
    p.fill(accentColor);
    p.noStroke();
    p.ellipse(attractor.x, attractor.y, attractSize, attractSize);

    // 파티클 업데이트 및 중력 적용
    for (let pt of particles) {
      let dx = attractor.x - pt.x;
      let dy = attractor.y - pt.y;
      let d = p.sqrt(dx * dx + dy * dy);
      d = p.constrain(d, minDist, maxDist);

      // 거리의 역제곱에 비례하는 인력
      let force = strength / (d * d);
      pt.vx += (dx / d) * force;
      pt.vy += (dy / d) * force;

      pt.vx *= damp;
      pt.vy *= damp;
      pt.x += pt.vx;
      pt.y += pt.vy;

      p.stroke(accentColor);
      p.strokeWeight(pLineWeight);
      p.point(pt.x, pt.y);
    }
  };
}