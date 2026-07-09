export default function circlePackingSketch(p, size, params = {}) {
  let circles = [];
  let accentColor;

  // === 파라미터 접근자
  const P = {
    maxCircles: () => params.maxCircles ?? 150,            // 구조
    attemptsPerFrame: () => params.attemptsPerFrame ?? 5,  // 구조
    growthRate: () => params.growthRate ?? 0.5,            // 실시간
    initialRadius: () => params.initialRadius ?? 1,        // 구조
    minDistance: () => params.minDistance ?? 2,            // 실시간
    maxRadiusForWeight: () => params.maxRadiusForWeight ?? 30, // 실시간
    lineWeightMax: () => params.lineWeightMax ?? 5.5,      // 실시간
  };

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    circles = [];
    p.background(8, 8, 16);
  };

  function createNewCircle() {
    let x = p.random(p.width);
    let y = p.random(p.height);
    const minDist = P.minDistance();

    for (let c of circles) {
      let d = p.dist(x, y, c.x, c.y);
      if (d < c.r + minDist) {
        return null;
      }
    }

    const initR = P.initialRadius();
    return { x, y, r: initR, growing: true };
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // 1. 새로운 원 배치 시도
    const maxC = P.maxCircles();
    const attPerFrame = P.attemptsPerFrame();

    if (circles.length < maxC) {
      for (let i = 0; i < attPerFrame; i++) {
        let newC = createNewCircle();
        if (newC !== null) {
          circles.push(newC);
        }
      }
    }

    // 2. 원의 크기 확장 및 충돌 처리
    const growthR = P.growthRate();
    const minDist = P.minDistance();

    for (let c of circles) {
      if (c.growing) {
        // 경계 충돌 검사
        if (
          c.x - c.r <= 0 ||
          c.x + c.r >= p.width ||
          c.y - c.r <= 0 ||
          c.y + c.r >= p.height
        ) {
          c.growing = false;
        } else {
          // 다른 원과의 충돌 검사
          for (let other of circles) {
            if (c !== other) {
              let d = p.dist(c.x, c.y, other.x, other.y);
              if (d < c.r + other.r + minDist) {
                c.growing = false;
                break;
              }
            }
          }
        }

        // 성장
        if (c.growing) {
          c.r += growthR;
        }
      }
    }

    // 3. 원 렌더링
    const maxRForWeight = P.maxRadiusForWeight();
    const lineWMax = P.lineWeightMax();

    p.noFill();
    p.stroke(accentColor);
    for (let c of circles) {
      let weight = p.map(c.r, 1, maxRForWeight, 0.4, lineWMax);
      p.strokeWeight(weight);
      p.circle(c.x, c.y, c.r * 2);
    }
  };
}