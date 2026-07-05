export default function trigonometricWaveSketch(p, size) {
  let accentColor;
  let accentRGB;
  let time = 0;

  // 웨이브 설정
  const waveCount = 60;
  const samples = 120;

  // 마우스 인터랙션용 보간값
  let mouseInfluenceX = 0;
  let mouseInfluenceY = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    let c = p.color(accentColor);
    accentRGB = {
      r: p.red(c),
      g: p.green(c),
      b: p.blue(c),
    };

    p.background(8, 8, 16);
    p.strokeCap(p.ROUND);
    p.strokeJoin(p.ROUND);

    p.mousePressed = function () {
      time = 0; // 클릭 시 시간 리셋
    };
  };

  p.draw = function () {
    // 알파 트레일로 부드러운 잔상
    p.background(8, 8, 16, 30);

    time += 0.012;

    // 마우스 위치 보간 (부드러운 반응)
    let targetX = p.map(p.mouseX, 0, p.width, -1, 1);
    let targetY = p.map(p.mouseY, 0, p.height, -1, 1);
    targetX = p.constrain(targetX, -1, 1);
    targetY = p.constrain(targetY, -1, 1);
    mouseInfluenceX = p.lerp(mouseInfluenceX, targetX, 0.05);
    mouseInfluenceY = p.lerp(mouseInfluenceY, targetY, 0.05);

    // 주파수 모듈레이션: 시간에 따라 천천히 변하는 기본 주파수
    let fmBase = 1.5 + p.sin(time * 0.3) * 0.5;

    // 1. 파동 렌더링 (뒤에서 앞으로: 원근감)
    for (let i = 0; i < waveCount; i++) {
      const t = i / (waveCount - 1);
      const depth = t; // 0 = 먼 곳, 1 = 가까운 곳

      // 3D 원근 효과: 먼 파동은 작고, 가까운 파동은 크게
      const perspective = 0.3 + depth * 0.7;

      // 화면상의 y 위치 (원근감 적용)
      const baseY = p.map(t, 0, 1, p.height * 0.15, p.height * 0.85);

      // 가운데로 갈수록 진폭 증가 + 마우스 Y 영향
      const centerWeight = 1 - Math.abs(t - 0.5) * 2;
      const mouseAmpBoost = 1 + mouseInfluenceY * 0.5;
      const amplitude = (12 + centerWeight * 40) * perspective * mouseAmpBoost;

      // 각 Wave마다 다른 주파수 + 마우스 X 영향 + FM
      const frequency = fmBase + t * 3.2 + mouseInfluenceX * 0.8;

      // 위상차: 각 파동마다 고유 오프셋 + 시간 진행
      const phase = time * (0.6 + t * 0.8) + i * 0.15;

      // 선 두께: 가까운 파동일수록 굵게
      const weight = (0.4 + centerWeight * 1.6) * perspective;

      // 색상: 깊이와 중심 가중치에 따른 알파/밝기 변형
      const alpha = p.map(depth, 0, 1, 40, 220);
      const brightness = 0.6 + centerWeight * 0.4;

      const cr = accentRGB.r * brightness;
      const cg = accentRGB.g * brightness;
      const cb = accentRGB.b * brightness;

      p.stroke(cr, cg, cb, alpha);
      p.strokeWeight(weight);
      p.noFill();

      p.beginShape();

      for (let j = 0; j <= samples; j++) {
        const u = j / samples;
        const x = u * p.width;

        // 메인 Sine (FM 변조 적용)
        const waveA = p.sin(u * p.TWO_PI * frequency + phase);

        // Cosine 성분 (위상 반대)
        const waveB = p.cos(u * p.TWO_PI * (frequency * 0.45) - phase * 1.6);

        // 고조파 (리듬감 추가)
        const harmonic =
          p.sin(u * p.TWO_PI * frequency * 2.2 + phase * 0.5) * 0.2;

        // 3D 뒤틀림 효과: x 위치에 따라 y가 약간 비틀림
        const twist = p.sin(u * p.TWO_PI * 0.5 + time * 0.4) * 4 * perspective;

        // 최종 y 위치
        const y = baseY + (waveA * 0.72 + waveB * 0.28 + harmonic) * amplitude + twist;

        p.vertex(x, y);
      }

      p.endShape();
    }

    // 2. 중앙 리사주 오실레이터 (강화된 버전)
    drawLissajousOscillator();
  };

  /**
   * 중앙의 리사주 궤적 오실레이터
   * - 정수비 주파수로 리사주 곡선 생성
   * - 감쇠 효과로 꼬리처럼 늘어남
   */
  function drawLissajousOscillator() {
    p.push();
    p.translate(p.width * 0.5, p.height * 0.5);

    const cx = p.width * 0.5;
    const cy = p.height * 0.5;

    // 리사주 파라미터 (정수비)
    const freqA = 3;
    const freqB = 4;
    const radius = 50 + p.sin(time * 0.5) * 10;

    // 궤적을 여러 단계로 그려 꼬리 효과
    const trailSteps = 80;
    p.noFill();

    for (let k = 0; k < trailSteps; k++) {
      const trailT = k / trailSteps;
      const a = trailT * p.TWO_PI * 3;

      // 감쇠: 꼬리로 갈수록 작아지고 투명해짐
      const decay = 1 - trailT;
      const r = radius * (0.3 + decay * 0.7);

      const x = p.cos(a * freqA + time * 1.2) * r;
      const y = p.sin(a * freqB - time * 0.9) * r * 0.7;

      // 다음 점
      const nextT = (k + 1) / trailSteps;
      const nextA = nextT * p.TWO_PI * 3;
      const nextDecay = 1 - nextT;
      const nextR = radius * (0.3 + nextDecay * 0.7);
      const nx = p.cos(nextA * freqA + time * 1.2) * nextR;
      const ny = p.sin(nextA * freqB - time * 0.9) * nextR * 0.7;

      // 알파: 꼬리로 갈수록 투명
      const alpha = decay * 180;
      const weight = 0.5 + decay * 2;

      p.stroke(accentRGB.r, accentRGB.g, accentRGB.b, alpha);
      p.strokeWeight(weight);
      p.line(x, y, nx, ny);
    }

    // 오실레이터 헤드 (가장 밝은 점)
    const headX = p.cos(time * 1.2 * freqA) * radius;
    const headY = p.sin(-time * 0.9 * freqB) * radius * 0.7;

    // 글로우
    p.noStroke();
    p.fill(accentRGB.r, accentRGB.g, accentRGB.b, 40);
    p.circle(headX, headY, 20);

    // 핵심 점
    p.fill(accentRGB.r, accentRGB.g, accentRGB.b, 255);
    p.circle(headX, headY, 6);

    p.pop();
  }
}