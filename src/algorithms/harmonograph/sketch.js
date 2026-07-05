export default function harmonographSketch(p, size) {
  let accentColor;
  let oscillators = []; // 4개의 진동자 (x축 2개, y축 2개)
  let time = 0;
  let pointsPerFrame = 80; // 프레임당 그릴 점 수
  let maxTime = 100; // 시뮬레이션 총 시간 (감쇠 완료 시점)

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initOscillators();
    p.background(8, 8, 16);
  };

  // 진동자 초기화 (랜덤 파라미터로 다양한 패턴 생성)
  function initOscillators() {
    oscillators = [];
    time = 0;

    // 정수 비율의 주파수로 리사주 패턴 형성 (1:2, 2:3, 3:4 등)
    let baseFreq = p.random([1, 2, 3]);
    let ratios = [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
      [2, 5],
    ];
    let chosenRatio = ratios[p.floor(p.random(ratios.length))];

    // x축 진동자 2개
    oscillators.push({
      freq: baseFreq * chosenRatio[0],
      phase: p.random(p.TWO_PI),
      amp: size * 0.3,
      damping: p.random(0.008, 0.015),
    });
    oscillators.push({
      freq: baseFreq * chosenRatio[0] * 1.01, // 미세한 주파수 차이로 복잡한 패턴
      phase: p.random(p.TWO_PI),
      amp: size * 0.15,
      damping: p.random(0.01, 0.02),
    });

    // y축 진동자 2개
    oscillators.push({
      freq: baseFreq * chosenRatio[1],
      phase: p.random(p.TWO_PI),
      amp: size * 0.3,
      damping: p.random(0.008, 0.015),
    });
    oscillators.push({
      freq: baseFreq * chosenRatio[1] * 1.01,
      phase: p.random(p.TWO_PI),
      amp: size * 0.15,
      damping: p.random(0.01, 0.02),
    });

    p.background(8, 8, 16);
  }

  // 특정 시간에서의 x, y 위치 계산
  function getPosition(t) {
    // x = osc[0] + osc[1] (두 진동자의 합성)
    let x =
      oscillators[0].amp *
        p.sin(oscillators[0].freq * t + oscillators[0].phase) *
        p.exp(-oscillators[0].damping * t) +
      oscillators[1].amp *
        p.sin(oscillators[1].freq * t + oscillators[1].phase) *
        p.exp(-oscillators[1].damping * t);

    // y = osc[2] + osc[3]
    let y =
      oscillators[2].amp *
        p.sin(oscillators[2].freq * t + oscillators[2].phase) *
        p.exp(-oscillators[2].damping * t) +
      oscillators[3].amp *
        p.sin(oscillators[3].freq * t + oscillators[3].phase) *
        p.exp(-oscillators[3].damping * t);

    return {
      x: p.width / 2 + x,
      y: p.height / 2 + y,
    };
  }

  p.draw = function () {
    // 시뮬레이션 완료 시 대기
    if (time >= maxTime) {
      return;
    }

    // accent 색상 파싱
    let ac = p.color(accentColor);

    // 프레임당 여러 점을 그려 빠르게 패턴 완성
    p.stroke(accentColor);
    p.strokeWeight(1.2);

    let dt = 0.02; // 시간 간격 (곡선의 부드러움 제어)

    for (let i = 0; i < pointsPerFrame; i++) {
      if (time >= maxTime) break;

      let pos1 = getPosition(time);
      let pos2 = getPosition(time + dt);

      // 시간에 따른 알파 감소 (감쇠 효과 시각화)
      let alpha = p.map(time, 0, maxTime, 255, 40);
      let c = p.color(accentColor);
      c.setAlpha(alpha);
      p.stroke(c);

      // 선분으로 연결하여 부드러운 곡선 표현
      p.line(pos1.x, pos1.y, pos2.x, pos2.y);

      time += dt;
    }
  };

  // 클릭 시 새로운 패턴 생성
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      initOscillators();
    }
  };
}