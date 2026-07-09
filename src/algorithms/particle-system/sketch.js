export default function particleSystemSketch(p, size, params = {}) {
  let particles = [];
  let emitter;
  let accentColor;

  // === 파라미터 접근자
  const P = {
    emitCount: () => params.emitCount ?? 5, // 실시간
    emitterY: () => params.emitterY ?? 0.8, // 실시간 (화면 높이의 배수)
    velocityXMin: () => params.velocityXMin ?? -3, // 실시간
    velocityXMax: () => params.velocityXMax ?? 3, // 실시간
    velocityYMin: () => params.velocityYMin ?? -6, // 실시간
    velocityYMax: () => params.velocityYMax ?? -1, // 실시간
    particleSizeMin: () => params.particleSizeMin ?? 2, // 실시간
    particleSizeMax: () => params.particleSizeMax ?? 8, // 실시간
    particleLife: () => params.particleLife ?? 300, // 구조
    lifeDecay: () => params.lifeDecay ?? 4, // 실시간
    gravity: () => params.gravity ?? 0.05, // 실시간
    trailAlpha: () => params.trailAlpha ?? 40, // 실시간
  };

  p.setup = function () {
    p.createCanvas(size, size);
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    emitter = { x: p.width / 2, y: p.height * P.emitterY() };
    p.background(8, 8, 16);
  };

  p.draw = function () {
    const trailAlpha = P.trailAlpha();
    p.background(8, 8, 16, trailAlpha);
    // emitter 위치를 실시간으로 업데이트
    emitter.y = p.height * P.emitterY();

    // 중앙에서 파티클 방출
    const emitCount = P.emitCount();
    const vxMin = P.velocityXMin();
    const vxMax = P.velocityXMax();
    const vyMin = P.velocityYMin();
    const vyMax = P.velocityYMax();
    const sizeMin = P.particleSizeMin();
    const sizeMax = P.particleSizeMax();
    const life = P.particleLife();

    for (let i = 0; i < emitCount; i++) {
      particles.push({
        x: emitter.x,
        y: emitter.y,
        vx: p.random(vxMin, vxMax),
        vy: p.random(vyMin, vyMax),
        life: life,
        size: p.random(sizeMin, sizeMax),
      });
    }

    // 파티클 업데이트 및 그리기
    const gravity = P.gravity();
    const lifeDecay = P.lifeDecay();

    for (let i = particles.length - 1; i >= 0; i--) {
      let pt = particles[i];
      pt.vy += gravity;
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= lifeDecay;

      // 수명이 다한 파티클 제거
      if (pt.life <= 0) {
        particles.splice(i, 1);
      } else {
        let c = p.color(accentColor);
        c.setAlpha(pt.life);
        p.fill(c);
        p.noStroke();
        p.ellipse(pt.x, pt.y, pt.size, pt.size);
      }
    }
  };
}
