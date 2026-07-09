export default function trigonometricWaveSketch(p, size, params = {}) {
  let accentColor;
  let accentRGB;
  let time = 0;

  // === 파라미터 접근자
  const P = {
    waveCount: () => params.waveCount ?? 50,           // 구조
    samples: () => params.samples ?? 120,               // 구조
    timeSpeed: () => params.timeSpeed ?? 0.008,        // 실시간
    fmBaseFreq: () => params.fmBaseFreq ?? 2.5,        // 실시간
    fmModulation: () => params.fmModulation ?? 0.5,    // 실시간
    frequencyModulation: () => params.frequencyModulation ?? 3.2, // 실시간
    baseAmplitude: () => params.baseAmplitude ?? 12,   // 실시간
    centerAmplitudeBoost: () => params.centerAmplitudeBoost ?? 40, // 실시간
  };

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
  };

  p.draw = function () {
    // 알파 트레일로 부드러운 잔상
    p.background(8, 8, 16, 60);

    time += P.timeSpeed();

    // 주파수 모듈레이션: 시간에 따라 천천히 변하는 기본 주파수
    const fmBase = P.fmBaseFreq() + p.sin(time * 0.3) * P.fmModulation();

    // 파동 렌더링 (뒤에서 앞으로: 원근감)
    const waveCount = P.waveCount();
    const samples = P.samples();
    const freqMod = P.frequencyModulation();
    const baseAmp = P.baseAmplitude();
    const centerBoost = P.centerAmplitudeBoost();

    for (let i = 0; i < waveCount; i++) {
      const t = i / (waveCount - 1);
      const depth = t; // 0 = 먼 곳, 1 = 가까운 곳

      // 3D 원근 효과: 먼 파동은 작고, 가까운 파동은 크게
      const perspective = 0.4 + depth * 0.7;

      // 화면상의 y 위치 (원근감 적용)
      const baseY = p.map(t, 0, 1, p.height * 0.05, p.height * 0.95);

      // 가운데로 갈수록 진폭 증가
      const centerWeight = 1 - Math.abs(t - 0.5) * 2;
      const amplitude = (baseAmp + centerWeight * centerBoost) * perspective;

      // 각 Wave마다 다른 주파수
      const frequency = fmBase + t * freqMod;

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
  };
}