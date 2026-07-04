export default function attractorSystemSketch(p, size) {
  let particles = [];
  let attractor;
  let accentColor;
  let time = 0;

  p.setup = function () {
    p.createCanvas(size, size);
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    for (let i = 0; i < 600; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: 0,
        vy: 0,
      });
    }

    attractor = { x: p.width / 2, y: p.height / 2 };
    p.background(8, 8, 16);
  };

  p.draw = function () {
    p.background(8, 8, 16);
    time += 0.02;

    // 끌개(Attractor)가 리사주 곡선을 그리며 이동
    attractor.x = p.width / 2 + p.sin(time * 0.7) * p.width * 0.3;
    attractor.y = p.height / 2 + p.sin(time * 1.1) * p.height * 0.3;

    // 끌개 시각화
    p.fill(accentColor);
    p.noStroke();
    p.ellipse(attractor.x, attractor.y, 20, 20);

    // 파티클 업데이트 및 중력 적용
    for (let pt of particles) {
      let dx = attractor.x - pt.x;
      let dy = attractor.y - pt.y;
      let d = p.sqrt(dx * dx + dy * dy);
      d = p.constrain(d, 10, 500); // 무한대 발산 방지

      // 거리의 역제곱에 비례하는 인력
      let force = 100 / (d * d);
      pt.vx += (dx / d) * force;
      pt.vy += (dy / d) * force;

      pt.vx *= 0.96; // 댐핑 효과
      pt.vy *= 0.96;
      pt.x += pt.vx;
      pt.y += pt.vy;

      p.stroke(accentColor);
      p.strokeWeight(1.5);
      p.point(pt.x, pt.y);
    }
  };
}
