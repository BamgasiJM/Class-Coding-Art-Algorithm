export default function perlinSimplexNoiseSketch(
  p,
  size,
  params = {},
) {
  let accentColor;

  // 시간
  let zoff = 0;

  // 격자 크기
  let cellSize;
  let cols;
  let rows;

  const P = {
    cellSize: () => params.cellSize ?? 18,
    noiseScale: () => params.noiseScale ?? 0.08,
    timeSpeed: () => params.timeSpeed ?? 0.01,
    threshold: () => params.threshold ?? 0.58,
    radiusMultiplier: () =>
      params.radiusMultiplier ?? 1.4,
    jitter: () => params.jitter ?? 2,
  };

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(
      document.documentElement,
    )
      .getPropertyValue("--accent")
      .trim();

    cellSize = P.cellSize();

    cols = p.ceil(p.width / cellSize);
    rows = p.ceil(p.height / cellSize);

    p.noStroke();
    p.background(8, 8, 16);
  };

  p.draw = function () {
    p.background(8, 8, 16);

    let yoff = 0;
    const scale = P.noiseScale();

    for (let y = 0; y < rows; y++) {
      let xoff = 0;

      for (let x = 0; x < cols; x++) {
        // 3D Perlin Noise
        const n = p.noise(
          xoff,
          yoff,
          zoff,
        );

        // 밝기
        const brightness = p.map(
          n,
          0,
          1,
          20,
          255,
        );

        // 원 크기
        const radius = p.map(
          n,
          0,
          1,
          1,
          cellSize *
            P.radiusMultiplier(),
        );

        // 위치 흔들림
        const offsetX = p.map(
          n,
          0,
          1,
          -P.jitter(),
          P.jitter(),
        );

        const offsetY = p.map(
          n,
          0,
          1,
          -P.jitter(),
          P.jitter(),
        );

        p.fill(
          brightness,
          brightness,
          brightness,
          120,
        );

        p.circle(
          x * cellSize + offsetX,
          y * cellSize + offsetY,
          radius,
        );

        // 높은 노이즈 값은 Accent Color 사용
        if (n > P.threshold()) {
          p.fill(accentColor);

          p.circle(
            x * cellSize + offsetX,
            y * cellSize + offsetY,
            radius * 0.55,
          );
        }

        xoff += scale;
      }

      yoff += scale;
    }

    // 시간 변화
    zoff += P.timeSpeed();
  };
}