export default function curlNoiseSketch(p, size) {
  let particles = [];
  let numParticles = 400;
  let stepSize = 0.1; // 수치 미분을 위한 미소 변화량
  let accentColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 파티클 초기화
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        life: p.random(100, 200),
      });
    }

    p.background(8, 8, 16);
  };

  // 잠재 함수(Potential Function) 정의 - 노이즈 값을 기반으로 함
  function potential(x, y) {
    return p.noise(x * 0.002, y * 0.002);
  }

  // Curl Noise 벡터 계산 (2D 회전 방향 벡터)
  function getCurl(x, y) {
    // 중앙 차분법(Central Difference)을 통한 편미분 계산
    let n1 = potential(x, y + stepSize);
    let n2 = potential(x, y - stepSize);
    let n3 = potential(x + stepSize, y);
    let n4 = potential(x - stepSize, y);

    // Curl = (dF/dy, -dF/dx) -> 비압축성 흐름 형성
    let vx = (n1 - n2) / (2 * stepSize);
    let vy = -(n3 - n4) / (2 * stepSize);

    // 계산된 속도 벡터 스케일링
    let mag = p.dist(0, 0, vx, vy);
    if (mag > 0) {
      vx = (vx / mag) * 1.2;
      vy = (vy / mag) * 1.2;
    }

    return { x: vx, y: vy };
  }

  p.draw = function () {
    p.background(8, 8, 16, 15); // 부드러운 흔적을 위한 알파 트레일 효과

    for (let i = 0; i < particles.length; i++) {
      let pt = particles[i];

      // Curl Noise 필드로부터 속도 벡터 추출
      let velocity = getCurl(pt.x, pt.y);

      pt.x += velocity.x;
      pt.y += velocity.y;
      pt.life -= 1;

      // 화면 경계 처리 및 수명 다한 파티클 재배치
      if (
        pt.x < 0 ||
        pt.x > p.width ||
        pt.y < 0 ||
        pt.y > p.height ||
        pt.life <= 0
      ) {
        pt.x = p.random(p.width);
        pt.y = p.random(p.height);
        pt.life = p.random(100, 200);
      }

      // 파티클 속도에 기반한 동적 투명도 처리
      let speed = p.dist(0, 0, velocity.x, velocity.y);
      let alpha = p.map(speed, 0, 2, 50, 255);
      alpha = p.constrain(alpha, 0, 255);

      // p5.js의 color 객체를 사용해 어떤 CSS 색상 형식이든 안정적으로 적용
      let c = p.color(accentColor);
      c.setAlpha(alpha);
      p.stroke(c);

      p.strokeWeight(2.5);
      p.point(pt.x, pt.y);
    }
  };
}
