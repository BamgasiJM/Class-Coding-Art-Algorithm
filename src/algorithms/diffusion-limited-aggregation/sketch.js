export default function diffusionLimitedAggregationSketch(
  p,
  size,
  params = {},
) {
  let stuck = []; // 응집되어 고정된 입자들
  let stuckBuffer; // 고정 입자를 누적해서 그리는 버퍼
  let accentColor;
  let maxRadius = 1; // 현재 군집의 최대 반경
  let grid = new Map(); // 공간 격자: 칸 번호 → 그 칸에 있는 고정 입자 목록

  // 공간 격자 (Spatial Grid)
  // 칸 크기를 응집 반경의 최대값(12)과 같게 잡으면, 닿을 수 있는 입자는 주변 3×3 칸 안에만 있습니다.
  // 그래서 모든 입자를 확인하지 않고 주변 칸만 확인해서 계산을 크게 줄입니다.
  const GRID_CELL = 12;
  function cellKey(cx, cy) {
    return (cx + 5000) * 10000 + (cy + 5000);
  }
  function addToGrid(pt) {
    const key = cellKey(Math.floor(pt.x / GRID_CELL), Math.floor(pt.y / GRID_CELL));
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(pt);
  }
  function hasStuckNear(x, y, r) {
    const cx = Math.floor(x / GRID_CELL);
    const cy = Math.floor(y / GRID_CELL);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const bucket = grid.get(cellKey(cx + i, cy + j));
        if (!bucket) continue;
        for (const s of bucket) {
          const dx = x - s.x;
          const dy = y - s.y;
          if (dx * dx + dy * dy < r * r) return true;
        }
      }
    }
    return false;
  }

  // Playground에서 조절 가능한 파라미터
  const P = {
    maxParticles: () => params.maxParticles ?? 1500,
    stickRadius: () => params.stickRadius ?? 6,
    walkStep: () => params.walkStep ?? 5,
    walkersPerFrame: () => params.walkersPerFrame ?? 13,
    launchDistance: () => params.launchDistance ?? 45,
    maxWalkSteps: () => params.maxWalkSteps ?? 1500,
  };

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 고정 입자를 그리는 버퍼는 한 번만 만든다 (클릭할 때마다 새로 만들면 메모리가 쌓인다)
    stuckBuffer = p.createGraphics(size, size);
    stuckBuffer.pixelDensity(1);

    // 최초 시뮬레이션 생성
    initSimulation();
  };

  // --------------------------------------------------
  // 시뮬레이션 초기화
  // --------------------------------------------------
  function initSimulation() {
    // 기존 데이터 제거
    stuck = [];
    maxRadius = 1;

    // 버퍼는 지우기만 한다
    stuckBuffer.clear();
    grid = new Map();

    // 중앙에 최초 시드(seed) 생성
    const seed = {
      x: p.width / 2,
      y: p.height / 2,
    };

    stuck.push(seed);
    addToGrid(seed);
    drawStuckPoint(seed);

    p.background(8, 8, 16);

    // 이전에 noLoop 상태였다면 다시 시작
    p.loop();
  }

  // --------------------------------------------------
  // 고정된 입자를 버퍼에 영구적으로 기록
  // --------------------------------------------------
  function drawStuckPoint(pt) {
    let d = p.dist(pt.x, pt.y, p.width / 2, p.height / 2);

    // 중심에서 멀수록 알파 감소
    let alpha = p.map(d, 0, p.width / 2, 255, 80);
    alpha = p.constrain(alpha, 0, 255);

    let c = p.color(accentColor);
    c.setAlpha(alpha);

    stuckBuffer.noStroke();
    stuckBuffer.fill(c);

    // 입자 크기는 응집 반경에 비례
    stuckBuffer.circle(pt.x, pt.y, P.stickRadius() * 1.8);
  }

  // --------------------------------------------------
  // 현재 군집 외곽에서 새로운 walker 생성
  // --------------------------------------------------
  function createWalker() {
    const launchDistance = P.launchDistance();

    let angle = p.random(p.TWO_PI);

    let launchRadius =
      maxRadius + p.random(launchDistance * 0.66, launchDistance * 1.33);

    return {
      x: p.width / 2 + p.cos(angle) * launchRadius,
      y: p.height / 2 + p.sin(angle) * launchRadius,
    };
  }

  p.draw = function () {
    const maxParticles = P.maxParticles();
    const stickRadius = P.stickRadius();
    const walkStep = P.walkStep();
    const walkersPerFrame = P.walkersPerFrame();
    const maxWalkSteps = P.maxWalkSteps();

    // 최대 입자 수에 도달하면 정지
    if (stuck.length >= maxParticles) {
      p.noLoop();
      return;
    }

    // 한 프레임 동안 여러 개의 walker 처리
    for (let w = 0; w < walkersPerFrame; w++) {
      if (stuck.length >= maxParticles) {
        break;
      }

      let walker = createWalker();

      let walking = true;
      let steps = 0;

      // walker가 응집될 때까지 랜덤 워크
      while (walking && steps < maxWalkSteps) {
        walker.x += p.random(-walkStep, walkStep);
        walker.y += p.random(-walkStep, walkStep);

        let distFromCenter = p.dist(
          walker.x,
          walker.y,
          p.width / 2,
          p.height / 2,
        );

        // 너무 멀리 벗어나면 포기
        if (distFromCenter > maxRadius + 300) {
          break;
        }

        // 군집 외곽 근처에서만 충돌 검사
        if (distFromCenter < maxRadius + stickRadius * 2) {
          // 공간 격자에서 주변 칸에 있는 입자만 검사한다
          if (hasStuckNear(walker.x, walker.y, stickRadius)) {
            const newPoint = { x: walker.x, y: walker.y };

            // 새로운 고정 입자 등록
            stuck.push(newPoint);
            addToGrid(newPoint);
            drawStuckPoint(newPoint);

            // 군집 최대 반경 갱신
            if (distFromCenter > maxRadius) {
              maxRadius = distFromCenter;
            }

            walking = false;
          }
        }

        steps++;
      }
    }

    // 버퍼를 화면에 복사
    p.background(8, 8, 16);
    p.image(stuckBuffer, 0, 0);
  };

  // --------------------------------------------------
  // 캔버스를 클릭하면 현재 파라미터 상태로 재시작
  // --------------------------------------------------
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      initSimulation();
    }
  };
}
