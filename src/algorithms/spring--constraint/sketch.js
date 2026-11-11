export default function springConstraintSketch(p, size, params = {}) {
  let nodes = [];
  let springs = [];
  let accentColor;
  let time = 0;
  let cols, rows;

  // === 파라미터 접근자
  const P = {
    spacing: () => params.spacing ?? 50,                    // 구조
    stiffness: () => params.stiffness ?? 0.04,              // 실시간
    gravity: () => params.gravity ?? 0.1,                   // 실시간
    damping: () => params.damping ?? 0.98,                  // 실시간
    mouseInfluenceRadius: () => params.mouseInfluenceRadius ?? 80, // 실시간
    mouseInfluenceStrength: () => params.mouseInfluenceStrength ?? 0.5, // 실시간
  };

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initNodes();
    p.background(8, 8, 16);
  };

  function initNodes() {
    const sp = P.spacing();
    cols = p.floor(p.width / sp) + 1;
    rows = p.floor(p.height / sp) + 1;

    nodes = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * sp;
        const y = i * sp;
        nodes.push({
          x,
          y,
          px: x,
          py: y,
          pinned: i === 0,
          vx: 0,
          vy: 0,
        });
      }
    }

    // 스프링 연결
    springs = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = i * cols + j;
        const stiff = P.stiffness();
        // 우측 연결
        if (j < cols - 1) {
          springs.push({
            n1: idx,
            n2: idx + 1,
            restLength: sp,
            stiffness: stiff,
          });
        }
        // 하단 연결
        if (i < rows - 1) {
          springs.push({
            n1: idx,
            n2: idx + cols,
            restLength: sp,
            stiffness: stiff,
          });
        }
      }
    }
  }

  p.draw = function () {
    p.background(8, 8, 16);
    time += 0.016;

    const grav = P.gravity();
    const damp = P.damping();
    const mouseR = P.mouseInfluenceRadius();
    const mouseStr = P.mouseInfluenceStrength();
    const stiff = P.stiffness();

    // 중력
    for (let node of nodes) {
      if (!node.pinned) {
        node.vy += grav;
      }
    }

    // 스프링 제약
    for (let spring of springs) {
      const n1 = nodes[spring.n1];
      const n2 = nodes[spring.n2];

      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = p.sqrt(dx * dx + dy * dy);
      if (dist === 0) continue; // 두 점이 정확히 겹치면 방향을 알 수 없으므로 건너뜀
      const delta = (dist - spring.restLength) / dist;
      const fx = dx * delta * stiff;
      const fy = dy * delta * stiff;

      if (!n1.pinned) {
        n1.vx += fx;
        n1.vy += fy;
      }
      if (!n2.pinned) {
        n2.vx -= fx;
        n2.vy -= fy;
      }
    }

    // 위치 업데이트 (속도를 위치에 더하고, 감쇠를 곱한다)
    for (let node of nodes) {
      if (!node.pinned) {
        const ax = node.vx;
        const ay = node.vy;

        node.x += ax;
        node.y += ay;

        node.vx *= damp;
        node.vy *= damp;

        node.x = p.constrain(node.x, 0, p.width);
        node.y = p.constrain(node.y, 0, p.height);
      }
    }

    // 마우스 교란
    if (p.mouseIsPressed) {
      for (let node of nodes) {
        const dx = node.x - p.mouseX;
        const dy = node.y - p.mouseY;
        const dist = p.sqrt(dx * dx + dy * dy);
        if (dist < mouseR && dist > 0) {
          node.vx += (dx / dist) * mouseStr;
          node.vy += (dy / dist) * mouseStr;
        }
      }
    }

    // 렌더링
    p.stroke(accentColor);
    p.strokeWeight(1);
    for (let spring of springs) {
      const n1 = nodes[spring.n1];
      const n2 = nodes[spring.n2];
      p.line(n1.x, n1.y, n2.x, n2.y);
    }

    p.fill(accentColor);
    p.noStroke();
    for (let node of nodes) {
      p.ellipse(node.x, node.y, 3);
    }
  };
}