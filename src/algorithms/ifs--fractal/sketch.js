export default function ifsFractalSketch(p, size) {
  let currentPoint = { x: 0, y: 0 };
  let pointsCount = 0;
  let maxPoints = 40000;
  let pointsPerFrame = 300;
  let accentColor;
  let pointColor;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 투명도가 적용된 색상 객체 미리 생성
    pointColor = p.color(accentColor);
    pointColor.setAlpha(128); // (50% 투명도)

    p.background(8, 8, 16);

    currentPoint.x = p.random(-1, 1);
    currentPoint.y = p.random(0, 2);
  };

  p.draw = function () {
    if (pointsCount >= maxPoints) {
      p.noLoop();
      return;
    }

    p.stroke(pointColor);
    p.strokeWeight(1);

    for (let i = 0; i < pointsPerFrame; i++) {
      let r = p.random(100);
      let nextX, nextY;

      if (r < 1) {
        nextX = 0;
        nextY = 0.16 * currentPoint.y;
      } else if (r < 86) {
        nextX = 0.85 * currentPoint.x + 0.04 * currentPoint.y;
        nextY = -0.04 * currentPoint.x + 0.85 * currentPoint.y + 1.6;
      } else if (r < 93) {
        nextX = 0.2 * currentPoint.x - 0.26 * currentPoint.y;
        nextY = 0.23 * currentPoint.x + 0.22 * currentPoint.y + 1.6;
      } else {
        nextX = -0.15 * currentPoint.x + 0.28 * currentPoint.y;
        nextY = 0.26 * currentPoint.x + 0.24 * currentPoint.y + 0.44;
      }

      currentPoint.x = nextX;
      currentPoint.y = nextY;

      let px = p.map(
        currentPoint.x,
        -2.182,
        2.655,
        p.width * 0.1,
        p.width * 0.9,
      );
      let py = p.map(
        currentPoint.y,
        0,
        9.998,
        p.height * 0.95,
        p.height * 0.05,
      );

      if (px >= 0 && px <= p.width && py >= 0 && py <= p.height) {
        p.point(px, py);
      }

      pointsCount++;
    }
  };
}