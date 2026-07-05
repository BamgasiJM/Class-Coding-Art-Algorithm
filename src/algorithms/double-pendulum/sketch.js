export default function doublePendulumSketch(p, size) {
  let pendulums = []; // 여러 진자 (초기값 민감도 시각화용)
  let accentColor;

  // 물리 파라미터
  let g = 1.0; // 중력 가속도
  let L1, L2; // 진자 암 길이
  let m1 = 10,
    m2 = 10; // 질량

  // 시뮬레이션 설정
  let numPendulums = 3; // 카오스 특성 시각화를 위한 진자 개수
  let trailMax = 400; // 트레일 최대 길이
  let dt = 0.15; // 시간 간격 (적분 안정성)

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 진자 암 길이를 캔버스 크기에 비례하여 설정
    L1 = size * 0.18;
    L2 = size * 0.28;

    initPendulums();
    p.background(8, 8, 16);
  };

  // 여러 진자를 미세하게 다른 초기값으로 생성
  function initPendulums() {
    pendulums = [];

    // 기준 초기값
    let baseTheta1 = p.PI * 0.75;
    let baseTheta2 = p.PI * 0.75;

    for (let i = 0; i < numPendulums; i++) {
      // 각 진자마다 아주 미세하게 다른 초기 각도 (카오스 특성 강조)
      let offset = (i - (numPendulums - 1) / 2) * 0.001;

      pendulums.push({
        a1: baseTheta1 + offset,
        a2: baseTheta2 + offset,
        w1: 0, // 각속도
        w2: 0,
        trail: [], // 끝점 궤적
        hueShift: (i / numPendulums) * 30 - 15, // 색상 미세 변형
      });
    }
  }

  // 라그랑주 역학 기반 이중 진자 운동 방정식
  // θ1''과 θ2''에 대한 연립 미분방정식을 풀어서 각가속도 계산
  function computeAccelerations(a1, a2, w1, w2) {
    let num1 = -g * (2 * m1 + m2) * p.sin(a1);
    let num2 = -m2 * g * p.sin(a1 - 2 * a2);
    let num3 = -2 * p.sin(a1 - a2) * m2;
    let num4 = w2 * w2 * L2 + w1 * w1 * L1 * p.cos(a1 - a2);
    let den = L1 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    let a1acc = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * p.sin(a1 - a2);
    num2 = w1 * w1 * L1 * (m1 + m2);
    num3 = g * (m1 + m2) * p.cos(a1);
    num4 = w2 * w2 * L2 * m2 * p.cos(a1 - a2);
    den = L2 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    let a2acc = (num1 * (num2 + num3 + num4)) / den;

    return { a1acc, a2acc };
  }

  p.draw = function () {
    // 알파 트레일로 궤적 잔상 효과
    p.background(8, 8, 16, 80);

    let pivotX = p.width / 2;
    let pivotY = p.height * 0.35;

    // 각 진자 시뮬레이션 업데이트
    for (let pend of pendulums) {
      // 1단계: 현재 상태에서의 각가속도 계산
      let acc = computeAccelerations(pend.a1, pend.a2, pend.w1, pend.w2);

      // 2단계: 각속도 및 각도 업데이트 (Euler 적분)
      pend.w1 += acc.a1acc * dt;
      pend.w2 += acc.a2acc * dt;
      pend.a1 += pend.w1 * dt;
      pend.a2 += pend.w2 * dt;

      // 3단계: 관절 및 끝점 위치 계산
      let x1 = pivotX + L1 * p.sin(pend.a1);
      let y1 = pivotY + L1 * p.cos(pend.a1);
      let x2 = x1 + L2 * p.sin(pend.a2);
      let y2 = y1 + L2 * p.cos(pend.a2);

      // 4단계: 끝점 궤적 기록
      pend.trail.push({ x: x2, y: y2 });
      if (pend.trail.length > trailMax) {
        pend.trail.shift();
      }
    }

    // 트레일 렌더링 (가장 오래된 것부터 그려서 자연스럽게 페이드)
    p.noFill();
    p.strokeWeight(1.5);

    for (let pend of pendulums) {
      // accent color 기반에 약간의 색조 변형
      let c = p.color(accentColor);
      let r = p.red(c);
      let g = p.green(c);
      let b = p.blue(c);

      for (let i = 1; i < pend.trail.length; i++) {
        // 시간에 따른 알파 페이드 (최근일수록 진하게)
        let age = pend.trail.length - i;
        let alpha = p.map(age, 0, trailMax, 255, 0);
        alpha = p.constrain(alpha, 0, 255);

        // 색조 미세 변형으로 각 진자 구분
        let cr = p.constrain(r + pend.hueShift * 2, 0, 255);
        let cg = p.constrain(g - pend.hueShift, 0, 255);
        let cb = p.constrain(b - pend.hueShift * 1.5, 0, 255);

        p.stroke(cr, cg, cb, alpha);
        p.line(
          pend.trail[i - 1].x,
          pend.trail[i - 1].y,
          pend.trail[i].x,
          pend.trail[i].y,
        );
      }
    }

    // 진자 구조 렌더링 (가장 마지막 진자만 표시하여 시선 집중)
    let mainPend = pendulums[0];
    let x1 = pivotX + L1 * p.sin(mainPend.a1);
    let y1 = pivotY + L1 * p.cos(mainPend.a1);
    let x2 = x1 + L2 * p.sin(mainPend.a2);
    let y2 = y1 + L2 * p.cos(mainPend.a2);

    // 진자 암
    p.stroke(255, 180);
    p.strokeWeight(2);
    p.line(pivotX, pivotY, x1, y1);
    p.line(x1, y1, x2, y2);

    // 관절 및 질량점
    p.noStroke();
    p.fill(255);
    p.circle(pivotX, pivotY, 6); // 고정점

    let massColor = p.color(accentColor);
    p.fill(massColor);
    p.circle(x1, y1, 14); // 첫 번째 질량
    p.circle(x2, y2, 14); // 두 번째 질량 (끝점)
  };

  // 클릭 시 새로운 시뮬레이션 시작 (카오스 특성 재관찰)
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      initPendulums();
      p.background(8, 8, 16);
    }
  };
}
