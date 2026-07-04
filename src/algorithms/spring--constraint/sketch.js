export default function springConstraintSketch(p, size) {
  let nodes = [];
  let springs = [];
  let accentColor;
  let time = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 격자 구조 노드
    const spacing = 50;
    const cols = p.floor(p.width / spacing) + 1;
    const rows = p.floor(p.height / spacing) + 1;

    nodes = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing;
        const y = i * spacing;
        nodes.push({
          x,
          y,
          px: x,
          py: y,
          pinned: i === 0, // 위쪽 고정
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
        // 우측 연결
        if (j < cols - 1) {
          springs.push({
            n1: idx,
            n2: idx + 1,
            restLength: spacing,
            stiffness: 0.04,
          });
        }
        // 하단 연결
        if (i < rows - 1) {
          springs.push({
            n1: idx,
            n2: idx + cols,
            restLength: spacing,
            stiffness: 0.04,
          });
        }
      }
    }

    p.background(8, 8, 16);
  };

  p.draw = function () {
    p.background(8, 8, 16);
    time += 0.016;

    // 중력
    for (let node of nodes) {
      if (!node.pinned) {
        node.vy += 0.1;
      }
    }

    // 스프링 제약
    for (let spring of springs) {
      const n1 = nodes[spring.n1];
      const n2 = nodes[spring.n2];

      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = p.sqrt(dx * dx + dy * dy);
      const delta = (dist - spring.restLength) / dist;
      const fx = dx * delta * spring.stiffness;
      const fy = dy * delta * spring.stiffness;

      if (!n1.pinned) {
        n1.vx += fx;
        n1.vy += fy;
      }
      if (!n2.pinned) {
        n2.vx -= fx;
        n2.vy -= fy;
      }
    }

    // 위치 업데이트 (Verlet 통합)
    for (let node of nodes) {
      if (!node.pinned) {
        const ax = node.vx;
        const ay = node.vy;

        node.x += ax;
        node.y += ay;

        node.vx *= 0.98;
        node.vy *= 0.98;

        // 경계
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
        if (dist < 80) {
          node.vx += (dx / dist) * 0.5;
          node.vy += (dy / dist) * 0.5;
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
