export default function elasticCollisionSketch(p, size) {
  let balls = [];
  let accentColor;
  let numBalls = 18;
  let collisionEffects = []; // 충돌 시 시각 효과

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initBalls();
    p.background(8, 8, 16);
  };

  // 공 초기화 (중복 배치 방지)
  function initBalls() {
    balls = [];
    collisionEffects = [];

    let attempts = 0;
    while (balls.length < numBalls && attempts < 1000) {
      let r = p.random(size * 0.025, size * 0.05);
      let x = p.random(r, p.width - r);
      let y = p.random(r, p.height - r);

      // 기존 공과 겹치지 않는지 확인
      let overlapping = false;
      for (let other of balls) {
        let d = p.dist(x, y, other.x, other.y);
        if (d < r + other.r + 2) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        // 질량은 반지름의 제곱에 비례 (실제 물리 특성 반영)
        let mass = r * r * 0.01;
        let angle = p.random(p.TWO_PI);
        let speed = p.random(1.5, 3.5);

        balls.push({
          x: x,
          y: y,
          vx: p.cos(angle) * speed,
          vy: p.sin(angle) * speed,
          r: r,
          mass: mass,
          flash: 0, // 충돌 플래시 타이머
          hueShift: p.random(-20, 20), // 색상 미세 변형
        });
      }
      attempts++;
    }
  }

  // 2D 탄성 충돌 해결 (운동량 + 에너지 보존)
  function resolveCollision(a, b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    let dist = p.sqrt(dx * dx + dy * dy);
    let minDist = a.r + b.r;

    // 이미 충돌한 상태가 아니면 무시
    if (dist >= minDist || dist === 0) return false;

    // 충돌 법선 벡터 (a → b 방향)
    let nx = dx / dist;
    let ny = dy / dist;

    // 1. 위치 보정: 겹침을 법선 방향으로 분배하여 분리
    let overlap = minDist - dist;
    let totalMass = a.mass + b.mass;
    a.x -= nx * overlap * (b.mass / totalMass);
    a.y -= ny * overlap * (b.mass / totalMass);
    b.x += nx * overlap * (a.mass / totalMass);
    b.y += ny * overlap * (a.mass / totalMass);

    // 2. 상대 속도를 법선 방향으로 투영
    let dvx = a.vx - b.vx;
    let dvy = a.vy - b.vy;
    let dvDotN = dvx * nx + dvy * ny;

    // 이미 서로 멀어지고 있으면 무시
    if (dvDotN > 0) return false;

    // 3. 1D 탄성 충돌 공식 적용 (법선 방향 성분만 교환)
    // v1' = v1 - (2m2/(m1+m2)) * <v1-v2, n> * n
    // v2' = v2 - (2m1/(m1+m2)) * <v2-v1, n> * n
    let impulse = (2 * dvDotN) / totalMass;

    a.vx -= impulse * b.mass * nx;
    a.vy -= impulse * b.mass * ny;
    b.vx += impulse * a.mass * nx;
    b.vy += impulse * a.mass * ny;

    // 충돌 시각 효과 기록
    let cx = (a.x + b.x) / 2;
    let cy = (a.y + b.y) / 2;
    collisionEffects.push({ x: cx, y: cy, life: 1.0 });

    // 공에 플래시 효과 부여
    a.flash = 1.0;
    b.flash = 1.0;

    return true;
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // 1. 모든 공 이동
    for (let ball of balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      // 2. 벽면 완전 탄성 반사
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

      // 플래시 감쇠
      ball.flash *= 0.9;
    }

    // 3. 모든 쌍에 대해 충돌 검사 (N²)
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        resolveCollision(balls[i], balls[j]);
      }
    }

    // 4. 충돌 효과 렌더링 (충격파 링)
    p.noFill();
    for (let i = collisionEffects.length - 1; i >= 0; i--) {
      let e = collisionEffects[i];
      let radius = p.map(e.life, 1, 0, 5, 30);
      let alpha = e.life * 200;

      let c = p.color(accentColor);
      c.setAlpha(alpha);
      p.stroke(c);
      p.strokeWeight(1.5);
      p.circle(e.x, e.y, radius * 2);

      e.life -= 0.08;
      if (e.life <= 0) collisionEffects.splice(i, 1);
    }

    // 5. 공 렌더링 (깔끔한 2D 단색 공)
    let ac = p.color(accentColor);
    let acR = p.red(ac);
    let acG = p.green(ac);
    let acB = p.blue(ac);

    for (let ball of balls) {
      // 공 색상 (accent color + hue shift + flash)
      let flashBoost = ball.flash * 120;
      let r = p.constrain(acR + ball.hueShift + flashBoost, 0, 255);
      let g = p.constrain(acG + ball.hueShift * 0.5 + flashBoost, 0, 255);
      let b = p.constrain(acB + ball.hueShift * 0.3 + flashBoost, 0, 255);

      // 단색 공
      p.noStroke();
      p.fill(r, g, b);
      p.circle(ball.x, ball.y, ball.r * 2);
    }
  };

  // 클릭 시 해당 위치에 새 공 추가
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      let r = p.random(size * 0.03, size * 0.05);
      let angle = p.random(p.TWO_PI);
      let speed = p.random(2, 4);

      balls.push({
        x: p.mouseX,
        y: p.mouseY,
        vx: p.cos(angle) * speed,
        vy: p.sin(angle) * speed,
        r: r,
        mass: r * r * 0.01,
        flash: 1.0,
        hueShift: p.random(-20, 20),
      });
    }
  };
}
