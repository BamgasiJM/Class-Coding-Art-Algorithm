export default function differentialGrowthSketch(p, size) {
  let nodes = [];
  let maxNodes = 300; // 60fps 유지를 위한 최대 노드 개수 제어
  let maxForce = 0.5;
  let maxSpeed = 2;

  // 디퍼런셜 그로스 파라미터
  let rInner = 18; // 노드 간 반발 반경
  let rOuter = 12; // 노드 간 삽입 조건 반경
  let accentColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 중앙에 작은 원형태로 초기 노드 배치
    nodes = [];
    let initRadius = 30;
    let initNodesCount = 40;
    for (let i = 0; i < initNodesCount; i++) {
      let angle = (i / initNodesCount) * p.TWO_PI;
      nodes.push({
        x: p.width / 2 + p.cos(angle) * initRadius,
        y: p.height / 2 + p.sin(angle) * initRadius,
        vx: 0,
        vy: 0,
      });
    }

    p.background(8, 8, 16);
  };

  // 두 노드 사이의 최적 거리를 유지하기 위한 반발력 및 결합력 연산
  function updateGrowth() {
    let forces = [];
    for (let i = 0; i < nodes.length; i++) {
      forces.push({ fx: 0, fy: 0, count: 0 });
    }

    // 1. 근접 노드 간 반발력(Separation Force) 계산
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let d = p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        if (d < rInner && d > 0) {
          let diffX = nodes[i].x - nodes[j].x;
          let diffY = nodes[i].y - nodes[j].y;
          let scale = (rInner - d) / d; // 가까울수록 강한 반발력

          forces[i].fx += diffX * scale;
          forces[i].fy += diffY * scale;
          forces[i].count++;

          forces[j].fx -= diffX * scale;
          forces[j].fy -= diffY * scale;
          forces[j].count++;
        }
      }
    }

    // 2. 인접 노드 간 결합력(Cohesion Force) 및 물리 법칙 반영
    for (let i = 0; i < nodes.length; i++) {
      let leftIdx = (i - 1 + nodes.length) % nodes.length;
      let rightIdx = (i + 1) % nodes.length;

      // 인접 노드들의 중심점 방향으로 약한 인력 작용
      let cx = (nodes[leftIdx].x + nodes[rightIdx].x) / 2;
      let cy = (nodes[leftIdx].y + nodes[rightIdx].y) / 2;

      let cohX = cx - nodes[i].x;
      let cohY = cy - nodes[i].y;

      if (forces[i].count > 0) {
        forces[i].fx /= forces[i].count;
        forces[i].fy /= forces[i].count;
      }

      // 반발력과 결합력의 조합
      let totalFx = forces[i].fx + cohX * 0.1;
      let totalFy = forces[i].fy + cohY * 0.1;

      // 최대 가속도 제한
      let mag = p.dist(0, 0, totalFx, totalFy);
      if (mag > maxForce) {
        totalFx = (totalFx / mag) * maxForce;
        totalFy = (totalFy / mag) * maxForce;
      }

      nodes[i].vx += totalFx;
      nodes[i].vy += totalFy;

      // 속도 제한 및 위치 업데이트
      let speed = p.dist(0, 0, nodes[i].vx, nodes[i].vy);
      if (speed > maxSpeed) {
        nodes[i].vx = (nodes[i].vx / speed) * maxSpeed;
        nodes[i].vy = (nodes[i].vy / speed) * maxSpeed;
      }

      nodes[i].x += nodes[i].vx;
      nodes[i].y += nodes[i].vy;

      // 마찰력 및 저항 가중치 추가
      nodes[i].vx *= 0.8;
      nodes[i].vy *= 0.8;
    }

    // 3. 거리 조건에 따른 분열 및 새 노드 삽입 (Adaptive Subdivision)
    if (nodes.length < maxNodes) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        let nextIdx = (i + 1) % nodes.length;
        let d = p.dist(
          nodes[i].x,
          nodes[i].y,
          nodes[nextIdx].x,
          nodes[nextIdx].y,
        );

        // 두 연결 노드 간의 거리가 바깥 경계를 넘으면 중간 지점에 새 노드 추가
        if (d > rOuter) {
          let midX = (nodes[i].x + nodes[nextIdx].x) / 2;
          let midY = (nodes[i].y + nodes[nextIdx].y) / 2;
          nodes.splice(nextIdx, 0, { x: midX, y: midY, vx: 0, vy: 0 });
        }
      }
    }
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // 생장 및 가속 벡터 역학 계산 업데이트
    updateGrowth();

    // 디퍼런셜 그로스 선 루프 드로잉
    p.noFill();
    p.stroke(accentColor);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < nodes.length; i++) {
      p.vertex(nodes[i].x, nodes[i].y);
    }
    p.endShape(p.CLOSE);

    // 연결점 가독성을 돕는 결합 도트 시각화
    p.fill(240, 240, 255);
    p.noStroke();
    for (let i = 0; i < nodes.length; i++) {
      p.circle(nodes[i].x, nodes[i].y, 2);
    }
  };
}
