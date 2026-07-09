export default function ifsFractalSketch(p, size, params = {}) {
  let currentPoint = { x: 0, y: 0 };
  let pointsCount = 0;
  let accentColor;
  let pointColor;

  // 파라미터 접근자 객체
  const P = {
    maxPoints: () => params.maxPoints ?? 40000,
    pointsPerFrame: () => params.pointsPerFrame ?? 300,
    pointSize: () => params.pointSize ?? 1,
    
    // 모양을 극적으로 바꾸는 핵심 파라미터들
    mainShrink: () => params.mainShrink ?? 0.85,   // 주 잎의 축소 비율 (기본: 0.85)
    branchAngle: () => params.branchAngle ?? 0.04,  // 가지의 회전/휨 정도 (기본: 0.04)
    stemHeight: () => params.stemHeight ?? 1.6,     // 줄기에서 잎이 시작되는 높이 (기본: 1.6)
    chaosFactor: () => params.chaosFactor ?? 0,     // 무작위 왜곡 정도 (기본: 0)
  };

  p.setup = function () {
    p.createCanvas(size, size);
    
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    
    pointColor = p.color(accentColor);
    p.background(8, 8, 16);
    
    currentPoint.x = p.random(-1, 1);
    currentPoint.y = p.random(0, 2);
    
    pointsCount = 0;
    p.loop();
  };

  p.draw = function () {
    const maxPts = P.maxPoints();
    const speed = P.pointsPerFrame();
    const size = P.pointSize();
    
    if (pointsCount >= maxPts) {
      p.noLoop();
      return;
    }

    p.stroke(pointColor);
    p.strokeWeight(size);
    pointColor.setAlpha(128);

    // 실시간 파라미터 값 추출
    const shrink = P.mainShrink();
    const angleCoef = P.branchAngle();
    const height = P.stemHeight();
    const chaos = P.chaosFactor();

    for (let i = 0; i < speed; i++) {
      if (pointsCount >= maxPts) break;

      let r = p.random(100);
      let nextX, nextY;
      
      // IFS 변환 규칙 (파라미터화된 계수 적용)
      if (r < 1) {
        // 줄기 (Stem)
        nextX = 0;
        nextY = 0.16 * currentPoint.y;
      } else if (r < 86) {
        // 주 잎 (Main Leaf) - 사용자가 조작하는 핵심 영역
        nextX = shrink * currentPoint.x + angleCoef * currentPoint.y;
        nextY = -angleCoef * currentPoint.x + shrink * currentPoint.y + height;
      } else if (r < 93) {
        // 왼쪽 작은 잎 (Left Branch)
        nextX = 0.2 * currentPoint.x - 0.26 * currentPoint.y;
        nextY = 0.23 * currentPoint.x + 0.22 * currentPoint.y + height;
      } else {
        // 오른쪽 작은 잎 (Right Branch)
        nextX = -0.15 * currentPoint.x + 0.28 * currentPoint.y;
        nextY = 0.26 * currentPoint.x + 0.24 * currentPoint.y + 0.44;
      }

      // Chaos Factor 적용: 결과 좌표에 미세한 노이즈 추가
      if (chaos > 0) {
        nextX += p.random(-chaos, chaos);
        nextY += p.random(-chaos, chaos);
      }

      currentPoint.x = nextX;
      currentPoint.y = nextY;

      // 캔버스 좌표 매핑
      let px = p.map(currentPoint.x, -2.182, 2.655, p.width * 0.1, p.width * 0.9);
      let py = p.map(currentPoint.y, 0, 9.998, p.height * 0.95, p.height * 0.05);

      if (px >= 0 && px <= p.width && py >= 0 && py <= p.height) {
        p.point(px, py);
      }
      
      pointsCount++;
    }
  };
}