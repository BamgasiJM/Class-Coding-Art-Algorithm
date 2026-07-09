export default function stipplingSketch(p, size, params = {}) {
  let img;
  let brightness; // Float32Array (size x size)
  let points = [];
  let accentColor;
  let accentR, accentG, accentB;
  let frameCount0 = 0;
  let isReady = false;

  // === 파라미터 접근자
  const P = {
    numPoints: () => params.numPoints ?? 2000,           // 구조
    relaxationStrength: () => params.relaxationStrength ?? 1.0, // 실시간
    maxRelaxationFrames: () => params.maxRelaxationFrames ?? 400, // 실시간
    minRelaxationStrength: () => params.minRelaxationStrength ?? 0.15, // 실시간
    pointRadiusMin: () => params.pointRadiusMin ?? 0.7,  // 실시간
    pointRadiusMax: () => params.pointRadiusMax ?? 2.0,  // 실시간
    cellSize: () => params.cellSize ?? 16,               // 구조
    influenceRadius: () => params.influenceRadius ?? 22,  // 실시간
  };

  p.setup = async function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    const tmp = p.color(accentColor);
    accentR = p.red(tmp);
    accentG = p.green(tmp);
    accentB = p.blue(tmp);

    // 이미지 비동기 로드
    try {
      img = await p.loadImage('/img/image_2.jpg');
      generateBrightnessMapFromImage();
      initPoints();
      isReady = true;
    } catch (err) {
      console.error('이미지 로드 실패:', err);
      // 폴백: 기본 밝기맵으로 초기화
      generateFallbackBrightnessMap();
      initPoints();
      isReady = true;
    }

    p.background(8, 8, 16);
  };

  // 이미지로부터 밝기 맵 생성
  function generateBrightnessMapFromImage() {
    brightness = new Float32Array(size * size);

    if (!img) {
      generateFallbackBrightnessMap();
      return;
    }

    img.loadPixels();
    const imgPixels = img.pixels;
    const imgW = img.width;
    const imgH = img.height;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // 이미지의 해당 좌표로 매핑
        const imgX = p.floor((x / size) * imgW);
        const imgY = p.floor((y / size) * imgH);

        const pixelIdx = (imgY * imgW + imgX) * 4;
        const r = imgPixels[pixelIdx];
        const g = imgPixels[pixelIdx + 1];
        const b = imgPixels[pixelIdx + 2];

        // Grayscale 변환
        const gray = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        brightness[y * size + x] = p.constrain(1 - gray, 0, 1); // (gray, 0, 1) 반전
      }
    }

    img.updatePixels();
  }

  // 폴백 밝기맵 (이미지 로드 실패 시)
  function generateFallbackBrightnessMap() {
    brightness = new Float32Array(size * size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const d = p.sqrt(dx * dx + dy * dy);
        let v = d < r ? 0.88 : 0.25;
        brightness[y * size + x] = p.constrain(v, 0, 1);
      }
    }
  }

  // 밝기→잉크 밀도 변환
  function densityAt(x, y) {
    const ix = p.constrain(p.floor(x), 0, size - 1);
    const iy = p.constrain(p.floor(y), 0, size - 1);
    return 1 - brightness[iy * size + ix];
  }

  // 초기 점 배치
  function initPoints() {
    points = [];
    let attempts = 0;
    const count = P.numPoints();
    const maxAttempts = count * 60;

    while (points.length < count && attempts < maxAttempts) {
      const x = p.random(size);
      const y = p.random(size);
      if (p.random() < densityAt(x, y)) {
        points.push({ x, y });
      }
      attempts++;
    }
    frameCount0 = 0;
  }

  p.draw = function () {
    if (!isReady) {
      p.background(8, 8, 16);
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('이미지 로딩 중...', size / 2, size / 2);
      return;
    }

    p.background(8, 8, 16);
    frameCount0++;

    const maxFrames = P.maxRelaxationFrames();
    const initStrength = P.relaxationStrength();
    const minStrength = P.minRelaxationStrength();
    const relaxStrength = frameCount0 < maxFrames ? initStrength : minStrength;

    relaxStep(relaxStrength);

    // 점 렌더링
    const radiusMin = P.pointRadiusMin();
    const radiusMax = P.pointRadiusMax();

    p.noStroke();
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      const density = densityAt(pt.x, pt.y);
      const radius = p.map(density, 0, 1, radiusMin, radiusMax);
      const alpha = p.map(density, 0, 1, 140, 255);
      p.fill(accentR, accentG, accentB, alpha);
      p.circle(pt.x, pt.y, radius * 2);
    }
  };

  // Lloyd-style relaxation
  function relaxStep(strength) {
    const cellSize = P.cellSize();
    const gridCols = p.ceil(size / cellSize);
    const gridRows = p.ceil(size / cellSize);
    const grid = new Array(gridCols * gridRows);
    for (let i = 0; i < grid.length; i++) grid[i] = [];

    for (let i = 0; i < points.length; i++) {
      const gx = p.constrain(p.floor(points[i].x / cellSize), 0, gridCols - 1);
      const gy = p.constrain(p.floor(points[i].y / cellSize), 0, gridRows - 1);
      grid[gy * gridCols + gx].push(i);
    }

    const repulse = 0.6 * strength;
    const influenceR = P.influenceRadius();
    const influenceR2 = influenceR * influenceR;

    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const gx = p.constrain(p.floor(a.x / cellSize), 0, gridCols - 1);
      const gy = p.constrain(p.floor(a.y / cellSize), 0, gridRows - 1);
      let fx = 0;
      let fy = 0;

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const nx = gx + ox;
          const ny = gy + oy;
          if (nx < 0 || ny < 0 || nx >= gridCols || ny >= gridRows) continue;
          const cell = grid[ny * gridCols + nx];
          for (let k = 0; k < cell.length; k++) {
            const j = cell[k];
            if (j === i) continue;
            const b = points[j];
            let dx = a.x - b.x;
            let dy = a.y - b.y;
            let d2 = dx * dx + dy * dy;
            if (d2 < 0.5) {
              dx = p.random(-0.5, 0.5);
              dy = p.random(-0.5, 0.5);
              d2 = dx * dx + dy * dy;
            }
            if (d2 < influenceR2) {
              const f = 1 / d2;
              fx += dx * f;
              fy += dy * f;
            }
          }
        }
      }

      const density = densityAt(a.x, a.y);
      const scale = p.map(density, 0, 1, 0.4, 1.6);

      a.x += fx * repulse * scale;
      a.y += fy * repulse * scale;

      a.x = p.constrain(a.x, 2, size - 2);
      a.y = p.constrain(a.y, 2, size - 2);
    }
  }

  p.mousePressed = function () {
    if (p.mouseX >= 0 && p.mouseX < size && p.mouseY >= 0 && p.mouseY < size) {
      initPoints();
    }
  };
}