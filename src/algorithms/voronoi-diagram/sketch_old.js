export default function voronoiDiagramSketch(p, size) {
  let seeds = [];
  let numSeeds = 50;
  let accentColor;
  let bufferImg;
  let bufferRes = 500; // 고정 seed이므로 고해상도 사용 가능
  let needsRedraw = true;

  p.setup = function () {
    p.createCanvas(size, size);
    p.pixelDensity(1);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    bufferImg = p.createImage(bufferRes, bufferRes);

    initSeeds();
    computeVoronoi();

    p.background(8, 8, 16);
  };

  // seed 초기화 (고정 위치)
  function initSeeds() {
    seeds = [];
    for (let i = 0; i < numSeeds; i++) {
      seeds.push({
        x: p.random(bufferRes),
        y: p.random(bufferRes),
        seed: p.random(1000),
      });
    }
    needsRedraw = true;
  }

  // Voronoi 한 번만 계산 (고해상도)
  function computeVoronoi() {
    let ac = p.color(accentColor);
    let acR = p.red(ac);
    let acG = p.green(ac);
    let acB = p.blue(ac);

    bufferImg.loadPixels();

    for (let y = 0; y < bufferRes; y++) {
      for (let x = 0; x < bufferRes; x++) {
        let minDist1 = Infinity;
        let minDist2 = Infinity;
        let closestIdx = 0;

        // 거리 제곱으로 가장 가까운 2개 seed 찾기
        for (let i = 0; i < seeds.length; i++) {
          let dx = x - seeds[i].x;
          let dy = y - seeds[i].y;
          let d2 = dx * dx + dy * dy;

          if (d2 < minDist1) {
            minDist2 = minDist1;
            minDist1 = d2;
            closestIdx = i;
          } else if (d2 < minDist2) {
            minDist2 = d2;
          }
        }

        // 경계선 감지
        let edgeFactor = p.sqrt(minDist2) - p.sqrt(minDist1);
        let isEdge = edgeFactor < 1.2;

        let pidx = (y * bufferRes + x) * 4;

        if (isEdge) {
          // 경계선은 어둡게
          bufferImg.pixels[pidx] = 8;
          bufferImg.pixels[pidx + 1] = 8;
          bufferImg.pixels[pidx + 2] = 16;
          bufferImg.pixels[pidx + 3] = 255;
        } else {
          // 셀 내부: seed마다 다른 밝기 + 거리 기반 그라디언트
          let seed = seeds[closestIdx];
          let baseBright = 0.4 + 0.6 * p.noise(seed.seed);
          let distFactor = p.map(p.sqrt(minDist1), 0, bufferRes / 3, 1.2, 0.5, true);
          let brightness = baseBright * distFactor;

          bufferImg.pixels[pidx] = p.constrain(acR * brightness, 0, 255);
          bufferImg.pixels[pidx + 1] = p.constrain(acG * brightness, 0, 255);
          bufferImg.pixels[pidx + 2] = p.constrain(acB * brightness, 0, 255);
          bufferImg.pixels[pidx + 3] = 255;
        }
      }
    }

    bufferImg.updatePixels();
    needsRedraw = false;
  }

  p.draw = function () {
    // 계산된 이미지를 한 번만 그리기 (매 프레임 재계산 없음)
    p.noSmooth();
    p.image(bufferImg, 0, 0, p.width, p.height);

    // seed 포인트 시각화
    p.fill(255, 220);
    p.noStroke();
    for (let s of seeds) {
      let sx = p.map(s.x, 0, bufferRes, 0, p.width);
      let sy = p.map(s.y, 0, bufferRes, 0, p.height);
      p.circle(sx, sy, 4);
    }
  };

  // 클릭 시 새로운 패턴 생성
  p.mousePressed = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      initSeeds();
      computeVoronoi();
    }
  };
}