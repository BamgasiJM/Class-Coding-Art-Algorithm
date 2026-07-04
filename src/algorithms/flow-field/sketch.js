export default function flowFieldSketch(p, size) {
  let particles = [];
  let cols, rows;
  let scl = 25; // 그리드 셀 크기 (벡터 필드 해상도)
  let time = 0;
  let accentColor;
  let fieldColor;

  p.setup = function () {
    p.createCanvas(size, size);

    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 벡터 필드 표시용 색상 (매우 투명)
    fieldColor = p.color(accentColor);
    fieldColor.setAlpha(20);

    initParticles();
    p.background(8, 8, 16);
  };

  function initParticles() {
    particles = [];
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: 0,
        vy: 0,
        life: p.random(100, 300), // 수명 추가
      });
    }
  }

  // 특정 위치의 flow 각도 계산
  function getFlowAngle(x, y) {
    return (
      p.noise(x * 0.005, y * 0.005, time * 0.2) * p.TWO_PI * 2
    );
  }

  p.draw = function () {
    // 알파 트레일로 부드러운 흔적
    p.background(8, 8, 16, 15);
    time += 0.005;

    // 배경에 벡터 필드 시각화 (흐름장의 구조 보여주기)
    p.stroke(255, 5);
    p.strokeWeight(1);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * scl + scl / 2;
        let y = j * scl + scl / 2;
        let angle = getFlowAngle(x, y);
        let len = scl * 0.3;

        // 화살표 대신 짧은 선으로 방향 표시
        p.line(
          x - p.cos(angle) * len,
          y - p.sin(angle) * len,
          x + p.cos(angle) * len,
          y + p.sin(angle) * len,
        );
      }
    }

    // 파티클 업데이트 및 그리기
    p.stroke(accentColor);
    p.strokeWeight(1.5);

    for (let particle of particles) {
      let angle = getFlowAngle(particle.x, particle.y);

      // 속도 업데이트 (댐핑 적용으로 자연스러운 움직임)
      let targetVx = p.cos(angle) * 2;
      let targetVy = p.sin(angle) * 2;
      particle.vx = particle.vx * 0.9 + targetVx * 0.1; // 댐핑
      particle.vy = particle.vy * 0.9 + targetVy * 0.1;

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;

      // 수명 다하거나 경계 벗어나면 리셋
      if (
        particle.life <= 0 ||
        particle.x < 0 ||
        particle.x > p.width ||
        particle.y < 0 ||
        particle.y > p.height
      ) {
        particle.x = p.random(p.width);
        particle.y = p.random(p.height);
        particle.vx = 0;
        particle.vy = 0;
        particle.life = p.random(100, 300);
      }

      p.point(particle.x, particle.y);
    }
  };
}