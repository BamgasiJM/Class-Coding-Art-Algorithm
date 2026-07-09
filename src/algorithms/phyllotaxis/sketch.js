export default function phyllotaxisSketch(p, size) {
  let accentColor;
  let accentRGB;

  // 황금각 (137.5°)
  // const goldenAngle = p.PI * (3 - p.sqrt(5));
  const goldenAngle = p.PI * (137.5 / 180);

  // 파라미터
  const pointCount = 1000;
  const spacing = 9;

  let points = [];

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // accent 색상을 RGB로 파싱
    let c = p.color(accentColor);
    accentRGB = {
      r: p.red(c),
      g: p.green(c),
      b: p.blue(c),
    };

    buildPoints();
    p.background(8, 8, 16);
  };

  // === 황금각 기반 포인트 생성
  function buildPoints() {
    points = [];

    for (let i = 0; i < pointCount; i++) {
      const radius = spacing * p.sqrt(i);
      const angle = i * goldenAngle;

      points.push({
        index: i,
        radius,
        angle,
        size: p.map(i, 0, pointCount, 7.5, 2),
      });
    }
  }

  p.draw = function () {
    p.background(8, 8, 16);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.noStroke();

    // === 점 렌더링
    // 중심→외곽으로의 밝기 그라디언트로 공간감 표현
    for (let pt of points) {
      let x = p.cos(pt.angle) * pt.radius;
      let y = p.sin(pt.angle) * pt.radius;

      // 거리에 따른 밝기 계산
      let maxRadius = spacing * p.sqrt(pointCount);
      let distRatio = p.constrain(pt.radius / maxRadius, 0, 1);
      let brightness = 1 - distRatio * 0.5;

      let alpha = p.map(distRatio, 0, 1, 200, 50);

      let cr = accentRGB.r * brightness;
      let cg = accentRGB.g * brightness;
      let cb = accentRGB.b * brightness;

      p.fill(cr, cg, cb, alpha);
      p.circle(x, y, pt.size);
    }

    p.pop();
  };
}