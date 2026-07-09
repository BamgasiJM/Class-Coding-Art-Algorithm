export default function phyllotaxisSketch(p, size, params = {}) {
  let accentColor;
  let accentRGB;

  let points = [];

  // === 파라미터 접근자
  const P = {
    pointCount: () => params.pointCount ?? 900,      // 구조
    spacing: () => params.spacing ?? 8,               // 구조
    goldenAngle: () => params.goldenAngle ?? 137.5,   // 실시간 (도 단위)
    maxPointSize: () => params.maxPointSize ?? 7.5,   // 실시간
    minPointSize: () => params.minPointSize ?? 2,     // 실시간
    maxAlpha: () => params.maxAlpha ?? 200,           // 실시간
    minAlpha: () => params.minAlpha ?? 50,            // 실시간
    brightnessFade: () => params.brightnessFade ?? 0.5, // 실시간
  };

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

    const count = P.pointCount();
    const sp = P.spacing();

    for (let i = 0; i < count; i++) {
      const radius = sp * p.sqrt(i);

      points.push({
        index: i,
        radius,
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
    const sp = P.spacing();
    const count = P.pointCount();
    const maxPointSize = P.maxPointSize();
    const minPointSize = P.minPointSize();
    const maxAlpha = P.maxAlpha();
    const minAlpha = P.minAlpha();
    const brightFade = P.brightnessFade();

    // 현재 황금각을 도에서 라디안으로 변환
    const angleStepDegrees = P.goldenAngle();
    const angleStep = angleStepDegrees * p.PI / 180;

    const maxRadius = sp * p.sqrt(count);

    for (let pt of points) {
      // 각도를 실시간으로 계산
      const angle = pt.index * angleStep;
      let x = p.cos(angle) * pt.radius;
      let y = p.sin(angle) * pt.radius;

      // 거리에 따른 밝기 계산
      let distRatio = p.constrain(pt.radius / maxRadius, 0, 1);
      let brightness = 1 - distRatio * brightFade;

      let alpha = p.map(distRatio, 0, 1, maxAlpha, minAlpha);

      // 크기를 draw에서 실시간 계산
      let pointSize = p.map(pt.index, 0, count, maxPointSize, minPointSize);

      let cr = accentRGB.r * brightness;
      let cg = accentRGB.g * brightness;
      let cb = accentRGB.b * brightness;

      p.fill(cr, cg, cb, alpha);
      p.circle(x, y, pointSize);
    }

    p.pop();
  };
}