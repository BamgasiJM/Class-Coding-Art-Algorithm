export default function phyllotaxisSketch(p, size) {
  let accentColor;

  // 황금각 (137.5°)
  const goldenAngle = p.PI * (3 - p.sqrt(5));

  // 생성할 점 개수
  const pointCount = 850;

  // 점 데이터
  let points = [];

  // 시간
  let time = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    buildPattern();

    p.background(8, 8, 16);
    p.noStroke();
  };

  p.draw = function () {
    p.background(8, 8, 16, 26);

    time += 0.01;

    p.push();
    p.translate(p.width * 0.5, p.height * 0.5);

    // 전체가 천천히 회전
    p.rotate(time * 0.12);

    for (const point of points) {
      // 중심에서 멀어질수록 작은 진동
      const offset = p.sin(time * 2 + point.index * 0.05) * point.wave;
      const x = p.cos(point.angle) * (point.radius + offset);
      const y = p.sin(point.angle) * (point.radius + offset);
      const size = 1.5 + point.scale; // 바깥으로 갈수록 조금 더 크게

      p.noStroke();
      p.fill(accentColor);

      p.circle(x, y, size);

      // 중심에 가까운 점만 연결
      if (point.index < 220) {
        const nx = p.cos(point.angle + 0.15) * (point.radius + offset);

        const ny = p.sin(point.angle + 0.15) * (point.radius + offset);

        p.stroke(accentColor);
        p.strokeWeight(0.4);
        p.line(x, y, nx, ny);
      }
    }

    p.pop();
  };

  /**
   * 황금각을 이용한 점 배치
   */
  function buildPattern() {
    points = [];

    const spacing = 7;

    for (let i = 0; i < pointCount; i++) {
      const radius = spacing * p.sqrt(i);
      const angle = i * goldenAngle;

      points.push({
        index: i,
        radius,
        angle,
        wave: p.map(radius, 0, p.width * 0.5, 0, 5),
        scale: p.map(radius, 0, p.width * 0.5, 0.8, 3),
      });
    }
  }
}
