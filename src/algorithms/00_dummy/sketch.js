export default function trigonometricWaveSketch(p, size) {
  let accentColor;
  let time = 0;

  // 웨이브 설정
  const waveCount = 90;
  const samples = 140;

  p.setup = function () {
    p.createCanvas(size, size);

    // CSS Accent Color 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    p.background(8, 8, 16);
    p.noFill();
    p.strokeCap(p.ROUND);
    p.strokeJoin(p.ROUND);
  };

  p.draw = function () {
    // 잔상이 남도록 약한 알파값으로 배경을 다시 그림
    p.background(8, 8, 16, 28);

    time += 0.015;

    for (let i = 0; i < waveCount; i++) {
      // 0 ~ 1
      const t = i / (waveCount - 1);

      // 화면상의 y 위치
      const baseY = p.map(t, 0, 1, 40, p.height - 40);

      // 가운데로 갈수록 진폭 증가
      const centerWeight = 1 - Math.abs(t - 0.5) * 2;

      const amplitude = 10 + centerWeight * 34;

      // 각 Wave마다 다른 주파수
      const frequency = 1.2 + t * 3.6;

      // 위상차
      const phase = time * (0.8 + t);

      // 선 두께
      const weight = 0.6 + centerWeight * 1.8;

      p.stroke(accentColor);
      p.strokeWeight(weight);

      p.beginShape();

      for (let j = 0; j <= samples; j++) {
        const u = j / samples;

        const x = u * p.width;

        // 메인 Sine
        const waveA = p.sin(u * p.TWO_PI * frequency + phase);

        // Cosine 성분 추가
        const waveB = p.cos(u * p.TWO_PI * (frequency * 0.45) - phase * 1.6);

        // 작은 고조파(Harmonic)
        const harmonic =
          p.sin(u * p.TWO_PI * frequency * 2.2 + phase * 0.5) * 0.18;

        // 최종 높이
        const y = baseY + (waveA * 0.72 + waveB * 0.28 + harmonic) * amplitude;

        p.vertex(x, y);
      }

      p.endShape();
    }

    // 중앙에 작은 진동 점 추가
    drawOscillator();
  };

  /**
   * 중앙의 삼각함수 궤도를 그리는 작은 장식
   */
  function drawOscillator() {
    p.push();

    p.translate(p.width * 0.5, p.height * 0.5);

    p.stroke(accentColor);
    p.strokeWeight(1.5);
    p.noFill();

    p.beginShape();

    for (let a = 0; a < p.TWO_PI * 2; a += 0.08) {
      const r = 32 + p.sin(a * 5 + time * 2) * 8;

      const x = p.cos(a + time) * r;

      const y = p.sin(a * 2 - time * 1.3) * r * 0.55;

      p.vertex(x, y);
    }

    p.endShape(p.CLOSE);

    p.pop();
  }
}
