export default function ifsFractalSketch(p, size) {
  let currentPoint = { x: 0, y: 0 };
  let pointsCount = 0;
  let maxPoints = 40000; // 전체 그려질 정점 수 제한
  let pointsPerFrame = 300; // 프레임당 60fps 유지를 위한 가벼운 연산량
  let accentColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    p.background(8, 8, 16);

    // 초기 시작점 설정 (랜덤값)
    currentPoint.x = p.random(-1, 1);
    currentPoint.y = p.random(0, 2);
  };

  p.draw = function () {
    // 배경을 초기화하지 않고 점을 누적하여 프랙탈 구조 생성 (트레일이나 투명도 없이 누적)
    if (pointsCount >= maxPoints) {
      p.noLoop(); // 모든 포인트가 그려지면 연산 중지 (메모리 및 CPU 자원 보호)
      return;
    }

    p.stroke(accentColor);
    p.strokeWeight(1);

    // 반복 함수 체계 (IFS) - 바른슬리 고사리 (Barnsley Fern) 매트릭스 변환 알고리즘
    for (let i = 0; i < pointsPerFrame; i++) {
      let r = p.random(100);
      let nextX, nextY;

      if (r < 1) {
        // 줄기 성장 변환
        nextX = 0;
        nextY = 0.16 * currentPoint.y;
      } else if (r < 86) {
        // 작아지면서 위로 배열되는 나뭇잎 변환
        nextX = 0.85 * currentPoint.x + 0.04 * currentPoint.y;
        nextY = -0.04 * currentPoint.x + 0.85 * currentPoint.y + 1.6;
      } else if (r < 93) {
        // 왼쪽 내부 잎사귀 변환
        nextX = 0.2 * currentPoint.x - 0.26 * currentPoint.y;
        nextY = 0.23 * currentPoint.x + 0.22 * currentPoint.y + 1.6;
      } else {
        // 오른쪽 내부 잎사귀 변환
        nextX = -0.15 * currentPoint.x + 0.28 * currentPoint.y;
        nextY = 0.26 * currentPoint.x + 0.24 * currentPoint.y + 0.44;
      }

      currentPoint.x = nextX;
      currentPoint.y = nextY;

      // 계산된 수학적 공간(-2.182 <= x <= 2.655, 0 <= y <= 9.998)을 고정 정사각형 캔버스 크기로 매핑
      let px = p.map(
        currentPoint.x,
        -2.182,
        2.655,
        p.width * 0.1,
        p.width * 0.9,
      );
      let py = p.map(
        currentPoint.y,
        0,
        9.998,
        p.height * 0.95,
        p.height * 0.05,
      ); // y축 뒤집기

      // 계산된 좌표 범위 안에 있을 때만 점 시각화
      if (px >= 0 && px <= p.width && py >= 0 && py <= p.height) {
        // 내부 누적도에 따른 정교함을 보여주기 위한 약간의 투명도 추가
        p.stroke(`${accentColor}33`);
        p.point(px, py);
      }

      pointsCount++;
    }
  };
}
