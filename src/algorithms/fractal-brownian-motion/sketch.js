export default function fractalBrownianMotionSketch(p, size) {
  let octaves = 4; // 중첩할 노이즈 레이어(옥타브) 수
  let time = 0;
  let accentColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    p.background(8, 8, 16);
  };

  // 2D Fractal Brownian Motion 함수 구현
  function fbm(x, y) {
    let value = 0.0;
    let amplitude = 0.5;
    let frequency = 1.0;

    // 여러 레이어의 노이즈를 진폭과 주파수를 변화시키며 누적
    for (let i = 0; i < octaves; i++) {
      value += amplitude * p.noise(x * frequency, y * frequency);
      frequency *= 2.0; // 주파수 증가 (더 세밀한 디테일)
      amplitude *= 0.5; // 진폭 감소 (세밀한 디테일의 영향도 감소)
    }
    return value;
  }

  p.draw = function () {
    p.background(8, 8, 16);

    let rows = 40;
    let cols = 40;
    let xStep = p.width / cols;
    let yStep = p.height / rows;

    time += 0.005;

    // fBm 노이즈 필드를 그리드 기반의 유기적인 메쉬 구조로 시각화
    for (let j = 0; j <= rows; j++) {
      p.noFill();
      p.stroke(accentColor);
      p.strokeWeight(1);
      p.beginShape();

      for (let i = 0; i <= cols; i++) {
        let x = i * xStep;
        let y = j * yStep;

        // 입력 좌표에 시간축과 공간 변화를 주어 fBm 값 연산
        let nx = x * 0.003;
        let ny = y * 0.003;
        let n = fbm(nx + time, ny + p.sin(time * 0.5));

        // fBm 결과값으로 격자점을 왜곡시켜 자연스러운 지형/흐름 생성
        let xOffset = p.map(p.noise(nx, ny, time), 0, 1, -15, 15);
        let yOffset = p.map(n, 0, 1, -40, 40);

        // 외곽 영역일수록 선의 투명도를 낮추어 경계를 부드럽게 처리
        let d = p.dist(x, y, p.width / 2, p.height / 2);
        let alpha = p.map(d, 0, p.width * 0.6, 200, 0);
        p.stroke(`${accentColor}${p.hex(p.floor(p.max(0, alpha)), 2)}`);

        p.vertex(x + xOffset, y + yOffset);
      }
      p.endShape();
    }
  };
}
