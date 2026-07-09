export default function elasticCollisionSketch(p, size, params = {}) {
  let balls = [];
  let accentColor;
  let collisionEffects = [];

  // === 파라미터 접근자
  const P = {
    numBalls: () => params.numBalls ?? 18,                      // 구조
    ballRadiusMin: () => params.ballRadiusMin ?? 0.025,         // 구조
    ballRadiusMax: () => params.ballRadiusMax ?? 0.05,          // 구조
    ballSpeedMin: () => params.ballSpeedMin ?? 1.5,             // 구조
    ballSpeedMax: () => params.ballSpeedMax ?? 3.5,             // 구조
    ballHueShiftRange: () => params.ballHueShiftRange ?? 20,    // 구조
    flashDecay: () => params.flashDecay ?? 0.9,                 // 실시간
    collisionEffectLife: () => params.collisionEffectLife ?? 0.08, // 실시간
    collisionRingMaxRadius: () => params.collisionRingMaxRadius ?? 30, // 실시간
    collisionRingStrokeWeight: () => params.collisionRingStrokeWeight ?? 1.5, // 실시간
  };

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initBalls();
    p.background(8, 8, 16);
  };

  function initBalls() {
    balls = [];
    collisionEffects = [];

    const numB = P.numBalls();
    const radiusMin = P.ballRadiusMin();
    const radiusMax = P.ballRadiusMax();
    const speedMin = P.ballSpeedMin();
    const speedMax = P.ballSpeedMax();
    const hueRange = P.ballHueShiftRange();

    let attempts = 0;
    while (balls.length < numB && attempts < 1000) {
      let r = p.random(size * radiusMin, size * radiusMax);
      let x = p.random(r, p.width - r);
      let y = p.random(r, p.height - r);

      let overlapping = false;
      for (let other of balls) {
        let d = p.dist(x, y, other.x, other.y);
        if (d < r + other.r + 2) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        let mass = r * r * 0.01;
        let angle = p.random(p.TWO_PI);
        let speed = p.random(speedMin, speedMax);

        balls.push({
          x: x,
          y: y,
          vx: p.cos(angle) * speed,
          vy: p.sin(angle) * speed,
          r: r,
          mass: mass,
          flash: 0,
          hueShift: p.random(-hueRange, hueRange),
        });
      }
      attempts++;
    }
  }

  function resolveCollision(a, b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    let dist = p.sqrt(dx * dx + dy * dy);
    let minDist = a.r + b.r;

    if (dist >= minDist || dist === 0) return false;

    let nx = dx / dist;
    let ny = dy / dist;

    let overlap = minDist - dist;
    let totalMass = a.mass + b.mass;
    a.x -= nx * overlap * (b.mass / totalMass);
    a.y -= ny * overlap * (b.mass / totalMass);
    b.x += nx * overlap * (a.mass / totalMass);
    b.y += ny * overlap * (a.mass / totalMass);

    let dvx = a.vx - b.vx;
    let dvy = a.vy - b.vy;
    let dvDotN = dvx * nx + dvy * ny;

    if (dvDotN > 0) return false;

    let impulse = (2 * dvDotN) / totalMass;

    a.vx -= impulse * b.mass * nx;
    a.vy -= impulse * b.mass * ny;
    b.vx += impulse * a.mass * nx;
    b.vy += impulse * a.mass * ny;

    let cx = (a.x + b.x) / 2;
    let cy = (a.y + b.y) / 2;
    collisionEffects.push({ x: cx, y: cy, life: 1.0 });

    a.flash = 1.0;
    b.flash = 1.0;

    return true;
  }

  p.draw = function () {
    p.background(8, 8, 16);

    const flashDec = P.flashDecay();
    const collEffectLife = P.collisionEffectLife();
    const collRingMaxR = P.collisionRingMaxRadius();
    const collRingSW = P.collisionRingStrokeWeight();

    // 공 이동
    for (let ball of balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      // 벽면 반사
      if (ball.x - ball.r < 0) {
        ball.x = ball.r;
        ball.vx = Math.abs(ball.vx);
      }
      if (ball.x + ball.r > p.width) {
        ball.x = p.width - ball.r;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y - ball.r < 0) {
        ball.y = ball.r;
        ball.vy = Math.abs(ball.vy);
      }
      if (ball.y + ball.r > p.height) {
        ball.y = p.height - ball.r;
        ball.vy = -Math.abs(ball.vy);
      }

      ball.flash *= flashDec;
    }

    // 충돌 검사
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        resolveCollision(balls[i], balls[j]);
      }
    }

    // 충돌 효과 렌더링
    p.noFill();
    for (let i = collisionEffects.length - 1; i >= 0; i--) {
      let e = collisionEffects[i];
      let radius = p.map(e.life, 1, 0, 5, collRingMaxR);
      let alpha = e.life * 200;

      let c = p.color(accentColor);
      c.setAlpha(alpha);
      p.stroke(c);
      p.strokeWeight(collRingSW);
      p.circle(e.x, e.y, radius * 2);

      e.life -= collEffectLife;
      if (e.life <= 0) collisionEffects.splice(i, 1);
    }

    // 공 렌더링
    let ac = p.color(accentColor);
    let acR = p.red(ac);
    let acG = p.green(ac);
    let acB = p.blue(ac);

    for (let ball of balls) {
      let flashBoost = ball.flash * 120;
      let r = p.constrain(acR + ball.hueShift + flashBoost, 0, 255);
      let g = p.constrain(acG + ball.hueShift * 0.5 + flashBoost, 0, 255);
      let b = p.constrain(acB + ball.hueShift * 0.3 + flashBoost, 0, 255);

      p.noStroke();
      p.fill(r, g, b);
      p.circle(ball.x, ball.y, ball.r * 2);
    }
  };

  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      const radiusMin = P.ballRadiusMin();
      const radiusMax = P.ballRadiusMax();
      const speedMin = P.ballSpeedMin();
      const speedMax = P.ballSpeedMax();
      const hueRange = P.ballHueShiftRange();

      let r = p.random(size * radiusMin, size * radiusMax);
      let angle = p.random(p.TWO_PI);
      let speed = p.random(speedMin, speedMax);

      balls.push({
        x: p.mouseX,
        y: p.mouseY,
        vx: p.cos(angle) * speed,
        vy: p.sin(angle) * speed,
        r: r,
        mass: r * r * 0.01,
        flash: 1.0,
        hueShift: p.random(-hueRange, hueRange),
      });
    }
  };
}