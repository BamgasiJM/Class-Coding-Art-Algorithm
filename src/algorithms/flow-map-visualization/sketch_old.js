// src/algorithms/flow-map-visualization/sketch.js
export default function flowMapVisualizationSketch(p, size) {
  let cols, rows;
  let scl = 20; // 그리드 셀 크기
  let particles = [];
  let flowField = [];
  let accentColor;
  let zoff = 0;

  p.setup = function() {
    p.createCanvas(size, size);

    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();

    // 벡터 필드 초기화
    flowField = [];
    for (let i = 0; i < cols * rows; i++) {
      flowField.push(p.createVector(0, 0));
    }

    // 파티클(스트림라인 시작점) 초기화
    particles = [];
    for (let i = 0; i < 600; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        prevX: null,
        prevY: null,
        age: p.random(150, 250) // 스트림라인 길이를 조절하기 위한 나이 변수
      });
    }

    p.background(8, 8, 16);
  };

  p.draw = function() {
    p.background(8, 8, 16, 8); // 트레일 효과
    zoff += 0.003; // 시간 흐름 제어

    // 벡터 필드 업데이트 (Perlin Noise 사용)
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        const index = x + y * cols;
        // Perlin Noise를 사용하여 벡터 방향 계산
        const angle = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, p.TWO_PI);
        // 벡터 생성 (크기는 1로 고정)
        flowField[index] = p.createVector(p.cos(angle), p.sin(angle));
        xoff += 0.1;
      }
      yoff += 0.1;
    }

    // 스트림라인 그리기
    p.stroke(accentColor);
    p.strokeWeight(1.2);
    p.noFill();

    for (let particle of particles) {
      // 현재 그리드 셀 인덱스 계산
      const x = p.floor(p.constrain(particle.x, 0, p.width - 1) / scl);
      const y = p.floor(p.constrain(particle.y, 0, p.height - 1) / scl);
      const index = x + y * cols;

      // 이전 위치 저장
      particle.prevX = particle.x;
      particle.prevY = particle.y;

      // 벡터 필드 따라 입자 이동
      particle.x += flowField[index].x * -0.8;
      particle.y += flowField[index].y * 0.6;

      // 경계 처리 (반대쪽에서 재진입) — 워프 여부를 기록해 잘못된 연결선을 막는다
      let wrapped = false;
      if (particle.x < 0) { particle.x = p.width; wrapped = true; }
      if (particle.x > p.width) { particle.x = 0; wrapped = true; }
      if (particle.y < 0) { particle.y = p.height; wrapped = true; }
      if (particle.y > p.height) { particle.y = 0; wrapped = true; }

      // 스트림라인 그리기 (입자 경로 연결)
      if (particle.age <= 0) {
        // 스트림라인 재시작
        particle.x = p.random(p.width);
        particle.y = p.random(p.height);
        particle.age = p.random(50, 100);
        particle.prevX = null;
        particle.prevY = null;
      } else if (wrapped) {
        // 워프 직후에는 이전 위치와 이어 그리지 않음 (캔버스를 가로지르는 직선 방지)
        particle.age--;
      } else if (particle.prevX !== null) {
        p.line(particle.prevX, particle.prevY, particle.x, particle.y);
        particle.age--;
      }
    }
  };
}