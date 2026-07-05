export default function fractalBrownianMotionSketch(p, size) {
  let bufferImg;
  let bufferRes = 60; // 내부 연산 해상도
  let accentColor;
  let time = 0;

  // fBM 파라미터
  let octaves = 3;
  let persistence = 1.5;
  let lacunarity = 3.0;
  let noiseScale = 0.01;

  p.setup = function() {
    p.createCanvas(size, size);
    p.pixelDensity(1);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();

    bufferImg = p.createImage(bufferRes, bufferRes);
    p.background(8, 8, 16);
  };

  // 기본 fBM 계산 (도메인 워핑용)
  function fbmRaw(x, y, t) {
    let value = 0;
    let amplitude = 1.0;
    let frequency = 1.0;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      value += amplitude * p.noise(
        x * noiseScale * frequency,
        y * noiseScale * frequency,
        t + i * 100
      );
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return value / maxValue;
  }

  // 도메인 워핑 적용 (fBM의 입력을 다시 fBM으로 변형)
  function fbmWarped(x, y, t) {
    // 1차 fBM으로 좌표 변형량 계산
    let q0 = fbmRaw(x, y, t);
    let q1 = fbmRaw(x + 5.2, y + 1.3, t);

    // 2차 fBM: 변형된 좌표로 다시 계산
    let r = fbmRaw(
      x + 4.0 * q0,
      y + 4.0 * q1,
      t
    );

    return r;
  }

  p.draw = function() {
    time += 0.015; // 시간 변화 증가 (더 빠른 애니메이션)

    let ac = p.color(accentColor);
    let acR = p.red(ac);
    let acG = p.green(ac);
    let acB = p.blue(ac);

    bufferImg.loadPixels();

    for (let y = 0; y < bufferRes; y++) {
      for (let x = 0; x < bufferRes; x++) {
        // 도메인 워핑된 fBM 값 (0~1)
        let fbmValue = fbmWarped(x, y, time);

        // 대비 강화
        let brightness = p.pow(fbmValue, 1.3);
        brightness = p.constrain(brightness, 0, 1);

        // accent 색상 적용
        let finalR = acR * brightness;
        let finalG = acG * brightness;
        let finalB = acB * brightness;

        // 배경과 blend
        let bgR = 8, bgG = 8, bgB = 16;
        let blendAmount = p.map(brightness, 0, 1, 0.15, 1.0);

        finalR = p.lerp(bgR, finalR, blendAmount);
        finalG = p.lerp(bgG, finalG, blendAmount);
        finalB = p.lerp(bgB, finalB, blendAmount);

        let pidx = (y * bufferRes + x) * 4;
        bufferImg.pixels[pidx] = finalR;
        bufferImg.pixels[pidx + 1] = finalG;
        bufferImg.pixels[pidx + 2] = finalB;
        bufferImg.pixels[pidx + 3] = 255;
      }
    }

    bufferImg.updatePixels();

    p.noSmooth();
    p.image(bufferImg, 0, 0, p.width, p.height);
  };
}