export default function fractalBrownianMotionSketch(p, size, params = {}) {
  // 내부 렌더링을 위한 버퍼 이미지 객체
  let bufferImg;
  // 계산 성능 및 픽셀 밀도 제어를 위한 버퍼 해상도 설정
  let bufferRes = 60;
  // 강조 색상의 개별 RGB 채널 저장 변수
  let accentR, accentG, accentB;
  // 시간 흐름을 제어하기 위한 누적 변수
  let time = 0;

  // 파라미터 실시간 접근자 객체 설정
  const P = {
    octaves: () => params.octaves ?? 3,
    persistence: () => params.persistence ?? 1.5,
    lacunarity: () => params.lacunarity ?? 3.0,
    noiseScale: () => params.noiseScale ?? 0.01,
    timeSpeed: () => params.timeSpeed ?? 0.015,
  };

  p.setup = function() {
    // 지정된 규격으로 캔버스 생성
    p.createCanvas(size, size);
    // 픽셀 연산을 위해 픽셀 밀도 고정
    p.pixelDensity(1);

    // CSS에서 강조 색상을 가져와 파싱 후 RGB 분리 저장
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    const ac = p.color(accentColor);
    accentR = p.red(ac);
    accentG = p.green(ac);
    accentB = p.blue(ac);

    // 내부 연산용 이미지 버퍼 생성[cite: 14]
    bufferImg = p.createImage(bufferRes, bufferRes);
    // 기본 배경색 초기화
    p.background(8, 8, 16);
  };

  // 기본 fBM(Fractal Brownian Motion) 연산 로직[cite: 13, 14]
  function fbmRaw(x, y, t) {
    let value = 0;
    let amplitude = 1.0; // 진폭
    let frequency = 1.0; // 주파수
    let maxValue = 0;    // 정규화를 위한 최대값 누적

    // 옥타브 루프 실행
    for (let i = 0; i < P.octaves(); i++) {
      // 펄린 노이즈 중첩[cite: 13]
      value += amplitude * p.noise(
        x * P.noiseScale() * frequency,
        y * P.noiseScale() * frequency,
        t + i * 100
      );
      maxValue += amplitude;
      amplitude *= P.persistence(); // 진폭 감소
      frequency *= P.lacunarity();  // 주파수 증가
    }

    // 0~1 사이로 정규화 반환
    return value / maxValue;
  }

  // 도메인 워핑(Domain Warping)을 적용한 좌표 변형 로직[cite: 14]
  function fbmWarped(x, y, t) {
    // 1차 변형량 계산
    let q0 = fbmRaw(x, y, t);
    let q1 = fbmRaw(x + 5.2, y + 1.3, t);

    // 2차 계산: 변형된 좌표를 사용하여 결과 도출
    let r = fbmRaw(
      x + 4.0 * q0,
      y + 4.0 * q1,
      t
    );

    return r;
  }

  p.draw = function() {
    // 파라미터로 받은 시간 속도만큼 누적
    time += P.timeSpeed();

    // 픽셀 버퍼 로드[cite: 14]
    bufferImg.loadPixels();

    // 그리드 순회 연산
    for (let y = 0; y < bufferRes; y++) {
      for (let x = 0; x < bufferRes; x++) {
        // 도메인 워핑된 fBM 값 계산
        let fbmValue = fbmWarped(x, y, time);

        // 결과값의 대비 강화[cite: 14]
        let brightness = p.pow(fbmValue, 1.3);
        brightness = p.constrain(brightness, 0, 1);

        // 강조 색상을 적용한 최종 색상 채널 계산
        let finalR = accentR * brightness;
        let finalG = accentG * brightness;
        let finalB = accentB * brightness;

        // 배경색과 블렌딩 (배경: 8, 8, 16)
        let bgR = 8, bgG = 8, bgB = 16;
        let blendAmount = p.map(brightness, 0, 1, 0.15, 1.0);

        // 선형 보간을 통한 배경 혼합
        finalR = p.lerp(bgR, finalR, blendAmount);
        finalG = p.lerp(bgG, finalG, blendAmount);
        finalB = p.lerp(bgB, finalB, blendAmount);

        // 버퍼 배열의 인덱스 계산 및 색상 주입[cite: 14]
        let pidx = (y * bufferRes + x) * 4;
        bufferImg.pixels[pidx] = finalR;
        bufferImg.pixels[pidx + 1] = finalG;
        bufferImg.pixels[pidx + 2] = finalB;
        bufferImg.pixels[pidx + 3] = 255;
      }
    }

    // 버퍼 픽셀 업데이트 및 화면 출력[cite: 14]
    bufferImg.updatePixels();
    p.noSmooth();
    p.image(bufferImg, 0, 0, p.width, p.height);
  };
}