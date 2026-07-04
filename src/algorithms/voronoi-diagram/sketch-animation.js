export default function voronoiDiagramSketch(p, size) {
  let seeds = [];
  let numSeeds = 20;
  let accentColor;
  let bufferImg;
  let bufferRes = 120; // 내부 연산 해상도 (성능 최적화용 축소)

  p.setup = function () {
    p.createCanvas(size, size);
    p.pixelDensity(1);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 저해상도 이미지 버퍼 생성 (Voronoi 계산용)
    bufferImg = p.createImage(bufferRes, bufferRes);

    // seed 포인트 초기화 및 이동 속도 부여
    seeds = [];
    for (let i = 0; i < numSeeds; i++) {
      seeds.push({
        x: p.random(bufferRes),
        y: p.random(bufferRes),
        vx: p.random(-0.3, 0.3),
        vy: p.random(-0.3, 0.3),
        seed: p.random(1000), // 각 셀의 밝기 변이를 위한 고유 시드
      });
    }

    p.background(8, 8, 16);
  };

  p.draw = function () {
    // seed 이동 및 경계 반사
    for (let s of seeds) {
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < 0 || s.x > bufferRes) s.vx *= -1;
      if (s.y < 0 || s.y > bufferRes) s.vy *= -1;

      s.x = p.constrain(s.x, 0, bufferRes - 1);
      s.y = p.constrain(s.y, 0, bufferRes - 1);
    }

    // accent 색상 파싱
    let ac = p.color(accentColor);
    let acR = p.red(ac);
    let acG = p.green(ac);
    let acB = p.blue(ac);

    // 픽셀 단위 Voronoi 계산
    bufferImg.loadPixels();

    for (let y = 0; y < bufferRes; y++) {
      for (let x = 0; x < bufferRes; x++) {
        let minDist1 = Infinity;
        let minDist2 = Infinity;
        let closestIdx = 0;

        // 각 픽셀에서 모든 seed까지의 거리 제곱 계산 (sqrt 생략으로 성능 향상)
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

        // 경계선 감지: 가장 가까운 두 seed의 거리 차이가 작으면 경계
        let edgeFactor = p.sqrt(minDist2) - p.sqrt(minDist1);
        let isEdge = edgeFactor < 1.5;

        let pidx = (y * bufferRes + x) * 4;

        if (isEdge) {
          // 경계선은 어둡게 표시
          bufferImg.pixels[pidx] = 8;
          bufferImg.pixels[pidx + 1] = 8;
          bufferImg.pixels[pidx + 2] = 16;
          bufferImg.pixels[pidx + 3] = 255;
        } else {
          // 셀 내부는 accent 색상에 밝기 변형 적용
          let seed = seeds[closestIdx];
          let baseBright = 0.5 + 0.5 * p.noise(seed.seed); // seed마다 다른 밝기

          // seed 근처일수록 밝게 (그라디언트 효과)
          let distFactor = p.map(p.sqrt(minDist1), 0, bufferRes / 2, 1.1, 0.6, true);
          let brightness = baseBright * distFactor;

          bufferImg.pixels[pidx] = p.constrain(acR * brightness, 0, 255);
          bufferImg.pixels[pidx + 1] = p.constrain(acG * brightness, 0, 255);
          bufferImg.pixels[pidx + 2] = p.constrain(acB * brightness, 0, 255);
          bufferImg.pixels[pidx + 3] = 255;
        }
      }
    }

    bufferImg.updatePixels();

    // 저해상도 버퍼를 메인 캔버스에 스케일 업하여 그리기
    p.noSmooth(); // 픽셀 느낌을 살려 셀 경계를 선명하게
    p.image(bufferImg, 0, 0, p.width, p.height);

    // seed 포인트 시각화 (작은 흰 점)
    p.fill(255, 200);
    p.noStroke();
    for (let s of seeds) {
      let sx = p.map(s.x, 0, bufferRes, 0, p.width);
      let sy = p.map(s.y, 0, bufferRes, 0, p.height);
      p.circle(sx, sy, 3);
    }
  };
}