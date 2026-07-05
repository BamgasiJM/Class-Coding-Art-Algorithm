export default function nBodyGravitySketch(p, size) {
  let bodies = [];
  let accentColor;
  let G = 0.7; // 중력 상수 (시각적 균형을 위한 조정값)
  let softening = 20; // 특이점(singularity) 방지용 최소 거리 제곱
  let numSmallBodies = 60; // 작은 질량 천체 수
  let dt = 0.5; // 시간 간격 (적분 안정성 제어)

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initBodies();
    p.background(8, 8, 16);
  };

  // 천체 초기화: 중앙에 큰 질량(항성), 주변에 작은 질량(행성) 배치
  function initBodies() {
    bodies = [];

    // 중앙 항성 (큰 질량, 거의 정지)
    bodies.push({
      x: p.width / 2,
      y: p.height / 2,
      vx: 0,
      vy: 0,
      mass: 1000,
      radius: 8,
      isStar: true,
    });

    // 주변 행성들 (원형 궤도를 위한 초기 속도 부여)
    for (let i = 0; i < numSmallBodies; i++) {
      let angle = p.random(p.TWO_PI);
      let dist = p.random(80, p.width * 0.4); // 항성으로부터의 거리

      let x = p.width / 2 + p.cos(angle) * dist;
      let y = p.height / 2 + p.sin(angle) * dist;

      // 원형 궤도를 위한 접선 방향 속도 (v = √(GM/r))
      let orbitalSpeed = p.sqrt((G * 500) / dist) * p.random(0.85, 1.15);
      let vx = -p.sin(angle) * orbitalSpeed;
      let vy = p.cos(angle) * orbitalSpeed;

      bodies.push({
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        mass: p.random(1, 5),
        radius: p.random(1.5, 3),
        isStar: false,
      });
    }
  }

  p.draw = function () {
    // 알파 트레일로 궤적 시각화
    p.background(8, 8, 16, 15);

    // 1. 모든 쌍에 대한 중력 계산 및 적용 (N² 상호작용)
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        let a = bodies[i];
        let b = bodies[j];

        let dx = b.x - a.x;
        let dy = b.y - a.y;

        // 거리 제곱 + softening (너무 가까울 때 힘이 무한대로 발산하는 것 방지)
        let distSq = dx * dx + dy * dy + softening;
        let dist = p.sqrt(distSq);

        // 만유인력: F = G * m1 * m2 / r²
        let force = (G * a.mass * b.mass) / distSq;

        // 힘을 각 천체의 질량으로 나누어 가속도 계산 (F = ma → a = F/m)
        let fx = (force * dx) / dist;
        let fy = (force * dy) / dist;

        // 각 천체에 가속도 적용 (질량에 반비례)
        a.vx += (fx / a.mass) * dt;
        a.vy += (fy / a.mass) * dt;
        b.vx -= (fx / b.mass) * dt;
        b.vy -= (fy / b.mass) * dt;
      }
    }

    // 2. 위치 업데이트 및 렌더링
    for (let body of bodies) {
      // 속도 → 위치 적분
      body.x += body.vx * dt;
      body.y += body.vy * dt;

      // 화면 밖으로 너무 멀리 나가면 속도 감쇠 (시스템 안정화)
      let distFromCenter = p.dist(body.x, body.y, p.width / 2, p.height / 2);
      if (distFromCenter > p.width * 0.8) {
        body.vx *= 0.98;
        body.vy *= 0.98;
      }

      // 렌더링
      if (body.isStar) {
        // 항성: 밝은 accent color + 글로우 효과
        p.noStroke();
        let starColor = p.color(accentColor);
        starColor.setAlpha(60);
        p.fill(starColor);
        p.circle(body.x, body.y, body.radius * 4); // 글로우

        starColor.setAlpha(255);
        p.fill(starColor);
        p.circle(body.x, body.y, body.radius * 2);
      } else {
        // 행성: accent color, 질량에 따라 밝기 조절
        let brightness = p.map(body.mass, 1, 5, 0.5, 1.0);
        let c = p.color(accentColor);
        let r = p.red(c) * brightness;
        let g = p.green(c) * brightness;
        let b = p.blue(c) * brightness;
        p.noStroke();
        p.fill(r, g, b);
        p.circle(body.x, body.y, body.radius * 2);
      }
    }
  };

  // 클릭 시 새로운 시스템 생성
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      initBodies();
      p.background(8, 8, 16);
    }
  };
}