export default function marchingSquaresSketch(p, size, params = {}) {
  let accentRGB = { r: 255, g: 255, b: 255 };
  let zOff = 0;

  // 파라미터 접근자 (기존과 동일)
  const P = {
    gridScale: () => params.gridScale ?? 16,
    noiseScale: () => params.noiseScale ?? 0.2,
    threshold: () => params.threshold ?? 0.5,
    lineWeight: () => params.lineWeight ?? 1.5,
    timeSpeed: () => params.timeSpeed ?? 0.003,
  };

  const TABLE = [
    [],            [[3,0]],       [[0,1]],       [[3,1]],
    [[1,2]],       [[0,1],[2,3]], [[0,2]],       [[3,2]],
    [[2,3]],       [[0,2]],       [[0,3],[1,2]], [[1,2]],
    [[1,3]],       [[0,1]],       [[3,2]],       []
  ];

  function field(x, y, z) {
    return p.noise(x * P.noiseScale(), y * P.noiseScale(), z);
  }

  function lerpThresh(a, b, iso) {
    if (p.abs(b - a) < 0.0001) return 0.5;
    let t = (iso - a) / (b - a);
    return p.constrain(t, 0, 1);
  }

  p.setup = function () {
    p.createCanvas(size, size);
    const accentHex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    const ac = p.color(accentHex);
    accentRGB = { r: p.red(ac), g: p.green(ac), b: p.blue(ac) };
    p.background(8, 8, 16);
  };

  p.draw = function () {
    p.background(8, 8, 16); 
    
    const gs = P.gridScale();
    const cols = p.floor(p.width / gs);
    const rows = p.floor(p.height / gs);
    zOff += P.timeSpeed();

    const baseThreshold = P.threshold();
    const baseWeight = P.lineWeight();

    // 1. 필드 배경 시각화 (노이즈 값을 옅게 채워 지형 느낌 부여)
    p.noStroke();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = field(x, y, zOff);
        // 노이즈 값(0~1)을 투명도(0~25)로 매핑하여 배경에 채움
        p.fill(accentRGB.r, accentRGB.g, accentRGB.b, val * 25);
        p.rect(x * gs, y * gs, gs, gs);
      }
    }

    // 2. 다중 등고선 정의 (기준값에서 ±0.05, ±0.10 간격)
    const contourLevels = [
      { offset: 0,    weightMult: 1.0, alphaMult: 1.0 }, // 메인 등고선
      { offset: -0.05, weightMult: 0.6, alphaMult: 0.6 },
      { offset: 0.05,  weightMult: 0.6, alphaMult: 0.6 },
      { offset: -0.10, weightMult: 0.3, alphaMult: 0.3 },
      { offset: 0.10,  weightMult: 0.3, alphaMult: 0.3 },
    ];

    // 3. 각 레벨별로 등고선 그리기
    for (const level of contourLevels) {
      const iso = p.constrain(baseThreshold + level.offset, 0.01, 0.99);
      const weight = baseWeight * level.weightMult;
      const baseAlpha = 255 * level.alphaMult;

      p.strokeWeight(weight);

      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const v00 = field(x,     y,     zOff);
          const v10 = field(x + 1, y,     zOff);
          const v11 = field(x + 1, y + 1, zOff);
          const v01 = field(x,     y + 1, zOff);

          // 높이 기반 투명도 (셀의 평균 높이가 높을수록 뚜렷하게)
          const avgVal = (v00 + v10 + v11 + v01) / 4;
          const alpha = baseAlpha * p.map(avgVal, 0, 1, 0.4, 1.0);
          p.stroke(accentRGB.r, accentRGB.g, accentRGB.b, alpha);

          const idx = (v00 > iso ? 1 : 0) |
                      (v10 > iso ? 2 : 0) |
                      (v11 > iso ? 4 : 0) |
                      (v01 > iso ? 8 : 0);

          let segs = TABLE[idx];
          if (segs.length === 0) continue;

          if (idx === 5 || idx === 10) {
            const center = field(x + 0.5, y + 0.5, zOff);
            if (idx === 5) {
              segs = center > iso ? [[0,1],[2,3]] : [[0,3],[1,2]];
            } else if (idx === 10) {
              segs = center > iso ? [[0,3],[1,2]] : [[0,1],[2,3]];
            }
          }

          const pts = [
            [x + lerpThresh(v00, v10, iso), y],
            [x + 1, y + lerpThresh(v10, v11, iso)],
            [x + 1 - lerpThresh(v11, v01, iso), y + 1],
            [x, y + 1 - lerpThresh(v01, v00, iso)]
          ];

          for (const [a, b] of segs) {
            const x0 = pts[a][0] * gs;
            const y0 = pts[a][1] * gs;
            const x1 = pts[b][0] * gs;
            const y1 = pts[b][1] * gs;
            p.line(x0, y0, x1, y1);
          }
        }
      }
    }
  };
}