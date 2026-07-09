export default function curlNoiseSketch(p, size, params = {}) {
  let particles = [];
  let accentColor;

  // === 파라미터 접근자
  const P = {
    numParticles: () => params.numParticles ?? 400,      // 구조
    stepSize: () => params.stepSize ?? 0.1,              // 실시간
    noiseScale: () => params.noiseScale ?? 0.002,        // 실시간
    curlScale: () => params.curlScale ?? 1.2,            // 실시간
    trailAlpha: () => params.trailAlpha ?? 15,           // 실시간
    pointSize: () => params.pointSize ?? 2.5,            // 실시간
    particleLifeMin: () => params.particleLifeMin ?? 100, // 구조
    particleLifeMax: () => params.particleLifeMax ?? 200, // 구조
  };

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 파티클 초기화
    particles = [];
    const count = P.numParticles();
    const lifeMin = P.particleLifeMin();
    const lifeMax = P.particleLifeMax();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        life: p.random(lifeMin, lifeMax),
      });
    }

    p.background(8, 8, 16);
  };

  // 잠재 함수(Potential Function) 정의 - 노이즈 값을 기반으로 함
  function potential(x, y) {
    const ns = P.noiseScale();
    return p.noise(x * ns, y * ns);
  }

  // Curl Noise 벡터 계산 (2D 회전 방향 벡터)
  function getCurl(x, y) {
    const step = P.stepSize();
    const cs = P.curlScale();

    // 중앙 차분법(Central Difference)을 통한 편미분 계산
    let n1 = potential(x, y + step);
    let n2 = potential(x, y - step);
    let n3 = potential(x + step, y);
    let n4 = potential(x - step, y);

    // Curl = (dF/dy, -dF/dx) -> 비압축성 흐름 형성
    let vx = (n1 - n2) / (2 * step);
    let vy = -(n3 - n4) / (2 * step);

    // 계산된 속도 벡터 스케일링
    let mag = p.dist(0, 0, vx, vy);
    if (mag > 0) {
      vx = (vx / mag) * cs;
      vy = (vy / mag) * cs;
    }

    return { x: vx, y: vy };
  }

  p.draw = function () {
    const trail = P.trailAlpha();
    const psize = P.pointSize();
    const lifeMin = P.particleLifeMin();
    const lifeMax = P.particleLifeMax();

    p.background(8, 8, 16, trail);

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
        pt.life = p.random(lifeMin, lifeMax);
      }

      // 파티클 속도에 기반한 동적 투명도 처리
      let speed = p.dist(0, 0, velocity.x, velocity.y);
      let alpha = p.map(speed, 0, 2, 50, 255);
      alpha = p.constrain(alpha, 0, 255);

      // p5.js의 color 객체를 사용해 어떤 CSS 색상 형식이든 안정적으로 적용
      let c = p.color(accentColor);
      c.setAlpha(alpha);
      p.stroke(c);

      p.strokeWeight(psize);
      p.point(pt.x, pt.y);
    }
  };
}