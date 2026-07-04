export default function reactionDiffusionSketch(p, size) {
  let gridA = [];
  let gridB = [];
  let nextA = [];
  let nextB = [];
  let accentColor;
  let img;

  // 더 작은 해상도로 연산량 대폭 감소
  let viewSize = 80;
  let scaleFactor = size / viewSize;

  // 그레이-스콧 모델 파라미터
  let dA = 1.0;
  let dB = 0.5;
  let feed = 0.055;
  let k = 0.062;

  p.setup = function () {
    p.createCanvas(size, size);
    p.pixelDensity(1);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 이미지 버퍼 생성 (깜빡거림 방지)
    img = p.createImage(size, size);

    // 1차원 배열 초기화
    let totalCells = viewSize * viewSize;
    gridA = new Array(totalCells).fill(1);
    gridB = new Array(totalCells).fill(0);
    nextA = new Array(totalCells).fill(1);
    nextB = new Array(totalCells).fill(0);

    // 중앙에 B 물질 주입
    let centerX = p.floor(viewSize / 2);
    let centerY = p.floor(viewSize / 2);
    let seedSize = 8;
    for (let x = centerX - seedSize; x < centerX + seedSize; x++) {
      for (let y = centerY - seedSize; y < centerY + seedSize; y++) {
        let idx = x + y * viewSize;
        gridB[idx] = 1;
      }
    }

    // 초기 배경 설정
    p.background(8, 8, 16);
  };

  p.draw = function () {
    // 알파 트레일 효과로 깜빡거림 제거
    p.background(8, 8, 16, 50);

    // 반응 시뮬레이션 (3회 반복으로 감소)
    for (let iter = 0; iter < 3; iter++) {
      for (let x = 1; x < viewSize - 1; x++) {
        for (let y = 1; y < viewSize - 1; y++) {
          let idx = x + y * viewSize;
          let a = gridA[idx];
          let b = gridB[idx];

          // laplace 인라인 계산
          let lapA = 
            gridA[idx - 1] * 0.2 +
            gridA[idx + 1] * 0.2 +
            gridA[idx - viewSize] * 0.2 +
            gridA[idx + viewSize] * 0.2 +
            gridA[idx - viewSize - 1] * 0.05 +
            gridA[idx - viewSize + 1] * 0.05 +
            gridA[idx + viewSize - 1] * 0.05 +
            gridA[idx + viewSize + 1] * 0.05 +
            a * -1;

          let lapB = 
            gridB[idx - 1] * 0.2 +
            gridB[idx + 1] * 0.2 +
            gridB[idx - viewSize] * 0.2 +
            gridB[idx + viewSize] * 0.2 +
            gridB[idx - viewSize - 1] * 0.05 +
            gridB[idx - viewSize + 1] * 0.05 +
            gridB[idx + viewSize - 1] * 0.05 +
            gridB[idx + viewSize + 1] * 0.05 +
            b * -1;

          let reaction = a * b * b;

          nextA[idx] = a + (dA * lapA - reaction + feed * (1 - a));
          nextB[idx] = b + (dB * lapB + reaction - (k + feed) * b);

          nextA[idx] = p.constrain(nextA[idx], 0, 1);
          nextB[idx] = p.constrain(nextB[idx], 0, 1);
        }
      }

      // 그리드 스왑
      let tempA = gridA;
      gridA = nextA;
      nextA = tempA;

      let tempB = gridB;
      gridB = nextB;
      nextB = tempB;
    }

    // 이미지 버퍼에 렌더링
    img.loadPixels();
    let c = p.color(accentColor);
    let r = p.red(c);
    let g = p.green(c);
    let b = p.blue(c);

    for (let x = 0; x < viewSize; x++) {
      for (let y = 0; y < viewSize; y++) {
        let idx = x + y * viewSize;
        let a = gridA[idx];
        let bVal = gridB[idx];

        let intensity = p.constrain((a - bVal) * 255, 0, 255);
        let alpha = intensity / 255;

        let finalR = p.lerp(8, r, alpha);
        let finalG = p.lerp(8, g, alpha);
        let finalB = p.lerp(16, b, alpha);

        // scaleFactor만큼 픽셀 블록 채우기
        let startX = p.floor(x * scaleFactor);
        let startY = p.floor(y * scaleFactor);
        let endX = p.floor((x + 1) * scaleFactor);
        let endY = p.floor((y + 1) * scaleFactor);

        for (let px = startX; px < endX; px++) {
          for (let py = startY; py < endY; py++) {
            let pidx = (py * size + px) * 4;
            img.pixels[pidx] = finalR;
            img.pixels[pidx + 1] = finalG;
            img.pixels[pidx + 2] = finalB;
            img.pixels[pidx + 3] = 255;
          }
        }
      }
    }
    img.updatePixels();

    // 이미지를 메인 캔버스에 복사 (한 번의 호출로 완료)
    p.image(img, 0, 0);
  };
}