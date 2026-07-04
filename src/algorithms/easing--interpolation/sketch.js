export default function easingInterpolationSketch(p, size) {
  let accentColor;

  // 움직이는 점
  let mover;

  // 목적지
  let target;

  // 궤적
  let trail = [];

  const maxTrail = 220;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    mover = {
      x: p.width * 0.5,
      y: p.height * 0.5,
    };

    target = randomTarget();

    p.background(8, 8, 16);
    p.noFill();
  };

  p.draw = function () {
    p.background(8, 8, 16, 24);

    // 목적지까지의 거리
    const dx = target.x - mover.x;
    const dy = target.y - mover.y;

    const dist = p.sqrt(dx * dx + dy * dy);

    // -----------------------------
    // Easing
    // -----------------------------
    const easing = 0.055;

    mover.x += dx * easing;
    mover.y += dy * easing;

    // 충분히 가까워지면 새로운 목표 생성
    if (dist < 6) {
      target = randomTarget();
    }

    // -----------------------------
    // Trail 저장
    // -----------------------------
    trail.push({
      x: mover.x,
      y: mover.y,
    });

    if (trail.length > maxTrail) {
      trail.shift();
    }

    drawTrail();
    drawTarget();
    drawInterpolationLines();
    drawMover();
  };

  // ------------------------------------
  // Trail
  // ------------------------------------
  function drawTrail() {
    if (trail.length < 2) return;

    p.noFill();

    for (let i = 1; i < trail.length; i++) {
      const a = trail[i - 1];
      const b = trail[i];

      const t = i / trail.length;

      p.stroke(accentColor);
      p.strokeWeight(0.5 + t * 2);

      p.line(a.x, a.y, b.x, b.y);
    }
  }

  // ------------------------------------
  // 보간선
  // ------------------------------------
  function drawInterpolationLines() {
    p.stroke(255, 70);
    p.strokeWeight(1);

    p.line(mover.x, mover.y, target.x, target.y);

    const steps = 12;

    for (let i = 1; i < steps; i++) {
      const t = i / steps;

      const x = p.lerp(mover.x, target.x, t);

      const y = p.lerp(mover.y, target.y, t);

      p.noStroke();
      p.fill(255, 60);

      p.circle(x, y, 3);
    }
  }

  // ------------------------------------
  // 목표점
  // ------------------------------------
  function drawTarget() {
    p.noFill();
    p.stroke(accentColor);
    p.strokeWeight(2);

    const r = 10 + p.sin(p.frameCount * 0.08) * 3;

    p.circle(target.x, target.y, r * 2);

    p.line(target.x - 8, target.y, target.x + 8, target.y);

    p.line(target.x, target.y - 8, target.x, target.y + 8);
  }

  // ------------------------------------
  // 현재 위치
  // ------------------------------------
  function drawMover() {
    p.noStroke();

    p.fill(accentColor);

    p.circle(mover.x, mover.y, 10);
  }

  // ------------------------------------
  // 랜덤 목적지
  // ------------------------------------
  function randomTarget() {
    return {
      x: p.random(60, p.width - 60),
      y: p.random(60, p.height - 60),
    };
  }
}
