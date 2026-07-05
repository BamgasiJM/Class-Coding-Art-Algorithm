export default function stipplingSketch(p, size) {
  let points = [];
  let brightness; // Float32Array (size x size), 0=검정(점 많음) ~ 1=흰색(점 적음)
  const NUM_POINTS = 2000;
  let accentColor;
  let accentR, accentG, accentB;
  let frameCount0 = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    const tmp = p.color(accentColor);
    accentR = p.red(tmp);
    accentG = p.green(tmp);
    accentB = p.blue(tmp);

    // 프록시 초상화 밝기 맵 생성
    generateBrightnessMap();

    // 밝기에 비례한 rejection sampling으로 초기 점 배치
    initPoints();

    p.background(8, 8, 16);
  };

  // 밝기 맵: 비네팅 + 얼굴(원) + 눈 2개 + 코 + 입 = 간단한 초상화 실루엣
  function generateBrightnessMap() {
    brightness = new Float32Array(size * size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const d = p.sqrt(dx * dx + dy * dy);
        let v;

        if (d < r) {
          // 얼굴 내부: 밝음
          v = 0.88;

          // 눈 (두 개의 어두운 타원)
          const eyeY = cy - r * 0.15;
          const eyeSpread = r * 0.35;
          const eyeR = r * 0.12;
          const leftEyeD = p.sqrt(
            p.sq(x - (cx - eyeSpread)) + p.sq((y - eyeY) * 1.6),
          );
          const rightEyeD = p.sqrt(
            p.sq(x - (cx + eyeSpread)) + p.sq((y - eyeY) * 1.6),
          );
          if (leftEyeD < eyeR) v = 0.08;
          if (rightEyeD < eyeR) v = 0.08;

          // 눈썹 (눈 위 짧은 호)
          const browY = cy - r * 0.32;
          const browDist = p.abs(y - browY);
          if (
            browDist < r * 0.025 &&
            ((x > cx - eyeSpread - r * 0.12 && x < cx - eyeSpread + r * 0.12) ||
              (x > cx + eyeSpread - r * 0.12 && x < cx + eyeSpread + r * 0.12))
          ) {
            v = p.min(v, 0.25);
          }

          // 코 (세로로 살짝 어두운 띠 + 끝부분 둥글게)
          if (
            p.abs(x - cx) < r * 0.04 &&
            y > cy - r * 0.05 &&
            y < cy + r * 0.15
          ) {
            v *= 0.65;
          }
          const noseTipD = p.sqrt(p.sq(x - cx) + p.sq(y - (cy + r * 0.18)));
          if (noseTipD < r * 0.07) v *= 0.7;

          // 입 (약간 아래로 휘어진 곡선)
          const mouthY = cy + r * 0.35;
          const mouthDx = (x - cx) / (r * 0.3);
          const mouthCurve = mouthY + p.abs(mouthDx) * r * 0.08;
          const mouthDist = p.abs(y - mouthCurve);
          if (p.abs(x - cx) < r * 0.28 && mouthDist < r * 0.028) {
            v = p.min(v, 0.18);
          }

          // 볼 음영 (가장자리로 갈수록 약간 어둡게)
          const faceEdge = p.map(d, r * 0.3, r, 1.0, 0.55, true);
          v *= faceEdge;
        } else {
          // 배경: 어두운 비네팅
          const t = p.min(1, (d - r) / (size * 0.35));
          v = p.map(t, 0, 1, 0.25, 0.05);
        }

        brightness[y * size + x] = p.constrain(v, 0, 1);
      }
    }
  }

  // 밝기→잉크 밀도 변환 (밝을수록 밀도↓, 어두울수록 밀도↑)
  function densityAt(x, y) {
    const ix = p.constrain(p.floor(x), 0, size - 1);
    const iy = p.constrain(p.floor(y), 0, size - 1);
    return 1 - brightness[iy * size + ix];
  }

  // 밝기 가중치 rejection sampling으로 초기 점 배치
  function initPoints() {
    points = [];
    let attempts = 0;
    const maxAttempts = NUM_POINTS * 60;
    while (points.length < NUM_POINTS && attempts < maxAttempts) {
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
    p.background(8, 8, 16);
    frameCount0++;

    // 처음 400프레임 동안 relaxation을 강하게, 이후에는 약하게 유지
    const relaxStrength = frameCount0 < 400 ? 1.0 : 0.15;
    relaxStep(relaxStrength);

    // 점 렌더링: 지역 밀도에 따라 크기·알파 미세 조정
    p.noStroke();
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      const density = densityAt(pt.x, pt.y);
      const radius = p.map(density, 0, 1, 0.7, 2.0);
      const alpha = p.map(density, 0, 1, 140, 255);
      p.fill(accentR, accentG, accentB, alpha);
      p.circle(pt.x, pt.y, radius * 2);
    }

    // 디버그 HUD (완성 후엔 주석 처리해도 됨)
    // p.fill(255); p.noStroke(); p.textSize(12);
    // p.text(`points: ${points.length}  frame: ${frameCount0}`, 10, 16)
  };

  // 공간 해시 기반 Lloyd-style relaxation (이웃 반발력으로 점 간격 균등화)
  function relaxStep(strength) {
    const cellSize = 16;
    const gridCols = p.ceil(size / cellSize);
    const gridRows = p.ceil(size / cellSize);
    const grid = new Array(gridCols * gridRows);
    for (let i = 0; i < grid.length; i++) grid[i] = [];

    // 점들을 그리드 셀에 배정
    for (let i = 0; i < points.length; i++) {
      const gx = p.constrain(p.floor(points[i].x / cellSize), 0, gridCols - 1);
      const gy = p.constrain(p.floor(points[i].y / cellSize), 0, gridRows - 1);
      grid[gy * gridCols + gx].push(i);
    }

    const repulse = 0.6 * strength;
    const influenceR2 = 22 * 22; // 반경 22

    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const gx = p.constrain(p.floor(a.x / cellSize), 0, gridCols - 1);
      const gy = p.constrain(p.floor(a.y / cellSize), 0, gridRows - 1);
      let fx = 0;
      let fy = 0;

      // 3x3 이웃 셀만 검사 → O(n)
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
              // 완전 겹침 방지: 살짝 밀기
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

      // 지역 밀도에 따라 이동 스케일 조정 (밝은 곳=넓게, 어두운 곳=좁게)
      const density = densityAt(a.x, a.y);
      const scale = p.map(density, 0, 1, 0.4, 1.6);

      a.x += fx * repulse * scale;
      a.y += fy * repulse * scale;

      // 캔버스 경계
      a.x = p.constrain(a.x, 2, size - 2);
      a.y = p.constrain(a.y, 2, size - 2);
    }
  }

  // 클릭하면 점을 다시 뿌려서 relaxation 재시작
  p.mousePressed = function () {
    if (p.mouseX >= 0 && p.mouseX < size && p.mouseY >= 0 && p.mouseY < size) {
      initPoints();
    }
  };
}
