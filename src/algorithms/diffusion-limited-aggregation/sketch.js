export default function diffusionLimitedAggregationSketch(p, size) {
  let stuck = []; // 응집되어 고정된 입자들 (트리 구조)
  let stuckBuffer; // 고정 입자를 누적하는 오프스크린 버퍼
  let accentColor;
  let maxRadius = 1; // 현재 패턴의 최대 반지름 (walker 생성 범위에 사용)

  // 성능 및 시각적 균형을 위한 파라미터
  let maxParticles = 1500; // 총 고정 입자 수 상한
  let stickRadius = 6; // 응집 판정 반경
  let walkStep = 5; // 랜덤 워크 보폭
  let walkersPerFrame = 13; // 매 프레임 생성되는 유동 입자 수

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 오프스크린 버퍼 생성 (고정 입자를 누적 저장 → 매 프레임 재그리기 방지)
    stuckBuffer = p.createGraphics(size, size);
    stuckBuffer.pixelDensity(1);

    // 중심에 최초 시드(seed) 입자 배치
    let seed = { x: p.width / 2, y: p.height / 2 };
    stuck.push(seed);
    drawStuckPoint(seed);

    p.background(8, 8, 16);
  };

  // 고정 입자를 버퍼에 영구적으로 기록 (거리 기반 알파로 깊이감 부여)
  function drawStuckPoint(pt) {
    let d = p.dist(pt.x, pt.y, p.width / 2, p.height / 2);
    let alpha = p.map(d, 0, p.width / 2, 255, 80);
    alpha = p.constrain(alpha, 0, 255);

    let c = p.color(accentColor);
    c.setAlpha(alpha);
    stuckBuffer.noStroke();
    stuckBuffer.fill(c);
    stuckBuffer.circle(pt.x, pt.y, stickRadius * 1.8);
  }

  // walker(유동 입자) 생성: 현재 패턴 외곽에서 시작
  function createWalker() {
    let angle = p.random(p.TWO_PI);
    let launchRadius = maxRadius + p.random(30, 60);
    return {
      x: p.width / 2 + p.cos(angle) * launchRadius,
      y: p.height / 2 + p.sin(angle) * launchRadius,
    };
  }

  p.draw = function () {
    // 상한 도달 시 시뮬레이션 정지
    if (stuck.length >= maxParticles) {
      p.noLoop();
    }

    // 매 프레임 여러 walker 처리
    for (let w = 0; w < walkersPerFrame; w++) {
      if (stuck.length >= maxParticles) break;

      let walker = createWalker();
      let walking = true;
      let steps = 0;
      let maxSteps = 1500; // 무한 루프 방지용 안전장치

      // walker가 stuck에 붙을 때까지 랜덤 워크
      while (walking && steps < maxSteps) {
        walker.x += p.random(-walkStep, walkStep);
        walker.y += p.random(-walkStep, walkStep);

        let distFromCenter = p.dist(
          walker.x,
          walker.y,
          p.width / 2,
          p.height / 2,
        );

        // 너무 멀리 벗어나면 포기하고 다음 walker로
        if (distFromCenter > maxRadius + 300) break;

        // 🌟 가속화: 패턴 외곽에 접근한 경우에만 충돌 검사 수행
        if (distFromCenter < maxRadius + stickRadius * 2) {
          for (let s of stuck) {
            let dx = walker.x - s.x;
            let dy = walker.y - s.y;

            // 🌟 가속화: bounding box로 빠른 1차 필터링
            if (Math.abs(dx) < stickRadius && Math.abs(dy) < stickRadius) {
              let dSq = dx * dx + dy * dy;
              if (dSq < stickRadius * stickRadius) {
                // 응집 성공 → 고정 입자로 등록
                stuck.push({ x: walker.x, y: walker.y });
                drawStuckPoint({ x: walker.x, y: walker.y });

                if (distFromCenter > maxRadius) {
                  maxRadius = distFromCenter;
                }
                walking = false;
                break;
              }
            }
          }
        }
        steps++;
      }
    }

    // 매 프레임 배경 초기화 후 버퍼를 한 번에 복사 (깜빡임 방지)
    p.background(8, 8, 16);
    p.image(stuckBuffer, 0, 0);
  };
}