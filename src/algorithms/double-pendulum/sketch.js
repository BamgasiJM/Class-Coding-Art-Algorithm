export default function doublePendulumSketch(p, size, params = {}) {
  let pendulums = [];
  let accentColor;

  // === 파라미터 접근자
  const P = {
    gravity: () => params.gravity ?? 3.0,                   // 실시간
    length1: () => params.length1 ?? 0.18,                  // 구조
    length2: () => params.length2 ?? 0.28,                  // 구조
    numPendulums: () => params.numPendulums ?? 3,           // 구조
    baseChaos: () => params.baseChaos ?? 0.001,             // 구조
    timeStep: () => params.timeStep ?? 0.15,                // 실시간
    trailLength: () => params.trailLength ?? 400,           // 구조
    pivotYRatio: () => params.pivotYRatio ?? 0.35,          // 실시간
  };

  let g, L1, L2;
  let m1 = 8, m2 = 10;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 진자 암 길이
    L1 = size * P.length1();
    L2 = size * P.length2();

    initPendulums();
    p.background(8, 8, 16);
  };

  function initPendulums() {
    pendulums = [];

    const baseTheta1 = p.PI * 0.75;
    const baseTheta2 = p.PI * 0.75;
    const numPend = P.numPendulums();
    const chaos = P.baseChaos();

    for (let i = 0; i < numPend; i++) {
      const offset = (i - (numPend - 1) / 2) * chaos;

      pendulums.push({
        a1: baseTheta1 + offset,
        a2: baseTheta2 + offset,
        w1: 0,
        w2: 0,
        trail: [],
        hueShift: (i / numPend) * 30 - 15,
      });
    }
  }

  function computeAccelerations(a1, a2, w1, w2) {
    const G = P.gravity();
    
    let num1 = -G * (2 * m1 + m2) * p.sin(a1);
    let num2 = -m2 * G * p.sin(a1 - 2 * a2);
    let num3 = -2 * p.sin(a1 - a2) * m2;
    let num4 = w2 * w2 * L2 + w1 * w1 * L1 * p.cos(a1 - a2);
    let den = L1 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    let a1acc = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * p.sin(a1 - a2);
    num2 = w1 * w1 * L1 * (m1 + m2);
    num3 = G * (m1 + m2) * p.cos(a1);
    num4 = w2 * w2 * L2 * m2 * p.cos(a1 - a2);
    den = L2 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    let a2acc = (num1 * (num2 + num3 + num4)) / den;

    return { a1acc, a2acc };
  }

  p.draw = function () {
    p.background(8, 8, 16);

    const pivotX = p.width / 2;
    const pivotY = p.height * P.pivotYRatio();
    const dt = P.timeStep();
    const trailMax = P.trailLength();

    // 진자 시뮬레이션 업데이트
    for (let pend of pendulums) {
      const acc = computeAccelerations(pend.a1, pend.a2, pend.w1, pend.w2);

      pend.w1 += acc.a1acc * dt;
      pend.w2 += acc.a2acc * dt;
      pend.a1 += pend.w1 * dt;
      pend.a2 += pend.w2 * dt;

      const x1 = pivotX + L1 * p.sin(pend.a1);
      const y1 = pivotY + L1 * p.cos(pend.a1);
      const x2 = x1 + L2 * p.sin(pend.a2);
      const y2 = y1 + L2 * p.cos(pend.a2);

      pend.trail.push({ x: x2, y: y2 });
      if (pend.trail.length > trailMax) {
        pend.trail.shift();
      }
    }

    // 트레일 렌더링
    p.noFill();
    p.strokeWeight(1.5);

    for (let pend of pendulums) {
      const c = p.color(accentColor);
      const r = p.red(c);
      const g_color = p.green(c);
      const b = p.blue(c);

      for (let i = 1; i < pend.trail.length; i++) {
        const age = pend.trail.length - i;
        let alpha = p.map(age, 0, trailMax, 255, 0);
        alpha = p.constrain(alpha, 0, 255);

        const cr = p.constrain(r + pend.hueShift * 2, 0, 255);
        const cg = p.constrain(g_color - pend.hueShift, 0, 255);
        const cb = p.constrain(b - pend.hueShift * 1.5, 0, 255);

        p.stroke(cr, cg, cb, alpha);
        p.line(
          pend.trail[i - 1].x,
          pend.trail[i - 1].y,
          pend.trail[i].x,
          pend.trail[i].y,
        );
      }
    }

    // 진자 구조 (첫 번째 진자만)
    const mainPend = pendulums[0];
    const x1 = pivotX + L1 * p.sin(mainPend.a1);
    const y1 = pivotY + L1 * p.cos(mainPend.a1);
    const x2 = x1 + L2 * p.sin(mainPend.a2);
    const y2 = y1 + L2 * p.cos(mainPend.a2);

    p.stroke(255, 180);
    p.strokeWeight(2);
    p.line(pivotX, pivotY, x1, y1);
    p.line(x1, y1, x2, y2);

    p.noStroke();
    p.fill(255);
    p.circle(pivotX, pivotY, 6);

    const massColor = p.color(accentColor);
    p.fill(massColor);
    p.circle(x1, y1, 14);
    p.circle(x2, y2, 14);
  };

  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      initPendulums();
      p.background(8, 8, 16);
    }
  };
}