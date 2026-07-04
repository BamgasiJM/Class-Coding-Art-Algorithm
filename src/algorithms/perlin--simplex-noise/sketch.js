export default function perlinSimplexNoiseSketch(p, size) {
  let accentColor;

  // 노이즈 스케일
  const scale = 0.08;

  // 시간
  let zoff = 0;

  // 격자 크기
  const cellSize = 18;

  let cols;
  let rows;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    cols = p.ceil(p.width / cellSize);
    rows = p.ceil(p.height / cellSize);

    p.noStroke();
    p.background(8, 8, 16);
  };

  p.draw = function () {
    p.background(8, 8, 16);

    let yoff = 0;

    for (let y = 0; y < rows; y++) {
      let xoff = 0;

      for (let x = 0; x < cols; x++) {
        // 3D Perlin Noise
        const n = p.noise(xoff, yoff, zoff);

        // 밝기
        const brightness = p.map(n, 0, 1, 20, 255);

        // 원 크기
        const radius = p.map(n, 0, 1, 1, cellSize * 1.4);

        // 약간의 위치 흔들림
        const offsetX = p.map(n, 0, 1, -2, 2);

        const offsetY = p.map(n, 0, 1, -2, 2);

        // 명암
        p.fill(brightness, brightness, brightness, 120);

        p.circle(x * cellSize + offsetX, y * cellSize + offsetY, radius);

        // 높은 노이즈 값은 Accent Color 사용
        if (n > 0.58) {
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
    zoff += 0.01;
  };
}
